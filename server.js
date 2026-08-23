const express = require('express');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Replace with your real key
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/ping', async (req, res) => {
    try {
        const { number, exp_month, exp_year, cvc, amount } = req.body;

        // 1. Create a PaymentMethod (The Ping)
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number,
                exp_month,
                exp_year,
                cvc
            }
        });

        // 2. Create a PaymentIntent to "Capture" the ping
        // We set capture_method to 'manual' so it doesn't actually charge the card,
        // but it still returns the "Approved" or "Declined" status.
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // e.g., 100 cents = $1.00
            currency: 'usd',
            payment_method: paymentMethod.id,
            confirm: true,
            capture_method: 'manual',
            description: 'Card Ping'
        });

        // 3. Return the result
        if (paymentIntent.status === 'requires_payment_method') {
            res.json({ status: 'Declined', message: 'Card Declined' });
        } else {
            res.json({ status: 'Live', message: 'Card Approved' });
        }

    } catch (error) {
        res.json({ status: 'Error', message: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
