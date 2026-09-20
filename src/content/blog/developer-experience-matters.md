---
title: "Why Security Tools Go Unused"
description: "Slow scans, noisy findings, and awkward setup all give developers reasons to work around a security tool. Those details deserve more attention."
date: "2026-02-22"
lastUpdatedDate: "2026-09-20"
tag: "DevEx"
draft: false
---

Buying a security tool and getting developers to use it are separate jobs.

My time working with enterprise application security customers at Veracode is part of why I'm interested in the second one. A product can meet the security team's requirements and still be difficult to fit into a developer's day.

I think we underestimate how much that matters. If the scan is slow, the setup is confusing, or the output needs a specialist to interpret it, every use asks something extra of the person doing the work.

## Follow one finding through the workflow

Imagine a developer opening a pull request and getting a failed security check. They follow the link, sign into another tool, and find a warning with little explanation. They're not sure whether it's relevant or how to fix it.

That's a hypothetical example, but it's a useful way to assess the experience. Can the developer get from the warning to a decision without asking someone to translate it?

I'd want the finding to explain what was detected, where it is, and why it matters in this case. If there's a suggested fix, it should fit the language or framework involved. A link to a general article may help, but it can also leave the developer doing most of the investigation.

It's worth walking through that process yourself before deciding the team needs more training.

## Waiting and noise both cost time

A scan result is easier to act on while the change is still in your head. When feedback arrives much later, you have to pick the work up again. I'd measure how long developers wait and where that wait happens, then decide which checks belong in a pull request and which can run separately.

The volume of findings matters too. Showing everything a tool detects can bury the issues that need attention. But hiding findings just to make the numbers look better is a poor trade.

I'd work with the security team to agree which findings should interrupt development, which need review, and how exceptions are handled. Then I'd check whether those choices are producing useful results. Low noise is helpful only if we're still catching the problems we need to catch.

## Start with the workflow people already have

Before asking developers to open another dashboard, I'd see what can be done in their existing tools: the IDE, the pull request, or the build pipeline.

That won't suit every task. Security teams may need a wider view, and some investigations need more detail than a code review can hold. But a developer making a small change shouldn't have to learn the whole platform to understand one finding.

I'd start with a small group, watch where they get stuck, and adjust before a wider rollout. A successful installation is a useful milestone. It doesn't tell you yet whether anyone can comfortably use the thing.

Good tooling still needs to detect the right problems. Ease of use can't compensate for missing important risks. But if people routinely bypass a check, I'd want to understand why before adding another policy telling them not to.
