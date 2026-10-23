---
doc: prd
status: approved
---

# Roast My Resume — Product Requirements

A one-page resume reviewer for students, freshers, and early-career job seekers: it pairs a playful roast with practical, resume-grounded improvements.
Source: `scope.md > Who It's For`, `The Unique Kernel`, and `The Core Loop`.

## The Core Journey

1. The user opens one page with a resume text box and result areas for **The Roast**, **Real Talk**, and **Rewrite**.
2. They paste resume text and submit it once.
3. For enough resume text to review, the page shows a short, sarcastic-but-not-cruel roast and every distinct, actionable Real Talk suggestion supported by the resume, prioritized by importance.
4. Each Real Talk suggestion quotes text the user actually provided and explains what could improve. Its matching rewrite appears in the separate Rewrite section below. If the resume does not provide facts needed for a rewrite, it uses a clear placeholder rather than making anything up.
5. The user reads the roast and can use the suggestions to improve their resume.

If the input is empty or has fewer than five words, show a more pointed roast about the missing or minimal input and leave Real Talk and Rewrite empty. Do not call Gemini or invent resume details.
Source: `scope.md > The Core Loop` and `What "Working" Looks Like`.

## Screens and Layout

There is one page and one paste-to-results flow. The resume input sits above the results; the roast and Real Talk appear side by side, with the separate Rewrite section below them. The roast card fits its content instead of stretching to match Real Talk. The page includes a clear note about how pasted text is handled.
Source: `scope.md > The Core Loop`, `What "Working" Looks Like`, and `The POC Boundary`.

## Look and Feel

Keep the current palette shown in the scope companion: warm orange for the roast and blue for Real Talk. The roast should feel playful and sarcastic without being cruel; Real Talk should be calm, clear, and constructive.
Source: `scope.md > Inspiration & Identity`; the learner confirmed the current colors are fine.

## Features and Behavior

### Resume review

- The user can paste resume text into the page and submit it for review.
- With enough text to review, show a short roast and every distinct, actionable, resume-grounded feedback item, prioritized by importance. Do not impose a fixed suggestion count or include weak/repetitive items.
- Every Real Talk item contains a quote from the submitted resume and an explanation of the issue. Show the matching suggested rewrite in a separate Rewrite section below Real Talk.
- Rewrites must not invent accomplishments or other facts. Use an unmistakable placeholder when relevant facts are missing.
- When the input is empty or has fewer than five words, show only the roast; leave Real Talk and Rewrite empty and do not call Gemini. A blank submission gets a more pointed roast about not entering text.
- The roast remains funny rather than cruel, including when the user submits little or no text.

**Acceptance criteria**

- [ ] Submitting a usable resume produces a roast and all distinct, actionable, grounded feedback supported by its text, with no fixed three-item limit.
- [ ] Each Real Talk item quotes text present in the submitted resume and includes an explanation; its corresponding rewrite appears only in the separate Rewrite section.
- [ ] A rewrite never presents a missing accomplishment or fact as true; it uses a clear placeholder instead.
- [ ] Submitting empty text or fewer than five words displays only a roast, with Real Talk and Rewrite empty and no Gemini request.
- [ ] The page displays a truthful note about pasted-text handling; its wording matches the actual behavior.

## States and Boundaries

- **Before submission** — The user can see where to paste their resume and where the two kinds of results will appear.
- **Enough text to review** — Show the roast, all useful prioritized grounded suggestions in Real Talk, and their matching rewrites in the separate Rewrite section.
- **Empty or fewer than five words** — Show the roast only; leave Real Talk and Rewrite empty without calling Gemini.
- **Pasted-text handling** — Explain accurately what happens to submitted text. Do not promise that it is not stored unless the implementation guarantees that.

## Product Decisions

- Keep the product to one page and one paste-to-results flow; accounts, file uploads, and a persistent database are outside this proof of concept.
- Preserve the split between a playful roast and useful, grounded feedback; it is the distinctive part of the idea.
- Include every distinct, actionable feedback item supported by the resume; do not pad weak suggestions or cap the list at three.
- For empty input or text with fewer than five words, show a roast only and leave Real Talk and Rewrite empty without calling Gemini.
- Keep the current orange-and-blue colors.

## What We're Building

- One page with a resume text input, a compact roast result, a Real Talk result, and a separate Rewrite section below the results.
- A short, playful roast plus all distinct, actionable prioritized suggestions supported by usable resume input; each quote and explanation appears in Real Talk, with its matching rewrite shown separately.
- Roast-only behavior for empty input or text with fewer than five words.
- A truthful note describing how pasted text is handled.

## Deferred From the POC

- Accounts and saved profiles — not needed to demonstrate the one-page core loop.
- File uploads — paste-only keeps the first version small.
- Persistent database storage — not needed for this proof of concept.

## Possible Later Enhancements

No later features have been identified yet.

## Non-Goals

- Creating accounts or saving resumes for future visits.
- Uploading resume files.
- Storing resume reviews in a persistent database.
- Making up resume facts to produce a more impressive rewrite.

## Resolved in 4-spec

- The app sends pasted resume text from its backend to Google's Gemini API for review. The app does not save resumes or results to a database or browser storage. Google's unpaid Gemini API terms may allow submitted content to be used to improve Google products and processed by human reviewers, so the page must disclose this accurately. See `spec.md > Data Model` and `spec.md > Decisions and Open Issues`.

## Open Questions

- **Can be settled during the build:** Can the user edit the pasted text and submit again on the same page, or is the proof of concept intended to show only one review per visit? The scope establishes one page and one paste-to-results flow but does not specify repeat submissions.
