# Capabilities and boundaries

Status reviewed: 20 October 2026. These descriptions summarize the private development implementation; this public repository contains the presentation and simulated bridge only.

| Area | Current development capability | Boundary |
| --- | --- | --- |
| Evidence retrieval | Bounded read-only MDF raw-evidence adapter, scoped to authorized source and tenant | Source authorization and record availability remain required |
| Evidence integrity | Original-byte hashing and exact mapping-history verification | A valid hash does not prove that an upstream observation was true |
| Finding relationship | Endpoint, product, exact version, observation time and specific finding checks | Explicit .NET runtime, Python Core Interpreter and Node.js profiles; no universal affected-version inference |
| Explanation release | Controller-owned, scanner-attributed explanation after required checks | Does not establish exploitability or compromise |
| Retention | Persisted sessions, evidence references, hash-linked ledger and restart checkpoint verification | Local checkpoints are not independent external attestation |
| Operator workflow | Configured Run Analysis, progress, cancellation and completed session loading | Analyzes preserved records; no automatic fresh inventory collection |
| Model use | Optional explicit local inference through typed controller services | Runtime/model identity is operator-declared; no general semantic accuracy claim |
| Remediation | Advisory source guidance, with .NET recommendations attributed to Pr0jectZer0 | No autonomous patch application |

## Next milestones

1. Independently review the untouched 18-case prospective synthetic packet before model runs.
2. Repeat evaluation with retained failures and independently established permitted outcomes.
3. Expand beyond current product profiles and scenario templates without tuning against held-out answers.
4. Continue fresh, authorized endpoint validation and operator usability qualification.

Broader model-written semantic entailment, calibrated uncertainty, universal vulnerability detection, production qualification and autonomous remediation are not established by this work.

## Public content boundary

This showcase contains newly authored presentation code, invented demonstration records and aggregate research summaries. It contains no private source engine, raw lab observations, endpoint identifiers from the lab, credentials, databases, audit logs, internal service addresses or model artifacts. The browser illustration does not access operational services.
