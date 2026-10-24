---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. Paste a resume and get a grounded OpenRouter review**
  Becomes usable: The local website runs end to end: paste a sufficiently detailed resume, submit it to the backend, and see a compact playful roast, all distinct actionable quote-and-explanation suggestions in Real Talk, and their matching rewrites in a separate section below.
  Why now: This proves the project's unique kernel and the critical model connection first; setup, UI, backend, and response validation are included so the slice is usable rather than just plumbing.
  PRD ref: `prd.md > The Core Journey`, `prd.md > Features and Behavior`, `prd.md > Look and Feel`
  Spec ref: `spec.md > Stack`, `spec.md > Where It Runs and How Someone Tries It`, `spec.md > Components`, `spec.md > OpenRouter Request and Response`, `spec.md > Data Model`, `spec.md > File Structure`
  Build: Set up Node.js/Express and the planned files; add a responsive one-page interface based on the scope mockup; load the OpenRouter key from `.env`; implement the review route and OpenRouter adapter; render the roast, validated resume-quoted suggestions, and matching rewrites in separate areas; include the provider disclosure; do not persist or log resume data.
  Verify (mechanical): Run JavaScript syntax checks, start the server, submit fictional sample resume text through the review route using the configured OpenRouter key, and verify every returned suggestion is prioritized, grounded in the submitted text, and paired with a rewrite; verify the interface keeps rewrites out of Real Talk and renders all returned suggestions (including a four-item validation fixture); inspect the response and server output for errors or leaked secrets. Confirm the configured model is `nvidia/nemotron-3.5-lightning:free` and available to the account.
  Learner check: Start the Express app with `npm.cmd start`, open `http://localhost:5500`, paste the sample resume, submit it, and check whether the compact roast, Real Talk explanations, and separate Rewrite section feel like the project you intended. Stop it with Ctrl+C in the terminal when finished.
  Commit: `Build resume review core journey`

- [x] **2. Handle minimal input and review failures safely**
  Becomes usable: Empty or fewer-than-five-word text gets a pointed but kind roast without a model call; loading, repeat submissions, provider errors, and invalid model replies have clear behavior without invented feedback or unsafe rendering.
  Why now: The successful core flow is in place; complete its required boundary states and failure handling before considering the proof of concept ready.
  PRD ref: `prd.md > Features and Behavior`, `prd.md > Acceptance criteria`, `prd.md > States and Boundaries`, `prd.md > Open Questions`
  Spec ref: `spec.md > Components`, `spec.md > OpenRouter Request and Response`, `spec.md > Important Failure Modes`, `spec.md > Data Model`
  Build: Return a local roast for empty or fewer-than-five-word input without calling the model; keep clear loading and retryable error states, repeat submission with edited text, response-shape and quote-grounding checks, output-safe rendering, and request-size limits. Keep the page disclosure accurate and confirm text/results remain only in active memory.
  Verify (mechanical): Check empty and four-word input return a roast with zero suggestions and no model call; check five-word input reaches the configured-key guard; exercise a missing/invalid key, rate limit, provider 5xx, and malformed model response and confirm clear errors with no success-shaped fallback; submit a fictional sample and verify all returned suggestions are grounded and paired with rewrites; run syntax checks and confirm the page still serves.
  Learner check: Try a blank submission, a very short one, and a second submission after editing the resume. Check that the page explains what happened and never shows made-up feedback.
  Commit: `Handle review edge cases`

## Hands-on Checkpoints

- [x] Early usable behavior explored — after slice 1; learner tried the review and gave early feedback. The previous Gemini billing issue blocked the live review.
- [x] Final kick-the-tires exploration and feedback completed — learner confirmed a full review works and blank or short input shows only the roast.

## Final Review

