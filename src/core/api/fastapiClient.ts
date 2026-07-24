export interface GitHubSummary {
  username: string;
  total_commits_today: number;
  recent_repos: string[];
  last_commit_time?: string;
  streak_days: number;
}

export interface WeatherSummary {
  city: string;
  temperature_celsius: number;
  condition: string;
  icon: string;
  recommendation: string;
}

const FASTAPI_BASE_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

export class FastApiClient {
  static async getGitHubCommits(username: string = 'octocat'): Promise<GitHubSummary> {
    try {
      const res = await fetch(`${FASTAPI_BASE_URL}/api/v1/github/commits?username=${username}`);
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch {
      // Fallback fallback if backend service is offline
      return {
        username,
        total_commits_today: 5,
        recent_repos: ['him-os', 'quantum-jersey', 'explosive-detection'],
        last_commit_time: new Date().toISOString(),
        streak_days: 14,
      };
    }
  }

  static async getWeather(city: string = 'Lagos'): Promise<WeatherSummary> {
    try {
      const res = await fetch(`${FASTAPI_BASE_URL}/api/v1/weather/current?city=${city}`);
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch {
      return {
        city,
        temperature_celsius: 28.5,
        condition: 'Partly Cloudy',
        icon: '🌤️',
        recommendation: 'Great weather for outdoor workout and high-focus deep work sessions.',
      };
    }
  }

  static async generateResume(): Promise<{ markdown_cv: string; filename: string }> {
    try {
      const res = await fetch(`${FASTAPI_BASE_URL}/api/v1/resume/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Engineer Profile',
          target_role: 'Backend & MLOps Engineer',
          skills: ['FastAPI', 'Docker', 'PostgreSQL', 'Next.js', 'Python Async', 'MLOps'],
          projects: ['Project HIM OS', 'Quantum Jersey E-Commerce', 'Explosive Detection ML Model'],
        }),
      });
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch {
      return {
        markdown_cv: '# Engineer Profile CV\nGenerated via HIM OS Career Engine.',
        filename: 'CV_Engineer.md',
      };
    }
  }
}
