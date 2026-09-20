---
title: "Who Needs You? An Experiment with Jev"
description: "I vibe coded a customer account triage tool as soon as I found Jev. Here's why small, fast AI judgments caught my attention, and what I built to try them out."
date: "2026-09-20"
lastUpdatedDate: "2026-09-20"
tag: "Experiments"
draft: false
---

As soon as I found out about [TypeSafe's Jev](https://docs.typesafe.ai/introduction), I knew I had to try it out. I could immediately see a use for it in a problem I spend a lot of time thinking about: working out which customers need our attention.

The result is [Who Needs You](https://whoneedsyou.vercel.app/). It takes a portfolio of 1,000 synthetic customer accounts and helps you decide where to look first.

It's an experiment, not a customer success platform. There are no real customers or CRM connections behind it. I wanted to try the idea without spending weeks building the plumbing around it.

## The bit I keep getting stuck on

Large language models (LLMs) have made it much easier to build things. I used them to help build this. But using them inside an application can still feel inefficient when all you need is a small decision, repeated a lot of times.

Does this account need attention? Is there evidence of a renewal problem? Who should pick it up?

I don't necessarily want a paragraph explaining each one. I want an answer the application can use, quickly enough and cheaply enough that I can ask across the whole portfolio. Waiting for responses, paying for generated output, and getting those responses into a dependable format have been a real pain point for me.

There are rules you can write instead. Usage down, renewal approaching, ticket open: add some points to a health score. That's useful until the reason behind the numbers matters. A seasonal dip and a team quietly moving to a competitor might look similar in a usage chart. The notes could tell quite different stories.

That's the part I wanted AI to help with.

## What Jev does differently

The way I'd explain it to a colleague is this: imagine handing someone an account record and a short form. Rather than asking them to write a report, you're asking them to select an answer or rate something against a clear scale.

Jev does that kind of work. It understands text, but [TypeSafe describes it as a “System One” model](https://docs.typesafe.ai/concepts/system-one), built for focused judgments rather than generating replies. It won't write your customer email or produce an explanation of its reasoning.

It has three ways to answer:

- **Choice:** pick from options you've supplied, such as which team should handle an issue.
- **Score:** rate something against a scale you've described, such as how urgently an account needs attention.
- **Noul:** return a probability for a yes-or-no question, such as whether the record contains evidence of an expansion opportunity.

Modern LLMs can return structured data too. The difference isn't that Jev can return a number and an LLM can't. Jev is trained for these constrained decisions and their probabilities, instead of generating text that represents the answer.

That gives the application something it can sort, compare, or use to decide what happens next. Choice and Score also report confidence. An uncertain answer can be sent to a person rather than quietly treated as fact.

## Six questions per account

Who Needs You asks about attention, churn evidence, expansion, urgency, the main issue, and the suggested owner.

Those six questions are evaluated independently against the same account record in one request. The record includes usage, support, engagement, commercial information, and recent notes. There is still a separate request for each account; this isn't one giant prompt containing the whole portfolio.

The app then uses ordinary code to combine the answers into **Act now**, **Review**, or **No action** bands and a priority ranking. Jev isn't being asked to invent the final priority score.

You can switch between attention, churn risk, and expansion views without asking the model again. The app reuses the same answers and changes how it combines them. I particularly like that separation: changing what the team wants to focus on doesn't require rewriting a prompt and rerunning the portfolio.

You can also open an account to see the original signals and the judgments behind its position. Where the suggested owner is uncertain, the app flags it for human review. That's more useful to me than a confident-looking recommendation with no way to inspect what went into it.

One important distinction: a high probability that a record contains churn evidence is **not** a prediction that the customer has that same probability of leaving.

## What the experiment showed

The [recorded run and methodology](https://whoneedsyou.vercel.app/methodology) report 6,000 judgments across 1,000 accounts in **9.37 seconds**, with 100 account requests running concurrently. The model cost came to **$0.0775**, calculated from the API's reported input-token usage at the published rate used for that run. That doesn't include hosting or the work of preparing the data.

The homepage replays that recorded run. There's a separate [live page](https://whoneedsyou.vercel.app/live) that calls the API, if you want to try a fresh run.

Those numbers made me want to keep exploring. They aren't a head-to-head benchmark against an LLM, and they don't prove this will work equally well on real customer records.

The synthetic accounts were deliberately built with recognisable patterns. In the recorded audit, the app missed one planted attention case and flagged one account intended to be quiet. Real CRM notes are often incomplete, stale, or contradictory. And identifying a pattern in synthetic data tells us nothing yet about whether an intervention would prevent a real customer from leaving.

Before using this for actual account decisions, I'd want to test the questions and thresholds against representative data, with the people who know those customers. [Typed answers don't guarantee correct judgments](https://docs.typesafe.ai/concepts/system-one), and confidence needs evaluating in context too.

## Where I'd like to take the idea

Portfolio triage is the obvious starting point for me. I'd also like to explore a few related jobs:

- **Onboarding:** distinguish a team that's genuinely blocked from one progressing at an agreed, slower pace, then help route the blocker to the right person.
- **Support queues:** read what a customer is describing and suggest a category or owner, leaving uncertain cases for someone to check.
- **Customer feedback:** sort notes and requests into useful themes so product teams have less material to sift through by hand.
- **AI workflows:** decide when a simple rule is enough, when a larger model is worth calling, and when a person needs to take over.

The potential benefit is spending less time sorting through information before doing something useful with it. If the judgments hold up on real data, their speed and cost could make it practical to revisit that sorting more often, across more accounts.

There's plenty of inspiration on [Jevable](https://jevable.com/), a directory of things people are building with Jev. You'll find experiments with forms that choose their next question, search that matches meaning rather than exact words, and code-review tools. It's worth browsing to see how differently people are applying the same small set of capabilities.

For now, [Who Needs You is there to try](https://whoneedsyou.vercel.app/), and the [code is on GitHub](https://github.com/ddlaws0n/jevportfolio). If you work with a large customer portfolio, I'd be interested in which signals you'd trust, which you'd challenge, and what would make the shortlist useful on a Monday morning.
