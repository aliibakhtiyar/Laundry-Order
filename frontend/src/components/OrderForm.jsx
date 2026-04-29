import { useState } from "react";
import toast from "react-hot-toast";

const API = "http://localhost:5000/api";

const ITEMS = ["Shirt", "Pants", "Saree"];

export default function OrderForm({ refresh }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState([
    { type: "Shirt", qty: 1 }
  ]);

  const prices = {
    Shirt: 50,
    Pants: 80,
    Saree: 120
  };

  // ➕ Add item
  const addItem = () => {
    setItems([...items, { type: "Shirt", qty: 1 }]);
  };

  // ❌ Remove item
  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  // 🔄 Update item
  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  // 💰 Total
  const total = items.reduce(
    (sum, item) => sum + prices[item.type] * item.qty,
    0
  );

  // 🚀 Submit
  const createOrder = async () => {
    if (!name || !phone) {
      return toast.error("Fill all fields");
    }

    await fetch(`${API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, phone, items })
    });

    toast.success("Order Created 🎉");

    setName("");
    setPhone("");
    setItems([{ type: "Shirt", qty: 1 }]);
    refresh && refresh();
  };

  return (
    <div className="bg-white/10 backdrop-blur p-6 rounded-2xl mb-6 shadow-lg">
      
      {/* TITLE */}
      <h2 className="text-lg font-semibold mb-4">Create Order</h2>

      {/* CUSTOMER INFO */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input
          className="p-3 rounded-lg bg-black/30 focus:outline-none"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="p-3 rounded-lg bg-black/30 focus:outline-none"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* ITEMS */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex gap-3 items-center bg-white/5 p-3 rounded-lg"
          >
            {/* TYPE */}
<select
  value={item.type}
  onChange={(e) =>
    updateItem(index, "type", e.target.value)
  }
  className="px-3 py-2 rounded-lg text-sm 
             bg-slate-800 text-white 
             border border-white/10 
             focus:outline-none focus:ring-2 focus:ring-blue-500
             hover:bg-slate-700 transition cursor-pointer"
>
  {ITEMS.map((it) => (
    <option key={it} value={it}>
      {it}
    </option>
  ))}
</select>

            {/* QTY */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateItem(index, "qty", Math.max(1, item.qty - 1))
                }
                className="px-2 bg-gray-700 rounded"
              >
                -
              </button>

              <span>{item.qty}</span>

              <button
                onClick={() =>
                  updateItem(index, "qty", item.qty + 1)
                }
                className="px-2 bg-gray-700 rounded"
              >
                +
              </button>
            </div>

            {/* PRICE */}
            <div className="text-sm opacity-70">
              ₹{prices[item.type] * item.qty}
            </div>

            {/* REMOVE */}
            {items.length > 1 && (
              <button
                onClick={() => removeItem(index)}
                className="text-red-400 ml-auto"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={addItem}
        className="mt-3 text-blue-400 text-sm"
      >
        + Add Item
      </button>

      {/* TOTAL + SUBMIT */}
      <div className="flex justify-between items-center mt-6">
        <h3 className="text-lg font-semibold">
          Total: ₹{total}
        </h3>

        <button
          onClick={createOrder}
          className="bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Create Order
        </button>
      </div>
    </div>
  );
}