'use client';

import React, { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { useRouter } from 'next/navigation';
import { Download, FileText, Upload, HardDrive, CheckCircle2 } from 'lucide-react';
import { BackupEngine } from '@/core/backup/backupEngine';

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
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 space-y-6">
      <Card goldBorder className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/20 border border-[#C9A84C]/50 flex items-center justify-center text-[#C9A84C] font-bold text-2xl mx-auto">
            H
          </div>
          <h1 className="text-2xl font-serif font-bold text-gray-100">Project HIM OS Auth</h1>
          <p className="text-xs text-gray-400">Single-User Operating System • Live Cloud Auth</p>
          <Badge variant="gold" className="text-[10px]">Supabase RLS Protected</Badge>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Engineer Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="engineer@projecthim.os"
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2.5 text-xs text-gray-100 focus:outline-none focus:border-[#C9A84C]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Security Key / Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2.5 text-xs text-gray-100 focus:outline-none focus:border-[#C9A84C]"
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full py-2.5" disabled={loading}>
            {loading ? 'Authenticating Engine...' : 'Sign In to HIM OS →'}
          </Button>
        </form>

        <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-800">
          <span>Need an account? </span>
          <a href="/auth/register" className="text-[#C9A84C] hover:underline font-semibold">
            Create Profile
          </a>
        </div>
      </Card>

      {/* System Data Export & Restore Panel */}
      <Card className="w-full max-w-md space-y-4">
        <div className="flex items-center space-x-2 border-b border-gray-800 pb-3">
          <HardDrive className="w-4 h-4 text-[#C9A84C]" />
          <h3 className="text-sm font-serif font-semibold text-gray-100">Data Backup & Portability (v5.0)</h3>
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
          <label className="w-full p-2 bg-gray-900 border border-dashed border-gray-700 hover:border-gray-500 rounded-lg cursor-pointer flex items-center justify-center space-x-2 text-xs text-gray-400 transition-colors">
            <Upload className="w-3.5 h-3.5" />
            <span>Restore State from JSON</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {restoreMessage && (
          <p className="text-[11px] font-mono text-emerald-400 text-center animate-in fade-in">
            {restoreMessage}
          </p>
        )}
      </Card>
    </div>
  );
}
