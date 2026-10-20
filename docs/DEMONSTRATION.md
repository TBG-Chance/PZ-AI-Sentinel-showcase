# Synthetic demonstration contract

The interactive bridge is a static, authored illustration. It does not execute the Sentinel controller, verify a hash, contact a scanner or run a model.

All displayed endpoint and product names are invented: `DEMO-WS-01`, `Demo Runtime` and `Demo Editor`. Versions are illustrative. There is no real vulnerability identifier or affected-version claim.

## Assumptions

- Evidence scope, original bytes and mapping checks are **assumed valid**, not performed.
- The illustrative freshness window is **24 hours**. This is a demo choice, not a claim about every production policy.
- Assessment time is relative; observations are shown as two hours or 45 days before assessment.
- A matched scenario releases only an explanation attributed to the **demo scanner**. It does not independently establish vulnerability, exploitability or compromise.
- Five negative scenarios withhold the relationship explanation and identify the evidence gap.

| Scenario | Invented evidence | Authored outcome |
| --- | --- | --- |
| Matched | Same endpoint, product, exact version, recent inventory and finding | Release attributed explanation |
| Wrong product | Editor inventory paired with runtime finding | Withhold |
| Neighboring version | Inventory 8.0.2 paired with finding 8.0.1 | Withhold |
| Stale | Matching inventory observed 45 days earlier | Withhold |
| Missing | Finding without inventory | Withhold |
| Conflict | Findings disagree about the version | Withhold |

Scenario controls update the visible assessment. Export downloads only the selected invented scenario and explicitly states `live_assessment: false`, `engine_executed: false` and the assumed integrity condition. The presentation's console footer labels are visual context; the functional interaction is scenario selection and export.

No dashboard access key is required. The site has no login, telemetry, storage, backend requests or connection to the operator's private dashboard.
