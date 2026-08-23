const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    const { number, exp_month, exp_year, cvc } = JSON.parse(event.body);

    try {
        // 1. Create Payment Method
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: { number, exp_month, exp_year, cvc }
        });

        // 2. Create Payment Intent with capture_method: 'manual'
        // This is the "Pro" way to Ping. It checks the card but doesn't charge it permanently.
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 100, // $1.00
            currency: 'usd',
            payment_method: paymentMethod.id,
            confirm: true,
            capture_method: 'manual' 
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                status: paymentIntent.status === 'requires_payment_method' ? 'Declined' : 'Live'
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ status: 'Error', message: error.message })
        };
    }
};
