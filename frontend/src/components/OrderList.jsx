import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EditModal from "./EditModal";
import Swal from "sweetalert2";

const API = "http://localhost:5000/api";

export default function OrderList({ search, status }) {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [selected, setSelected] = useState(null);

  // 🔄 Fetch Orders
  const fetchOrders = async () => {
    let url = `${API}/orders?`;
    if (search) url += `search=${search}&`;
    if (status) url += `status=${status}`;

    const res = await fetch(url);
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, [search, status]);

  // 🔁 Update Status
  const updateStatus = async (id, newStatus) => {
    await fetch(`${API}/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });

    toast.success("Status Updated");
    fetchOrders();
  };
const deleteOrder = async (id) => {
  const result = await Swal.fire({
    title: "Delete Order?",
    text: "This action cannot be undone!",
    icon: "warning",
    background: "#0f172a", // dark theme (slate-900)
    color: "#fff",
    showCancelButton: true,
    confirmButtonColor: "#ef4444", // red
    cancelButtonColor: "#64748b", // gray
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel"
  });

  if (result.isConfirmed) {
    await fetch(`${API}/orders/${id}`, {
      method: "DELETE"
    });

    Swal.fire({
      title: "Deleted!",
      text: "Order has been removed.",
      icon: "success",
      background: "#0f172a",
      color: "#fff",
      confirmButtonColor: "#22c55e"
    });

    fetchOrders();
  }
};

  // 🎨 Status Colors
  const statusColor = (s) => {
    if (s === "RECEIVED") return "bg-yellow-400/20 text-yellow-300";
    if (s === "PROCESSING") return "bg-blue-400/20 text-blue-300";
    if (s === "READY") return "bg-purple-400/20 text-purple-300";
    if (s === "DELIVERED") return "bg-green-400/20 text-green-300";
    return "bg-gray-400/20 text-gray-300";
  };

  return (
    <div className="space-y-4">

      {/* 🔹 Orders */}
      {orders.map((o) => (
        <div
          key={o._id}
          className="bg-white/10 backdrop-blur rounded-xl p-4 hover:shadow-lg transition"
        >
          {/* 🔸 Top Row */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg">{o.name}</h2>
              <p className="text-sm text-gray-400">{o.phone}</p>
            </div>

            <div className="flex items-center gap-3">

              {/* STATUS */}
<select
  value={o.status}
  onChange={(e) => updateStatus(o._id, e.target.value)}
  className="px-3 py-1.5 rounded-lg text-sm 
             bg-slate-800 text-white 
             border border-white/10 
             focus:outline-none focus:ring-2 focus:ring-blue-500
             appearance-none cursor-pointer"
>
  <option value="RECEIVED" className="bg-slate-800 text-white">
    RECEIVED
  </option>
  <option value="PROCESSING" className="bg-slate-800 text-white">
    PROCESSING
  </option>
  <option value="READY" className="bg-slate-800 text-white">
    READY
  </option>
  <option value="DELIVERED" className="bg-slate-800 text-white">
    DELIVERED
  </option>
</select>

              {/* TOTAL */}
              <h3 className="font-bold text-green-400">
                ₹{o.total}
              </h3>

              {/* ACTIONS */}
<div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-white/10">

  <button
    onClick={() =>
      setExpanded(expanded === o._id ? null : o._id)
    }
    className="text-xs px-2 py-1 rounded-md text-blue-400 hover:bg-blue-500/20 transition"
  >
    {expanded === o._id ? "Hide" : "View"}
  </button>

  <button
    onClick={() => setSelected(o)}
    className="text-xs px-2 py-1 rounded-md text-green-400 hover:bg-green-500/20 transition"
  >
    Edit
  </button>

  <button
    onClick={() => deleteOrder(o._id)}
    className="text-xs px-2 py-1 rounded-md text-red-400 hover:bg-red-500/20 transition"
  >
    Delete
  </button>

</div>
            </div>
          </div>

          {/* 🔸 Expanded Details */}
          {expanded === o._id && (
            <div className="mt-4 border-t border-white/10 pt-3 space-y-2">
              {o.items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm text-gray-300"
                >
                  <span>{item.type}</span>
                  <span>x{item.qty}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* ❌ Empty State */}
      {orders.length === 0 && (
        <div className="text-center text-gray-400 mt-10">
          No Orders Found 😔
        </div>
      )}

      {/* 🔥 Edit Modal */}
      {selected && (
        <EditModal
          order={selected}
          close={() => setSelected(null)}
          refresh={fetchOrders}
        />
      )}
    </div>
  );
}