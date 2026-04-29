import Order from "../models/Order.js";

const prices = {
  Shirt: 50,
  Pants: 80,
  Saree: 120
};

// Create Order
export const createOrder = async (req, res) => {
  const { name, phone, items } = req.body;

  let total = 0;

  const updatedItems = items.map(item => {
    const price = prices[item.type] || 0;
    total += price * item.qty;

    return { ...item, price };
  });

  const order = await Order.create({
    name,
    phone,
    items: updatedItems,
    total
  });

  res.json(order);
};

// Get Orders
export const getOrders = async (req, res) => {
  const { status, search } = req.query;

  let query = {};

  if (status) query.status = status;

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { phone: { $regex: search } }
    ];
  }

  const orders = await Order.find(query).sort({ createdAt: -1 });
  res.json(orders);
};

// Update Status
export const updateStatus = async (req, res) => {
  try {
    const { status, items, total } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
        items,
        total
      },
      { new: true }
    );

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message
    });
  }
};

// Dashboard
export const dashboard = async (req, res) => {
  const totalOrders = await Order.countDocuments();

  const revenueData = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$total" } } }
  ]);

  const totalRevenue = revenueData[0]?.total || 0;

  const statusData = await Order.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);

  const statusCount = {
    RECEIVED: 0,
    PROCESSING: 0,
    READY: 0,
    DELIVERED: 0
  };

  statusData.forEach(s => {
    statusCount[s._id] = s.count;
  });

  res.json({ totalOrders, totalRevenue, statusCount });
};

// DELETE Order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.json({
      success: true,
      message: "Order deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};