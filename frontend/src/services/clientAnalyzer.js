/**
 * ScamLens Explainable Scam Analysis Engine
 * Rule-based heuristic analyzer for messages and URLs
 * Designed to provide actionable, explainable cybersecurity indicators without paid APIs.
 */

export function analyzeMessage(text) {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return {
      riskCategory: 'Unable to assess',
      summary: 'No text provided for analysis.',
      warningCount: 0,
      findings: [],
      safeNextSteps: ['Provide message content or screenshot transcript to analyze.'],
      disclaimer: 'Analysis is based on heuristic pattern recognition. Absence of warnings does not guarantee safety.'
    };
  }

  const cleanedText = text.trim();
  const lower = cleanedText.toLowerCase();
  const findings = [];

  // 1. Credential & OTP / PIN Harvesting
  const otpRegex = /\b(otp|one[- ]time password|verification code|pin|cvv|net[- ]?banking password|security code|mpin)\b/i;
  const requestRegex = /\b(share|send|provide|give|tell|enter|verify|confirm|forward)\b/i;
  if (otpRegex.test(lower) && requestRegex.test(lower)) {
    const match = cleanedText.match(new RegExp(`(?:${requestRegex.source}).{0,30}(?:${otpRegex.source})|(?:${otpRegex.source}).{0,30}(?:${requestRegex.source})`, 'i'));
    findings.push({
      id: 'cred-harvesting',
      title: 'Request for Sensitive Verification Code or PIN',
      severity: 'high',
      evidence: match ? match[0] : 'Reference to sharing OTP/verification code',
      whyItMatters: 'Legitimate institutions, banks, and payment providers explicitly state that their staff will NEVER ask for your OTP, PIN, or banking passwords.',
      verificationStep: 'Never share OTPs or passwords over chat or calls. If unsure, contact the institution directly through their verified official number.',
      limitation: 'If you initiated a two-factor reset yourself, you may be receiving a legitimate code—however, nobody else should ask you to read it to them.'
    });
  }

  // 2. Artificial Urgency & Account Threat
  const urgencyRegex = /\b(account (?:will be )?blocked|suspended immediately|within 24 hours|action required today|urgent attention|service terminated|deactivated today|arrest warrant|legal action)\b/i;
  if (urgencyRegex.test(lower)) {
    const match = cleanedText.match(urgencyRegex);
    findings.push({
      id: 'urgency-threat',
      title: 'Artificial Urgency & Threat of Account Suspension',
      severity: 'high',
      evidence: match ? match[0] : 'Urgent deadline or threat',
      whyItMatters: 'Scammers frequently fabricate urgent deadlines or impending account deactivation to trigger panic, preventing you from stopping to verify.',
      verificationStep: 'Log into your account independently through the official app or website. Do not follow instructions given under pressure.',
      limitation: 'Some legitimate services send genuine billing reminders, but official notices give reasonable notice and link to official account portals.'
    });
  }

  // 3. Upfront Fee / Part-time Job Scams
  const jobFeeRegex = /\b(registration fee|processing fee|security deposit|telegram task|earn (?:₹|\$|rs\.?)\s*[\d,]+(?:\/day|\/month)?|like and subscribe|youtube task|work from home earn)\b/i;
  if (jobFeeRegex.test(lower)) {
    const match = cleanedText.match(jobFeeRegex);
    findings.push({
      id: 'job-fee-scam',
      title: 'Unrealistic Earnings or Upfront Fee Requirement',
      severity: 'high',
      evidence: match ? match[0] : 'High income promise or upfront payment demand',
      whyItMatters: 'Legitimate employers pay you for your work; they never require candidates to pay upfront deposits, "training fees", or complete micro-tasks on Telegram.',
      verificationStep: 'Research the company on official career portals, LinkedIn, and the Ministry of Corporate Affairs (MCA). Never pay money to receive a job.',
      limitation: 'Some freelance platforms take commissions on earned fees, but they do not demand upfront registration payments via private messaging.'
    });
  }

  // 4. Off-Platform Redirection (WhatsApp / Telegram)
  const offPlatformRegex = /\b(contact (?:me )?on whatsapp|join telegram (?:group|channel)|message (?:me )?on telegram|chat on telegram|wa\.me\/\d+)\b/i;
  if (offPlatformRegex.test(lower)) {
    const match = cleanedText.match(offPlatformRegex);
    findings.push({
      id: 'off-platform',
      title: 'Diversion to Unmoderated Messaging App',
      severity: 'medium',
      evidence: match ? match[0] : 'Request to move conversation to WhatsApp/Telegram',
      whyItMatters: 'Fraudulent sellers, fake recruiters, and scammers attempt to move communications away from regulated platforms where buyer protection and moderation exist.',
      verificationStep: 'Insist on keeping all communications within the official platform or verified company email domains.',
      limitation: 'Some small legitimate businesses offer WhatsApp customer support, but beware when initial recruitment or financial transactions happen exclusively there.'
    });
  }

  // 5. Lottery, Prize, or Unexpected Reward Claims
  const prizeRegex = /\b(won (?:a )?(?:lottery|prize|car|iphone|reward|cashback|lucky draw)|claim your reward|selected as (?:the )?winner|congratulations you won)\b/i;
  if (prizeRegex.test(lower)) {
    const match = cleanedText.match(prizeRegex);
    findings.push({
      id: 'prize-claim',
      title: 'Unsolicited Prize or Unexpected Financial Reward',
      severity: 'high',
      evidence: match ? match[0] : 'Unsolicited prize or giveaway announcement',
      whyItMatters: 'If you did not enter a contest, you cannot win it. Scammers use fake prizes as bait to extract taxes, fees, or personal banking credentials.',
      verificationStep: 'Ask yourself: Did you participate in this contest? Never pay any "processing charge" or "customs tax" to receive an alleged reward.',
      limitation: 'Legitimate merchant loyalty programs occasionally award points, but they will never ask you to pay or transfer money to claim them.'
    });
  }

  // 6. Impersonation of Authority or Bank Personnel
  const impersonationRegex = /\b(bank manager|customer support desk|police department|cbi officer|customs department|rbi officer|income tax department|fedex courier customs)\b/i;
  if (impersonationRegex.test(lower)) {
    const match = cleanedText.match(impersonationRegex);
    findings.push({
      id: 'authority-impersonation',
      title: 'Alleged Authority or Banking Representative Claim',
      severity: 'high',
      evidence: match ? match[0] : 'Authority figure impersonation claim',
      whyItMatters: 'Scammers exploit psychological deference to authority figures (police, customs, banks) to intimidate victims into quick compliance.',
      verificationStep: 'Hang up and verify independently. Indian police and law enforcement do not interrogate or accept settlements over WhatsApp video calls ("Digital Arrest").',
      limitation: 'Legitimate government agencies contact individuals via registered post or official government portals (.gov.in), not informal private messages.'
    });
  }

  // 7. Remote Desktop or Screen Sharing Apps
  const remoteAccessRegex = /\b(anydesk|teamviewer|rustdesk|quicksupport|screen share|install this apk)\b/i;
  if (remoteAccessRegex.test(lower)) {
    const match = cleanedText.match(remoteAccessRegex);
    findings.push({
      id: 'remote-access-app',
      title: 'Request to Install Remote Control or Unknown APK',
      severity: 'high',
      evidence: match ? match[0] : 'Mention of remote screen-sharing software or APK',
      whyItMatters: 'Remote desktop software grants the caller full control over your phone or computer, allowing them to view OTPs and initiate bank transfers directly.',
      verificationStep: 'Never install remote viewing software or third-party APKs at the request of anyone claiming to be technical support or bank staff.',
      limitation: 'Corporate IT helpdesks use remote software for managed corporate laptops, but personal banks will NEVER require this.'
    });
  }

  // 8. Payment via UPI / QR to Receive Money
  const upiReceiveRegex = /\b(scan (?:this )?qr (?:code )?to receive|enter (?:your )?upi pin to accept money|pay ₹?1 to verify)\b/i;
  if (upiReceiveRegex.test(lower)) {
    const match = cleanedText.match(upiReceiveRegex);
    findings.push({
      id: 'upi-reverse-fraud',
      title: 'Misleading UPI "Scan to Receive Money" Trick',
      severity: 'high',
      evidence: match ? match[0] : 'Prompt claiming QR scan or PIN is required to receive money',
      whyItMatters: 'UPI Golden Rule: You NEVER enter your UPI PIN or scan a QR code to RECEIVE money. Entering your PIN always deducts money from your account.',
      verificationStep: 'Remember: receiving money requires zero action beyond giving your UPI ID or phone number. Never enter your PIN to receive funds.',
      limitation: 'None. Entering a UPI PIN always authorizes an outgoing debit transaction.'
    });
  }

  // Determine overall risk category
  let riskCategory = 'No obvious warning signs detected';
  const highCount = findings.filter(f => f.severity === 'high').length;
  const mediumCount = findings.filter(f => f.severity === 'medium').length;

  if (highCount >= 1) {
    riskCategory = 'High risk';
  } else if (mediumCount >= 1) {
    riskCategory = 'Caution advised';
  }

  const safeNextSteps = buildSafeSteps(findings, riskCategory);

  return {
    riskCategory,
    summary: buildSummary(riskCategory, findings.length),
    warningCount: findings.length,
    findings,
    safeNextSteps,
    disclaimer: 'This evaluation is an educational assessment based on transparent behavioral heuristics. No automated scanner can guarantee 100% safety. Always confirm independently.'
  };
}

