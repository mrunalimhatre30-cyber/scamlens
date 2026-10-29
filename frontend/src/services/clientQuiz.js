/**
 * ScamLens Interactive Scam Challenge Service
 * Curated educational cybersecurity scenarios with clear learning takeaways.
 * All scenarios are strictly fictional.
 */

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: 'UPI & Payment Fraud',
    title: 'The "Payment Refund" QR Code',
    sender: '+91 98765 00123 (Claiming to be OLX Buyer)',
    scenario: 'You listed an old sofa for ₹4,000 online. A buyer messages saying: "I will pay you right now via PhonePe. I am sending you a QR code. Just scan it in your Google Pay or Paytm app and enter your UPI PIN to receive ₹4,000 immediately into your bank account."',
    options: [
      { id: 'a', text: 'Legitimate: Scanning the QR code will credit the funds to my account.' },
      { id: 'b', text: 'Scam: You NEVER enter your UPI PIN to receive money.' }
    ],
    correctOptionId: 'b',
    explanation: 'Fundamental UPI Safety Rule: You NEVER need to enter your UPI PIN or scan a QR code to RECEIVE money. Entering your UPI PIN is exclusively used to authorize an outgoing money transfer from your account. Scanning a QR code sent by a buyer is always an attempt to drain your balance.',
    safetyTip: 'Remember: To receive funds via UPI, simply give your phone number or UPI VPA. No scanning or PIN entry is ever required.'
  },
  {
    id: 2,
    category: 'Job & Work-From-Home Scam',
    title: 'The High-Paying "YouTube Like" Part-time Job',
    sender: 'HR_GlobalCareer (Telegram Channel)',
    scenario: 'You receive an unsolicited WhatsApp message: "Hi! We offer daily part-time remote work. Like 5 YouTube videos and earn ₹150 per task. You can easily earn ₹50,000 per month. To unlock your VIP assignment batch, please deposit a refundable registration fee of ₹1,500 via UPI."',
    options: [
      { id: 'a', text: 'Scam: Legitimate companies never charge candidates an upfront fee for work.' },
      { id: 'b', text: 'Legitimate: Many remote jobs require a small security deposit for account setup.' }
    ],
    correctOptionId: 'a',
    explanation: 'This is the classic "Task Scam / Part-Time Job Scam". Fraudsters pay tiny token amounts (₹100) at first to build false trust, then demand escalating "security deposits" or "VIP activation fees", leaving victims with severe financial losses.',
    safetyTip: 'Genuine employers will NEVER ask job seekers to pay money to get hired or unlock work assignments.'
  },
  {
    id: 3,
    category: 'Authority Impersonation',
    title: 'The "Digital Arrest" & Fake Police Video Call',
    sender: 'WhatsApp Video Call with Police Uniform Logo',
    scenario: 'A caller claiming to be an Inspector from Mumbai Police or Delhi Customs contacts you: "A parcel containing narcotics and fake passports was intercepted in your name. You are under immediate Digital Arrest. Stay on this WhatsApp video call and transfer ₹1,00,000 to this RBI verification account to clear your name."',
    options: [
      { id: 'a', text: 'Legitimate: Police can initiate legal arrest procedures over video call during emergencies.' },
      { id: 'b', text: 'Scam: There is NO legal provision for "Digital Arrest" in Indian law.' }
    ],
    correctOptionId: 'b',
    explanation: 'The Indian Government, Ministry of Home Affairs (MHA), and state police have issued urgent warnings: There is NO concept of "Digital Arrest" under the Bharatiya Nagarik Suraksha Sanhita (or former CrPC). No police, CBI, or customs officer conducts trials or demands financial transfers over WhatsApp, Skype, or phone calls.',
    safetyTip: 'Immediately disconnect. Report the incident directly to 1930 or at cybercrime.gov.in.'
  },
  {
    id: 4,
    category: 'Phishing & Account Security',
    title: 'The "Urgent Bank KYC Expired" SMS',
    sender: 'VM-BNKSRV (SMS)',
    scenario: 'You receive an SMS: "Dear Customer, Your SBI/HDFC account will be blocked within 24 hours due to pending PAN/KYC update. Kindly click here to update your details immediately: http://bit.ly/sbi-kyc-verify-portal"',
    options: [
      { id: 'a', text: 'Legitimate: Banks regularly require periodic KYC verification via SMS links.' },
      { id: 'b', text: 'Scam: Banks never send unverified shortened links or threaten 24-hour closure via SMS.' }
    ],
    correctOptionId: 'b',
    explanation: 'Banks never send shortened URLs (like bit.ly) or third-party links to update KYC details, nor do they threaten immediate account deactivation without prior formal notice. The link points to a counterfeit credential-harvesting phishing site designed to steal your net banking login and OTP.',
    safetyTip: 'Always visit the bank\'s official website or official mobile app directly. Never click SMS links to enter passwords or OTPs.'
  },
  {
    id: 5,
    category: 'Customer Support Impersonation',
    title: 'The Fake Airline / Courier Helpline Number',
    sender: 'Google Search Result: "Airline Refund Helpdesk"',
    scenario: 'Your flight was delayed and you searched Google for customer support. You dial the phone number shown in the top sponsored search result. The representative says: "We will issue an instant refund to your card. To connect securely, please download \'AnyDesk\' or \'RustDesk\' from the Play Store and give me the 9-digit code."',
    options: [
      { id: 'a', text: 'Scam: Downloading remote desktop apps gives scammers full control of your device.' },
      { id: 'b', text: 'Legitimate: Technical support representatives need remote software to verify refund transactions.' }
    ],
    correctOptionId: 'a',
    explanation: 'Scammers pay for Google Ads to position fake customer care numbers at the top of search queries. Asking you to install remote access tools like AnyDesk, TeamViewer, or RustDesk allows them to see your screen, view your incoming OTPs, and control your device remotely.',
    safetyTip: 'Only retrieve customer care numbers from the verified official app or the contact page on the official website.'
  }
];

export function getQuizQuestions() {
  // Return questions without revealing correct answer
  return QUIZ_QUESTIONS.map(q => ({
    id: q.id,
    category: q.category,
    title: q.title,
    sender: q.sender,
    scenario: q.scenario,
    options: q.options
  }));
}

export function evaluateQuiz(answers) {
  // answers: [{ questionId: 1, selectedOptionId: 'b' }, ...]
  if (!Array.isArray(answers)) {
    throw new Error('Answers must be an array');
  }

  let score = 0;
  const results = QUIZ_QUESTIONS.map(q => {
    const userAnswer = answers.find(a => a.questionId === q.id);
    const selected = userAnswer ? userAnswer.selectedOptionId : null;
    const isCorrect = selected === q.correctOptionId;

    if (isCorrect) {
      score++;
    }

    return {
      questionId: q.id,
      title: q.title,
      category: q.category,
      selectedOptionId: selected,
      correctOptionId: q.correctOptionId,
      isCorrect,
      explanation: q.explanation,
      safetyTip: q.safetyTip
    };
  });

  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  let feedback = 'Keep practicing! Review the explanations to spot deceptive tactics.';
  if (percentage === 100) {
    feedback = 'Outstanding! You have sharp cybersecurity instincts and recognized all the deceptive tactics.';
  } else if (percentage >= 60) {
    feedback = 'Good awareness! You spotted most red flags. Double check the explanations for the ones you missed.';
  }

  return {
    score,
    totalQuestions: QUIZ_QUESTIONS.length,
    percentage,
    feedback,
    results
  };
}
