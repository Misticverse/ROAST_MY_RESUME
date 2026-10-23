import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createResumeReview, GeminiReviewError } from './server/gemini.js';

const app = express();
const port = Number(process.env.PORT) || 5500;
const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.join(projectRoot, 'public');
const maximumResumeLength = 12_000;

app.use(express.json({ limit: '32kb' }));
app.use(express.static(publicDirectory));

app.post('/api/review', async (request, response) => {
  const resumeText = request.body?.resumeText;

  if (typeof resumeText !== 'string' || resumeText.trim().length === 0) {
    response.status(400).json({ error: 'Paste your resume text before requesting a review.' });
    return;
  }

  if (resumeText.length > maximumResumeLength) {
    response.status(413).json({ error: `Please keep the resume under ${maximumResumeLength.toLocaleString()} characters.` });
    return;
  }

  if (!process.env.GEMINI_API_KEY) {
    response.status(503).json({ error: 'The Gemini API key is not configured. Add GEMINI_API_KEY to your local .env file.' });
    return;
  }

  try {
    const review = await createResumeReview(resumeText);
    response.json(review);
  } catch (error) {
    if (error instanceof GeminiReviewError) {
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
