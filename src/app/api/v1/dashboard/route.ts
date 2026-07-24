import { NextResponse } from 'next/server';
import { DashboardService } from '@/domain/dashboard/service';

export async function GET() {
  try {
    const dto = DashboardService.getDashboardDTO();
    return NextResponse.json({
      success: true,
      data: dto,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch dashboard DTO' },
      { status: 500 }
    );
  }
}
