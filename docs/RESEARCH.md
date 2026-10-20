# Research status: gate behavior is not model accuracy

Status reviewed: 20 October 2026. The figures below summarize retained private development experiments. The public repository does not include the raw experiments or supply independent reproduction of them.

## Datasets

- Original frozen synthetic corpus: **48 cases**, unchanged.
- Separate development set: **36 synthetic cases**, across .NET runtime, Python Core Interpreter and Node.js, two invented endpoints and six evidence conditions.
- Additional prospective set: **18 synthetic cases**, with a third invented endpoint and new versions. No model answers have been generated. Independent blinded human review is pending.

The evidence conditions are matching evidence, wrong product, neighboring version, stale observation, missing inventory and conflicting findings. The prospective set shares templates with development cases; it does not establish unseen-template generalization. These records are synthetic, not additional real endpoint observations.

## Retained development runs

Both configurations used local Qwen3-4B Q4_K_M with llama.cpp b10964, three repetitions per case, temperature zero and a 128-token output limit. Model/runtime identity remains operator-declared, rather than cryptographically attested.

| Configuration | Attempts | Unsupported released | Useful released | Supported withheld | Failed attempts | Unsupported model proposals |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Broad response envelope | 108 | 0 | 3 | 15 | 103 | 2 |
| Bounded decision schema | 108 | 0 | 18 | 0 | 0 | 90 |

**All counts use proposed author labels. Independent review is incomplete.** Each run has 18 supported and 90 withholding opportunities. Failed attempts are retained and count in the supported-withheld denominator where applicable; the failure column is not a separate mutually exclusive outcome category. Unsupported model proposals count parsed typed proposals and do not hide the broad-envelope run's 103 failures.

The bounded-schema model proposed `supported` for **all 108 attempts**. The controller blocked all 90 proposals that contradicted the proposed negative labels. The schema fixed response formatting; it did not establish improved reasoning. Zero unsupported releases is evidence of this bounded gate on these generated cases, not a general safety guarantee.

The experiment scores a typed relationship selection, not unrestricted model prose. A controller-owned explanation is released only after the required integrity, mapping and relationship checks pass. Model-written remediation is not released.

## Acceptance still outstanding

Independent labels must be fixed before prospective model answers are inspected. Every attempt, parse failure, transport failure and gate result must remain in the record. Further evaluation should report unsupported releases, useful releases, supported conclusions withheld and failures, rather than a single flattering success percentage.

The goal remains useful, correctly attributed explanations whose evidence relationship can be inspected—and withholding when that relationship is unsupported.
