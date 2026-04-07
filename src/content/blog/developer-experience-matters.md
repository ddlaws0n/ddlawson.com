---
title: "Why Developer Experience Matters More Than Features"
description: "In security tooling, the best product isn't the one with the most capabilities — it's the one developers actually use. A reflection on making security frictionless."
date: "2026-02-22"
tag: "DevEx"
draft: false
---

I spent years watching security teams buy tools that developers hated. Expensive platforms with hundreds of check boxes on a RFP matrix that sat unused because the CLI was slow, the API was undocumented, and the false positive rate made the output meaningless.

## The adoption equation

Here's the pattern I've seen across every security programme I've worked with:

> **Adoption = (Value × Ease) − Friction**

Most security products compete on *value*. More detectors, more integrations, more coverage maps. But they ignore *ease* and actively increase *friction*. The result is a tool that looks incredible in a bake-off and collects dust in production.

## What good DevEx looks like in security

At Veracode, I worked with customers who had wildly different adoption rates for the *same* product. The difference wasn't the tool — it was the integration experience:

- **Fast feedback loops.** Developers who got scan results in their IDE within 30 seconds fixed 3x more findings than those waiting for a nightly batch scan.
- **Contextual guidance.** "SQL injection on line 47" is a finding. "Here's the specific parameter to sanitise and a link to the framework's built-in protection" is a fix.
- **Low-noise defaults.** Teams that tuned their policies to surface only high-confidence, high-impact findings saw developer engagement double.

## Building for the reluctant user

The honest reality is that most developers don't *want* to interact with security tooling. It's not a product they chose — it's an obligation. Designing for a reluctant user means:

1. Zero config where possible — sensible defaults that work out of the box
2. Incremental depth — simple for the 80% case, powerful for the 20%
3. Respecting the developer's workflow — meet them in CI/CD, in the IDE, in the PR. Don't make them open your dashboard.

The companies that understand this are winning. Not because their security is better in an absolute sense, but because their security is *actually used*. And the security you use is always better than the security you don't.

---

*DevEx in security is a topic I think about constantly. If you're working on this problem, I'd welcome a conversation.*
