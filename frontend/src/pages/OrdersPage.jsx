import { useState } from "react";
import OrderList from "../components/OrderList";
import OrderForm from "../components/OrderForm";

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  return (
    <>
      <h1 className="text-2xl mb-4">Orders</h1>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-4">
        <input
          placeholder="Search name or phone..."
          className="p-2 rounded bg-black/30 w-full"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

<select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  className="px-3 py-2 rounded-lg text-sm 
             bg-slate-800 text-white 
             border border-blue-500/40 
             focus:outline-none focus:ring-2 focus:ring-blue-500
             hover:bg-slate-700 transition
             cursor-pointer"
>
  <option value="">All</option>
  <option value="RECEIVED">RECEIVED</option>
  <option value="PROCESSING">PROCESSING</option>
  <option value="READY">READY</option>
  <option value="DELIVERED">DELIVERED</option>
</select>
      </div>

      <OrderForm />

      <OrderList search={search} status={status} />
    </>
  );
}