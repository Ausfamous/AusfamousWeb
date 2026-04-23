/**
 * Admin auth utilities — RBAC permission helpers
 * Roles: admin (Super Admin), publisher, editor, viewer
 */

export const ROLES = {
  ADMIN: 'admin',
  PUBLISHER: 'publisher',
  EDITOR: 'editor',
  VIEWER: 'viewer',
};

export const ROLE_LABELS = {
  admin: 'Super Admin',
  publisher: 'Publisher',
  editor: 'Editor',
  viewer: 'Viewer',
};

export const ROLE_DESCRIPTIONS = {
  admin: 'Full system control — articles, users, settings',
  publisher: 'Review, publish, unpublish and schedule articles',
  editor: 'Create and edit articles, submit for review',
  viewer: 'Read-only access to admin dashboard',
};

// Permission checks
export const can = (user, action) => {
  if (!user) return false;
  const role = user.role;

  // SECURITY: Only admin (Super Admin) has any access to the publishing panel.
  // All other roles are blocked. This enforces single-owner control.
  const permissions = {
    create_article:    ['admin'],
    edit_any_article:  ['admin'],
    edit_own_article:  ['admin'],
    publish_article:   ['admin'],
    unpublish_article: ['admin'],
    delete_article:    ['admin'],
    submit_article:    ['admin'],
    view_drafts:       ['admin'],
    manage_users:      ['admin'],
    view_users:        ['admin'],
    view_logs:         ['admin'],
    access_admin:      ['admin'],
  };

  return permissions[action]?.includes(role) ?? false;
};

export const isAdminRole = (role) => role === 'admin';

// Audit log helper
export const logAction = async (base44, user, action, targetId = '', targetLabel = '', meta = '') => {
  if (!user) return;
  try {
    await base44.entities.AuditLog.create({
      user_email: user.email,
      user_name: user.full_name || user.email,
      action,
      target_id: String(targetId),
      target_label: String(targetLabel),
      meta: meta ? JSON.stringify(meta) : '',
    });
  } catch {
    // Non-blocking — audit log failure should not break operations
  }
};