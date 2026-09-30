# Repository Security and Execution Standard

## Authority
This repository remains a separate engineering asset. Its code, credentials, data, deployment configuration, and evidence are not automatically shared with other repositories.

## Execution path
GitHub change -> validation -> build -> approved deployment path -> smoke checks -> evidence.

## Privileged access
Every privileged actor must have an assigned responsibility, explicit scope, authorization level, and auditable identity. Least privilege is mandatory.

## Protected actions
Deployment, credentials, customer or operational data, domains, billing, destructive changes, and access-policy changes require controlled authorization.

## Accountability
A material control bypass triggers immediate access suspension and incident review. Documented remediation costs, contractual remedies, indemnification, or enforceable contractual penalties may apply where expressly agreed and lawful. Financial consequences are proportionate and never replace technical security controls.

## Evidence
Material execution records commit, actor, action, environment, timestamp, checks, deployment result, smoke result, and evidence reference.

## Separation
No cross-repository authority or secret sharing without explicit authorization.

## Execution priority
Use the approved ResellerPro execution/deployment path for applicable workloads.
