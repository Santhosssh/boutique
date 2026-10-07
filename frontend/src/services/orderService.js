import { getFromStorage, saveToStorage, STORAGE_KEYS, mockDelay } from './api';

export const ORDER_STATUSES = [
  'Order Placed',
  'Confirmed',
  'Processing',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
  'Cancelled'
];

export const orderService = {
  async getOrders(params = {}) {
    await mockDelay(120);
    const { status = 'all', search = '', page = 1, limit = 10 } = params;

    let orders = getFromStorage(STORAGE_KEYS.ORDERS, []);

    if (status && status !== 'all') {
      orders = orders.filter((o) => o.orderStatus.toLowerCase() === status.toLowerCase());
    }

    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      orders = orders.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          (o.customer?.name && o.customer.name.toLowerCase().includes(q)) ||
          (o.customer?.email && o.customer.email.toLowerCase().includes(q)) ||
          (o.customer?.phone && o.customer.phone.toLowerCase().includes(q))
      );
    }

    const total = orders.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginated = orders.slice(startIndex, startIndex + limit);

    return {
      orders: paginated,
      total,
      page,
      totalPages
    };
  },

  async getOrderById(id) {
    await mockDelay(90);
    const orders = getFromStorage(STORAGE_KEYS.ORDERS, []);
    const order = orders.find((o) => String(o.id) === String(id));
    if (!order) throw new Error('Order not found');
    return order;
  },

  async getUserOrders(userEmail) {
    await mockDelay(100);
    const orders = getFromStorage(STORAGE_KEYS.ORDERS, []);
    if (!userEmail) return orders;
    return orders.filter(
      (o) => o.customer?.email?.toLowerCase() === userEmail.toLowerCase()
    );
  },

  async createOrder(orderPayload) {
    await mockDelay(250);
    const orders = getFromStorage(STORAGE_KEYS.ORDERS, []);
    const mockOrderNum = `SLB-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingNum = `TRK-SLB-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newOrder = {
      id: mockOrderNum,
      placedAt: now.toISOString(),
      trackingNumber: trackingNum,
      orderStatus: 'Order Placed',
      paymentStatus: orderPayload.paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      timeline: [
        { status: 'Order Placed', time: formattedDate, done: true, note: 'Order placed by customer' },
        { status: 'Confirmed', time: 'In review', done: false, note: 'Awaiting confirmation' },
        { status: 'Processing', time: 'Pending', done: false, note: 'Quality check and preparation' },
        { status: 'Packed', time: 'Pending', done: false, note: 'Luxury box packaging' },
        { status: 'Shipped', time: 'Pending', done: false, note: 'Carrier dispatch' },
        { status: 'Out for Delivery', time: 'Pending', done: false, note: 'Local courier out for delivery' },
        { status: 'Delivered', time: 'Pending', done: false, note: 'Doorstep handoff' }
      ],
      ...orderPayload
    };

    orders.unshift(newOrder);
    saveToStorage(STORAGE_KEYS.ORDERS, orders);

    // Update customer totalSpent and orderCount
    const customers = getFromStorage(STORAGE_KEYS.CUSTOMERS, []);
    const custIndex = customers.findIndex(
      (c) => c.email?.toLowerCase() === orderPayload.customer?.email?.toLowerCase()
    );
    if (custIndex !== -1) {
      customers[custIndex].ordersCount = (customers[custIndex].ordersCount || 0) + 1;
      customers[custIndex].totalSpent = (customers[custIndex].totalSpent || 0) + (newOrder.total || 0);
      saveToStorage(STORAGE_KEYS.CUSTOMERS, customers);
    }

    return newOrder;
  },

  async updateOrderStatus(orderId, newStatus, note = '') {
    await mockDelay(180);
    const orders = getFromStorage(STORAGE_KEYS.ORDERS, []);
    const order = orders.find((o) => String(o.id) === String(orderId));
    if (!order) throw new Error('Order not found');

    order.orderStatus = newStatus;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Update timeline steps
    let reached = false;
    order.timeline = order.timeline.map((step) => {
      if (step.status === newStatus) {
        reached = true;
        return { ...step, done: true, time: formattedDate, note: note || step.note };
      }
      if (!reached && step.status !== 'Cancelled') {
        return { ...step, done: true };
      }
      if (reached && step.status !== newStatus) {
        return { ...step, done: false, time: 'Pending' };
      }
      return step;
    });

    if (newStatus === 'Delivered') {
      order.paymentStatus = 'Paid';
    }

    saveToStorage(STORAGE_KEYS.ORDERS, orders);
    return order;
  },

  async cancelOrder(orderId, reason = 'Customer request') {
    await mockDelay(180);
    const orders = getFromStorage(STORAGE_KEYS.ORDERS, []);
    const order = orders.find((o) => String(o.id) === String(orderId));
    if (!order) throw new Error('Order not found');

    order.orderStatus = 'Cancelled';
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    order.timeline.push({
      status: 'Cancelled',
      time: formattedDate,
      done: true,
      note: `Cancelled: ${reason}`
    });

    saveToStorage(STORAGE_KEYS.ORDERS, orders);
    return order;
  }
};
