import { DeepWorkService } from '@/domain/execution/deep-work/service';
import { ProjectService } from '@/domain/planning/projects/service';
import { ScoreMetric } from './types';

export class EngineerScoreEngine {
  static calculate(): ScoreMetric {
    const totalMinutesToday = DeepWorkService.getTotalMinutesToday();
    const projects = ProjectService.getProjects();

    // Deep work target: 120 minutes per day
    const deepWorkScore = Math.min(100, Math.round((totalMinutesToday / 120) * 100));

    // Active project milestones completion
    let totalMilestones = 0;
    let completedMilestones = 0;

    projects.forEach((p) => {
      p.milestones.forEach((m) => {
        totalMilestones++;
        if (m.completed) completedMilestones++;
      });
    });

    const milestoneScore = totalMilestones > 0
      ? Math.round((completedMilestones / totalMilestones) * 100)
      : 75;

    const score = Math.round(deepWorkScore * 0.5 + milestoneScore * 0.5);

    let status: ScoreMetric['status'] = 'good';
    if (score >= 85) status = 'optimal';
    else if (score < 50) status = 'needs_attention';

    return {
      name: 'Engineering Output',
      score,
      weight: 25,
      status,
      details: `${totalMinutesToday} mins Deep Work • ${completedMilestones}/${totalMilestones} Milestones Met`,
    };
  }
}
