---
title: "Vacation Rental Valuator"
summary: "Appraises properties relative to their markets — trained on-demand allowing for what-if competitive analysis."
thumbnail: "/images/projects/str-valuator.svg"
tags: ["Simulation", "Explainability", "Ranking"]
order: 2
draft: false
---

## Overview

Hosts, investors & platforms need to know what a short-term rental is
worth — not just an absolute nightly rate, but how it ranks against
comparable listings nearby. This project is an automated valuation model
(AVM) that appraises a target property — using attributes like location,
room counts, images, amenities & building type — & ranks its relative
value within its market.

## The Challenge

- High-end & low-end markets behave differently from one another
- Markets drift seasonally & move at different velocities
- A single one-model-fits-all approach was too erroneous
- Training one model per region was too constrained to scale
- Perpetually retraining every regional model was too expensive & wasteful

## Approach

- Deployed as an on-demand-training, lightweight random forest model
- Users select a custom market area of their own choosing
- The model retrains on the latest available data on demand, avoiding drift
  from stale training sets

## Results

- Used SHAP to explain the relative contribution of each feature to a
  property's value — e.g., $/bedroom/day
- Enabled what-if simulations: "what if I added a hot tub?", "repurposed a
  bedroom as a game room?", or "renovated the kitchen?"
- Simulated supply/demand pressure by flooding or removing market competition