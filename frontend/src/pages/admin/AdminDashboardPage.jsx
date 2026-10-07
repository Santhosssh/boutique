import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Eye,
  Calendar,
  Layers
} from 'lucide-react';
import { reportService } from '../../services/reportService';
import { orderService } from '../../services/orderService';

export const AdminDashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [period, setPeriod] = useState('This Month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const [sum, rep] = await Promise.all([
          reportService.getDashboardSummary(),
          reportService.getAnalytics(period)
        ]);
        setSummary(sum);
        setAnalytics(rep);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [period]);

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  if (loading || !summary) {
    return (
      <div>
        <div className="grid-4" style={{ marginBottom: '2rem' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="skeleton" style={{ height: '110px', borderRadius: 'var(--radius-md)' }} />
          ))}
        </div>
      </div>
    );
  }

  // Calculate highest sales bar for chart scaling
  const maxSales = Math.max(...(analytics?.salesChart?.map((s) => s.sales) || [100000]));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner / Welcome */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          padding: '1.6rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.2rem',
          boxShadow: 'var(--shadow-xs)'
        }}
      >
        <div>
          <span className="section-subtitle" style={{ marginBottom: '4px' }}>Atelier Command Center</span>
          <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Executive Store Dashboard</h2>
          <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Real-time performance metrics for Sri Lakshmi Boutique.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link to="/admin/products/add" className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
            <Plus size={16} /> Add Product
          </Link>
          <Link to="/admin/orders" className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
            <ShoppingBag size={16} /> Manage Orders
          </Link>
        </div>
      </div>

      {/* 12. Dashboard 8 KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.2rem'
        }}
      >
        {/* Total Sales */}
        <div className="card" style={{ padding: '1.3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Total Sales
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--accent-rose-light)', color: 'var(--accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {formatPrice(summary.totalSales)}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-success)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={13} /> +18.4% from last period
          </div>
        </div>

        {/* Today's Sales */}
        <div className="card" style={{ padding: '1.3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Today's Sales
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--accent-gold-light)', color: 'var(--accent-gold-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {formatPrice(summary.todaySales)}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Updated in real-time
          </div>
        </div>

        {/* Total Orders */}
        <div className="card" style={{ padding: '1.3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Total Orders
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--color-info-bg)', color: 'var(--color-info)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700 }}>{summary.totalOrders}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Across all channels
          </div>
        </div>

        {/* Pending Orders */}
        <div className="card" style={{ padding: '1.3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Pending Orders
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--color-warning-bg)', color: 'var(--color-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-warning)' }}>
            {summary.pendingOrders}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Awaiting packing / transit
          </div>
        </div>

        {/* Completed Orders */}
        <div className="card" style={{ padding: '1.3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Completed Orders
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-success)' }}>
            {summary.completedOrders}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Successfully delivered
          </div>
        </div>

        {/* Cancelled Orders */}
        <div className="card" style={{ padding: '1.3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Cancelled Orders
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--color-danger-bg)', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <XCircle size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-danger)' }}>
            {summary.cancelledOrders}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Low return rate (&lt;3%)
          </div>
        </div>

        {/* Total Products */}
        <div className="card" style={{ padding: '1.3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Total Products
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700 }}>{summary.totalProducts}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Active boutique inventory
          </div>
        </div>

        {/* Total Customers */}
        <div className="card" style={{ padding: '1.3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Total Customers
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--accent-rose-light)', color: 'var(--accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700 }}>{summary.totalCustomers}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-success)', marginTop: '4px' }}>
            +8 joined this week
          </div>
        </div>
      </div>

      {/* Analytics Charts & Status Distribution Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {/* Sales Overview Chart */}
        <div className="card" style={{ padding: '1.8rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Sales Revenue Overview</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Revenue velocity over selected period</span>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              {['Today', 'This Week', 'This Month', 'This Year'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`btn btn-sm ${period === p ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.78rem', padding: '0.35rem 0.8rem' }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Chart Representation */}
          <div style={{ height: '230px', display: 'flex', alignItems: 'flex-end', gap: '18px', paddingTop: '1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
            {analytics?.salesChart?.map((bar, idx) => {
              const heightPercent = Math.max(12, Math.round((bar.sales / maxSales) * 100));
              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'flex-end'
                  }}
                >
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                    ₹{(bar.sales / 1000).toFixed(0)}k
                  </span>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '48px',
                      height: `${heightPercent}%`,
                      backgroundColor: 'var(--accent-rose)',
                      borderRadius: '6px 6px 0 0',
                      transition: 'height 0.4s ease',
                      boxShadow: '0 2px 8px rgba(194,109,116,0.25)'
                    }}
                    title={`${bar.label}: ₹${bar.sales.toLocaleString()} (${bar.orders} orders)`}
                  />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '8px', fontWeight: 500 }}>
                    {bar.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Status Breakdown Chart */}
        <div className="card" style={{ padding: '1.8rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Order Fulfillment Status</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Distribution of orders in pipeline</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {analytics?.orderStatusBreakdown?.map((item, idx) => {
              const totalOrdersCount = summary.totalOrders || 1;
              const percent = Math.round((item.count / totalOrdersCount) * 100) || 10;
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }} />
                      {item.name}
                    </span>
                    <span>
                      {item.count} orders ({percent}%)
                    </span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${percent}%`, backgroundColor: item.color, borderRadius: '10px' }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Avg. Dispatch Time:</span>
            <strong>24 - 48 Hours</strong>
          </div>
        </div>
      </div>

      {/* Recent Orders & Best Sellers Split */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {/* Recent Orders Table */}
        <div className="card" style={{ padding: '1.6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Recent Store Orders</h3>
            <Link to="/admin/orders" style={{ fontSize: '0.82rem', color: 'var(--accent-rose)', fontWeight: 600 }}>
              View All Orders →
            </Link>
          </div>

          <div className="table-responsive">
            <table className="table" style={{ fontSize: '0.86rem' }}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {summary.recentOrders?.map((ord) => (
                  <tr key={ord.id}>
                    <td>
                      <Link to={`/admin/orders/${ord.id}`} style={{ fontWeight: 600, color: 'var(--accent-rose)' }}>
                        {ord.id}
                      </Link>
                    </td>
                    <td>{ord.customer?.name}</td>
                    <td style={{ fontWeight: 700 }}>{formatPrice(ord.total)}</td>
                    <td>
                      <span className="badge badge-rose" style={{ fontSize: '0.7rem' }}>
                        {ord.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="card" style={{ padding: '1.6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Best-Selling Creations</h3>
            <Link to="/admin/products" style={{ fontSize: '0.82rem', color: 'var(--accent-rose)', fontWeight: 600 }}>
              Inventory →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {summary.bestSellers?.map((p) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={(p.images && p.images[0]) || ''}
                  alt={p.name}
                  style={{ width: '46px', height: '58px', borderRadius: '4px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', lineHeight: 1.3 }}>{p.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {p.category} • In Stock: <strong>{p.stock}</strong>
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                  {formatPrice(p.price)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
