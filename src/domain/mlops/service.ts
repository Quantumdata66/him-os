import { StorageAdapter } from '@/core/storage/localStorageAdapter';
import { MLModel, TrainingPipeline, MLOpsTelemetryDTO } from './types';

const MODELS_KEY = 'mlops_models';

const INITIAL_MODELS: MLModel[] = [
  {
    id: 'ml-1',
    name: 'Explosive Chemical Detection Model',
    version: 'v2.4.0',
    framework: 'PyTorch',
    accuracyPct: 96.8,
    f1Score: 0.95,
    latencyMs: 14,
    status: 'deployed',
    lastTrained: '2026-07-20',
    datasetVersion: 'ds-chem-v4',
  },
  {
    id: 'ml-2',
    name: 'Quantum Jersey Sales Forecasting',
    version: 'v1.2.1',
    framework: 'FastAPI/ONNX',
    accuracyPct: 91.2,
    f1Score: 0.89,
    latencyMs: 8,
    status: 'deployed',
    lastTrained: '2026-07-22',
    datasetVersion: 'ds-orders-v2',
  },
  {
    id: 'ml-3',
    name: 'Personal Focus & Productivity Classifier',
    version: 'v0.9.0',
    framework: 'Scikit-Learn',
    accuracyPct: 88.5,
    f1Score: 0.86,
    latencyMs: 5,
    status: 'training',
    lastTrained: '2026-07-24',
    datasetVersion: 'ds-[#habits]-v1',
  },
];

export class MLOpsService {
  static getModels(): MLModel[] {
    const models = StorageAdapter.getItem<MLModel[]>(MODELS_KEY, []);
    if (models.length === 0) {
      StorageAdapter.setItem(MODELS_KEY, INITIAL_MODELS);
      return INITIAL_MODELS;
    }
    return models;
  }

  static getTelemetryDTO(): MLOpsTelemetryDTO {
    const models = this.getModels();
    const active = models.filter((m) => m.status === 'deployed');
    const totalLatency = active.reduce((sum, m) => sum + m.latencyMs, 0);
    const avgLatencyMs = active.length > 0 ? Math.round(totalLatency / active.length) : 10;

    const activePipelines: TrainingPipeline[] = [
      {
        id: 'pipe-1',
        modelName: 'Explosive Chemical Detection Model',
        epochCurrent: 45,
        epochTotal: 50,
        loss: 0.042,
        status: 'running',
        startedAt: '2026-07-25 14:00',
      },
    ];

    return {
      activeModelsCount: active.length,
      avgLatencyMs,
      models,
      activePipelines,
      dataDriftDetected: false,
    };
  }
}
