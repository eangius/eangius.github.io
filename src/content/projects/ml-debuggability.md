---
title: "ML Debuggability"
summary: "Instruments tree-based models with learn-time metadata & run-time signals to diagnose why any prediction went wrong."
thumbnail: "/images/projects/ml-debuggability.svg"
tags: ["MLOps", "Explainability", "Tree Models"]
order: 6
draft: false
---

## Overview

When a deployed tree-based model (decision tree, random forest, boosted trees, ..)
produces a bad prediction, an engineer needs to know what to do about it —
ship a code fix, expensive re-train, design new features, or explain why this is
a tolerable edge-case. Feature vectors, model scores & raw inputs alone don't
say which. This project is a model-debugging toolkit, pioneered before
SHAP & perturbation-based explainability techniques became mainstream, which
opened up the black box of any tree ensemble so anyone can triage a bad
prediction's root cause.

## The Challenge

- A bad prediction can stem from several distinct root causes, each
  demanding a different remedy:
  - a programming bug (exception, edge case, faulty implementation)
  - a model blind spot (a missing feature, unsampled training data)
  - a domain outlier (a genuinely hard or ambiguous case)
  - distribution shift (inputs have changed since training)
  - label shift (expectations of "correct" has changed)
- Feature vectors, probability scores & raw data alone can't distinguish between these.
- Had to remain agnostic to model type, hyperparameters, feature space &
  domain — usable on any tree ensemble, for any use case
- No existing way to compare what a model saw during training against what
  it encounters at inference time

## Approach

- At learn time, instrumented the trained forest with metadata:
  - hyperparameters used, number of training examples, & classification
    breakdown
  - feature importance against the test set, & the fraction of available
    features actually used
  - per-tree & per-node stats — shortest/longest/average path length, &
    the distribution of feature values & training-example counts seen at
    each node
- At run time, traversed each datapoint through the forest & contrasted its
  behavior against that learn-time metadata to derive 3 signals:
  - **Path length** — how deep a datapoint travels relative to the
    forest's average, proxying how novel or difficult the case is (an
    unusually shallow path can signal incomplete learning; an unusually
    deep one can signal an outlier or an overfit model)
  - **Result confidence** — cumulative tree-vote confidence rather than a
    simple majority vote, flagging predictions likely to flip-flop on
    retraining
  - **Feature frequency** — how often each feature fires along a
    datapoint's paths, normalized by how often that feature appears in the
    forest overall, surfacing which features actually drove (or failed to
    drive) the decision
- Packaged these signals into a debug object attached to every prediction &
  surfaced them in an in-house review UI

## Results

- Let engineers triage a bad prediction into a code fix, feature
  engineering, a retrain, or an accepted domain edge case — without
  re-running experiments
- Independently arrived at ideas later popularized by SHAP &
  perturbation-based explainability methods
- The review UI doubled as a labeling tool, feeding flagged examples back
  as labeled data for the next training generation
- Model & domain agnostic — the same framework applies wherever a tree
  ensemble produces a classification