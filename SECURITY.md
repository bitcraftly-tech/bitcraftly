# Security Policy

Thank you for helping keep the **Bitcraftly Platform** secure.

We take security seriously and appreciate responsible disclosure of potential vulnerabilities.

---

# Supported Versions

The following table indicates which versions are currently supported with security updates.

| Version | Supported |
| ------- | --------- |
| 2.x     | ✅ Yes    |
| 1.x     | ❌ No     |

---

# Reporting a Vulnerability

If you discover a security vulnerability, **please do not create a public GitHub issue**.

Instead:

1. Prepare a detailed report.
2. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots or proof of concept (if applicable)
   - Suggested mitigation (optional)
3. Contact the project maintainers privately.

Please allow reasonable time for investigation before public disclosure.

---

# Scope

This policy applies to:

- Source code
- Authentication
- API integrations
- Environment configuration
- Dependencies
- Build process
- Deployment configuration
- Documentation related to security

---

# Security Best Practices

When contributing:

- Never commit secrets, API keys, or credentials.
- Store sensitive values in environment variables.
- Validate and sanitize all external input.
- Use HTTPS in production.
- Keep dependencies up to date.
- Follow the Principle of Least Privilege (PoLP).
- Avoid exposing sensitive information in logs.
- Review authentication and authorization logic carefully.

---

# Dependency Security

Before submitting changes:

- Review dependency updates.
- Remove unused packages.
- Check for known vulnerabilities.
- Keep lock files in sync.

---

# Authentication Guidelines

Authentication should:

- Use JWT securely.
- Protect private routes.
- Validate permissions on both client and server.
- Never expose tokens in source code.
- Handle session expiration gracefully.

---

# Environment Variables

Sensitive configuration should be stored in:

```text
.env.local
.env.development
.env.production
```

These files must never be committed to version control.

---

# Responsible Disclosure

We appreciate responsible disclosure.

Please provide sufficient information to reproduce the issue.

Avoid publicly sharing security vulnerabilities until they have been reviewed and addressed.

---

# Future Security Roadmap

Implemented in Sprint 004.2:

- Content Security Policy (CSP)
- Rate limiting (lead submission + owner login)
- Security headers (HSTS, COOP, CORP, frame denial)
- Owner route defense-in-depth session checks
- Branded error boundaries (`error.tsx`, `global-error.tsx`, `not-found.tsx`)

Future security improvements may include:

- Role-Based Access Control (RBAC)
- Multi-Factor Authentication (MFA)
- Distributed rate limiting (Redis/Upstash)
- Audit Logging
- Automated Dependency Scanning
- Secrets Scanning
- Admin panel authentication

---

# Security Checklist

Before every release verify:

- Authentication works correctly.
- Authorization rules are enforced.
- Environment variables are secure.
- Dependencies are up to date.
- No secrets exist in the repository.
- HTTPS is enforced in production.
- Security-related documentation is current.

---

# Contact

For security-related concerns, contact the project maintainers through a private communication channel.

Please do not disclose vulnerabilities publicly until they have been investigated and resolved.
