'use client';

import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { ShieldCheck, UserCheck, Lock, Key } from 'lucide-react';
import { RbacService, UserRole, ROLE_MATRIX } from '@/core/auth/rbac';

export const RbacControlWidget: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>('owner');

  useEffect(() => {
    setActiveRole(RbacService.getActiveRole());
  }, []);

  const handleSwitchRole = (role: UserRole) => {
    RbacService.setActiveRole(role);
    setActiveRole(role);
  };

  const activeConfig = ROLE_MATRIX[activeRole];

  return (
    <Card goldBorder className="space-y-4">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-serif font-bold text-gray-100">Enterprise Role-Based Access Control (RBAC)</h3>
            <p className="text-[10px] text-gray-400 font-mono">v8.0 Security Matrix</p>
          </div>
        </div>
        <Badge variant="green" className="text-[10px]">
          {activeConfig.title}
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {(Object.keys(ROLE_MATRIX) as UserRole[]).map((r) => (
          <Button
            key={r}
            variant={activeRole === r ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleSwitchRole(r)}
            className="capitalize text-xs"
          >
            {r}
          </Button>
        ))}
      </div>

      <div className="pt-2 border-t border-gray-800 space-y-2">
        <span className="text-[10px] font-mono text-gray-500 uppercase">Enforced Permissions for Active Role:</span>
        <div className="flex flex-wrap gap-1.5">
          {activeConfig.permissions.map((perm) => (
            <span key={perm} className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-300">
              ✓ {perm}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};
