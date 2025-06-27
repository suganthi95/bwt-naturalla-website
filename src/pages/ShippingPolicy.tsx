export default function ShippingPolicy() {
  return (
    <main className="container mx-auto px-4 py-10 max-w-4xl text-neutral-800 leading-7">
      <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>

      <p className="mb-4">Thank you for ordering at Naturalla.store.</p>

      <h2 className="text-2xl font-semibold mb-2">Order Processing:</h2>
      <p className="mb-4">
        All orders received on the day post payment confirmation will be processed within next 2 working day.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Order Cancellation before shipping:</h2>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>Order cancellation should be done within 24 hours. Once order is processed, it cannot be cancelled by the user.</li>
        <li>
          To request for cancellation or any change in address, kindly contact our support <strong>9655033533</strong> via WhatsApp or Call for assistance.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Order Shipping:</h2>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>After processing, order will be moved to Ready for Dispatch.</li>
        <li>
          Post RTD, the orders for the user will be scheduled for pickup through our registered domestic courier partner (Ecom Express, Bluedart, Xpressbees, Ekart, Amazon) or by India Post.
        </li>
        <li>Order will be picked up by the courier partner within [1] to [2] days from the date of RTD.</li>
        <li>Naturalla Store shall not be liable for any delay in delivery by the courier company / postal authority.</li>
        <li>Delivery of all orders will be made to the address provided by the buyer at the time of purchase.</li>
        <li>Delivery of our services will be confirmed on your email ID & SMS as specified at the time of registration.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Delivery Time:</h2>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li><strong>Local:</strong> Within City Limits (Coimbatore) – 1 to 2 Working Days</li>
        <li><strong>Regional:</strong> Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, Telangana – 3 to 5 Working Days</li>
        <li><strong>Other State:</strong> 5 to 9 Working Days</li>
        <li>
          Customer will be liable to accept the order within 2 attempts. If he fails, order will be marked Return to Origin and will be sent to our store.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Order Cancellation post shipping:</h2>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>Once orders have been shipped, they cannot be cancelled.</li>
        <li>
          If you don't wish to accept the parcel, you can simply refuse to accept the parcel at the time of delivery.
        </li>
        <li>
          Once the return parcel comes back to the store, we will deduct shipping and return charges from the customer order value before processing the refund.
        </li>
      </ul>

      <p className="mt-6">
        For any issues or assistance or any complaints you may contact our WhatsApp helpdesk on <strong>+91 9655233533</strong> or mail us at <a href="mailto:cs@nllpl.in" className="text-blue-600 underline">cs@nllpl.in</a>
      </p>
    </main>
  );
}
