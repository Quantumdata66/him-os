import { StorageAdapter } from '../storage/localStorageAdapter';

export type UserRole = 'owner' | 'admin' | 'engineer' | 'auditor';

export type Permission =
  | 'manage:system'
  | 'manage:finance'
  | 'write:code'
  | 'view:telemetry'
  | 'export:data';

export interface RolePermissions {
  role: UserRole;
  title: string;
  permissions: Permission[];
}

const ROLE_KEY = 'him_os_user_role';

export const ROLE_MATRIX: Record<UserRole, RolePermissions> = {
  owner: {
    role: 'owner',
    title: 'Executive Owner (Full Root Access)',
    permissions: ['manage:system', 'manage:finance', 'write:code', 'view:telemetry', 'export:data'],
  },
  admin: {
    role: 'admin',
    title: 'Enterprise Administrator',
    permissions: ['manage:system', 'manage:finance', 'view:telemetry', 'export:data'],
  },
  engineer: {
    role: 'engineer',
    title: 'Lead Software Engineer',
    permissions: ['write:code', 'view:telemetry'],
  },
  auditor: {
    role: 'auditor',
    title: 'Financial & Compliance Auditor',
    permissions: ['view:telemetry', 'export:data'],
  },
};

export class RbacService {
  static getActiveRole(): UserRole {
    return StorageAdapter.getItem<UserRole>(ROLE_KEY, 'owner');
  }

  static setActiveRole(role: UserRole) {
    StorageAdapter.setItem(ROLE_KEY, role);
  }

  static hasPermission(permission: Permission): boolean {
    const activeRole = this.getActiveRole();
    const roleConfig = ROLE_MATRIX[activeRole];
    return roleConfig ? roleConfig.permissions.includes(permission) : false;
  }

  static getActiveRolePermissions(): RolePermissions {
    const role = this.getActiveRole();
    return ROLE_MATRIX[role];
  }
}
