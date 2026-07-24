import { NextResponse } from 'next/server';
import { ProjectService } from '@/domain/planning/projects/service';

export async function GET() {
  try {
    const projects = ProjectService.getProjects();
    return NextResponse.json({
      success: true,
      data: projects,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.objective) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, objective' },
        { status: 400 }
      );
    }

    const newProject = ProjectService.createProject({
      name: body.name,
      objective: body.objective,
      status: body.status || 'active',
      repoUrl: body.repoUrl,
      deploymentUrl: body.deploymentUrl,
      techStack: body.techStack || ['FastAPI', 'Next.js'],
      architectureNotes: body.architectureNotes || 'Domain-driven microservices.',
      lessons: body.lessons || '',
    });

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create project' },
      { status: 500 }
    );
  }
}
