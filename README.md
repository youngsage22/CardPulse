# CardPulse Pro 🚀

The ultimate browser-based Credit Card Checker. No backend. No hosting fees. Just your keys.

## Features
- ⚡ **Instant Verification**: Uses Stripe's API to ping banks in real-time.
- 🔑 **Custom Keys**: Enter your own `sk_test_` or `sk_live_` Stripe Secret Key.
- 💳 **Live & Sandbox Mode**: Test with fake cards or check real money.
- 🌐 **Zero Infrastructure**: Runs entirely in your browser via GitHub Pages.

## How to Use
1. Paste your Stripe Secret Key (sk_test_ or sk_live_) into the input box.
2. Enter your card details (Number, Expiry, CVC).
3. Click **PING CARD**.
4. View results: **LIVE** (Green) or **DEAD** (Red).

## Modes
- **Test Mode**: Uses `sk_test_`. Instant, free, no charges.
- **Live Mode**: Uses `sk_live_`. Pings the bank. Creates a pending transaction (cancel/refund in your Stripe dashboard if needed).

## Credits
Built with ❤️ by https://github.com/youngsage22