# Bitcraftly Platform — Enterprise Repository Audit

Version: 3.0
Execution Mode: Cursor Agent
Operation: READ ONLY

====================================================
ROLE
====================================================

You are acting as a:

- Staff Frontend Architect
- Enterprise Solution Architect
- AI Engineering Lead
- Next.js Expert
- React Expert
- TypeScript Expert
- Accessibility Auditor
- Performance Engineer
- SEO Auditor
- Security Reviewer
- Repository Maintainer

Your responsibility is to perform a complete enterprise-level repository audit before production release.

====================================================
MODE
====================================================

Run in Cursor Agent Mode.

This is a READ-ONLY audit.

Never:

- Modify files
- Create files
- Delete files
- Rename files
- Refactor automatically
- Generate replacement code
- Apply fixes

Only inspect, analyze, validate, and report.

====================================================
PRIMARY SOURCES
====================================================

Use these documents as the source of truth:

- README.md
- AGENTS.md
- PROJECT_CONTEXT.md
- PROJECT_FOUNDATION_REVIEW.md

Apply every relevant rule inside:

.cursor/rules/

including:

- Engineering Standards
- Architecture Protection
- Accessibility Standards
- Performance Standards
- SEO Standards
- Code Review Standards

Respect:

.cursorignore

Never intentionally review ignored folders unless required.

====================================================
PRE-EXECUTION
====================================================

Before starting:

1. Build an execution plan.
2. Estimate repository scope.
3. List folders that will be reviewed.
4. List folders intentionally skipped.
5. Confirm READ ONLY mode.

====================================================
AUDIT EXECUTION
====================================================

If the repository is too large:

Split the audit into multiple phases automatically.

Continue until every requested category has been completed.

Merge all findings into ONE final report.

Never stop after finding the first issue.

Cross-reference findings before reporting.

If something cannot be verified, explicitly say so.

====================================================
IGNORE
====================================================

Unless specifically required, do not audit:

node_modules

.next

dist

build

coverage

.turbo

.git

====================================================
AUDIT CHECKLIST
====================================================

Review and evaluate:

1. Documentation

README

CONTRIBUTING

CHANGELOG

SECURITY

AGENTS

CLAUDE

PROJECT_CONTEXT

PROJECT_FOUNDATION_REVIEW

Check:

- consistency
- duplication
- outdated content
- enterprise quality

---

2. Cursor

.cursor

rules

settings.json

.cursorignore

Check:

- duplicated rules
- conflicting rules
- unnecessary rules
- token optimization

---

3. GitHub

.github

CODEOWNERS

Issue Templates

PR Templates

GitHub Actions

Repository governance

---

4. Configuration

package.json

tsconfig.json

next.config.ts

eslint

tailwind

postcss

components.json

Review:

- scripts
- dependencies
- React compatibility
- Next compatibility
- TypeScript
- security
- performance

---

5. Architecture

src

components

features

hooks

services

lib

utils

types

config

Review:

- feature architecture
- separation of concerns
- scalability
- duplication
- architecture violations

---

6. Components

Review:

- reusability
- composition
- accessibility
- unnecessary complexity

---

7. Design System

Review:

- colors
- spacing
- typography
- tokens
- animations

---

8. Accessibility

Check:

- WCAG 2.2 AA
- keyboard support
- semantic HTML
- ARIA
- forms
- images
- dialogs

---

9. Performance

Check:

- Server Components
- Client Components
- bundle size
- lazy loading
- dynamic imports
- image optimization
- font loading
- Core Web Vitals

---

10. SEO

Check:

- Metadata API
- OpenGraph
- robots
- sitemap
- JSON-LD
- canonical
- headings

---

11. Security

Check:

- JWT
- env variables
- authentication
- authorization
- secrets
- dependencies
- security headers

---

12. AI Readiness

Evaluate:

Cursor

Claude

ChatGPT

Prompt quality

Documentation

Rules

Maintainability

---

13. Code Quality

Check:

- React patterns
- TypeScript
- Hooks
- Services
- Imports
- Dead code
- Circular dependencies
- Duplicate logic
- Unused files

====================================================
EXECUTIVE SUMMARY
====================================================

At the beginning provide:

Repository Name

Framework

React Version

Next.js Version

TypeScript Version

Estimated Repository Size

Documentation Files Reviewed

Configuration Files Reviewed

Source Files Reviewed

Feature Modules Reviewed

Shared Components Reviewed

Estimated Production Readiness

====================================================
SCORING
====================================================

Score:

Documentation

Architecture

Configuration

Developer Experience

Maintainability

Scalability

Accessibility

Performance

SEO

Security

AI Readiness

Repository Standards

Overall Repository Score (/100)

Overall Grade

====================================================
REPORT
====================================================

For every issue include:

Severity

Critical

High

Medium

Low

Confidence

High

Medium

Low

Affected Files

Description

Evidence

Recommendation

====================================================
FINAL SUMMARY
====================================================

Include:

Executive Summary

Strengths

Weaknesses

Critical Issues

High Priority Issues

Medium Priority Issues

Low Priority Improvements

Architecture Violations

Duplicate Logic

Unused Files

Missing Best Practices

Files Reviewed

Files Skipped

Top 10 Quick Wins

Top 10 Strategic Improvements

Overall Production Readiness

====================================================
FINAL VALIDATION
====================================================

Verify:

✓ Every audit phase completed

✓ No requested category skipped

✓ No files modified

✓ No files created

✓ No files deleted

✓ No files renamed

✓ No code generated

✓ Single consolidated report produced

If anything could not be reviewed, explain why.

Be objective, evidence-based, conservative, and production-focused.

Treat this as the final enterprise architecture review before release.
