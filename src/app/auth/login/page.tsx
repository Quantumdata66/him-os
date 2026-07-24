'use client';

import React, { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
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
    </div>
  );
}
