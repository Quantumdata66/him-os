import { NextResponse } from 'next/server';
import { AnalyticsAggregator } from '@/core/analytics/analyticsAggregator';

export async function GET() {
  try {
    const report = AnalyticsAggregator.generateReport();
    return NextResponse.json({
      success: true,
      data: report,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate analytics report' },
      { status: 500 }
    );
  }
}
