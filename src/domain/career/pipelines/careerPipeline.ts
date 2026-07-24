import { SkillService } from '../../skills/service';
import { ProjectService } from '../../planning/projects/service';
import { StorageAdapter } from '@/core/storage/localStorageAdapter';
import { JobApplication } from '../types';

export interface MarketReadinessReport {
  overallScorePct: number;
  skillCoveragePct: number;
  projectScorePct: number;
  portfolioScorePct: number;
  interviewMomentumPct: number;
  topVerifiedSkills: string[];
  recommendations: string[];
}

export class CareerPipeline {
  static computeMarketReadiness(): MarketReadinessReport {
    const skills = SkillService.getSkills();
    const projects = ProjectService.getProjects();
    const applications = StorageAdapter.getItem<JobApplication[]>('job_applications', []);

    // 1. Skill Coverage (target backend & MLOps core skills)
    const totalCurrentSkillPoints = skills.reduce((sum, s) => sum + s.currentLevel, 0);
    const totalTargetSkillPoints = skills.reduce((sum, s) => sum + s.targetLevel, 0);
    const skillCoveragePct = totalTargetSkillPoints > 0 ? Math.round((totalCurrentSkillPoints / totalTargetSkillPoints) * 100) : 70;

    // 2. Project Score (active/completed projects with tech stack)
    const shippedProjects = projects.filter((p) => p.status === 'completed' || p.status === 'active');
    const projectScorePct = Math.min(100, Math.round((shippedProjects.length / 4) * 100));

    // 3. Portfolio & Deployments (projects with deployment URLs)
    const deployedProjects = projects.filter((p) => p.deploymentUrl);
    const portfolioScorePct = Math.min(100, Math.round((deployedProjects.length / 2) * 100));

    // 4. Application & Interview Momentum
    const activeApps = applications.filter((a) => a.status === 'screening' || a.status === 'interview');
    const interviewMomentumPct = activeApps.length > 0 ? 85 : 60;

    // Overall weighted score: 35% Skills + 35% Projects + 15% Portfolio + 15% Momentum
    const overallScorePct = Math.round(
      skillCoveragePct * 0.35 + projectScorePct * 0.35 + portfolioScorePct * 0.15 + interviewMomentumPct * 0.15
    );

    const topVerifiedSkills = skills
      .filter((s) => s.currentLevel >= 4)
      .map((s) => `${s.name} (${s.currentLevel}/5)`);

    const recommendations: string[] = [];
    if (skillCoveragePct < 80) recommendations.push('Increase proficiency in Docker & MLOps deployments.');
    if (portfolioScorePct < 80) recommendations.push('Add GitHub README architectural diagrams to your portfolio.');
    if (shippedProjects.length < 5) recommendations.push('Complete 2 more FastAPI microservice projects.');

    return {
      overallScorePct,
      skillCoveragePct,
      projectScorePct,
      portfolioScorePct,
      interviewMomentumPct,
      topVerifiedSkills,
      recommendations,
    };
  }
}
