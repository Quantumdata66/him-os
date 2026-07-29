'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { Activity as ActIcon, RefreshCw as RefIcon, Cpu as CpuIcon, HardDrive as HdIcon, Wifi as WifiIcon, Server as ServIcon, CheckCircle2 as CheckIcon } from 'lucide-react';
import { HealthEngineService, SystemHealthReport } from '@/core/telemetry/healthEngine';

export default function SystemHealthPage() {
  const [report, setReport] = useState<SystemHealthReport | null>(null);
  const [probing, setProbing] = useState(false);

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = () => {
    setProbing(true);
    HealthEngineService.getHealthReport().then((res) => {
      setReport(res);
      setProbing(false);
    });
  };

  if (!report) return null;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Live Telemetry & Server Health</h1>
            <Badge variant="gold">v9.0 Infrastructure</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Real-time ping latency, WebSocket stability, and microservice diagnostic telemetry.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => window.location.assign('/mlops')}>
            <span>MLOps Hub</span>
          </Button>
          <Button variant="primary" size="sm" onClick={runDiagnostics} disabled={probing}>
            <RefIcon className={`w-3.5 h-3.5 mr-1 ${probing ? 'animate-spin' : ''}`} />
            <span>Run Diagnostics Probe</span>
          </Button>
        </div>
      </div>

      {/* Hero Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">System Status</span>
          <p className="text-xl font-mono font-bold text-emerald-400">
            {report.overallStatus.toUpperCase()} ✓
          </p>
          <Badge variant="green" className="text-[9px]">Operational</Badge>
        </Card>

        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">JS Memory Heap</span>
          <p className="text-xl font-mono font-bold text-blue-400">{report.memoryUsageMb} MB</p>
          <Badge variant="blue" className="text-[9px]">Optimal Heap</Badge>
        </Card>

        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">LocalStorage Payload</span>
          <p className="text-xl font-mono font-bold text-purple-400">{report.storageUsageKb} KB</p>
          <Badge variant="purple" className="text-[9px]">Local Storage</Badge>
        </Card>

        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Active Subservices</span>
          <p className="text-xl font-mono font-bold text-[#C9A84C]">{report.services.length} Microservices</p>
          <Badge variant="gold" className="text-[9px]">Monitored</Badge>
        </Card>
      </div>

      {/* Services Health Grid */}
      <Card className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-gray-800 pb-3">
          <ServIcon className="w-4 h-4 text-[#C9A84C]" />
          <h3 className="text-base font-serif font-bold text-gray-100">Microservices Health Matrix</h3>
        </div>

        <div className="space-y-3">
          {report.services.map((s, idx) => (
            <div key={idx} className="p-4 bg-gray-900/60 rounded-xl border border-gray-800 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <CheckIcon className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-bold text-gray-100">{s.name}</span>
                </div>
                <p className="text-xs text-gray-400">{s.message}</p>
              </div>

              <div className="text-right font-mono text-xs">
                <span className="text-emerald-400 font-bold">{s.latencyMs} ms</span>
                <p className="text-[9px] text-gray-500 uppercase">Latency</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
