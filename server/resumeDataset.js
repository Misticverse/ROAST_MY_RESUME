export const RESUME_EXAMPLES = {
  schema_version: '1.0',
  dataset_name: 'resume_roast_training_eval_dataset',
  cases: [
    {
      id: 'case_001',
      flaw: 'vague responsibility',
      resume_text: 'Summary\n• Responsible for managing social media.\n• Helped with community outreach.\n• Worked with a team to post updates.',
      expected_output: {
        reviewable: true,
        roast: 'This resume reads like a to-do list written by a sleep-deprived intern, not a professional profile.',
        feedback: [
          {
            priority: 1,
            quote: 'Responsible for managing social media',
            explanation: 'This is a task label, not a result. It tells the employer what you were assigned, not what changed because of your work.',
            rewrite: 'Grew [platform] engagement from [start count] to [end count] in [timeframe] by launching [campaign].'
          }
        ]
      }
    },
    {
      id: 'case_002',
      flaw: 'assisted with everything',
      resume_text: 'Experience\n• Assisted with content creation for digital marketing.\n• Assisted with analytics tasks.\n• Assisted with campaign planning.',
      expected_output: {
        reviewable: true,
        roast: 'You sound like the person who stood in the room while the real work happened, then claimed credit for the Wi‑Fi.',
        feedback: [
          {
            priority: 1,
            quote: 'Assisted with content creation',
            explanation: 'Passive phrasing makes you sound like a spectator. Use strong action verbs to show ownership, not attendance.',
            rewrite: 'Created and scheduled [number] marketing posts weekly, increasing [metric] across [channel].'
          }
        ]
      }
    },
    {
      id: 'case_003',
      flaw: 'generic summary',
      resume_text: 'Summary\nHardworking team player with excellent communication skills.\nMotivated and dependable.',
      expected_output: {
        reviewable: true,
        roast: 'Your summary has all the personality of a beige wall and about as much evidence.',
        feedback: [
          {
            priority: 1,
            quote: 'Hardworking team player',
            explanation: 'This is a cliché, not proof. Employers need concrete evidence of delivery, not a personality tattoo.',
            rewrite: 'Delivered [project] with a [size]-person team, improving [metric] in [timeframe].'
          }
        ]
      }
    },
    {
      id: 'case_004',
      flaw: 'missing metrics',
      resume_text: 'Marketing Internship\n• Helped improve engagement.\n• Worked on various campaigns.\n• Collaborated with the team.',
      expected_output: {
        reviewable: true,
        roast: 'This bullet reads like a rumor from a group chat: zero numbers, zero focus, zero credibility.',
        feedback: [
          {
            priority: 1,
            quote: 'Helped improve engagement',
            explanation: 'This is impossible to judge without a metric. Add a real result or a placeholder that signals the gap.',
            rewrite: 'Increased engagement by [percentage]% through [specific tactic], driving [result].'
          }
        ]
      }
    },
    {
      id: 'case_005',
      flaw: 'typo in title',
      resume_text: 'Software Enginner\nFull-stack developer\nBuilding apps for small businesses.',
      expected_output: {
        reviewable: true,
        roast: 'You spelled “Engineer” like a password reset and somehow still expect HR to trust the rest of the page.',
        feedback: [
          {
            priority: 1,
            quote: 'Software Enginner',
            explanation: 'A misspelled role title makes the resume feel careless, especially in the headline.',
            rewrite: 'Software Engineer'
          }
        ]
      }
    },
    {
      id: 'case_006',
      flaw: 'headline fantasy',
      resume_text: 'Objective\nTo get a job where I can get a high salary and work from home.',
      expected_output: {
        reviewable: true,
        roast: 'The objective says less “career ambition” and more “I have discovered the concept of wages.”',
        feedback: [
          {
            priority: 1,
            quote: 'To get a job where I can get a high salary',
            explanation: 'This is about personal gain, not value creation. Employers want outcomes, not a salary wishlist.',
            rewrite: 'Seeking a role where I can apply my [skills] to improve [business goal].'
          }
        ]
      }
    },
    {
      id: 'case_007',
      flaw: 'unrealistic claim',
      resume_text: 'Experience\n• Managed a team of 50 people at age 20.\n• Delivered every project on time.\n• Led all company strategy.',
      expected_output: {
        reviewable: true,
        roast: 'This resume is trying to audition for a corporate soap opera and mostly just sounds like fiction.',
        feedback: [
          {
            priority: 1,
            quote: 'Managed a team of 50 people at age 20',
            explanation: 'This claim is so extreme it breaks trust. If it is true, the resume needs context and proof, not a dramatic flourish.',
            rewrite: 'Coordinated a [size]-person cross-functional team to deliver [project] with [result].'
          }
        ]
      }
    },
    {
      id: 'case_008',
      flaw: 'winging facts',
      resume_text: 'Achievements\n• Increased sales by 1000% in a month.\n• Won every client pitch.\n• Built the world’s best dashboard.',
      expected_output: {
        reviewable: true,
        roast: 'This is not a resume; it is a startup founder pretending to be a magician with no receipts.',
        feedback: [
          {
            priority: 1,
            quote: 'Increased sales by 1000% in a month',
            explanation: 'This metric is ungrounded and likely exaggerated. Resume claims need believable numbers and context.',
            rewrite: 'Improved conversion rate by [percentage]% by refining [strategy] and reducing [issue].'
          }
        ]
      }
    },
    {
      id: 'case_009',
      flaw: 'passive voice',
      resume_text: 'Work Experience\n• It was very hard.\n• The project was difficult.\n• We had to do a lot of work.',
      expected_output: {
        reviewable: true,
        roast: 'This is not a work history; it is a diary entry from a very tired intern.',
        feedback: [
          {
            priority: 1,
            quote: 'It was very hard',
            explanation: 'This is subjective and empty. Replace it with action, context, and outcome to show competence.',
            rewrite: 'Built [feature] using [tool], improving [metric] for [user or department].'
          }
        ]
      }
    },
    {
      id: 'case_010',
      flaw: 'irrelevant hobbies',
      resume_text: 'Hobbies\n• Watching Netflix\n• Scrolling Instagram\n• Binge-watching shows',
      expected_output: {
        reviewable: true,
        roast: 'This is the first resume to make “recovery time” sound more impressive than the actual work history.',
        feedback: [
          {
            priority: 1,
            quote: 'Watching Netflix',
            explanation: 'Hobbies are meant to show personality or discipline, not the most passive activities in the room.',
            rewrite: 'Hobbies: [coding side project], [volunteering], [sports or creative discipline]'
          },
          {
            priority: 2,
            quote: 'Scrolling Instagram',
            explanation: 'This is a passive, low-signal activity that suggests the candidate is not building a professional identity beyond consumption.',
            rewrite: 'Hobbies: [public speaking], [open-source contributions], [fitness or creative project]'
          }
        ]
      }
    },
    {
      id: 'case_011',
      flaw: 'unprofessional email',
      resume_text: 'Contact\nEmail: cool_dude_99@yahoo.com\nPhone: 555-1234',
      expected_output: {
        reviewable: true,
        roast: 'This email sounds like it was created during a mood swing, not a serious job search.',
        feedback: [
          {
            priority: 1,
            quote: 'cool_dude_99@yahoo.com',
            explanation: 'This is informal and unprofessional. A recruiter should not have to decode your identity from a username.',
            rewrite: '[firstname].[lastname]@email.com'
          }
        ]
      }
    },
    {
      id: 'case_012',
      flaw: 'misdated timeline',
      resume_text: 'Experience\nSoftware Engineer | Jan 2025 – Dec 2024\nBuilt internal tools.',
      expected_output: {
        reviewable: true,
        roast: 'The timeline is doing time travel, and the result is still a bad hire decision.',
        feedback: [
          {
            priority: 1,
            quote: 'Jan 2025 – Dec 2024',
            explanation: 'The date range is impossible and undermines trust before the rest of the resume even gets read.',
            rewrite: '[Actual Start Month Year] – [Actual End Month Year]'
          }
        ]
      }
    },
    {
      id: 'case_013',
      flaw: 'vague tool list',
      resume_text: 'Skills\n• Tools: Excel, Word, PowerPoint, Canva, maybe some Google Docs',
      expected_output: {
        reviewable: true,
        roast: 'This skills section has all the depth of a five-minute cafeteria survey.',
        feedback: [
          {
            priority: 1,
            quote: 'maybe some Google Docs',
            explanation: 'This is not a skill; it is a shrug disguised as technical literacy. Provide evidence or remove it.',
            rewrite: 'Google Workspace: Docs, Sheets, and Slides; used for [specific task or workflow].'
          }
        ]
      }
    },
    {
      id: 'case_014',
      flaw: 'unsupported bragging',
      resume_text: 'Profile\nI am a genius with a proven track record of success.',
      expected_output: {
        reviewable: true,
        roast: 'Confidence is great; announcing your own genius is where the résumé begins to look like a villain monologue.',
        feedback: [
          {
            priority: 1,
            quote: 'I am a genius',
            explanation: 'Arrogance without evidence is a red flag. Let the work speak instead of making a TED Talk about your ego.',
            rewrite: 'Delivered [achievement] with measurable results in [timeframe].'
          }
        ]
      }
    },
    {
      id: 'case_015',
      flaw: 'incoherent skills',
      resume_text: 'Skills\nPython, Java, Spanish, SQL, C++, marketing, leadership, Excel, Etch A Sketch',
      expected_output: {
        reviewable: true,
        roast: 'This skill list looks like it was assembled during an identity crisis in a hobby store.',
        feedback: [
          {
            priority: 1,
            quote: 'Etch A Sketch',
            explanation: 'This is not a professional skill unless the job is literally for toy manufacturing. It damages credibility.',
            rewrite: 'Adobe Illustrator, SQL, and Python; used for [specific task].'
          }
        ]
      }
    },
    {
      id: 'case_016',
      flaw: 'misleading title',
      resume_text: 'Experience\nCEO and Senior Engineer, 2020-Present\nWorked at two companies at the same time.',
      expected_output: {
        reviewable: true,
        roast: 'The timeline suggests either a cloning machine or a very confident lie, and neither is good for hiring.',
        feedback: [
          {
            priority: 1,
            quote: 'CEO and Senior Engineer, 2020-Present',
            explanation: 'Overlapping roles make it look like the resume is hiding a conflict or overstatement. Clarify time boundaries.',
            rewrite: 'Founder and Consultant, [company], [dates] / Senior Engineer, [company], [dates]'
          }
        ]
      }
    },
    {
      id: 'case_017',
      flaw: 'unrealistic timeline',
      resume_text: 'Education\nPhD in Computer Science, Stanford, 2012\nDropped out of high school, 2005',
      expected_output: {
        reviewable: true,
        roast: 'This chronology does not just raise questions; it invents a new branch of physics.',
        feedback: [
          {
            priority: 1,
            quote: 'Dropped out of high school, 2005 / PhD in Computer Science, Stanford, 2012',
            explanation: 'The chronology is impossible without missing context. The resume needs a clear, accurate timeline.',
            rewrite: 'Remove the high school entry or correct the years to a consistent educational timeline.'
          }
        ]
      }
    },
    {
      id: 'case_018',
      flaw: 'joke-instead-of-competence',
      resume_text: 'Experience\n• Hacked the mainframe to get free lunch at work.',
      expected_output: {
        reviewable: true,
        roast: 'This is not a clever anecdote; it is a one-way ticket to the “no thanks” pile.',
        feedback: [
          {
            priority: 1,
            quote: 'Hacked the mainframe to get free lunch',
            explanation: 'Joking about illegal activity on a resume is a trust killer and can trigger automatic rejection.',
            rewrite: 'Remove this bullet entirely and replace it with a legitimate technical accomplishment.'
          }
        ]
      }
    },
    {
      id: 'case_019',
      flaw: 'negative employer comment',
      resume_text: 'Experience\n• My last boss was an idiot and did not understand my talent.',
      expected_output: {
        reviewable: true,
        roast: 'This is not professionalism; it is a breakup note posted to a hiring manager.',
        feedback: [
          {
            priority: 1,
            quote: 'My last boss was an idiot',
            explanation: 'Negative comments about previous employers create a bad impression. Keep the focus on your contribution and growth.',
            rewrite: 'Sought opportunities to grow in [area], delivering [project] with measurable impact.'
          }
        ]
      }
    },
    {
      id: 'case_020',
      flaw: 'comic-sans chaos',
      resume_text: 'Font: Comic Sans\nHeader: giant and bright\nBody: all caps',
      expected_output: {
        reviewable: true,
        roast: 'The formatting looks like a ransom note from a kindergarten art class.',
        feedback: [
          {
            priority: 1,
            quote: 'Font: Comic Sans',
            explanation: 'Unprofessional formatting makes the resume feel unserious even before the content is read.',
            rewrite: 'Font: Arial, 11–12 pt; section headers in bold, consistent spacing.'
          }
        ]
      }
    },
    {
      id: 'case_021',
      flaw: 'keyword stuffing',
      resume_text: 'Summary\nLeveraging cross-functional blockchain synergies to optimize digital transformation and growth.',
      expected_output: {
        reviewable: true,
        roast: 'This reads like the output of a keyword generator left alone with a marketing budget.',
        feedback: [
          {
            priority: 1,
            quote: 'leveraging cross-functional blockchain synergies',
            explanation: 'This is buzzword soup. Clear, concrete language is better than a sentence that sounds like a startup pitch deck.',
            rewrite: 'Worked with product, design, and engineering teams to launch [feature] and improve [metric].'
          }
        ]
      }
    },
    {
      id: 'case_022',
      flaw: 'self-promotion without proof',
      resume_text: 'Profile\nI am the best employee you will ever hire.',
      expected_output: {
        reviewable: true,
        roast: 'You do not need to announce your greatness; the resume has to earn it, and this one has not even sat in the chair yet.',
        feedback: [
          {
            priority: 1,
            quote: 'I am the best employee you will ever hire',
            explanation: 'Self-praise without evidence reads as arrogance and weakens credibility.',
            rewrite: 'Led [initiative], delivering [result] while improving [metric] in [timeframe].'
          }
        ]
      }
    },
    {
      id: 'case_023',
      flaw: 'bad formatting',
      resume_text: 'Experience\nWorked at company x from 2019 to 2024 and was responsible for all kinds of things, and also while doing other tasks, and helping with many short-term assignments.',
      expected_output: {
        reviewable: true,
        roast: 'This is one giant paragraph pretending to be a résumé, and the recruiter is already checking out the snack table.',
        feedback: [
          {
            priority: 1,
            quote: 'Worked at company x from 2019 to 2024 and was responsible for all kinds of things',
            explanation: 'Dense paragraphs are hard to scan. Use concise bullets that highlight scope and impact.',
            rewrite: 'Owned [responsibility], delivering [result] with [team or tool] and improving [metric].'
          }
        ]
      }
    },
    {
      id: 'case_024',
      flaw: 'wrong tense',
      resume_text: 'Experience\n• I am currently managing the team at Northwind retail.\n• Managed weekly inventory decisions.',
      expected_output: {
        reviewable: true,
        roast: 'The verb tense has time-traveled and now the recruiter is not sure whether you still work there or are just haunted by the job.',
        feedback: [
          {
            priority: 1,
            quote: 'I am currently managing the team',
            explanation: 'Past roles should use past tense, while the current role should be in present tense. Mixed tense is a quick way to look careless.',
            rewrite: 'Manage the team at Northwind Retail, overseeing [responsibility] and improving [metric].'
          }
        ]
      }
    },
    {
      id: 'case_025',
      flaw: 'third-person cover letter',
      resume_text: 'Profile\nJohn is a highly motivated individual with a passion for learning.',
      expected_output: {
        reviewable: true,
        roast: 'You wrote a résumé in the third person like you are auditioning for an overcooked biopic.',
        feedback: [
          {
            priority: 1,
            quote: 'John is a highly motivated individual',
            explanation: 'Resume writing should be direct and confident without a narrator. Use concise professional language instead of third-person self-description.',
            rewrite: 'Highly motivated professional with a strong interest in continuous learning and [domain].'
          }
        ]
      }
    },
    {
      id: 'case_026',
      flaw: 'confusing technical skills',
      resume_text: 'Skills\nHTML, CSS, JavaScript, SQL, Excel, Fluent in HTML',
      expected_output: {
        reviewable: true,
        roast: 'You treated HTML like a programming language and a personality trait; that is brave, but not convincing.',
        feedback: [
          {
            priority: 1,
            quote: 'Fluent in HTML',
            explanation: 'HTML is a markup language, not a general programming language. The resume should distinguish between markup and application development skills.',
            rewrite: 'Proficient in HTML5, CSS3, and JavaScript for building responsive interfaces.'
          }
        ]
      }
    },
    {
      id: 'case_027',
      flaw: 'vague cash handling',
      resume_text: 'Experience\n• Handled money and worked the register.\n• Went to the bank once.',
      expected_output: {
        reviewable: true,
        roast: 'This bullet describes cashier work like a toddler explaining a tax audit.',
        feedback: [
          {
            priority: 1,
            quote: 'Handled money',
            explanation: 'This is too vague to show impact. Quantify the amount, volume, or accuracy level to make the work more credible.',
            rewrite: 'Managed daily transactions totaling $[amount], maintaining 100% cash reconciliation accuracy.'
          }
        ]
      }
    },
    {
      id: 'case_028',
      flaw: 'generic competency claim',
      resume_text: 'Core Competencies\nFast learner, great with people, problem solver',
      expected_output: {
        reviewable: true,
        roast: 'Fast learner is the most generic phrase in the résumé universe, right next to “results-driven” and “synergy.”',
        feedback: [
          {
            priority: 1,
            quote: 'Fast learner',
            explanation: 'This is a cliché and does not show how you learned or what you achieved. Replace it with evidence-based examples.',
            rewrite: 'Learned [tool] in [timeframe] and used it to deliver [project] for [result].'
          }
        ]
      }
    },
    {
      id: 'case_029',
      flaw: 'misleading major credential',
      resume_text: 'Experience\nGoogle Janitor, 2022 – 2024\nWorked in a campus facility.',
      expected_output: {
        reviewable: true,
        roast: 'You turned a janitorial role into a headline so dramatic it needs a disclaimer from the legal team.',
        feedback: [
          {
            priority: 1,
            quote: 'Google Janitor',
            explanation: 'The emphasis is misleading and suggests the role is being obscured. Use accurate wording that reflects the actual job and employer relationship.',
            rewrite: 'Facilities Associate — Google (via [agency or contractor])'
          }
        ]
      }
    },
    {
      id: 'case_030',
      flaw: 'empty buzzword list',
      resume_text: 'Skills\nMultitasking, communication, attention to detail, hard worker',
      expected_output: {
        reviewable: true,
        roast: 'This skill list sounds like a list of traits written by a motivational poster and absolutely no one with actual hiring power.',
        feedback: [
          {
            priority: 1,
            quote: 'Multitasking',
            explanation: 'This is a common cliché and does not show how you handled complexity or competing priorities.',
            rewrite: 'Managed [number] concurrent workstreams while delivering [project] and meeting [deadline].'
          }
        ]
      }
    },
    {
      id: 'case_031',
      flaw: 'tiny impact metric',
      resume_text: 'Experience\n• Saved the company $0.05 by switching printer paper.',
      expected_output: {
        reviewable: true,
        roast: 'This is the kind of savings report that turns a hiring manager into a detective searching for the real story.',
        feedback: [
          {
            priority: 1,
            quote: 'Saved the company $0.05',
            explanation: 'A tiny savings metric feels meaningless and undermines the rest of the bullet. Highlight outcomes with real operational or financial scale.',
            rewrite: 'Reduced departmental printing costs by [meaningful percentage] through [initiative].'
          }
        ]
      }
    },
    {
      id: 'case_032',
      flaw: 'bad claims',
      resume_text: 'Sales Experience\n• 100% success rate on all calls.\n• Closed every deal in the first meeting.',
      expected_output: {
        reviewable: true,
        roast: 'A 100% success rate is not a sales statistic; it is a cry for a fact-checker and a fresh start.',
        feedback: [
          {
            priority: 1,
            quote: '100% success rate',
            explanation: 'This is an unrealistic claim that makes the resume feel inflated. Better metrics with context are more credible.',
            rewrite: 'Achieved [percentage]% conversion rate, exceeding quota by [percentage] points.'
          }
        ]
      }
    },
    {
      id: 'case_033',
      flaw: 'team-fit gap',
      resume_text: 'Profile\nPrefer to work alone and avoid collaboration.',
      expected_output: {
        reviewable: true,
        roast: 'This is not self-awareness; it is a corporate war crime wrapped in a job application.',
        feedback: [
          {
            priority: 1,
            quote: 'Prefer to work alone',
            explanation: 'Collaboration is a core expectation for most roles. Reframe the preference in a way that still shows independence.',
            rewrite: 'Self-motivated and able to work independently while contributing effectively to cross-functional teams.'
          }
        ]
      }
    },
    {
      id: 'case_034',
      flaw: 'self-sabotage',
      resume_text: 'Skills\nNot a morning person\nPrefers late nights\nWorks best under pressure',
      expected_output: {
        reviewable: true,
        roast: 'This is not a professional skill list; it is a personality warning label.',
        feedback: [
          {
            priority: 1,
            quote: 'Not a morning person',
            explanation: 'This suggests poor fit for schedule or team needs. Replace it with a skill or pattern that supports the role.',
            rewrite: 'Available during core team hours and able to meet deadlines while supporting flexible collaboration.'
          }
        ]
      }
    },
    {
      id: 'case_035',
      flaw: 'weak objective',
      resume_text: 'Objective\nLooking for a job that pays well and is easy.',
      expected_output: {
        reviewable: true,
        roast: 'This objective reads like a person who wants the job without the effort, which is charming in a movie, not in a hiring process.',
        feedback: [
          {
            priority: 1,
            quote: 'Looking for a job that pays well and is easy',
            explanation: 'This suggests low motivation and poor alignment. Focus on value and fit instead of convenience.',
            rewrite: 'Seeking a role where I can apply my [skills] to solve [business need] and grow in [area].'
          }
        ]
      }
    },
    {
      id: 'case_036',
      flaw: 'weird accomplishments',
      resume_text: 'Projects\n• Solved world hunger in a weekend hackathon.\n• Built a time machine for a class assignment.',
      expected_output: {
        reviewable: true,
        roast: 'The project list is trying to be a Marvel plot and failing spectacularly at being believable.',
        feedback: [
          {
            priority: 1,
            quote: 'Solved world hunger',
            explanation: 'This is absurd and damages credibility. Keep the scale realistic and tie it to actual work or volunteer effort.',
            rewrite: 'Built a volunteer coordination app for [organization], improving [metric] for [impact].'
          }
        ]
      }
    },
    {
      id: 'case_037',
      flaw: 'outdated boilerplate',
      resume_text: 'Additional Info\nReferences available upon request.\nContact details omitted.',
      expected_output: {
        reviewable: true,
        roast: 'This line is so outdated it feels like it was written during the geologic age of a fax machine.',
        feedback: [
          {
            priority: 1,
            quote: 'References available upon request',
            explanation: 'This is boilerplate and wastes valuable space. Employers expect stronger evidence and more relevant content.',
            rewrite: 'Remove this line and use the space for measurable achievement, project work, or skills.'
          }
        ]
      }
    },
    {
      id: 'case_038',
      flaw: 'stale education',
      resume_text: 'Education\nHigh School Diploma, 2010\nBBA, 2015\n10 years of work experience',
      expected_output: {
        reviewable: true,
        roast: 'The education section is still living in a different decade, which is very on-brand for a résumé that cannot let go.',
        feedback: [
          {
            priority: 1,
            quote: 'High School Diploma, 2010',
            explanation: 'This is outdated and irrelevant if the applicant already has a degree and professional experience. Prioritize what matters now.',
            rewrite: 'Remove the high school line and keep the degree or professional qualifications that matter to the role.'
          }
        ]
      }
    },
    {
      id: 'case_039',
      flaw: 'photo error',
      resume_text: 'Application\nPhoto attached, passport-style portrait, 3x5',
      expected_output: {
        reviewable: true,
        roast: 'This is less a résumé and more a casting call for a regional airline ad from 2007.',
        feedback: [
          {
            priority: 1,
            quote: 'Photo attached',
            explanation: 'Photos are usually unnecessary in the US and UK tech hiring context and can create bias. Keep the document professional and skills-focused.',
            rewrite: 'Remove the photo and keep the résumé focused on qualifications and outcomes.'
          }
        ]
      }
    },
    {
      id: 'case_040',
      flaw: 'vague formatting',
      resume_text: 'Experience\n• Did the needful to keep things moving.\n• Was helpful in various duties across departments.',
      expected_output: {
        reviewable: true,
        roast: 'This reads like an internal memo written by a corporate ghost who never learned how to say anything clearly.',
        feedback: [
          {
            priority: 1,
            quote: 'Did the needful',
            explanation: 'This phrase is vague and outdated. It sounds like a corporate euphemism instead of a concrete accomplishment.',
            rewrite: 'Executed [specific task], which ensured [result] for [team or client].'
          }
        ]
      }
    },
    {
      id: 'case_041',
      flaw: 'weak role summary',
      resume_text: 'Experience\nWorked at several companies in a range of roles.\nNo clear job titles or dates.',
      expected_output: {
        reviewable: true,
        roast: 'This looks like a résumé drafted by someone trying to avoid both structure and honesty.',
        feedback: [
          {
            priority: 1,
            quote: 'Worked at several companies in a range of roles',
            explanation: 'This is imprecise and makes the work history feel scattered. Each role needs a title, dates, and outcomes.',
            rewrite: 'Operations Associate, [Company], [dates] — supported [responsibility] and improved [metric].'
          }
        ]
      }
    },
    {
      id: 'case_042',
      flaw: 'no contact info',
      resume_text: 'Contact\nLinkedIn only\nNo phone\nNo email',
      expected_output: {
        reviewable: true,
        roast: 'A recruiter cannot text a LinkedIn profile when the job is urgent and your phone number is missing, which is a complete misunderstanding of the hiring process.',
        feedback: [
          {
            priority: 1,
            quote: 'No phone / No email',
            explanation: 'This is a basic operational failure. A candidate must be reachable by email or phone for follow-up.',
            rewrite: 'Email: [your_email] | Phone: [your_phone]'
          }
        ]
      }
    },
    {
      id: 'case_043',
      flaw: 'filler language',
      resume_text: 'Summary\nDynamic professional with proven leadership, strategic thinking, and excellence in all things.',
      expected_output: {
        reviewable: true,
        roast: 'This summary is so full of fluff it might start its own weather system.',
        feedback: [
          {
            priority: 1,
            quote: 'strategic thinking and excellence in all things',
            explanation: 'These phrases are vague and inflated. The resume should describe real expertise and what was accomplished, not general self-congratulation.',
            rewrite: 'Led [initiative], aligning [teams or systems] to improve [metric] over [timeframe].'
          }
        ]
      }
    },
    {
      id: 'case_044',
      flaw: 'job title fantasy',
      resume_text: 'Experience\nGod of War, Senior Analyst, 2022 – 2024',
      expected_output: {
        reviewable: true,
        roast: 'This title is a joke, but the hiring manager is not laughing because the ATS is about to have a nervous breakdown.',
        feedback: [
          {
            priority: 1,
            quote: 'God of War',
            explanation: 'Humorous or inflated titles can make a resume look unserious and less searchable. Use a real title that matches the role.',
            rewrite: 'Senior Analyst, [actual team or department]'
          }
        ]
      }
    },
    {
      id: 'case_045',
      flaw: 'overused cliché',
      resume_text: 'Summary\nHardworking, hardworking, hardworking, team player, results-driven.',
      expected_output: {
        reviewable: true,
        roast: 'The phrase “hardworking” appears so often it has started to feel like a hostage note with a thesaurus attached.',
        feedback: [
          {
            priority: 1,
            quote: 'hardworking, hardworking, hardworking',
            explanation: 'Repetition makes the statement sound desperate and unconvincing. Replace cliché repetition with results and evidence.',
            rewrite: 'Delivered [project] on time and within scope, improving [metric] across [team or function].'
          }
        ]
      }
    },
    {
      id: 'case_046',
      flaw: 'fake scale',
      resume_text: 'Experience\n• Raised $50 million in funding for a school project by getting a teacher to clap.',
      expected_output: {
        reviewable: true,
        roast: 'This is not fundraising; it is a very committed bit from someone pretending to have a business background.',
        feedback: [
          {
            priority: 1,
            quote: 'Raised $50 million in funding',
            explanation: 'This is an absurdly inflated claim and likely untrue. Resume claims need realism, context, and evidence to maintain trust.',
            rewrite: 'Led a student project that achieved [actual metric or result] and delivered [impact].'
          }
        ]
      }
    },
    {
      id: 'case_047',
      flaw: 'poor tone',
      resume_text: 'Summary\nMotivated professional seeking a role that offers stable work and zero stress.',
      expected_output: {
        reviewable: true,
        roast: 'This reads like the final answer from someone who wants a job but not the part where work actually happens.',
        feedback: [
          {
            priority: 1,
            quote: 'stable work and zero stress',
            explanation: 'This frames the role as passive and avoids discussing the candidate’s value. Better to focus on contribution and growth.',
            rewrite: 'Seeking a role where I can apply my [skills] to solve [business challenge] and contribute to [outcome].'
          }
        ]
      }
    },
    {
      id: 'case_048',
      flaw: 'irrelevant achievements',
      resume_text: 'Skills\nCan fly a helicopter, knows Microsoft Paint, loves to watch TV.',
      expected_output: {
        reviewable: true,
        roast: 'This is less a résumé and more a list of things you would do if the job description were written by a bored maniac.',
        feedback: [
          {
            priority: 1,
            quote: 'Can fly a helicopter',
            explanation: 'This is unrelated to most roles and wastes space unless the position explicitly requires it. Replace it with relevant, job-aligned skills.',
            rewrite: 'Relevant skills: [tool], [method], [domain knowledge].'
          }
        ]
      }
    },
    {
      id: 'case_049',
      flaw: 'vague tech claim',
      resume_text: 'Skills\nProficient in React, Node, and CSS, plus all tools in the world.',
      expected_output: {
        reviewable: true,
        roast: 'This is a skills section written by someone who thinks a list of nouns is the same as technical depth.',
        feedback: [
          {
            priority: 1,
            quote: 'all tools in the world',
            explanation: 'This is vague and inflated. A recruiter needs concrete skills and examples of how they were used.',
            rewrite: 'Built [feature] with React and Node.js, improving [metric] for [user or team].'
          }
        ]
      }
    },
    {
      id: 'case_050',
      flaw: 'empty resume',
      resume_text: 'Name\nNo experience\nNo skills\nNo bullets',
      expected_output: {
        reviewable: false,
        roast: 'This resume is so empty it could be used as a notepad and still leave a blank impression.',
        feedback: []
      }
    }
  ],
  roasts: [],
  suggestions: []
};

export const ROAST_EXAMPLES = RESUME_EXAMPLES.cases.map((entry) => entry.expected_output.roast);
export const SUGGESTION_EXAMPLES = RESUME_EXAMPLES.cases.flatMap((entry) =>
  entry.expected_output.feedback.map((item) => ({
    id: entry.id,
    flaw: entry.flaw,
    quote: item.quote,
    explanation: item.explanation,
    rewrite: item.rewrite,
  }))
);

RESUME_EXAMPLES.roasts = ROAST_EXAMPLES;
RESUME_EXAMPLES.suggestions = SUGGESTION_EXAMPLES;
