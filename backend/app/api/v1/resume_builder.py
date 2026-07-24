from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class ResumeRequest(BaseModel):
    name: str = "Backend & MLOps Engineer"
    target_role: str = "Backend Engineer (FastAPI / Python / Cloud)"
    skills: List[str] = ["FastAPI", "Docker", "PostgreSQL", "Next.js", "Python Async", "MLOps"]
    projects: List[str] = ["Project HIM OS", "Quantum Jersey E-Commerce", "Explosive Detection ML Model"]

class ResumeResponse(BaseModel):
    markdown_cv: str
    filename: str

@router.post("/generate", response_model=ResumeResponse)
async def generate_resume(req: ResumeRequest):
    """
    Generates a tailored Markdown CV dynamically based on HIM OS Career Engine data.
    """
    skills_formatted = "\n".join([f"- **{s}**: Production verified with project evidence" for s in req.skills])
    projects_formatted = "\n".join([f"### {p}\n- Shipped production codebase with Docker containerization and clean architecture." for p in req.projects])
    
    cv_md = f"""# {req.name}
**Target Role:** {req.target_role}  
**Motto:** Prototype Today. Legacy Tomorrow.

---

## 🎯 Executive Summary
Driven Backend & MLOps Engineer specializing in building scalable async Python microservices (FastAPI), containerized deployments (Docker/Kubernetes), and clean domain-driven web architectures.

---

## 🛠️ Core Engineering Skills
{skills_formatted}

---

## 💻 Featured Shipped Projects
{projects_formatted}

---

## 📜 Education & Certifications
- **AWS Certified Solutions Architect** (In Progress)
- **Goethe B1 German Language Certification**
"""
    
    return ResumeResponse(
        markdown_cv=cv_md,
        filename=f"CV_{req.name.replace(' ', '_')}.md"
    )
