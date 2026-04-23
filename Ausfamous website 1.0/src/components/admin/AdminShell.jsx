/**
 * AdminShell — wraps all /admin/* pages
 * Handles: auth check, role gate, navigation, logout
 */
import { useState, useEffect, createContext, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { can, ROLE_LABELS, logAction } from '@/lib/adminAuth';
import { FileText, Users, Activity, LogOut, ChevronRight, Menu, X } from 'lucide-react';

const AdminContext = createContext(null);
export const useAdminAuth = () => useContext(AdminContext);

const NAV = [
  { label: 'Newsroom', href: '/admin/newsroom', icon: FileText, action: 'access_admin' },
  { label: 'Users', href: '/admin/users', icon: Users, action: 'manage_users' },
  { label: 'Audit Log', href: '/admin/logs', icon: Activity, action: 'view_logs' },
];

export default function AdminShell({ children, requiredAction = 'access_admin' }) {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    base44.auth.me()
      .then(u => { setUser(u); setChecked(true); })
      .catch(() => { setChecked(true); });
  }, []);

  const handleLogout = async () => {
    if (user) await logAction(base44, user, 'user_logout');
    base44.auth.logout('/');
  };

  // Loading
  if (!checked) return (
    <div style={{ minHeight: '100vh', background: '#0A0B0D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '32px', height: '32px', border: '2px solid rgba(197,160,89,0.15)', borderTop: '2px solid #C5A059', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  // Not authenticated
  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0B0D', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{ width: '1px', height: '40px', background: 'rgba(197,160,89,0.20)' }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 600, color: '#E8DFC8' }}>Aus<span style={{ color: '#C5A059', fontStyle: 'italic' }}>Famous</span></span>
          <div style={{ width: '1px', height: '40px', background: 'rgba(197,160,89,0.20)' }} />
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.40)' }}>Publishing Control Room</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(220,205,170,0.45)', marginTop: '8px' }}>Authentication required to continue.</p>
        <button
          onClick={() => base44.auth.redirectToLogin(location.pathname)}
          style={{ marginTop: '8px', padding: '12px 36px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', background: '#C5A059', color: '#0A0B0D', border: 'none', borderRadius: '2px', cursor: 'pointer', transition: 'background 220ms' }}
          onMouseEnter={e => e.currentTarget.style.background = '#D4B77A'}
          onMouseLeave={e => e.currentTarget.style.background = '#C5A059'}
        >
          Sign In
        </button>
      </div>
    );
  }

  // Not authorised for this page
  if (!can(user, requiredAction)) {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0B0D', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', color: 'rgba(197,160,89,0.55)' }}>Insufficient Permissions</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(197,160,89,0.35)' }}>Your role <strong style={{ color: 'rgba(197,160,89,0.60)' }}>{ROLE_LABELS[user.role] || user.role}</strong> does not have access to this area.</p>
        <Link to="/admin/newsroom" style={{ marginTop: '12px', padding: '10px 28px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', border: '1px solid rgba(197,160,89,0.28)', color: '#C5A059', borderRadius: '2px', textDecoration: 'none' }}>
          Return to Newsroom
        </Link>
      </div>
    );
  }

  const visibleNav = NAV.filter(n => can(user, n.action));

  return (
    <AdminContext.Provider value={{ user, can: (action) => can(user, action) }}>
      <div style={{ minHeight: '100vh', background: '#0A0B0D', display: 'flex' }}>
        {/* Sidebar */}
        <aside style={{ width: '220px', flexShrink: 0, borderRight: '1px solid rgba(197,160,89,0.10)', background: 'rgba(12,10,7,0.95)', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
          {/* Logo */}
          <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(197,160,89,0.08)' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 600, color: '#E8DFC8' }}>Aus<span style={{ color: '#C5A059', fontStyle: 'italic' }}>Famous</span></span>
            </Link>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.35)', marginTop: '4px' }}>Control Room</p>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, padding: '16px 10px' }}>
            {visibleNav.map(item => {
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '3px', marginBottom: '2px', textDecoration: 'none', background: active ? 'rgba(197,160,89,0.10)' : 'transparent', borderLeft: active ? '2px solid #C5A059' : '2px solid transparent', transition: 'all 180ms ease' }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(197,160,89,0.05)'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  <item.icon size={14} style={{ color: active ? '#C5A059' : 'rgba(197,160,89,0.40)', flexShrink: 0 }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: active ? 700 : 500, letterSpacing: '0.10em', color: active ? '#C5A059' : 'rgba(197,160,89,0.55)' }}>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info + logout */}
          <div style={{ padding: '16px 14px', borderTop: '1px solid rgba(197,160,89,0.08)' }}>
            <div style={{ marginBottom: '10px' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, color: 'rgba(220,205,170,0.70)', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.full_name || user.email}</p>
              <span style={{ display: 'inline-block', fontFamily: "'DM Sans', sans-serif", fontSize: '8px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8962E', border: '1px solid rgba(184,150,46,0.28)', padding: '2px 8px', borderRadius: '1px' }}>
                {ROLE_LABELS[user.role] || user.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: '7px', width: '100%', padding: '8px 10px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', background: 'transparent', border: '1px solid rgba(197,160,89,0.15)', color: 'rgba(197,160,89,0.40)', borderRadius: '2px', cursor: 'pointer', transition: 'all 180ms ease' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(197,160,89,0.35)'; e.currentTarget.style.color = '#C5A059'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(197,160,89,0.15)'; e.currentTarget.style.color = 'rgba(197,160,89,0.40)'; }}
            >
              <LogOut size={12} /> Sign Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0, overflow: 'auto' }}>
          {children}
        </main>
      </div>
    </AdminContext.Provider>
  );
}