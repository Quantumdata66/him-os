'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { ShieldCheck, Lock, AlertTriangle, Key, RefreshCw, CheckCircle2 } from 'lucide-react';
import { SecurityAuditService, SecurityAuditReport } from '@/core/auth/securityAuditEngine';

export default function SecurityAuditPage() {
  const [report, setReport] = useState<SecurityAuditReport | null>(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    runAudit();
  }, []);

  const runAudit = () => {
    setScanning(true);
    setTimeout(() => {
      setReport(SecurityAuditService.getAuditReport());
      setScanning(false);
    }, 600);
  };

  if (!report) return null;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Security Audit & Zero-Trust Control</h1>
            <Badge variant="gold">v10.0 Security</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Real-time vulnerability auditing, RBAC policy enforcement logs, and active session control.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => window.location.assign('/auth/login')}>
            <span>RBAC Matrix</span>
          </Button>
          <Button variant="primary" size="sm" onClick={runAudit} disabled={scanning}>
            <RefreshCw className={`w-3.5 h-3.5 mr-1 ${scanning ? 'animate-spin' : ''}`} />
            <span>Trigger Security Scan</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Security Health Score</span>
          <p className="text-2xl font-mono font-bold text-emerald-400">{report.securityScorePct}%</p>
          <Badge variant="green" className="text-[9px]">Hardened</Badge>
        </Card>

        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Zero-Trust Policy</span>
          <p className="text-2xl font-mono font-bold text-[#C9A84C]">{report.zeroTrustStatus}</p>
          <Badge variant="gold" className="text-[9px]">Enforced</Badge>
        </Card>

        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Active Sessions</span>
          <p className="text-2xl font-mono font-bold text-blue-400">{report.activeSessionsCount} Sessions</p>
          <Badge variant="blue" className="text-[9px]">Authenticated</Badge>
        </Card>

        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Vulnerabilities</span>
          <p className="text-2xl font-mono font-bold text-purple-400">{report.vulnerabilitiesDetected} Threat</p>
          <Badge variant="purple" className="text-[9px]">Clean Scan</Badge>
        </Card>
      </div>

      {/* Audit Log Table */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-[#C9A84C]" />
            <h3 className="text-lg font-serif font-semibold text-gray-100">Zero-Trust Security Event Trail</h3>
          </div>
          <Badge variant="purple">{report.logs.length} Events Tracked</Badge>
        </div>

        <div className="space-y-3">
          {report.logs.map((log) => (
            <div
              key={log.id}
              className="p-4 bg-gray-900/60 rounded-xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-100 font-bold">{log.eventType}</span>
                  <Badge variant="blue" className="text-[9px] uppercase">
                    Role: {log.userRole}
                  </Badge>
                </div>
                <p className="text-gray-400 font-sans">{log.details}</p>
              </div>

              <div className="text-right">
                <span className="text-gray-500 block text-[10px]">{log.ipAddress}</span>
                <span className="text-[#C9A84C] font-semibold">{new Date(log.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
