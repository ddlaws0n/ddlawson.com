---
title: "AI Broke the Cloud Security Status Quo"
description: "AI changes what you're defending against and what you're defending with — simultaneously. Most organisations are only optimising for one side."
date: "2025-12-08"
lastUpdatedDate: "2025-12-08"
tag: "Security"
draft: true
---

AI changes both what you're defending against and what you're defending with. Most organisations are optimising for only one side — and in my TAM role at Wiz, every EMEA customer conversation I've had this year has confirmed it.

<!-- TODO: David — one specific Wiz customer conversation or moment that made this click. Even an anonymised anchor ("a FTSE 100 financial services customer told me…") is stronger than the current opener. What was the moment — a specific QBR, a customer incident, a pattern you noticed across accounts? -->

## The offensive shift

AI doesn't create fundamentally new attack categories — it dramatically lowers the barrier to executing existing ones. What previously required a sophisticated actor with deep cloud expertise can now be accomplished with a well-crafted prompt and a basic understanding of your infrastructure.

<!-- TODO: David — the three bullets below are reasonable but entirely generic. They could have been written by anyone who reads security Twitter. Replace at least one of them with a specific pattern you've watched emerge across Wiz customers in the last 6–12 months. Named or anonymised ("a mid-market SaaS customer in EMEA…") is fine. If you've seen IAM misconfiguration chains used differently now vs. a year ago, that's the story. -->

The practical implications:

- **Faster reconnaissance.** AI can enumerate misconfigurations across cloud environments in minutes, not days.
- **More convincing social engineering.** Phishing emails that would have been flagged by grammar alone are now indistinguishable from internal communications.
- **Automated exploit chaining.** Combining a minor IAM misconfiguration with a publicly accessible storage bucket becomes trivial when AI handles the reasoning.

## The defensive opportunity

But AI is equally transformative on the defensive side. The organisations I see winning are the ones using AI to:

<!-- TODO: David — "the organisations I see winning" is where your Wiz vantage point is most valuable. Can you name one pattern from an actual EMEA customer? "A retail customer we work with shifted from X to Y and reduced triage time by…" — even a rough metric or anonymised industry anchor is better than the current generalisation. -->

1. **Prioritise, not just detect.** When your tool surfaces 2,000 findings, the human bottleneck is triage. AI that can contextualise findings based on your specific architecture and business impact is worth more than any additional detector.
2. **Bridge the talent gap.** Junior engineers can operate at a higher level when AI handles the pattern-matching. "Is this finding real?" becomes "What's the blast radius, and what's the fastest path to remediation?"
3. **Continuously validate controls.** AI-generated attack paths let you test your defences against realistic scenarios without relying on annual penetration tests.

<!-- TODO: David — point 3 (continuously validate controls) is where Wiz specifically plays. If you've run this conversation with customers — moving them away from annual pen tests toward continuous validation — what's the pushback you hear, and what shifts the thinking? That's the insight nobody else writing about this has. -->

## What I'd do today

If I were building a cloud security programme from scratch right now, I'd invest heavily in three things:

- **Context-rich telemetry.** AI is only as good as its inputs. Ensure you have well-structured, high-fidelity telemetry across your cloud environment — coverage gaps are where AI-assisted attackers find their wedge.
- **Human-in-the-loop workflows.** Automate the 80% but keep experienced humans in the decision chain for the 20% that matters.
- **Security and platform engineering literacy.** Your security team doesn't need to build models, but they need to understand capabilities, limitations, and failure modes well enough to evaluate vendor claims.

<!-- TODO: David — "if I were building a cloud security programme from scratch" is a good framing, but the three bullets above are still abstract. Can you ground even one of them in a real conversation? E.g. the telemetry bullet — have you had a customer where coverage gaps were the actual problem, not detections? -->

The organisations that treat AI as both a threat amplifier and a capability multiplier — simultaneously — will be the ones that emerge from this transition with stronger security postures than they had before.

<!-- TODO: David — the closing paragraph is a fine summary but doesn't land with a position. What do you actually believe most EMEA security teams are getting wrong right now? That's the closing sentence this post needs. -->

---

*This space moves weekly, not quarterly. I'm tracking what's working at [customersuccess.guide](https://customersuccess.guide) — and I'm always keen to hear what you're seeing on the ground.*
