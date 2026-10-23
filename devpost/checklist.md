---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. Paste a resume and get a grounded Gemini review**
  Becomes usable: The local website runs end to end: paste a sufficiently detailed resume, submit it to the backend, and see a compact playful roast, all distinct actionable quote-and-explanation suggestions in Real Talk, and their matching rewrites in a separate section below.
  Why now: This proves the project's unique kernel and the critical Gemini connection first; setup, UI, backend, and response validation are included so the slice is usable rather than just plumbing.
  PRD ref: `prd.md > The Core Journey`, `prd.md > Features and Behavior`, `prd.md > Look and Feel`
  Spec ref: `spec.md > Stack`, `spec.md > Where It Runs and How Someone Tries It`, `spec.md > Components`, `spec.md > Gemini Request and Response`, `spec.md > Data Model`, `spec.md > File Structure`
  Build: Set up Node.js/Express and the planned files; add a responsive one-page interface based on the scope mockup; load the Gemini key from `.env`; implement the review route and Gemini adapter; render the roast, validated resume-quoted suggestions, and matching rewrites in separate areas; include the provider disclosure; do not persist or log resume data.
  Verify (mechanical): Run JavaScript syntax checks, start the server, submit the agreed sample resume through the review route using the configured Gemini key, and verify every returned suggestion is prioritized, grounded in the submitted text, and paired with a rewrite; verify the interface keeps rewrites out of Real Talk and renders all returned suggestions (including a four-item validation fixture); inspect the response and server output for errors or leaked secrets. Use the documented `gemini-3.6-flash` model and confirm the account has free-tier quota.
  Learner check: Open `http://localhost:5500`, paste the sample resume, submit it, and check whether the compact roast, Real Talk explanations, and separate Rewrite section feel like the project you intended. Share any change you'd want before the remaining edge cases are finished.
  Commit: `Build resume review core journey`

- [ ] **2. Handle minimal input and review failures safely**
  Becomes usable: Empty or too-short text gets a pointed but kind roast with no suggestions; loading, repeat submissions, provider errors, and invalid Gemini replies have clear behavior without invented feedback or unsafe rendering.
  Why now: The successful core flow is in place; complete its required boundary states and failure handling before considering the proof of concept ready.
  PRD ref: `prd.md > Features and Behavior`, `prd.md > Acceptance criteria`, `prd.md > States and Boundaries`, `prd.md > Open Questions`
  Spec ref: `spec.md > Components`, `spec.md > Gemini Request and Response`, `spec.md > Important Failure Modes`, `spec.md > Data Model`
  Build: Add minimal-input handling, clear loading and retryable error states, repeat submission with edited text, response-shape and quote-grounding checks, output-safe rendering, and request-size limits. Keep the page disclosure accurate and confirm text/results remain only in active memory.
  Verify (mechanical): Check empty and short input returns a roast with zero suggestions and does not call Gemini; exercise a missing/invalid key and malformed provider response and confirm clear errors with no success-shaped fallback; submit a valid sample and verify all returned suggestions are grounded and paired with rewrites; run syntax checks and confirm the page still serves.
  Learner check: Try a blank submission, a very short one, and a second submission after editing the resume. Check that the page explains what happened and never shows made-up feedback.
  Commit: `Handle review edge cases`

## Hands-on Checkpoints

- [x] Early usable behavior explored — after slice 1; learner tried the review and gave early feedback. A Gemini 5xx interrupted their response, while a separate fictional API retry succeeded.
- [ ] Final kick-the-tires exploration and feedback completed — after slice 2; learner tries the full core journey and awkward inputs.

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms the proof of concept is ready to ship.

## Code Tour and App Map

- [ ] Learning activity complete — connect one actual review action to its page, server/API code, and observed verification.
- [ ] Optional edit and transfer reflection addressed — offer one harmless interface-text edit and one optional transfer question; record if declined.
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse.

Activity and evidence: [record what actually happened and the code or verification evidence]
Route and stops: [record actual source paths and stops completed]
Edit outcome: [record tried/kept/reverted/declined and verification]
Reflection: [record offered/answered/declined/already covered; personal answer only in ignored learner profile]
Activity mode: [live app and editor, explicit static fallback, focused alternative, prior practice, or recap]

## Revisions
- Replaced the original three-suggestion limit with all distinct, actionable improvements supported by the resume, and separated rewrites into a full-width section below Real Talk. The learner also chose a content-sized Roast card; this changes the approved result layout and output behavior at their request.
- After hands-on feedback, kept the outer panels' clipped corners subtly rounded and gave the inner text field, button, and status message a more pronounced curved border.
- Switched the local Express app's default port from 3000 to 5500 after stopping the conflicting VS Code preview; updated the run instructions to match.
- The learner's requests received Gemini temporary-unavailability errors; the server maps Gemini 5xx responses to this message. A separate fictional resume request succeeded with three grounded suggestions, indicating the 5500 app and API key can work while provider availability remains intermittent.
