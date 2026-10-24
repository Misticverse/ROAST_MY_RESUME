export const REVIEW_PROMPT_EXAMPLES = [
  {
    resume_text: [
      'Customer Success Manager | Brightdesk | 2022–Present',
      '- Manage a portfolio of 48 mid-market accounts.',
      '- Resolved escalations and coordinates with Product and Support to address recurring issues.',
      '- Increased onboarding completion from 71% to 89% by introducing a structured first-month check-in plan.',
      '- Supported 30 customer accounts and maintained onboarding documentation.',
      'Customer Success Associate — Northstar Cloud | June 2020–February 2022',
      '- Helped prepare renewal reports and flag accounts that needed additional support.',
    ].join('\n'),
    expected_output: {
      reviewable: true,
      roast: '“Resolved” and “coordinates” share a bullet but cannot agree on what day it is.',
      feedback: [
        {
          priority: 1,
          quote: 'Resolved escalations and coordinates with Product and Support to address recurring issues.',
          explanation: 'This current-role bullet switches from past to present tense. Keep the verbs consistent, and do not add an outcome the resume does not provide.',
          rewrite: 'Resolve escalations and coordinate with Product and Support to address recurring issues.',
        },
        {
          priority: 2,
          quote: 'Helped prepare renewal reports and flag accounts that needed additional support.',
          explanation: 'The shared ownership and account-flagging work are clear, but the reporting contribution is vague. Clarify your specific part without claiming ownership of the full process or inventing a result.',
          rewrite: 'Contributed [specific task] to renewal reports and flagged accounts that needed additional support.',
        },
      ],
    },
  },
  {
    resume_text: [
      'Customer Success Associate | Northstar Cloud',
      '- Helped prepare the monthly renewal report by compiling account updates and flagging 4 accounts for follow-up.',
    ].join('\n'),
    expected_output: {
      reviewable: true,
      roast: '“Helped prepare” is resume camouflage: the task is visible, but your part is not.',
      feedback: [
        {
          priority: 1,
          quote: 'Helped prepare the monthly renewal report by compiling account updates and flagging 4 accounts for follow-up.',
          explanation: 'This bullet names the specific work, so lead with those supported actions instead of the vague helper phrase. Unlike a bare “helped” statement, the described tasks support these verbs. Do not add a result or claim sole ownership beyond them.',
          rewrite: 'Compiled account updates for the monthly renewal report and flagged 4 accounts for follow-up.',
        },
      ],
    },
  },
  {
    resume_text: [
      'Marketing Coordinator | Juniper & Co.',
      '- Wrote and edited 25+ campaign emails, contributing to a 12% increase in click-through rate.',
      '- Coordinated the launch of a seasonal product collection across email and social channels.',
      "- Updated it's campaign calendar before each product launch.",
    ].join('\n'),
    expected_output: {
      reviewable: true,
      roast: '“It’s” means “it is”; this apostrophe has promoted itself into the wrong job.',
      feedback: [
        {
          priority: 1,
          quote: "it's",
          explanation: '“It’s” means “it is”; this sentence needs the possessive “its.” The campaign result and other clear details do not need extra criticism.',
          rewrite: 'its',
        },
      ],
    },
  },
];
