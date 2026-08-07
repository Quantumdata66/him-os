'use client';

import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';

export const RbacControlWidget: React.FC = () => {
  const [role, setRole] = useState<'owner' | 'executive' | 'guest'>('owner');

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-accent-mint" />
          <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wider font-mono">RBAC Security Engine</h3>
        </div>
        <Badge variant="emerald">{role.toUpperCase()}</Badge>
      </div>

      <p className="text-xs text-text-secondary">
        Enforces Role-Based Access Control and zero-trust data sovereignty across all 7 Canonical Hubs.
      </p>

      <div className="flex items-center space-x-2 pt-1">
        <button
          onClick={() => setRole('owner')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono font-medium transition-all ${
            role === 'owner'
              ? 'bg-accent-emerald/20 text-accent-mint border border-accent-emerald'
              : 'bg-bg-subtle text-text-muted hover:text-text-primary'
          }`}
        >
          Owner (Full)
        </button>
        <button
          onClick={() => setRole('executive')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono font-medium transition-all ${
            role === 'executive'
              ? 'bg-intel-sapphire/20 text-intel-slate border border-intel-sapphire'
              : 'bg-bg-subtle text-text-muted hover:text-text-primary'
          }`}
        >
          Executive
        </button>
      </div>
    </Card>
  );
};