export function analyzeUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string' || rawUrl.trim().length === 0) {
    return {
      riskCategory: 'Unable to assess',
      summary: 'No URL provided for analysis.',
      warningCount: 0,
      findings: [],
      safeNextSteps: ['Provide a full web link (e.g., https://example.com) to inspect.'],
      disclaimer: 'Absence of structural warnings does not guarantee website legitimacy.'
    };
  }

  const trimmed = rawUrl.trim();
  let parsedUrl = null;
  const findings = [];

  // Parse URL safely
  try {
    // Add protocol if missing for parsing purposes
    const urlToParse = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    parsedUrl = new URL(urlToParse);
  } catch (err) {
    return {
      riskCategory: 'Unable to assess',
      summary: 'The provided text could not be parsed as a valid URL.',
      warningCount: 1,
      findings: [{
        id: 'malformed-url',
        title: 'Malformed or Invalid URL Structure',
        severity: 'medium',
        evidence: trimmed.slice(0, 80),
        whyItMatters: 'Unusual, broken, or heavily obfuscated URL characters can be used to bypass security filters.',
        verificationStep: 'Ensure the link is properly formatted before opening or sharing.',
        limitation: 'Some web tools copy partial fragments or encoded characters unintentionally.'
      }],
      safeNextSteps: ['Check for typos or broken syntax in the address.'],
      disclaimer: 'Evaluation performed safely without visiting or executing the destination URL.'
    };
  }

  const hostname = parsedUrl.hostname.toLowerCase();
  const protocol = parsedUrl.protocol.toLowerCase();

  // 1. IP Address Hostname
  const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  if (ipRegex.test(hostname)) {
    findings.push({
      id: 'ip-address-host',
      title: 'Direct IP Address Used as Hostname',
      severity: 'high',
      evidence: hostname,
      whyItMatters: 'Legitimate public companies and services operate using registered domain names. Direct IP addresses are frequently used in phishing campaigns and botnet infrastructure to evade domain reputation filters.',
      verificationStep: 'Do not enter passwords or personal data on sites addressed only by an IP address.',
      limitation: 'Certain local intranet devices (e.g. your home router 192.168.1.1) use IP addresses, but public internet services do not.'
    });
  }

  // 2. High-Risk TLDs or URL Shorteners
  const shorteners = ['bit.ly', 'tinyurl.com', 'is.gd', 'cutt.ly', 't.co', 'rb.gy', 'shorte.st', 'ow.ly'];
  if (shorteners.includes(hostname)) {
    findings.push({
      id: 'url-shortener',
      title: 'Opaque URL Shortener Masks True Destination',
      severity: 'medium',
      evidence: hostname,
      whyItMatters: 'Shortened links hide the ultimate destination domain, making it impossible to see where the link actually leads before clicking.',
      verificationStep: 'Use an online link expander service or avoid opening shortened links from untrusted senders.',
      limitation: 'URL shorteners are widely used on platforms like SMS and Twitter for character conservation.'
    });
  }

  // 3. Known Brand Impersonation / Typosquatting in Hostname
  const brandKeywords = ['paypal', 'netflix', 'amazon', 'apple', 'microsoft', 'google', 'sbi', 'hdfc', 'icici', 'paytm', 'meta', 'whatsapp', 'facebook'];
  const matchedBrand = brandKeywords.find(brand => hostname.includes(brand));
  if (matchedBrand) {
    // Check if it's the genuine domain
    const genuineDomains = [
      'paypal.com', 'netflix.com', 'amazon.com', 'amazon.in', 'apple.com',
      'microsoft.com', 'google.com', 'onlinesbi.sbi', 'sbi.co.in', 'hdfcbank.com',
      'icicibank.com', 'paytm.com', 'whatsapp.com', 'facebook.com'
    ];
    const isGenuine = genuineDomains.some(gd => hostname === gd || hostname.endsWith(`.${gd}`));
    if (!isGenuine) {
      findings.push({
        id: 'brand-typosquat',
        title: `Possible Brand Spoofing (${matchedBrand.toUpperCase()})`,
        severity: 'high',
        evidence: hostname,
        whyItMatters: `The domain mentions "${matchedBrand}" but does not belong to the authentic official domain of that organization. Scammers register lookalike domains to steal logins.`,
        verificationStep: `Do not enter credentials. Navigate manually to the brand's verified website (e.g. by typing the official address directly).`,
        limitation: 'Occasionally partner organizations or marketing sub-campaigns use distinct domains, but banking/login portals should strictly match the official root domain.'
      });
    }
  }

  // 4. Excessive Subdomains or Deceptive Prefix
  const parts = hostname.split('.');
  if (parts.length >= 4) {
    findings.push({
      id: 'excessive-subdomains',
      title: 'Complex Multi-Level Subdomain Structure',
      severity: 'medium',
      evidence: hostname,
      whyItMatters: 'Attackers often craft long subdomain chains like "login.bank.com.verify-access-portal.net" hoping users only notice the initial brand name and ignore the actual domain at the end.',
      verificationStep: 'Look at the last two parts of the domain (e.g. example.com) to identify who actually owns the site.',
      limitation: 'Some large enterprise content delivery networks (CDNs) use deep subdomains.'
    });
  }

  // 5. Plain HTTP (Unencrypted Connection)
  if (protocol === 'http:') {
    findings.push({
      id: 'plain-http',
      title: 'Unencrypted HTTP Connection (No HTTPS)',
      severity: 'medium',
      evidence: 'http://',
      whyItMatters: 'Communications over plain HTTP are transmitted unencrypted in clear text. Anyone on the same network (e.g. public Wi-Fi) can view credentials and submitted data.',
      verificationStep: 'Never enter payment information, passwords, or personal details on websites without HTTPS.',
      limitation: 'Note: HTTPS ensures encrypted transmission between you and the server, but it does NOT guarantee the website owner is honest.'
    });
  }

  // Determine overall risk category
  let riskCategory = 'No obvious warning signs detected';
  const highCount = findings.filter(f => f.severity === 'high').length;
  const mediumCount = findings.filter(f => f.severity === 'medium').length;

  if (highCount >= 1) {
    riskCategory = 'High risk';
  } else if (mediumCount >= 1) {
    riskCategory = 'Caution advised';
  }

  const safeNextSteps = buildSafeSteps(findings, riskCategory);

  return {
    riskCategory,
    summary: buildSummary(riskCategory, findings.length),
    warningCount: findings.length,
    domain: hostname,
    protocol: protocol.replace(':', ''),
    findings,
    safeNextSteps,
    disclaimer: 'This structural inspection checks for deceptive patterns without visiting the URL directly, protecting you against server-side and browser exploits.'
  };
}

