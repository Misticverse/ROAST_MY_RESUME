const form = document.querySelector('#review-form');
const resumeInput = document.querySelector('#resume-text');
const submitButton = document.querySelector('#submit-button');
const buttonLabel = document.querySelector('.button-label');
const characterCount = document.querySelector('#character-count');
const statusMessage = document.querySelector('#status-message');
const resultsSection = document.querySelector('#results');
const roastResult = document.querySelector('#roast-result');
const feedbackList = document.querySelector('#feedback-list');
const rewriteList = document.querySelector('#rewrite-list');
const feedbackCard = document.querySelector('.feedback-card');
const rewriteCard = document.querySelector('.rewrite-card');
const resultsGrid = document.querySelector('.results-grid');

resumeInput.addEventListener('input', () => {
  characterCount.textContent = `${resumeInput.value.length.toLocaleString()} / 12,000`;
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusMessage.hidden = true;
  resultsSection.hidden = true;
  submitButton.disabled = true;
  buttonLabel.textContent = 'Reviewing...';
  statusMessage.removeAttribute('data-kind');
  statusMessage.textContent = 'Sending your resume for review...';
  statusMessage.hidden = false;

  try {
    const response = await fetch('/api/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText: resumeInput.value }),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(typeof result.error === 'string' ? result.error : 'The review could not be completed.');
    }

    renderReview(result);
    statusMessage.hidden = true;
    resultsSection.hidden = false;
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    statusMessage.dataset.kind = 'error';
    statusMessage.textContent = error instanceof Error
      ? error.message
      : 'The review could not be completed. Please try again.';
  } finally {
    submitButton.disabled = false;
    buttonLabel.textContent = 'Roast my resume';
  }
});

function renderReview(review) {
  roastResult.textContent = review.roast;
  feedbackList.replaceChildren();
  rewriteList.replaceChildren();

  const hasFeedback = review.feedback.length > 0;
  feedbackCard.hidden = !hasFeedback;
  rewriteCard.hidden = !hasFeedback;
  resultsGrid.classList.toggle('results-grid--roast-only', !hasFeedback);

  for (const suggestion of review.feedback) {
    const item = document.createElement('li');
    const quote = document.createElement('blockquote');
    const explanation = document.createElement('p');
    const rewriteItem = document.createElement('li');
    const rewrite = document.createElement('p');

    quote.textContent = `“${suggestion.quote}”`;
    explanation.textContent = suggestion.explanation;
    rewrite.textContent = suggestion.rewrite;
    item.append(quote, explanation);
    feedbackList.append(item);
    rewriteItem.append(rewrite);
    rewriteList.append(rewriteItem);
  }
}