- [x] Final review complete — the learner asked to proceed to `6-ship` after the live API and browser checks; no further changes were requested.
- [x] Re-verified a full OpenRouter review with a fictional resume: the required structured tool call returned five grounded suggestions with rewrites, and the learner confirmed their review worked.
- [x] Rounded the Roast and Real Talk card corners to match the resume input; learner confirmed the result.
- [x] Retested the Maya-style resume through the live API after the prompt update: the roast targeted the tense mismatch, and the response did not invent a date or CRM detail or criticize the strong metric/account scope.
- [x] Retested the Maya-style resume with curated prompt examples through the live API: two grounded suggestions called out the tense mismatch without criticizing the 71%-to-89% metric or account scope; no CRM or unsupported date was introduced.
- [x] Retested The Roast in the browser with the Maya-style resume: it specifically teased the tense mismatch in one sentence without insulting the applicant.

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
- The learner's later requests exposed an upstream HTTP 402 billing requirement with the previous provider. The OpenRouter model is configured as `nvidia/nemotron-3.5-lightning:free`.
- Added a roast-only local response for blank or fewer-than-five-word input and surfaced provider HTTP statuses for quota, billing, model, and availability errors so they are easier to distinguish.
- Switched the approved review provider to OpenRouter and `nvidia/nemotron-3.5-lightning:free` at the learner's request. Resume text now goes through OpenRouter to that model provider; updated the API adapter, environment variable names, and provider/privacy documentation accordingly.
- Increased the upstream timeout to 90 seconds because the selected free model did not finish a fictional test within the prior 45-second limit.
- A short request with a deliberately small 2,048-token limit exhausted that limit before returning complete JSON. The adapter uses an explicit JSON prompt and reports response-limit exhaustion; a short test at a larger token limit returned valid JSON, but the full review remains unverified.
- A live fictional review returned JSON that lacked required fields, exposing that the prompt had not named the complete response schema. The required keys and types are now explicit; the full live review remains unchecked until a retry succeeds.
- The learner once saw a directory listing from VS Code Go Live on port 5500; Go Live is separate from the Express app started with `npm.cmd start`.
- After the learner's demo resume showed a generic failure, investigation found upstream timeouts while reading a response body were escaping timeout handling. These now return a clear retryable HTTP 504 message, like request timeouts during connection.
- The selected free model timed out again during the learner's hands-on test. Without changing the selected model or removing the no-fixed-suggestion-limit behavior, the request now prefers OpenRouter's lowest-latency compatible provider and asks for concise feedback. A live fictional test is needed to verify whether this reduces delays; the learner's reported timeout remains unresolved.
- The selected free-model catalog entry does not advertise OpenRouter's `response_format` parameter, unlike its paid base-model entry. A tiny JSON-only prompt succeeded without that parameter, so it was removed while retaining server validation. A full request exhausted the 8,192-token budget at minimal reasoning; a tiny request with reasoning disabled returned valid JSON in one second and used zero reasoning tokens. With reasoning disabled, the full fictional API review succeeded in four seconds with five grounded suggestions.
- The learner received an invalid-JSON error from the free Nemotron Lightning model. OpenRouter's catalog advertises tool calling and `tool_choice` for this model but not `response_format`; the adapter now requires a schema-defined `submit_resume_review` tool call and routes only to providers supporting the request parameters, preserving the selected free model.
- Final-review feedback: the Roast and Real Talk boxes had angular clipped corners while the resume input was rounded. Their corners now match the input; the bold clipped outer panels remain unchanged.
- Final-review feedback: added curated prompt examples and guidance to prioritize supported writing issues, preserve strong metrics and scope, and avoid unsupported claims.
- Final-review feedback: the roast sounded too polite. Tightened its prompt requirements and examples to make jokes sharper about corporate fluff while keeping them text-specific and non-personal.
- A live sharper-roast test invented a date issue and a CRM detail. Reinforced grounding for roast premises and rewrites; verify no resume facts are invented in the next live retest.
- The final prompt review found a remaining instruction that still capped suggestions at three; removed it and restored the resume-as-data and non-cruelty guardrails.
- At the learner's request, Express now defaults to port 5500 for starting and stopping the full app with `npm.cmd start`; VS Code Go Live remains a separate static server.
- The learner chose to keep the current single-column stack for Roast, Real Talk, and Rewrite; updated the scope, PRD, spec, and HTML companions to match.
