import { getFromStorage, STORAGE_KEYS, mockDelay } from './api';

export const reportService = {
  async getDashboardSummary() {
    await mockDelay(100);
    const products = getFromStorage(STORAGE_KEYS.PRODUCTS, []);
    const orders = getFromStorage(STORAGE_KEYS.ORDERS, []);
    const customers = getFromStorage(STORAGE_KEYS.CUSTOMERS, []);

    const totalProducts = products.length;
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) =>
      ['Order Placed', 'Confirmed', 'Processing', 'Packed', 'Shipped'].includes(o.orderStatus)
    ).length;
    const completedOrders = orders.filter((o) => o.orderStatus === 'Delivered').length;
    const cancelledOrders = orders.filter((o) => o.orderStatus === 'Cancelled').length;
    const totalCustomers = customers.length;

    const totalSales = orders
      .filter((o) => o.orderStatus !== 'Cancelled')
      .reduce((sum, o) => sum + (o.total || 0), 0);

    const todaySales = orders
      .filter((o) => {
        const d = new Date(o.placedAt);
        const now = new Date();
        return (
          d.getDate() === now.getDate() &&
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear() &&
          o.orderStatus !== 'Cancelled'
        );
      })
      .reduce((sum, o) => sum + (o.total || 0), 0);

    // Recent 5 orders
    const recentOrders = [...orders].slice(0, 5);

    // Best-selling products
    const bestSellers = [...products]
      .sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0))
      .slice(0, 4);

    return {
      totalProducts,
      totalOrders,
      pendingOrders,
      completedOrders,
      cancelledOrders,
      totalCustomers,
      totalSales,
      todaySales: todaySales || 21399,
      recentOrders,
      bestSellers
    };
  },

  async getAnalytics(period = 'This Month') {
    await mockDelay(120);

    const orders = getFromStorage(STORAGE_KEYS.ORDERS, []);
    const products = getFromStorage(STORAGE_KEYS.PRODUCTS, []);

    // Sales charts based on period
    let salesChart = [];
    if (period === 'Today') {
      salesChart = [
        { label: '08:00', sales: 4500, orders: 1 },
        { label: '11:00', sales: 18500, orders: 1 },
        { label: '14:00', sales: 8900, orders: 2 },
        { label: '17:00', sales: 24500, orders: 1 },
        { label: '20:00', sales: 14200, orders: 1 }
      ];
    } else if (period === 'This Week') {
      salesChart = [
        { label: 'Mon', sales: 32000, orders: 3 },
        { label: 'Tue', sales: 45500, orders: 4 },
        { label: 'Wed', sales: 28900, orders: 2 },
        { label: 'Thu', sales: 61000, orders: 5 },
        { label: 'Fri', sales: 54000, orders: 4 },
        { label: 'Sat', sales: 89000, orders: 8 },
        { label: 'Sun', sales: 76000, orders: 6 }
      ];
    } else if (period === 'This Year') {
      salesChart = [
        { label: 'Jan', sales: 240000, orders: 26 },
        { label: 'Feb', sales: 310000, orders: 32 },
        { label: 'Mar', sales: 420000, orders: 45 },
        { label: 'Apr', sales: 380000, orders: 38 },
        { label: 'May', sales: 490000, orders: 52 },
        { label: 'Jun', sales: 530000, orders: 58 }
      ];
    } else {
      // Default: This Month (Weekly distribution)
      salesChart = [
        { label: 'Week 1', sales: 94000, orders: 9 },
        { label: 'Week 2', sales: 128000, orders: 12 },
        { label: 'Week 3', sales: 154000, orders: 15 },
        { label: 'Week 4', sales: 182000, orders: 18 }
      ];
    }

    const orderStatusBreakdown = [
      { name: 'Delivered', count: orders.filter((o) => o.orderStatus === 'Delivered').length || 1, color: '#2E7D32' },
      { name: 'Shipped', count: orders.filter((o) => o.orderStatus === 'Shipped').length || 1, color: '#0288D1' },
      { name: 'Processing', count: orders.filter((o) => o.orderStatus === 'Processing').length || 1, color: '#ED6C02' },
      { name: 'Placed', count: orders.filter((o) => o.orderStatus === 'Order Placed').length || 0, color: '#C26D74' },
      { name: 'Cancelled', count: orders.filter((o) => o.orderStatus === 'Cancelled').length || 0, color: '#D32F2F' }
    ];

    const categorySales = [
      { category: 'Sarees', share: 42, revenue: 168000 },
      { category: 'Jewellery', share: 24, revenue: 96000 },
      { category: 'Western Wear', share: 16, revenue: 64000 },
      { category: 'Chudidars', share: 12, revenue: 48000 },
      { category: 'Accessories', share: 6, revenue: 24000 }
    ];

    return {
      period,
      salesChart,
      orderStatusBreakdown,
      categorySales,
      topProducts: products.slice(0, 5)
    };
  }
};
