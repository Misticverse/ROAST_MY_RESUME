import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createResumeReview, OpenRouterReviewError } from './server/openrouter.js';

const app = express();
const port = Number(process.env.PORT) || 5500;
const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.join(projectRoot, 'public');
const maximumResumeLength = 12_000;
const minimumReviewWords = 5;

app.use(express.json({ limit: '32kb' }));
app.use(express.static(publicDirectory));

app.post('/api/review', async (request, response) => {
  const resumeText = request.body?.resumeText;

  if (typeof resumeText !== 'string') {
    response.status(400).json({ error: 'Paste your resume text before requesting a review.' });
    return;
  }

  if (resumeText.length > maximumResumeLength) {
    response.status(413).json({ error: `Please keep the resume under ${maximumResumeLength.toLocaleString()} characters.` });
    return;
  }

  const wordCount = resumeText.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < minimumReviewWords) {
    const roast = wordCount === 0
      ? 'Your resume is playing hide-and-seek. Paste a few lines so I can review it.'
      : 'This resume has barely clocked in. Add a few more lines for a useful review.';
    response.json({ roast, feedback: [] });
    return;
  }

  if (!process.env.OPENROUTER_API_KEY) {
    response.status(503).json({ error: 'The OpenRouter API key is not configured. Add OPENROUTER_API_KEY to your local .env file.' });
    return;
  }

  try {
    const review = await createResumeReview(resumeText);
    response.json(review);
  } catch (error) {
    if (error instanceof OpenRouterReviewError) {
      response.status(error.statusCode).json({ error: error.message });
      return;
    }

    console.error('Unexpected resume review error:', error);
    response.status(500).json({ error: 'The review could not be completed. Please try again.' });
  }
});

app.use((error, request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (error?.type === 'entity.too.large') {
    response.status(413).json({ error: 'That request is too large. Please shorten the resume and try again.' });
    return;
  }

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    response.status(400).json({ error: 'The request was not valid JSON. Please try again.' });
    return;
  }

  console.error('Unexpected server error:', error);
  response.status(500).json({ error: 'The server could not complete that request.' });
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Roast My Resume is running at http://localhost:${port}`);
});
