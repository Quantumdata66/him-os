'use client';

import React, { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { useRouter } from 'next/navigation';
import { Download, FileText, Upload, HardDrive, Shield } from 'lucide-react';
import { BackupEngine } from '@/core/backup/backupEngine';
import { RbacControlWidget } from '@/shared/ui/RbacControlWidget';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [restoreMessage, setRestoreMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 800);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = BackupEngine.restoreStateFromJson(content);
      if (success) {
        setRestoreMessage('System state restored successfully from JSON backup!');
        setTimeout(() => setRestoreMessage(null), 4000);
      } else {
        setRestoreMessage('Failed to restore. Invalid backup file format.');
        setTimeout(() => setRestoreMessage(null), 4000);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 space-y-6 font-sans">
      <Card variant="gold" className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-accent-gold/20 border border-accent-gold/50 flex items-center justify-center text-accent-gold font-bold text-2xl mx-auto">
            H
          </div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Project HIM OS Auth</h1>
          <p className="text-xs text-text-muted font-mono">Single-User Operating System • Live Cloud Auth</p>
          <Badge variant="gold" className="text-[10px]">Supabase RLS Protected</Badge>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-text-secondary">Engineer Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="engineer@projecthim.os"
              className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-3 py-2.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-emerald focus:ring-2 focus:ring-accent-mint"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-text-secondary">Security Key / Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-3 py-2.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-emerald focus:ring-2 focus:ring-accent-mint"
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full py-2.5" disabled={loading}>
            {loading ? 'Authenticating Engine...' : 'Sign In to HIM OS →'}
          </Button>
        </form>

        <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-border-subtle">
          <Button variant="outline" size="sm" onClick={() => router.push('/auth/audit')}>
            <Shield className="w-3.5 h-3.5 mr-1 text-accent-gold" />
            <span>Security Audit Log</span>
          </Button>
          <a href="/auth/register" className="text-accent-gold hover:underline font-semibold font-mono">
            Create Profile
          </a>
        </div>
      </Card>

      {/* Enterprise RBAC Role Switcher */}
      <div className="w-full max-w-md">
        <RbacControlWidget />
      </div>

      {/* System Data Export & Restore Panel */}
      <Card className="w-full max-w-md space-y-4">
        <div className="flex items-center space-x-2 border-b border-border-subtle pb-3">
          <HardDrive className="w-4 h-4 text-accent-gold" />
          <h3 className="text-sm font-serif font-semibold text-text-primary">Data Backup & Portability (v5.0)</h3>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={() => BackupEngine.exportJsonBackup()}>
            <Download className="w-3.5 h-3.5 mr-1" />
            <span>Export JSON</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => BackupEngine.exportMarkdownReport()}>
            <FileText className="w-3.5 h-3.5 mr-1" />
            <span>Export Report</span>
          </Button>
        </div>

        <div className="pt-2">
          <label className="w-full p-2 bg-bg-elevated border border-dashed border-border-subtle hover:border-accent-emerald rounded-xl cursor-pointer flex items-center justify-center space-x-2 text-xs text-text-muted transition-colors">
            <Upload className="w-3.5 h-3.5" />
            <span>Restore State from JSON</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {restoreMessage && (
          <p className="text-[11px] font-mono text-accent-mint text-center animate-in fade-in">
            {restoreMessage}
          </p>
        )}
      </Card>
    </div>
  );
}
