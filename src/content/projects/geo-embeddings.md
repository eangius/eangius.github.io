---
title: "Geo Embeddings"
summary: "Pre geo2Vec, learn representations of neighborhoods enabling semantic discovery & similarity search across different areas."
thumbnail: "/images/projects/geo-embeddings.svg"
tags: ["embeddings", "geospatial", "semantics"]
order: 7
draft: false
---


## Overview
Real estate developers & site-selection teams need to find locations similar to their successful properties — but "similarity" is abstract. Are two neighborhoods similar because they share demographic profiles, commercial activity, transit access, or neighborhood "vibe"? This project learns dense 128-dimensional embeddings of geographic areas (postal codes, cities, counties) that capture this latent character, enabling semantic search without requiring users to specify which variables matter.

## The Challenge
* No clean training signal: similarity between distant geographic areas isn't obvious; you need to distinguish "different because far apart" from "genuinely different in character"
* Geographic hierarchy doesn't align neatly: postal codes, cities, and counties have overlapping boundaries that complicate aggregation
* Edge effects: coastal, border, and river-adjacent areas have fewer meaningful neighbors, skewing training
* Feature weighting: deciding which characteristics matter most — should a neighborhood's income level outweigh its restaurants-per-capita? — requires domain judgment
* Evaluation requires human judgment: no ground truth exists for what makes two neighborhoods "similar," only domain intuition

## Approach

* Feature Engineering: Assembled a rich profile for each geographic area combining geometry (land area, dimensions), demographics (population density, age distribution, income), points of interest (restaurants, schools, parks per km²), environment (precipitation, temperature, elevation), and transportation infrastructure (road composition, bike paths, highways). Normalized all features to a common scale so income levels don't overshadow density metrics.
* Embedding Architecture: Built a Word2Vec-inspired approach treating geographic areas as vocabulary and spatial relationships as context. Trained a shared neural encoder to transform each area's feature profile into a learned embedding. Designed hierarchical embeddings at three levels (county 16D + city 48D + postal 64D = 128D final) to capture different scales of geographic abstraction.
* Training Pairs: Generated positive examples by identifying geographic neighbours via polygon buffering, weighted by how close their centers are (closer areas get more influence). Sampled negative examples from distant, non-adjacent areas, but filtered out false negatives—distant areas that nonetheless share similar characteristics—using raw feature similarity. This prevents the model from simply learning "far away = different."
* Validation: Surveyed staff to rank triplets of locations by perceived similarity, then aggregated their rankings into a ground-truth gold set of positive & negative examples. Evaluated retrieval quality using NDCG@K—a ranking metric that scores how well similar areas appear near the top of search results—against this human-judged baseline.
* Retrieval: Stored embeddings in a vector database and used Approximate Nearest Neighbour search (fast similarity lookup) to retrieve neighborhoods semantically similar to a query.

## Results
* Semantic retrieval outperformed baseline cosine-similarity-on-raw-features in ranking quality against human judgments
* Enabled vector arithmetic: e.g., Toronto − Yorkville + Montreal ≈ Outremont, showing the embeddings captured meaningful geographic "analogies"
* Demoed to company: real estate developers specified successful locations and retrieved semantically similar candidates across different cities, validating the model discovered meaningful neighborhood analogues
* Methodology proved portable: designed to scale from Canada POC to North American coverage with adjusted feature sets
* Users could search by describing desired characteristics ("dense, walkable, cultural venues") without knowing which latent variables matter