<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card Ping Tool</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #111;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        }
        .container {
            background: #1a1a1a;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            width: 100%;
            max-width: 400px;
        }
        h2 { text-align: center; margin-bottom: 1.5rem; }
        label { display: block; margin-bottom: 0.5rem; color: #aaa; font-size: 0.9rem; }
        input {
            width: 100%;
            padding: 12px;
            margin-bottom: 1rem;
            border: 1px solid #333;
            background: #222;
            color: #fff;
            border-radius: 6px;
            box-sizing: border-box;
            font-size: 1rem;
        }
        input:focus { outline: none; border-color: #6366f1; }
        button {
            width: 100%;
            padding: 12px;
            background-color: #6366f1;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: bold;
        }
        button:hover { background-color: #4f46e5; }
        
        /* Status Styles */
        #status {
            margin-top: 1rem;
            padding: 1rem;
            text-align: center;
            border-radius: 6px;
            display: none;
            font-weight: bold;
        }
        .live { background-color: #10b981; color: white; }
        .dead { background-color: #ef4444; color: white; }
    </style>
</head>
<body>

<div class="container">
    <h2>Card Ping 🚀</h2>
    
    <label>Card Number</label>
    <input type="text" id="number" placeholder="4242 4242 4242 4242" maxlength="19">

    <label>Expiry (MM/YY)</label>
    <input type="text" id="exp" placeholder="12/25" maxlength="5">

    <label>CVC</label>
    <input type="text" id="cvc" placeholder="123" maxlength="4">

    <label>Amount (USD)</label>
    <input type="number" id="amount" placeholder="1.00" step="0.01" value="1.00">

    <button onclick="checkCard()">Ping Card</button>
    
    <div id="status"></div>
</div>

<script>
    async function checkCard() {
        const number = document.getElementById('number').value;
        const exp = document.getElementById('exp').value;
        const cvc = document.getElementById('cvc').value;
        const amount = document.getElementById('amount').value;
        const statusDiv = document.getElementById('status');

        // Basic validation
        if (!number || !exp || !cvc) {
            alert("Please fill in all card details.");
            return;
        }

        statusDiv.style.display = 'none';
        statusDiv.className = '';

        try {
            const response = await fetch('http://localhost:3000/ping', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    number,
                    exp_month: parseInt(exp.split('/')[0]),
                    exp_year: parseInt(exp.split('/')[1]),
                    cvc,
                    amount: parseFloat(amount) * 100 // Convert to cents
                })
            });

            const data = await response.json();
            
            statusDiv.style.display = 'block';
            statusDiv.className = data.status === 'Live' ? 'live' : 'dead';
            
            if (data.status === 'Live') {
                statusDiv.innerHTML = '✅ Approved';
            } else {
                statusDiv.innerHTML = `❌ ${data.message}`;
            }

        } catch (err) {
            statusDiv.style.display = 'block';
            statusDiv.className = 'dead';
            statusDiv.innerHTML = 'Server Error';
        }
    }
</script>

</body>
</html>
