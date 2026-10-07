import { getFromStorage, saveToStorage, STORAGE_KEYS, mockDelay } from './api';

export const customerService = {
  async getCustomers(params = {}) {
    await mockDelay(100);
    const { search = '', page = 1, limit = 10 } = params;
    let customers = getFromStorage(STORAGE_KEYS.CUSTOMERS, []);

    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      customers = customers.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q) ||
          (c.city && c.city.toLowerCase().includes(q))
      );
    }

    const total = customers.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginated = customers.slice(startIndex, startIndex + limit);

    return {
      customers: paginated,
      total,
      page,
      totalPages
    };
  },

  async getCustomerById(id) {
    await mockDelay(80);
    const customers = getFromStorage(STORAGE_KEYS.CUSTOMERS, []);
    const customer = customers.find((c) => String(c.id) === String(id));
    if (!customer) throw new Error('Customer not found');

    const orders = getFromStorage(STORAGE_KEYS.ORDERS, []);
    const customerOrders = orders.filter(
      (o) => o.customer?.email?.toLowerCase() === customer.email?.toLowerCase()
    );

    return {
      ...customer,
      orders: customerOrders
    };
  },

  async toggleCustomerStatus(id) {
    await mockDelay(150);
    const customers = getFromStorage(STORAGE_KEYS.CUSTOMERS, []);
    const customer = customers.find((c) => String(c.id) === String(id));
    if (!customer) throw new Error('Customer not found');

    customer.status = customer.status === 'Active' ? 'Disabled' : 'Active';
    saveToStorage(STORAGE_KEYS.CUSTOMERS, customers);
    return customer;
  }
};
