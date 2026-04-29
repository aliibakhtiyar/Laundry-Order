import { useState } from "react";
import toast from "react-hot-toast";

const API = "http://localhost:5000/api";

const PRICES = {
  Shirt: 50,
  Pants: 80,
  Saree: 120
};

export default function EditModal({ order, close, refresh }) {
  const [items, setItems] = useState(order.items);
  const [status, setStatus] = useState(order.status);

  // Update item qty
const updateQty = (index, value) => {
  setItems((prev) =>
    prev.map((item, i) =>
      i === index
        ? { ...item, qty: Math.max(1, value) }
        : item
    )
  );
};

  // Total calculation
  const total = items.reduce(
    (sum, item) => sum + PRICES[item.type] * item.qty,
    0
  );

  const updateOrder = async () => {
    await fetch(`${API}/orders/${order._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, items, total })
    });

    toast.success("Order Updated ✅");
    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      
      {/* MODAL */}
      <div className="bg-slate-900 w-full max-w-lg rounded-2xl p-6 shadow-xl border border-white/10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Order</h2>
          <button
            onClick={close}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* STATUS */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Status</label>
         <select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
 className="w-full mt-1 px-3 py-2 rounded-lg text-sm 
             bg-slate-800 text-white 
             border border-white/10 
             focus:outline-none focus:ring-2 focus:ring-blue-500
             hover:bg-slate-700 transition cursor-pointer"
>
            <option>RECEIVED</option>
            <option>PROCESSING</option>
            <option>READY</option>
            <option>DELIVERED</option>
          </select>
        </div>

        {/* ITEMS */}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white/5 p-3 rounded-lg"
            >
              <span>{item.type}</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(index, item.qty - 1)}
                  className="px-2 bg-gray-700 rounded"
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() => updateQty(index, item.qty + 1)}
                  className="px-2 bg-gray-700 rounded"
                >
                  +
                </button>
              </div>

              <span className="text-sm text-gray-400">
                ₹{PRICES[item.type] * item.qty}
              </span>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-5">
          <h3 className="font-semibold text-green-400">
            Total: ₹{total}
          </h3>

          <div className="flex gap-2">
            <button
              onClick={close}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              onClick={updateOrder}
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}