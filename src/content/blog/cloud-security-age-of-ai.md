---
title: "What I'd Ask Before Trusting an AI Security Feature"
description: "The questions I'd bring to an evaluation: what data it uses, how to check its answers, and what happens when it gets something wrong."
date: "2025-12-08"
lastUpdatedDate: "2026-09-20"
tag: "Security"
draft: true
---

When I look at an AI security feature, I want to understand what work it will take off someone's plate and how they'll know whether it did that work correctly.

A convincing explanation of a finding is useful. It isn't enough for me to trust the recommendation, especially if the next step could change a production system.

These are the questions I'd bring to an evaluation. They're a starting point, rather than a report of results from a particular customer deployment.

## What can it see?

I'd start with the data. Which cloud accounts, resources, and findings can the feature access? Does it know anything about the application or the team responsible for it? How old is that information?

I'd also ask what happens when something is missing. If an account isn't connected or a permission blocks access, I want that gap to be visible in the answer.

There are access questions beyond the model itself. Where does the data go, how long is it retained, and can the feature reveal information the person using it isn't allowed to see? I'd want those answers before putting sensitive customer or infrastructure data into an evaluation.

## Can I check the recommendation?

Suppose a tool says a finding is urgent because a resource is exposed to the internet. I want a route back to the evidence: which resource, which configuration, when it was checked, and what makes that exposure relevant.

I don't need a long explanation of every internal step. I need enough information to verify the claim and decide what to do next.

I'd test it with cases the team already understands, including ambiguous ones. Can it distinguish a confirmed problem from something that needs investigation? Does it tell us when it doesn't have enough information?

## What is it allowed to do?

Summarising a finding and changing a firewall rule carry different risks. I'd evaluate them separately.

For anything that changes an environment, I'd want clear permission boundaries, a record of the action, and a way to recover if it goes wrong. I'd start with approval before execution and only consider more autonomy after seeing how it behaves on the actual task.

The fallback matters too. If the feature is unavailable or the team doesn't trust its answer, can they still investigate and act using the underlying tools?

## Does it save time once we include checking?

I'd measure the full task, including the time spent reviewing the output and correcting mistakes. A fast draft can still create a slow investigation.

For triage, that might mean comparing how long it takes to reach a sound decision with and without the feature, while checking for important findings that were missed or wrongly dismissed. I'd start with a bounded trial, rather than assume a good demonstration will translate into day-to-day results.

The feature I'd be interested in keeping is one the team can use, check, and recover from when it makes a mistake. I'd rather establish that on a small task first.
