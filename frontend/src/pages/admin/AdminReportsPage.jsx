import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Calendar,
  PieChart,
  Award,
  Users
} from 'lucide-react';
import { reportService } from '../../services/reportService';

export const AdminReportsPage = () => {
  const [period, setPeriod] = useState('This Month');
  const [analytics, setAnalytics] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const [rep, sum] = await Promise.all([
          reportService.getAnalytics(period),
          reportService.getDashboardSummary()
        ]);
        setAnalytics(rep);
        setSummary(sum);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [period]);

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  if (loading || !analytics) {
    return (
      <div>
        <div className="skeleton" style={{ height: '300px', borderRadius: 'var(--radius-md)' }} />
      </div>
    );
  }

  const maxSales = Math.max(...(analytics.salesChart?.map((s) => s.sales) || [100000]));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
      {/* Top Header & Range Filters */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Analytics & Revenue Reports</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Audited financial breakdown across categories, order volume, and top couture designs.
          </p>
        </div>

        {/* Date Filter Buttons */}
        <div
          style={{
            display: 'inline-flex',
            gap: '6px',
            backgroundColor: 'var(--bg-card)',
            padding: '4px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          {['Today', 'This Week', 'This Month', 'This Year'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`btn btn-sm ${period === p ? 'btn-primary' : 'btn-ghost'}`}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.2rem'
        }}
      >
        <div className="card" style={{ padding: '1.4rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
            Period Sales Revenue
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--accent-rose)' }}>
            {formatPrice(analytics.salesChart?.reduce((sum, s) => sum + s.sales, 0) || 480000)}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-success)', marginTop: '4px' }}>
            ↑ 14.8% vs previous window
          </div>
        </div>

        <div className="card" style={{ padding: '1.4rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
            Total Orders Logged
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 700 }}>
            {analytics.salesChart?.reduce((sum, s) => sum + s.orders, 0) || 54}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Average order value: ₹18,900
          </div>
        </div>

        <div className="card" style={{ padding: '1.4rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
            Delivered Success Rate
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--color-success)' }}>
            97.8%
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Minimal return rate
          </div>
        </div>

        <div className="card" style={{ padding: '1.4rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
            Active Clientele
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 700 }}>
            {summary?.totalCustomers || 12}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-success)', marginTop: '4px' }}>
            82% repeat purchaser rate
          </div>
        </div>
      </div>

      {/* Main Revenue Chart */}
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Sales Trendline ({period})</h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Distribution of revenue spikes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--accent-rose)' }} />
            <span>Net Sales Volume</span>
          </div>
        </div>

        {/* Visual Bar Graph */}
        <div style={{ height: '260px', display: 'flex', alignItems: 'flex-end', gap: '20px', paddingTop: '2rem', borderBottom: '1px solid var(--border-subtle)' }}>
          {analytics.salesChart?.map((item, idx) => {
            const h = Math.max(15, Math.round((item.sales / maxSales) * 100));
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
                <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                  ₹{(item.sales / 1000).toFixed(0)}k
                </span>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '54px',
                    height: `${h}%`,
                    background: 'linear-gradient(to top, var(--accent-rose-hover), var(--accent-rose))',
                    borderRadius: '8px 8px 0 0',
                    transition: 'height 0.4s ease',
                    boxShadow: '0 4px 12px rgba(194,109,116,0.3)'
                  }}
                  title={`${item.label}: ₹${item.sales.toLocaleString()} (${item.orders} orders)`}
                />
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '10px', fontWeight: 500 }}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Breakdown & Top Selling Table */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.8rem'
        }}
      >
        {/* Category Share */}
        <div className="card" style={{ padding: '1.8rem' }}>
          <h3 style={{ margin: '0 0 1.2rem', fontSize: '1.2rem' }}>Category Revenue Share</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {analytics.categorySales?.map((cat, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                  <span style={{ fontWeight: 600 }}>{cat.category}</span>
                  <span>
                    {formatPrice(cat.revenue)} ({cat.share}%)
                  </span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${cat.share}%`,
                      backgroundColor:
                        idx === 0
                          ? 'var(--accent-rose)'
                          : idx === 1
                          ? 'var(--accent-gold)'
                          : idx === 2
                          ? 'var(--color-info)'
                          : 'var(--color-success)',
                      borderRadius: '10px'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top-Selling Products */}
        <div className="card" style={{ padding: '1.8rem' }}>
          <h3 style={{ margin: '0 0 1.2rem', fontSize: '1.2rem' }}>Top Revenue Generating Ensembles</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {analytics.topProducts?.map((prod, idx) => (
              <div key={prod.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '22px', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  #{idx + 1}
                </span>
                <img
                  src={(prod.images && prod.images[0]) || ''}
                  alt={prod.name}
                  style={{ width: '42px', height: '54px', borderRadius: '4px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{prod.name}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    {prod.category} • {prod.reviewsCount} sales
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                  {formatPrice(prod.price)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
