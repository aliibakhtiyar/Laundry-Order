import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import OrdersPage from "./pages/OrdersPage";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-900 text-white">
        <Toaster />
        <Sidebar />

        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}