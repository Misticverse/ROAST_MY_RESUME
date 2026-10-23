---
doc: spec
status: approved
---

# Roast My Resume — Technical Spec

## How This Works, In Plain Language

The website is a page in your browser. You paste your resume and press the review button. A small Node.js server receives the text and sends it, with instructions, to Google's Gemini API. Gemini returns the roast and grounded resume suggestions; the server checks the shape of that reply and sends it back to the page. The page keeps the roast compact, shows quoted issues and explanations in Real Talk, and shows their matching rewrites in a separate section below.

The API key stays in a private `.env` file read by the server; it is never sent to the browser or committed to the repository. The app does not save resume text or results to a database or browser storage. The text exists temporarily in the page, server request, and Gemini request while the review is processed. Google receives it and handles it under the selected Gemini API tier's terms. The demo page will disclose this. This keeps the project to one page and one small server without accounts, uploads, or a database.

## The Core Journey Through the System

1. The browser loads `public/index.html`, its styles, and its JavaScript from the local Node server.
2. The user pastes resume text and submits it. The browser shows a loading state and sends the text to `POST /api/review`.
3. The server rejects malformed or oversized requests. For empty input or fewer than five words, it returns a roast without calling Gemini; otherwise, it adds the review instructions and calls Gemini over HTTPS using the server-only API key.
4. Gemini returns structured review data. The server checks that it has the expected fields and all returned suggestions are grounded in the resume; it rejects reviewable results with no suggestions and accepts no suggestions for minimal input.
5. The browser displays the roast, Real Talk suggestions, and matching rewrites in separate result areas. It keeps them only in the current page; leaving or refreshing the page clears them.

Implements `prd.md > The Core Journey`, `prd.md > Features and Behavior`, and `prd.md > States and Boundaries`.

## Stack

- **HTML, CSS, and browser JavaScript:** the one-page interface, without a front-end framework. This matches the small paste-and-review flow and preserves the approved warm orange and blue design.
- **Node.js 22.9 or newer:** runs the local server, provides built-in `fetch`, and can load an optional `.env` file without adding a configuration package. The current environment has Node.js 26.12.0.
- **Express 5.x:** serves the page and provides the small `POST /api/review` route. Use npm to install it.
- **Google Gemini API:** creates the roast and grounded suggestions using the documented `gemini-3.6-flash` stable model ID; confirm the account's current free-tier quota before the live API check.
- **No database, account system, or browser storage.**

Documentation:

