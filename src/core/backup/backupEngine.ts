import { StorageAdapter } from '../storage/localStorageAdapter';
import { DashboardService } from '@/domain/dashboard/service';
import { AnalyticsAggregator } from '../analytics/analyticsAggregator';

export interface SystemBackupPayload {
  version: string;
  timestamp: string;
  dto: ReturnType<typeof DashboardService.getDashboardDTO>;
  analytics: ReturnType<typeof AnalyticsAggregator.generateReport>;
  rawLocalStorage: Record<string, unknown>;
}

export class BackupEngine {
  static exportJsonBackup(): void {
    if (typeof window === 'undefined') return;

    const dto = DashboardService.getDashboardDTO();
    const analytics = AnalyticsAggregator.generateReport();

    const rawStorage: Record<string, unknown> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('him_')) {
        try {
          rawStorage[key] = JSON.parse(localStorage.getItem(key) || '{}');
        } catch {
          rawStorage[key] = localStorage.getItem(key);
        }
      }
    }

    const payload: SystemBackupPayload = {
      version: 'v5.0.0',
      timestamp: new Date().toISOString(),
      dto,
      analytics,
      rawLocalStorage: rawStorage,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `HIM_OS_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  static exportMarkdownReport(): void {
    if (typeof window === 'undefined') return;

    const dto = DashboardService.getDashboardDTO();
    const analytics = AnalyticsAggregator.generateReport();

    const mdContent = `# Project HIM OS — System State Report (${dto.todayDate})

> **Motto:** *${dto.user.motto}*
> **Overall Life OS Score:** ${analytics.overallLifeOSScore}%

---

## 🎯 Today's MIT Planner
- **MIT #1:** ${dto.dailyPlan.mit1 || 'N/A'} [${dto.dailyPlan.mit1Done ? 'DONE' : 'PENDING'}]
- **MIT #2:** ${dto.dailyPlan.mit2 || 'N/A'} [${dto.dailyPlan.mit2Done ? 'DONE' : 'PENDING'}]
- **MIT #3:** ${dto.dailyPlan.mit3 || 'N/A'} [${dto.dailyPlan.mit3Done ? 'DONE' : 'PENDING'}]

## 📊 Analytics Scores
- **Consistency Score:** ${analytics.consistencyScore.score}% (${analytics.consistencyScore.status})
- **Engineer Score:** ${analytics.engineerScore.score}% (${analytics.engineerScore.status})
- **Career Readiness:** ${analytics.careerScore.score}% (${analytics.careerScore.status})
- **Financial OS Score:** ${analytics.financialScore.score}% (${analytics.financialScore.status})

## 💼 Domain Snapshots
- **Net Worth:** ${dto.stats.netWorthFormatted}
- **Active Projects:** ${dto.stats.activeProjectsCount} Active
- **Books Completed:** ${dto.stats.booksReadCount} Read

---
*Exported automatically via HIM OS Backup Engine v5.0.0*
`;

    const dataStr = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(mdContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `HIM_OS_Report_${new Date().toISOString().split('T')[0]}.md`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  static restoreStateFromJson(jsonString: string): boolean {
    try {
      const payload: SystemBackupPayload = JSON.parse(jsonString);
      if (payload.rawLocalStorage) {
        Object.entries(payload.rawLocalStorage).forEach(([k, v]) => {
          StorageAdapter.setItem(k, v);
        });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
}
