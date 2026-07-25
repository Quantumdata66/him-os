'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { MLOpsService } from '@/domain/mlops/service';
import { MLOpsTelemetryDTO } from '@/domain/mlops/types';

export default function MLOpsPage() {
  const [telemetry, setTelemetry] = useState<MLOpsTelemetryDTO | null>(null);

  useEffect(() => {
    setTelemetry(MLOpsService.getTelemetryDTO());
  }, []);

  if (!telemetry) return <div className="text-gray-400 p-8">Loading MLOps Telemetry...</div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">MLOps Model Command Center</h1>
            <Badge variant="gold">v4.0 Flagship</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Real-time telemetry monitoring model latency, accuracy, dataset versioning, and training pipelines.
          </p>
        </div>
        <Button variant="primary" onClick={() => alert('Training pipeline trigger sent to FastAPI worker! 🚀')}>
          + Trigger Retraining Run
        </Button>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card goldBorder>
          <span className="text-[10px] font-mono text-gray-400 uppercase">Active Deployed Models</span>
          <div className="text-3xl font-bold text-gray-100 mt-1">{telemetry.activeModelsCount}</div>
          <p className="text-[11px] text-emerald-400 mt-1">100% Operational</p>
        </Card>

        <Card>
          <span className="text-[10px] font-mono text-gray-400 uppercase">Avg Inference Latency</span>
          <div className="text-3xl font-bold font-mono text-[#C9A84C] mt-1">{telemetry.avgLatencyMs} ms</div>
          <p className="text-[11px] text-gray-500 mt-1">Sub-15ms Target</p>
        </Card>

        <Card>
          <span className="text-[10px] font-mono text-gray-400 uppercase">Active Retraining Runs</span>
          <div className="text-3xl font-bold text-blue-400 mt-1">{telemetry.activePipelines.length}</div>
          <p className="text-[11px] text-gray-500 mt-1">PyTorch Epoch 45/50</p>
        </Card>

        <Card>
          <span className="text-[10px] font-mono text-gray-400 uppercase">Data Drift Status</span>
          <div className="text-3xl font-bold text-emerald-400 mt-1">Nominal</div>
          <p className="text-[11px] text-gray-500 mt-1">No Drift Detected</p>
        </Card>
      </div>

      {/* Active Retraining Pipeline */}
      {telemetry.activePipelines.length > 0 && (
        <Card goldBorder className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-serif font-semibold text-[#C9A84C]">Active Retraining Pipeline</h3>
              <p className="text-xs text-gray-400">{telemetry.activePipelines[0].modelName}</p>
            </div>
            <Badge variant="gold">Epoch 45 / 50</Badge>
          </div>

          <div className="space-y-1.5 font-mono">
            <div className="flex justify-between text-xs text-gray-300">
              <span>Training Loss: {telemetry.activePipelines[0].loss}</span>
              <span className="text-emerald-400">90% Complete</span>
            </div>
            <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#C9A84C] h-full transition-all duration-500 w-[90%]" />
            </div>
          </div>
        </Card>
      )}

      {/* Model Inventory Table */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif font-semibold text-gray-100">Machine Learning Model Inventory</h3>
          <Badge variant="purple">{telemetry.models.length} Models Tracked</Badge>
        </div>

        <div className="space-y-3">
          {telemetry.models.map((model) => (
            <div
              key={model.id}
              className="p-4 bg-gray-900/60 rounded-lg border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-semibold text-gray-100">{model.name}</h4>
                  <Badge variant="blue" className="text-[9px]">
                    {model.framework}
                  </Badge>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Version: {model.version} • Dataset: {model.datasetVersion} • Trained: {model.lastTrained}
                </p>
              </div>

              <div className="flex items-center space-x-6 font-mono text-xs">
                <div className="text-right">
                  <span className="text-gray-400 block text-[10px]">Accuracy / F1</span>
                  <span className="font-bold text-gray-200">{model.accuracyPct}% / {model.f1Score}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 block text-[10px]">Inference Latency</span>
                  <span className="font-bold text-[#C9A84C]">{model.latencyMs} ms</span>
                </div>
                <Badge variant={model.status === 'deployed' ? 'green' : 'gold'}>
                  {model.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
