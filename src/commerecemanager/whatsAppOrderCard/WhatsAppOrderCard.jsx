import React from "react";

const WhatsAppOrderCard = () => {
  const order = {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Home_made_sour_dough_bread.jpg/640px-Home_made_sour_dough_bread.jpg",
    body: "Thanks for your order! Please review and pay to proceed.",
    footer: "Order will expire in 2 hours.",
    retailer_id: "1234567",
    item_name: "Sourdough Bread",
    original_price: 1500,
    sale_price: 1000,
    subtotal: 1000,
    tax: 100,
    shipping: 100,
    discount: 100,
    total: 1100
  };

  return (
    <div className="max-w-md mx-auto border rounded-lg shadow-lg overflow-hidden bg-white">
      {/* Header Image */}
      <img
        src={order.image}
        alt="Product"
        className="w-full h-48 object-cover"
      />

      {/* Body */}
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">🧾 Order Summary</h2>
        <p className="text-sm text-gray-600">{order.body}</p>

        {/* Product Detail */}
        <div className="border-t pt-3">
          <div className="flex justify-between">
            <span className="text-gray-700 font-medium">{order.item_name}</span>
            <span className="text-green-600 font-semibold">
              ₹{(order.sale_price / 100).toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            MRP ₹{(order.original_price / 100).toFixed(2)} • Retailer ID:{" "}
            {order.retailer_id}
          </p>
        </div>

        {/* Cost Breakdown */}
        <div className="border-t pt-3 space-y-1 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{(order.subtotal / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>₹{(order.tax / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{(order.shipping / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-red-600">
            <span>Discount</span>
            <span>-₹{(order.discount / 100).toFixed(2)}</span>
          </div>

          {/* Total */}
          <div className="flex justify-between font-semibold border-t pt-2">
            <span>Total Payable</span>
            <span>₹{(order.total / 100).toFixed(2)}</span>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 border-t pt-2">{order.footer}</p>

        {/* CTA Button */}
        <button className="w-full mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Review & Pay
        </button>
      </div>
    </div>
  );
};

export default WhatsAppOrderCard;










// import React from "react";

// export default function OrderDetailsCard() {
//   return (
//     <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden border">
//       {/* Header Image */}
//       <img
//         src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Home_made_sour_dough_bread.jpg/640px-Home_made_sour_dough_bread.jpg"
//         alt="Product"
//         className="w-full h-48 object-cover"
//       />

//       <div className="p-4 space-y-4 text-sm">
//         {/* Body Text */}
//         <p className="text-gray-700">
//           <strong>Message:</strong> your-text-body-content
//         </p>

//         {/* Order Summary */}
//         <div className="bg-gray-100 p-3 rounded space-y-2">
//           <div className="flex justify-between">
//             <span>Item:</span>
//             <span className="font-semibold">Bread</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Retailer ID:</span>
//             <span className="text-gray-600">1234567</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Quantity:</span>
//             <span>1</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Price:</span>
//             <span>₹15.00</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Sale Price:</span>
//             <span className="text-green-600 font-medium">₹10.00</span>
//           </div>
//         </div>

//         {/* Billing Breakdown */}
//         <div className="text-xs space-y-1">
//           <div className="flex justify-between">
//             <span>Subtotal:</span>
//             <span>₹10.00</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Tax:</span>
//             <span>₹1.00</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Shipping:</span>
//             <span>₹1.00</span>
//           </div>
//           <div className="flex justify-between text-red-600">
//             <span>Discount:</span>
//             <span>- ₹1.00</span>
//           </div>
//           <div className="flex justify-between font-bold text-gray-800 border-t pt-2">
//             <span>Total:</span>
//             <span>₹11.00</span>
//           </div>
//         </div>

//         {/* Payment Info */}
//         <div className="mt-2">
//           <p className="text-xs text-gray-500">
//             Payment Type: <strong>UPI</strong><br />
//             Reference ID: <strong>unique-reference-id</strong>
//           </p>
//         </div>

//         {/* Footer */}
//         <p className="text-gray-500 text-xs border-t pt-2">
//           your-text-footer-content
//         </p>

//         {/* Action Button */}
//         <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-sm font-medium">
//           Review & Pay
//         </button>
//       </div>
//     </div>
//   );
// }
