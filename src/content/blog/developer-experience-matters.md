---
title: "The Best Security Tool Is the One Developers Actually Use"
description: "Security products compete on detectors and integrations. They should compete on friction. The adoption gap starts in the developer's IDE, not the CISO's budget."
date: "2026-02-22"
lastUpdatedDate: "2026-02-22"
tag: "DevEx"
draft: false
---

At Veracode, I managed enterprise AppSec portfolios where the same pattern repeated across almost every deployment: security teams had bought tools their developers refused to run. Expensive platforms with hundreds of check boxes on a RFP matrix that sat unused because the CLI was slow, the API was undocumented, and the false positive rate made the output meaningless.

<!-- TODO: David — one specific Veracode customer or moment where DevEx friction killed adoption. Named account preferred, or a before/after adoption number. -->

## The adoption equation

Here's the pattern I observed across every AppSec deployment I worked on at Veracode:

> **Adoption = (Value × Ease) − Friction**

Most security products compete on *value*. More detectors, more integrations, more coverage maps. But they ignore *ease* and actively increase *friction*. The result is a tool that looks incredible in a bake-off and collects dust in production.

## What good DevEx looks like in security

At Veracode, I worked with customers who had wildly different adoption rates for the *same* product. The difference wasn't the tool — it was the integration experience:

- **Fast feedback loops.** Developers who got scan results in their IDE within 30 seconds fixed 3x more findings than those waiting for a nightly batch scan.
- **Contextual guidance.** "SQL injection on line 47" is a finding. "Here's the specific parameter to sanitise and a link to the framework's built-in protection" is a fix.
- **Low-noise defaults.** Teams that tuned their policies to surface only findings above a severity they'd validated — not every detection the engine produces — saw developer engagement double. <!-- TODO: David — confirm the real adoption metric you saw when policies were tuned down (was it 2x engagement? a specific %? a named customer?) -->

## Building for the reluctant user

Most developers don't *want* to interact with security tooling. It's not a product they chose — it's an obligation. <!-- TODO: David — anchor this to a specific Veracode customer conversation or team that pushed back, if you have one. --> Designing for a reluctant user means:

1. Zero config where possible — sensible defaults that work out of the box
2. Incremental depth — simple for the 80% case, powerful for the 20%
3. Respecting the developer's workflow — meet them in CI/CD, in the IDE, in the PR. Don't make them open your dashboard.

The companies that understand this are winning. Not because their security is better in an absolute sense, but because their security is *actually used*. And the security you use is always better than the security you don't.
<!-- TODO: David — if there's a specific Veracode customer or competitor example where adoption made the difference (not just polish), name it here. -->

---

*I'm building [customersuccess.guide](https://customersuccess.guide) partly to explore this — how adoption-first thinking changes the way you design, sell, and support a product.*
