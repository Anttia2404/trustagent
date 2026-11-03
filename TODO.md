# TrustAgent Landing Page — TODO

## Hero and product positioning
- [x] Present TrustAgent as Vietnamese legal intelligence infrastructure for the agent economy, not merely a legal chatbot.
- [x] Use the headline **“Legal Intelligence for the Agent Economy.”** and subtitle **“Discover specialized legal agents, pay per request, and verify every answer against the law that powered it.”**
- [x] Communicate the five core pillars: Legal RAG over a normalized, version-aware Vietnamese legal knowledge base starting with Vietnamese Traffic Law; ERC-8004 agent identity, discovery, reputation and validation; x402 pay-per-request API access; verifiable evidence for legal answers; and reviewed community contributions/rewards.
- [x] Clearly distinguish LIVE, MVP, DEMO and ROADMAP states; do not imply any feature is live unless verified by the implementation.

## ERC-8004 registries and agent discovery marketplace
- [x] Add the section **“Every Agent Has an Identity. Every Interaction Builds Reputation.”** and explain that ERC-8004 makes legal agents identifiable and discoverable across the agent ecosystem.
- [x] Show three distinct registries: Identity Registry (on-chain identity, name, Agent ID, registration status, capabilities and service endpoints, with discovery by other AI agents); Reputation Registry (client/agent feedback and illustrative answer quality, citation accuracy, successful requests and client feedback, clearly not real ratings/counts); and Validation Registry (independent validator's validation request, evidence reference and result, separate from ordinary user feedback).
- [x] Show the flow **Agent Registration → Agent Discovery → API Request → User Feedback → Validation → Reputation Updates**.
- [x] State that ERC-8004 registration does not automatically guarantee an agent is trustworthy; identity, reputation and independent validation are separate trust signals.
- [x] Add marketplace section **“Find the Right Legal Agent. Connect. Pay. Verify.”** with Traffic Law Agent — ACTIVE / MVP; Accounting Law Agent — ACTIVE / MVP; Labor Law Agent — COMING SOON; Tax Law Agent — COMING SOON; Enterprise Law Agent — COMING SOON.
- [x] Each marketplace card shows agent name/specialization, ERC-8004 identity status, Agent ID placeholder where not registered, available API capabilities, x402 support status, reputation/validation status and a View Agent Details action.
- [x] Label all placeholder/demo/simulated data explicitly. Do not invent real Agent IDs, wallet addresses, registry contract addresses, reputation scores, API endpoints, testimonials or production metrics.
- [x] Reference the official ERC-8004 standard: https://eips.ethereum.org/EIPS/eip-8004.

## Verifiable legal evidence and explorer
- [x] Add the section **“Every Answer Leaves Verifiable Evidence.”** and present this pipeline: legal question submitted by user/external agent → retrieve relevant legal documents → identify document version/effective date/applicable provisions → generate cited answer → evidence record → collect records into batches → optionally anchor a cryptographic batch commitment such as a Merkle root on-chain → independently verify that a record matches the committed batch.
- [x] Evidence record includes legal document hash, legal document version, RAG index/version identifier, referenced legal provisions, answer hash, timestamp and request identifier.
- [x] Visualize **Legal Documents → Versioned RAG Index → AI Answer + Citations → Evidence Record → Batch / Merkle Root → Blockchain Anchor → Independent Verification**.
- [x] Provide a clearly illustrative mock evidence explorer showing Request ID, legal document version, index version, answer hash, batch ID, blockchain transaction reference and verification status.
- [x] Explain that hashes and blockchain anchoring provide integrity and traceability, not legal correctness; never claim a hash proves an answer is legally correct.
- [x] Do not claim on-chain anchoring is already live unless implementation confirms it. Do not silently replace SHA-256 with another hash algorithm when backend implementation is unknown.

## x402 pay-per-request experience
- [x] Add the section **“AI Agents Pay Only for What They Use.”** and explain external AI agents can call the legal API and pay per request through x402.
- [x] Show **External Agent → API Request → HTTP 402 Payment Required → Payment Authorization → Payment Verification / Settlement → Legal Agent Executes RAG → Answer + Legal Citations + Evidence Receipt**.
- [x] Include a UI mockup with API endpoint placeholder, request status, example payment amount, USDC asset, agent identity, response preview and evidence receipt.
- [x] If shown, use a small illustrative amount such as **$0.02 USDC** only as a design example, never as actual production pricing.
- [x] Explain that x402 handles payment while ERC-8004 handles agent identity, discovery and trust signals; do not imply ERC-8004 processes payments.

## Community contributions, review and rewards
- [x] Add the section **“Help Improve Legal Intelligence. Get Rewarded for Verified Contributions.”** and explain community maintenance of the up-to-date Vietnamese legal knowledge base.
- [x] Show three contribution types: submit new legal documents/amendments/updated versions with metadata, source and validity checks; report potentially incorrect legal answers with question, answer reference and relevant legal source, verified by reviewers before knowledge-base changes; and qualified reviewers checking authenticity, legal references and corrections with an audit trail.
- [x] Show **Contribution Submitted → Quality & Authenticity Checks → Human Review → Approved Contribution → Reward Issued → Contribution History**.
- [x] Include anti-spam, duplicate detection, reviewer approval and histories of accepted and rejected contributions.
- [x] Do not automatically reward unverified submissions. Mark community rewards as planned/experimental unless implemented.
- [x] Rewards may be represented as platform tokens or USDC subject to future design; do not invent token names, supply, exchange rates, reward amounts or tokenomics.

## Unified architecture visualization
- [x] Include one polished visual connecting six separate but interconnected layers: Legal Knowledge (Vietnamese Traffic Law Documents → Normalization → Versioned RAG → Citation Verification); Agent (TrustAgent Orchestrator → Traffic Law Agent → Accounting Agent → Future Legal Agents); Trust (ERC-8004 Identity Registry → Reputation Registry → Validation Registry); Payment (External AI Agent → x402 → USDC Payment → Legal API Response); Evidence (Answer + Citations → Evidence Record → Batch Commitment → Blockchain Anchor); and Community (Contributors → Reviewers → Approved Legal Updates → Rewards).
- [x] Make the separation and connections between layers explicit without implying unimplemented production integrations.

## Final CTA, legal notice and presentation quality
- [x] Use final headline **“Build on Verifiable Legal Intelligence.”** and supporting text **“Discover TrustAgent agents, integrate legal intelligence into your AI products, and verify the evidence behind every answer.”**
- [x] Include CTA buttons **Explore Legal Agents** and **View Developer Docs**.
- [x] Keep the disclaimer visible: **“TrustAgent provides informational legal assistance and does not replace professional legal advice.”**
- [x] Build responsive desktop and mobile layouts using reusable React components, TypeScript, Tailwind CSS and Lucide React; use shadcn/ui and Framer Motion when compatible with the project.
- [x] Preserve the specified premium dark Web3 infrastructure aesthetic inspired by Linear, Vercel and Stripe; use subtle motion for agent discovery, payment flow and evidence verification.
- [x] Keep the result professional and suitable for a Web3 infrastructure product demo.
