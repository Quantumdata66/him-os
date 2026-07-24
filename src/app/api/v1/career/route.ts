import { NextResponse } from 'next/server';
import { CareerService } from '@/domain/career/service';
import { CareerPipeline } from '@/domain/career/pipelines/careerPipeline';

export async function GET() {
  try {
    const applications = CareerService.getApplications();
    const readinessReport = CareerPipeline.computeMarketReadiness();

    return NextResponse.json({
      success: true,
      data: {
        readinessReport,
        applications,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch career data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.company || !body.role) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: company, role' },
        { status: 400 }
      );
    }

    const newApp = CareerService.addApplication({
      company: body.company,
      role: body.role,
      status: body.status || 'applied',
      appliedDate: body.appliedDate || new Date().toISOString().split('T')[0],
      salaryOffered: body.salaryOffered || 12000000,
      currency: body.currency || 'NGN',
      notes: body.notes || '',
    });

    return NextResponse.json({ success: true, data: newApp }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create application' },
      { status: 500 }
    );
  }
}