function buildSummary(riskCategory, count) {
  if (riskCategory === 'High risk') {
    return `Critical security warning: ${count} high-priority red flag(s) were identified that strongly mirror established fraud patterns.`;
  }
  if (riskCategory === 'Caution advised') {
    return `Caution recommended: ${count} indicator(s) require verification before you interact or share information.`;
  }
  return 'No obvious red flags detected in our automated heuristic scan. Remember that novel or well-disguised attacks may not trigger rule filters.';
}

function buildSafeSteps(findings, riskCategory) {
  const steps = [];
  if (riskCategory === 'High risk') {
    steps.push('Do NOT click the link, scan the code, or send money/OTPs.');
    steps.push('If you already entered banking credentials, freeze your card or UPI account immediately via your banking app or bank helpline.');
    steps.push('Report the number or sender within your messaging app (WhatsApp/SMS) and block them.');
    steps.push('In India, report financial cyber fraud promptly to the 1930 National Cyber Helpline or file a complaint at cybercrime.gov.in.');
  } else if (riskCategory === 'Caution advised') {
    steps.push('Verify the identity of the sender through a trusted, independent communication channel.');
    steps.push('Do not share sensitive credentials or make hasty payments under deadline pressure.');
    steps.push('Check the root domain name in your browser address bar before signing in.');
  } else {
    steps.push('Continue to practice digital hygiene: verify unexpected communications.');
    steps.push('Check that the URL matches the organization\'s authentic official address.');
    steps.push('Ensure your accounts use strong, unique passwords and Multi-Factor Authentication.');
  }
  return steps;
}