- [Node.js environment variables](https://nodejs.org/api/cli.html#--env-fileconfig)
- [Express installation](https://expressjs.com/en/starter/installing.html)
- [Gemini text generation](https://ai.google.dev/gemini-api/docs/text-generation)
- [Gemini structured outputs](https://ai.google.dev/gemini-api/docs/structured-output)
- [Gemini API models](https://ai.google.dev/gemini-api/docs/models)
- [Gemini API keys](https://ai.google.dev/gemini-api/docs/api-key)
- [Gemini API pricing and free tier](https://ai.google.dev/gemini-api/docs/pricing)
- [Gemini API terms](https://ai.google.dev/gemini-api/terms)

## Where It Runs and How Someone Tries It

- **Run target:** local website on the learner's computer; no public deployment is planned for this proof of concept.
- **Requirements:** Node.js 22.9 or newer, npm, and a Gemini API key with access to the `gemini-3.6-flash` model. The current environment has Node.js 26.12.0.
- **Setup:** copy `.env.example` to `.env` and put the key in `GEMINI_API_KEY`. Do not share or commit `.env`.
- **Start in Windows PowerShell:** run `npm.cmd install`, then `npm.cmd start` from the project root. The `.cmd` launcher avoids PowerShell's script-execution restriction on `npm.ps1`.
- **Open:** visit `http://localhost:5500` in a browser. Paste a sample resume, submit it, then try empty or very short input.
- **Recording:** use the local website for the required demo video. Submission also requires a public GitHub repository; public deployment is optional. The repository's publication and secret audit belongs to `6-ship`.

## Look and Feel

Carry forward `prd.md > Look and Feel` and `scope.md > Inspiration & Identity`: warm orange for the playful roast, blue for calm constructive feedback, dark ink, and a warm off-white background. Keep the two results side by side on wider screens and stacked on narrow screens. Retain the mockup's bold, clipped-panel visual language and approachable copy. The roast stays funny but not cruel; suggestions stay specific, calm, and grounded in the resume.

## Components

### Resume review page

`public/index.html` contains the resume input, submit button, result areas, loading/error messages, and the truthful data-handling note. It keeps the single-page layout described in `prd.md > Screens and Layout`.

Implements `prd.md > The Core Journey` and `prd.md > States and Boundaries`.

### Page styling

`public/styles.css` implements the established orange/blue palette, responsive side-by-side result panels, and visual hierarchy.

Implements `prd.md > Look and Feel`.

### Browser interaction

`public/app.js` submits text to the local server, prevents duplicate submissions while waiting, renders returned text safely as text (not executable HTML), and displays loading and recoverable error states. It does not write resume content to local storage, cookies, or analytics.

Implements `prd.md > Features and Behavior` and `prd.md > States and Boundaries`.

### Node server and review route

`server.js` serves `public/`, accepts JSON at `POST /api/review`, applies a request-size limit, and returns a clear error response when configuration or the upstream request fails. It must not log request bodies or Gemini prompts.

Implements `prd.md > Features and Behavior` and `prd.md > States and Boundaries`.

### Gemini review adapter

`server/gemini.js` builds the focused resume-review prompt, calls the Gemini `generateContent` endpoint using `GEMINI_API_KEY` in the request header, parses structured JSON, and validates the response before returning it to the route.

Implements `prd.md > Features and Behavior`.

## Gemini Request and Response

The backend sends an HTTPS `POST` to:

`https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent`

Authenticate with the `x-goog-api-key` header, not a browser-visible URL or client-side variable. Send the resume and concise instructions in the `contents` field. Request JSON output containing a prioritized feedback array. Each item includes its rewrite for rendering in the separate Rewrite section:

```json
{
  "reviewable": true,
  "roast": "A short playful, non-cruel roast.",
  "feedback": [
    {
      "priority": 1,
      "quote": "Exact text copied from the resume.",
      "explanation": "What is unclear or could be stronger.",
      "rewrite": "A grounded rewrite, using a clear placeholder for missing facts."
    }
  ]
}
```

When `reviewable` is `true`, review each section and bullet, then include a separate item for every independent, actionable improvement clearly supported by the submitted resume, ordered by priority. Do not stop after a small handful, merge unrelated issues, impose a fixed item count, pad weak suggestions, or repeat an issue. Every `quote` must appear verbatim in the submitted text. If the resume does not support useful suggestions, `reviewable` is `false` and `feedback` is empty; the roast explains the minimal input without inventing resume details. The prompt must say to critique resume writing only—not recommend jobs or career paths—and never invent accomplishments, metrics, or other facts.

The backend validates the response structure and quote grounding. It returns `{ "roast": "...", "feedback": [...] }` to the browser for a reviewable resume, or `{ "roast": "...", "feedback": [] }` for minimal input. The browser renders each feedback item's quote and explanation in Real Talk and its rewrite in the separate Rewrite section. It does not expose provider internals or the API key to the browser.

## Data Model

- **Resume text:** starts in the textarea; travels in the browser's request body to the local server, then to Google Gemini. It is held only while the current page and requests are active. The app does not write it to files, a database, browser storage, logs, or analytics.
- **Review result:** received from Gemini, validated by the server, and displayed in the current page. It is not saved. Refreshing or leaving the page clears it.
- **API key:** stored only in the local `.env` file and read by Node.js at server startup. `.env` and other local `.env.*` files are ignored by Git; `.env.example` contains only a placeholder.
- **Provider handling:** Google receives the resume text. Under the unpaid Gemini API terms, Google may use submitted content to improve products and human reviewers may process it. The website must not claim that the provider does not retain or review content.

## File Structure

```text
project/
├── public/
│   ├── index.html          # Resume input, results, privacy note
│   ├── styles.css          # Orange/blue responsive visual design
│   └── app.js              # Submit, loading/error states, safe rendering
├── server/
│   └── gemini.js           # Gemini call, prompt, and response validation
├── devpost/
│   ├── learner-profile.md  # Private learning context; ignored by Git
│   ├── scope.md            # Approved product scope
│   ├── prd.md              # Approved requirements
│   ├── spec.md             # This technical blueprint
│   └── spec.html           # Offline visual companion to this blueprint
├── .env.example            # Secret-free environment variable template
├── .gitignore              # Excludes local secrets and learner profile
├── package.json            # Express dependency and start command
├── package-lock.json       # Reproducible npm dependency versions
└── server.js               # Express app, static files, and review route
```

## External Services and Dependencies

- **Google Gemini API:** one `generateContent` request per reviewable submission using `gemini-3.6-flash`; text prompt and resume sent over HTTPS; key in `x-goog-api-key`; JSON response validated before display. Free-tier quotas and model availability can change. See [model details](https://ai.google.dev/gemini-api/docs/models), [API docs](https://ai.google.dev/gemini-api/docs/text-generation), [pricing](https://ai.google.dev/gemini-api/docs/pricing), and [terms](https://ai.google.dev/gemini-api/terms). No deployment host or database is used.
- **Express:** local npm package to serve the static page and route. See [Express docs](https://expressjs.com/en/starter/installing.html).

## Important Failure Modes

- **Missing API key or unavailable model** → keep the page usable, show a clear setup/provider message, and do not return a fake successful review. Include safe upstream HTTP status codes for key/model, billing, quota, and request errors. Locally handled empty or fewer-than-five-word input does not require an API key.
- **Gemini is slow, rate-limited, or unavailable** → show a retryable error with the upstream HTTP status; don't lose the pasted text from the open page or save it elsewhere.
- **Gemini returns malformed or ungrounded output** → reject the response and show an error instead of displaying empty reviewable feedback, fabricated quotes, or success-shaped fallback content.

## What Was Simplified and Why

- **One local Express server serves both the page and API route** instead of hosting a separate front end and backend — avoids cross-origin configuration and keeps the API key server-side.
- **In-memory request/response processing instead of a database** — proves the review experience without accounts or persistence.
- **One Gemini call per submission** instead of multiple specialized AI calls — keeps the resume-to-results loop straightforward.
- **Local demo rather than deployment** — enough for a demo recording; deployment is optional.

## Decisions and Open Issues

- **Learner decision:** Gemini should correct what's wrong in the resume, not provide career options. The prompt and interface are limited to resume critique and grounded rewrites.
- **Learner decision:** keep the API key in the backend and do not persist resume text or results in the app.
- **Learner decision:** provider handling under Gemini's terms is acceptable for this project; the site will still explain that text is sent to Google and may be handled under the unpaid API terms.
- **Implementation choice derived from those decisions:** plain HTML/CSS/JavaScript served by Express, with the Gemini API key only on the server. This is a small full-stack addition to protect the key while keeping the requested website lightweight.
- **Useful uncertainty clarified:** an API key on the backend protects the key from browser visitors, but does not stop Gemini receiving the submitted resume. The data-handling note and architecture account for both facts.
- **Build discovery:** the API listed `gemini-2.5-flash` as unavailable to new users, and `gemini-3.8-flash` returned a temporary high-demand response during verification. The API list confirmed `gemini-3.6-flash` supports `generateContent`, and a structured-output request succeeded. Repeat submission after editing can be settled during the build as allowed by `prd.md > Open Questions`.
