---
title: "Probabilistic Geocoder"
summary: "Resolves noisy, ambiguous & privacy-protected location references from web data into a best-effort polygon & confidence-weight."
thumbnail: "/images/projects/probabilistic-geocoder.svg"
tags: ["NLP", "Geospatial", "Probabilistic Modeling"]
order: 5
draft: false
---

## Overview

Web data — blogs, social posts, classifieds, news, registries — constantly
reference *where* something happened, but rarely with a clean street address.
Locations are implied through landmarks ("in front of the McDonald's"),
relations ("near X", "between A & B"), or coordinates that are jittered,
IP-derived, or otherwise imprecise by design. This project is a probabilistic
geocoder: an event-location disambiguator that takes such fuzzy references &
returns a best-effort polygon plus a confidence weight, rather than forcing a
single false-precision point. It underpins the spatial-resolution layer of
[Neighbourhood Vibes](/projects/neighbourhood-vibes/).

## The Challenge

- Location signals are inherently fuzzy — GPS error, untrusted or biased
  sources (e.g. a promoter's post tagged with their location instead of
  the venue), & privacy practices that deliberately jitter or blurr
  coordinates
- Off-the-shelf geocoders expect a well-formed address or a POI name & return a single coordinate or polygon representing the precise know location for that entity —
  they can't resolve contextual references like "in front of the McDonald's", "near downtown" or "within 200m".
- The same place name can refer to multiple real locations (e.g. several
  areas called "Windsor" within Canada), requiring context to disambiguate
- Any NLP-based location extraction carries false positives & false
  negatives — the system has to decide what to do with both
- No labeled "true location" dataset exists for this kind of text, so
  accuracy can't be checked directly against ground truth

## Approach

- Extracted candidate place mentions using traditional NER: gazetteer-based
  place lists, heuristic/regex patterns (e.g. "-ville", "-opolis"), grammar
  rules, & co-reference resolution for relational phrases ("near", "corner
  of")
- Scored every candidate with a 0-100% confidence; mentions below ~50% (e.g.
  an unqualified "Main Street") were dropped rather than guessed
- Converted relational phrases into geometric buffers/corridors around the
  resolved entity, sized by that entity's level in the geometry hierarchy —
  e.g. ~200m around a POI like a McDonald's, ~5km around a city like Montreal
- Disambiguated repeated place names using other context within the same
  event (e.g. a co-mentioned city); if no such hint existed, the mention was
  dropped
- Mapped each event to the smallest geometry in the hierarchy (block →
  neighbourhood → city → metro → province → country) that fully contained it
  — sometimes multiple geometries for events spanning an area (e.g. a route
  between two neighbourhoods)
- Stored each event once at its natural-fit level; on read, finer-granularity
  queries inherit the full event & coarser-granularity queries dilute its
  weight by the parent area's size

## Results

- Every event resolves to a polygon (or set of polygons) plus a 0-100%
  confidence weight reflecting how likely it truly occurred there
- False negatives (dropped ambiguous mentions) were an acceptable cost —
  downstream consumers never assumed a complete view of all events
- False positives were the real risk, particularly *systematic* ones (e.g. a
  source that consistently mis-locates events) — random noise washes out at
  scale via the law of large numbers, but systematic bias compounds instead
- Proven end-to-end as the spatial-resolution layer of
  [Neighbourhood Vibes](/projects/neighbourhood-vibes/)