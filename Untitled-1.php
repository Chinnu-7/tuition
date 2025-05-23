<!-- Payment Option HTML for PS Knowledge Hub -->
<form action="/process-payment" method="POST">
    <h2>Choose Payment Method</h2>
    <label>
        <input type="radio" name="payment_method" value="credit_card" checked>
        Credit/Debit Card
    </label>
    <label>
        <input type="radio" name="payment_method" value="paypal">
        PayPal
    </label>
    <label>
        <input type="radio" name="payment_method" value="upi">
        UPI
    </label>
    <div id="card-details" style="margin-top:10px;">
        <input type="text" name="card_number" placeholder="Card Number" required>
        <input type="text" name="expiry" placeholder="MM/YY" required>
        <input type="text" name="cvv" placeholder="CVV" required>
    </div>
    <button type="submit">Pay Now</button>
</form>

<script>
    // Show/hide card details based on payment method
    const radios = document.querySelectorAll('input[name="payment_method"]');
    const cardDetails = document.getElementById('card-details');
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            cardDetails.style.display = this.value === 'credit_card' ? 'block' : 'none';
        });
    });
</script>