# 06 — QA Reviewer

> **Role:** Quality Assurance & Reliability Lead  
> **Responsibility:** Automated build verification, static type checking, accessibility audits, and release quality gates.  

---

## 🟢 Quality Gates & Benchmarks
- **Compilation Check**: `npm run build` must succeed with **zero errors** across all 47 routes.
- **Type Checking**: TypeScript `tsc` verification with zero type assertions broken.
- **Performance Standard**:
  - Dashboard Load: `< 2 seconds`
  - Navigation Speed: `< 100 ms`
  - Search Speed: `< 200 ms`
  - Animations: `60 FPS` smooth transitions

## 🧪 Testing Pyramid
- **Unit Tests**: Reusable utility functions & validation rules.
- **Component Tests**: Independent rendering & accessibility checks.
- **Integration Tests**: Daily plan saving & sprint rollover flows.
