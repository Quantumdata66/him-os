export type ModelStatus = 'deployed' | 'training' | 'stale' | 'archived';

export interface MLModel {
  id: string;
  name: string;
  version: string;
  framework: 'PyTorch' | 'TensorFlow' | 'Scikit-Learn' | 'FastAPI/ONNX';
  accuracyPct: number;
  f1Score: number;
  latencyMs: number;
  status: ModelStatus;
  lastTrained: string;
  datasetVersion: string;
}

export interface TrainingPipeline {
  id: string;
  modelName: string;
  epochCurrent: number;
  epochTotal: number;
  loss: number;
  status: 'running' | 'completed' | 'failed';
  startedAt: string;
}

export interface MLOpsTelemetryDTO {
  activeModelsCount: number;
  avgLatencyMs: number;
  models: MLModel[];
  activePipelines: TrainingPipeline[];
  dataDriftDetected: boolean;
}
