import { NextResponse } from 'next/server';
import { GoalService } from '@/domain/planning/goals/service';

export async function GET() {
  try {
    const goals = GoalService.getGoalsWithProgress();
    return NextResponse.json({
      success: true,
      data: goals,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch goals' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.metricName || !body.metricTarget) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, metricName, metricTarget' },
        { status: 400 }
      );
    }

    const newGoal = GoalService.createGoal({
      title: body.title,
      type: body.type || 'career',
      description: body.description || '',
      metricName: body.metricName,
      metricTarget: body.metricTarget,
      targetDate: body.targetDate || '2026-12-31',
      status: 'active',
    });

    return NextResponse.json({ success: true, data: newGoal }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create goal' },
      { status: 500 }
    );
  }
}
