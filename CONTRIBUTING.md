# Contributing to HIM OS

Thank you for contributing to **Project HIM OS (Personal Operating System)**! To maintain our world-class standard of software craftsmanship, all contributions must adhere to the **HIM OS Product Specification (HPS)**.

---

## 📜 Core Contribution Rules

1. **Obey Design Restraint**:
   - Use the HPS Deep Forest Green palette (`#071A12`, `#163526`, `#22C55E`). Never introduce arbitrary rainbow colors or aggressive drop shadows.
   - Use skeleton loaders (`.skeleton`) for async loading states.

2. **Preserve Navigation Hierarchy**:
   - Navigation depth must NEVER exceed 3 levels.
   - Respect the 7 Canonical Life Destinations (`HOME`, `TODAY`, `BUILD`, `LEARN`, `GROW`, `THINK`, `REVIEW`).

3. **Code & Commit Standards**:
   - All commits must follow the conventional commit specification (`feat(hps):`, `feat(ui):`, `fix:`, `docs:`).
   - `npm run build` must complete with **zero errors** before pushing to `main`.

4. **AI & Role Prompts**:
   - Refer to role-specific AI prompts in `docs/PROMPTS/` before making architectural or UX changes.
