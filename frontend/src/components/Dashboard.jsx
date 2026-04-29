import { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`${API}/dashboard`)
      .then(res => res.json())
      .then(setData);
  }, []);

  const status = data.statusCount || {};

  return (
    <div className="space-y-6">

      {/* 🔹 Top Cards */}
<div className="grid md:grid-cols-3 gap-5">

  {/* Total Orders */}
  <div className="bg-slate-800 p-5 rounded-2xl border border-white/10 shadow-lg hover:shadow-xl transition">
    <p className="text-sm text-gray-400">Total Orders</p>
    <h2 className="text-3xl font-bold text-white mt-1">
      {data.totalOrders || 0}
    </h2>
  </div>

  {/* Revenue */}
  <div className="bg-slate-800 p-5 rounded-2xl border border-white/10 shadow-lg hover:shadow-xl transition">
    <p className="text-sm text-gray-400">Revenue</p>
    <h2 className="text-3xl font-bold text-green-400 mt-1">
      ₹{data.totalRevenue || 0}
    </h2>
  </div>

  {/* Delivered */}
  <div className="bg-slate-800 p-5 rounded-2xl border border-white/10 shadow-lg hover:shadow-xl transition">
    <p className="text-sm text-gray-400">Delivered</p>
    <h2 className="text-3xl font-bold text-blue-400 mt-1">
      {data.statusCount?.DELIVERED || 0}
    </h2>
  </div>

</div>

      {/* 🔹 Status Section */}
      <div className="bg-white/10 backdrop-blur p-5 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Order Status Overview</h2>

        <div className="space-y-4">

          {/* RECEIVED */}
          <StatusBar label="Received" value={status.RECEIVED} color="bg-yellow-400" />

          {/* PROCESSING */}
          <StatusBar label="Processing" value={status.PROCESSING} color="bg-blue-400" />

          {/* READY */}
          <StatusBar label="Ready" value={status.READY} color="bg-purple-400" />

          {/* DELIVERED */}
          <StatusBar label="Delivered" value={status.DELIVERED} color="bg-green-400" />

        </div>
      </div>
    </div>
  );
}

function StatusBar({ label, value = 0, color }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className="w-full bg-gray-700 rounded h-2">
        <div
          className={`${color} h-2 rounded`}
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
}