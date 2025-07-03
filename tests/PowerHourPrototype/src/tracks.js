// src/tracks.js

const TRACK_POOL = {
  'Expense Reconciliation': [
    { step: 1, title: 'Receipt Round-Up', description: `Retrieve expense receipts scattered across inboxes and Slack. CoSy suggests this is "an excellent opportunity for mindfulness."` },
    { step: 2, title: 'Categorize Expenditures', description: `Apply appropriate budget tags swiftly and silently. Efficiency is happiness.` },
    { step: 3, title: 'Spreadsheet Synchronization', description: `Populate the Master Sheet carefully. CoSy observes that perfection is aspirational, but audit trails are real.` },
    { step: 4, title: 'Compliance Cross-Check', description: `Verify expenses adhere to updated company policy. The policy last updated 17 minutes ago.` },
    { step: 5, title: 'Final Submission Approval', description: `Submit report for managerial approval. Await validation quietly at your workstation.` }
  ],
  'Backlogged Emails': [
    { step: 1, title: 'Inbox Zeroing', description: `Ruthlessly archive and delete emails older than two weeks. Emotional attachments to emails are strongly discouraged.` },
    { step: 2, title: 'Priority Tagging', description: `Label remaining emails with urgency: "Immediate," "Eventually," or "Ignore Until Crisis."` },
    { step: 3, title: 'Canned Response Barrage', description: `Compose neutral, noncommittal replies, opening with vague apologies for your tardiness. Blame scheduling, calendar sync, or "the quarter."` },
    { step: 4, title: 'Escalation Emails', description: `Forward urgent emails upward and loop your manager in on replies as silent witness. Clearly delegate responsibility elsewhere.` },
    { step: 5, title: 'Inbox Zero Victory Lap', description: `Archive everything remaining. Briefly savor the illusion of productivity.` }
  ],
  'Client Gratitude Outreach': [
    { step: 1, title: 'CRM Cleanup', description: `Verify accuracy of client data. Remove duplicates, ghost entries, and any record that resembles a real human.` },
    { step: 2, title: 'Personalized Email Drafts', description: `Paste client names into warm-sounding templates. Emulate sincerity. Avoid specifics.` },
    { step: 3, title: 'Scheduled Delivery Setup', description: `Set emails to auto-send at algorithmically optimal times. Let timing suggest attentiveness.` },
    { step: 4, title: 'Post-Outreach Tracking', description: `Flag all non-responses for follow-up. Persistence is indistinguishable from care.` },
    { step: 5, title: 'Client Happiness Metrics', description: `Log anticipated satisfaction scores. CoSy reminds you: perceived delight is a performance driver.` }
  ],
  'Project Tracker Maintenance': [
    { step: 1, title: 'Status Audit', description: `Check project statuses for outdated information. Ignorance is non-compliant.` },
    { step: 2, title: 'Assign Ticket Owner', description: `Reassign overdue tasks. The dropdown offers one name: yours. CoSy flags this as "self-leadership."` },
    { step: 3, title: 'Deadline Adjustment', description: `Adjust impossible deadlines to slightly-less-impossible dates. Incremental optimism is mandatory.` },
    { step: 4, title: 'Dashboard Refresh', description: `Run Dashboard Sync to create the appearance of order from chaos. Perception is reality.` },
    { step: 5, title: 'Stakeholder Notification', description: `Email stakeholders summarizing how project turmoil is actually agile innovation.` }
  ],
  'Facilities Work Order Requests': [
    { step: 1, title: 'Triage Work Requests', description: `Review maintenance tickets. Prioritize HVAC, electrical, and anything that smells.` },
    { step: 2, title: 'Technician Assignment', description: `Assign available technicians. Choose based on proximity, availability, or personal vendetta.` },
    { step: 3, title: 'Follow-Up Ping', description: `Send polite yet pointed Slack reminders. Add a period to imply urgency.` },
    { step: 4, title: 'Work Order Close-Out', description: `Close work orders confidently, regardless of outcome. Completion is a state of mind.` },
    { step: 5, title: 'Facilities Status Email', description: `Circulate glowing reports of resolution. Omit unresolved tickets for clarity and morale.` }
  ],
  'Employee Self-Evaluation': [
    { step: 1, title: 'Accomplishment Recall', description: `Review calendars, emails, and task logs. Identify anything that might qualify as "impact."` },
    { step: 2, title: 'Strengths Formatting', description: `Reframe routine behaviors as professional assets. "Responded to messages" becomes "prioritized cross-channel responsiveness."` },
    { step: 3, title: 'Weakness Rewording', description: `Select one flaw to present as aspirational. "Avoids meetings" becomes "independently focused."` },
    { step: 4, title: 'Tone Adjustment Pass', description: `Balance self-assurance with corporate humility. Remove phrases like "obviously" and "single-handedly."` },
    { step: 5, title: 'Final Submission', description: `Transmit self-evaluation via official personnel portal. CoSy will review for excessive confidence.` }
  ],
  'DEI Training Recertification': [
    { step: 1, title: 'Module Login Retrieval', description: `Recover your credentials for the EquityHub training platform. Reset password twice.` },
    { step: 2, title: 'Interactive Scenario Playback', description: `Watch lightly animated workplace dilemmas. Choose the least inflammatory response. Repeat as needed.` },
    { step: 3, title: 'Bias Self-Assessment', description: `Answer a set of vague personality questions. CoSy will generate a pie chart with no context.` },
    { step: 4, title: 'Certification Download', description: `Print a digital badge onto approved paper stock. Display near your desk or in your heart.` },
    { step: 5, title: 'Completion Report Upload', description: `Submit proof of completion to the Ethics Compliance Folder. CoSy will log your moral progress.` }
  ],
  'New Hire Materials': [
    { step: 1, title: 'Handbook Language Update', description: `Remove obsolete references to fax machines and on-site orientation. Add a section on CoSy-assisted workplace etiquette.` },
    { step: 2, title: 'Welcome Message Draft', description: `Compose a warm yet noncommittal greeting. Do not reference recent reorganizations.` },
    { step: 3, title: 'Role Alignment Grid', description: `Map job duties to existing departmental matrices. If none apply, designate "provisional support function."` },
    { step: 4, title: 'Portal Access Setup', description: `Generate login credentials for 9 essential systems. CoSy estimates a 40% success rate on first login.` },
    { step: 5, title: 'Orientation Slideshow Assembly', description: `Compile onboarding visuals and approved talking points. Narration by CoSy is required for consistency.` }
  ],
  'Team Culture Trivia Night': [
    { step: 1, title: 'Theme Selection Sync', description: `Choose between "Space Farm," "Cyber Jungle," or "Mildly Competitive Togetherness." All options are marked "previously used."` },
    { step: 2, title: 'Scheduling Poll Deployment', description: `Send a scheduling form through the internal relay. Results will be inconclusive and conflicting.` },
    { step: 3, title: 'Prize Procurement Loop', description: `Select from pre-approved reward options: branded mugs, generic energy bars, or a 3-month trial of CalmOS.` },
    { step: 4, title: 'Participation Encouragement', description: `Issue reminders with "fun-forward" language. CoSy recommends two exclamation points and one emoji per message.` },
    { step: 5, title: 'Post-Event Feedback Filing', description: `Log team comments under "Engagement Initiative #14-C." Flag any response over 25 words for review.` }
  ],
  'Team Communications Cleanup': [
    { step: 1, title: 'Directory Extraction Scan', description: `Pull a full list of active and dormant communications channels from the Internal Comms Console. Expect legacy spellings and unresolved birthday announcements.` },
    { step: 2, title: 'Thread Status Review', description: `Tag threads as "Active," "Dormant," or "Culturally Sensitive." Proceed with caution.` },
    { step: 3, title: 'Redundancy Sweep', description: `Cross-reference similar names and topics. #team-lounge and #lounge-for-team may be functionally identical. Or not.` },
    { step: 4, title: 'Consolidation Protocol Draft', description: `Prepare a neutral system memo announcing mergers and quiet retirements. Avoid phrasing that implies deletion.` },
    { step: 5, title: 'Scheduled Clean Pass', description: `Initiate archiving at 03:30 system time. CoSy will emit a soft chime upon completion.` }
  ],
  'Legacy Tool Shutdown': [
    { step: 1, title: 'System Usage Scan', description: `Run diagnostics on the deprecated software suite. Ignore any unexpected active user alerts.` },
    { step: 2, title: 'Dependency Mapping', description: `Trace connections to shared drives, printers, and other tools. Label results "advisory only."` },
    { step: 3, title: 'Migration Resource Draft', description: `Assemble a transition document. Avoid answering specific questions.` },
    { step: 4, title: 'Deactivation Scheduling', description: `Select a shutdown date. Announce it in a brief message with no comments enabled.` },
    { step: 5, title: 'Residual Access Sweep', description: `Monitor for attempts to relaunch the tool post-shutdown. CoSy recommends framing them as nostalgic errors.` }
  ],
  'Template Consolidation': [
    { step: 1, title: 'Asset Inventory Compilation', description: `Locate all active and archived presentation templates across shared drives, local folders, and legacy storage. Expect duplication, inconsistency, and several formats no longer supp` },
    { step: 2, title: 'Visual Element Audit', description: `Compare fonts, color palettes, and shape styles. Note: all icons must be blue or "blue-adjacent."` },
    { step: 3, title: 'Header Standardization', description: `Establish universal spacing, capitalization, and alignment rules. Exceptions are permitted for legacy slides.` },
    { step: 4, title: 'Approval Cycle Execution', description: `Circulate draft template for feedback. Receive 14 minor comments and one request to restart from scratch.` },
    { step: 5, title: 'Master Template Activation', description: `Designate final version as default. Watch quietly as no one uses it.` }
  ],
  'Annual Archive Compliance': [
    { step: 1, title: 'File Repository Review', description: `Browse project folders by date. Anything untouched since Q3 should be considered legacy material.` },
    { step: 2, title: 'Retention Label Application', description: `Assign labels based on importance, visibility, and number of initials in the filename.` },
    { step: 3, title: 'Migration Queue Assembly', description: `Move selected files into the holding area. System will prompt three times for confirmation.` },
    { step: 4, title: 'Archival Transfer Execution', description: ` Initiate transfer to cold storage. Status bar will stall at 89% for 6–8 minutes.` },
    { step: 5, title: 'Archive Confirmation Logging', description: `Log completion in the Records Assurance Sheet. Stamp each entry with "DO NOT DELETE" for moral clarity.` }
  ],
  'Meeting Cadence Optimization': [
    { step: 1, title: 'Calendar Audit', description: `Print your full calendar for the quarter. Stare blankly. Begin crossing things out.` },
    { step: 2, title: 'Cancellation Proposal Draft', description: `Draft polite justifications for removing recurring syncs. Use phrases like "agenda drift" and "workflow evolution."` },
    { step: 3, title: 'Replacement Meeting Scheduling', description: `Create new meetings to discuss what to do with the time you just freed up.` },
    { step: 4, title: 'Stakeholder Sync', description: `Gather everyone one last time to decide when to next meet. Budget two hours.` },
    { step: 5, title: 'Rhythm Report Filing', description: `Submit a final cadence update to your department’s archival buffer. Mark as "experimental success."` }
  ],
  'OKR Rewrite Sprint': [
    { step: 1, title: 'Legacy OKR Review', description: `Access last cycle’s Objectives and Key Results. If no one met them, label as "ongoing."` },
    { step: 2, title: 'Objective Rewording', description: `Replace vague goals with grander but equally vague ones. "Improve processes" becomes "pursue operational excellence."` },
    { step: 3, title: 'Metric Fabrication', description: `Assign numbers to outcomes. Target values must feel achievable but never be achieved.` },
    { step: 4, title: 'Team Alignment Loop', description: `Email goals to stakeholders for "alignment." Incorporate conflicting feedback uncritically.` },
    { step: 5, title: 'System Entry & Sync', description: `Input revised OKRs into the planning terminal. Celebrate with a mandatory team slideshow.` }
  ],
  'Time Zone Coordination': [
    { step: 1, title: 'Regional Time Audit', description: `Identify the active zones for all team participants. CoSy suggests using the ChronoMap interface—do not trust Outlook.` },
    { step: 2, title: 'Scheduling Window Search', description: `Locate a 30-minute slot acceptable to UTC-5, UTC+1, and UTC+9. Midnights are acceptable. Weekends are not off-limits.` },
    { step: 3, title: 'Invite Optimization Pass', description: `Reformat event language for temporal neutrality. Avoid phrases like "this morning" or "end of day."` },
    { step: 4, title: 'Automated Reminder Configuration', description: `Deploy region-specific alerts exactly 13 hours before the session. Duplicate any message labeled "unclear."` },
    { step: 5, title: 'Post-Meeting Sync Loop', description: `Email the meeting recording to those who couldn\'t attend. Apologize preemptively for time zone confusion. Again.` }
  ],
  'Access Rights Review': [
    { step: 1, title: 'Permissions Log Extraction', description: `Pull access reports from the Security Module. Wait for CoSy to decrypt a file named perm_audit_FINAL2.fmt.` },
    { step: 2, title: 'User Role Verification', description: `Cross-check current permissions with official team functions. Note any anomalies (e.g. former interns, ousted ex-CEOs).` },
    { step: 3, title: 'Redundant Access Tagging', description: `Identify individuals with inexplicably high-level control. Flag, but do not remove—CoSy recommends discretion.` },
    { step: 4, title: 'Change Request Drafting', description: `Submit formal revocation requests via the Access Panel. CoSy will require at least one manager\'s silent approval.` },
    { step: 5, title: 'Report Filing & Closure', description: `Mark permissions as "provisionally aligned." Archive your findings in the Security Directory beneath "Non-Urgent."` }
  ],
  'Communications & Spin': [
    { step: 1, title: 'Survey Result Reframing', description: `Translate "disengaged" into "open to new challenges."` },
    { step: 2, title: 'Raw Data Ingestion', description: `Download the full survey dataset. Immediately suppress all columns labeled "Other comments."` },
    { step: 3, title: 'Sentiment Glossary Creation', description: `Convert negative language into "growth-oriented" terminology. "Toxic" becomes "challenging but dynamic."` },
    { step: 4, title: 'Presentation Development', description: `Design a presentation with optimistic charts and soothing gradients. Avoid bar graphs with negative axes.` },
    { step: 5, title: 'Executive Talking Points', description: `Draft confident statements about "strong internal alignment." Do not cite any data directly.` }
  ],
  'Crisis Debrief Report': [
    { step: 1, title: 'Incident Recap Draft', description: `Describe what happened in neutral, passive voice. Avoid assigning blame, including to yourself.` },
    { step: 2, title: 'Root Cause Brainstorm', description: `Identify five contributing factors. Choose the one least tied to leadership decisions.` },
    { step: 3, title: 'Mitigation Strategies List', description: `Invent action items retroactively. CoSy notes: perception of learning is more important than actual change.` },
    { step: 4, title: 'Team Debrief Scheduling', description: `Schedule a meeting no one wants to attend. Leave the invite title vague ("Project Reflections").` },
    { step: 5, title: 'Presentation Finalization', description: `Compile findings into a report. Add a closing section titled "Next Steps" with no actual steps listed.` }
  ],
  'CoSy Usage Report': [
    { step: 1, title: 'Data Export Request', description: `Request CoSy activity logs via the Systems Access Terminal. Output will arrive as a tab-delimited text file with partial timestamps.` },
    { step: 2, title: 'Usage Metric Selection', description: `Pick KPIs that make CoSy look helpful. Any action longer than 1.3 seconds qualifies as "meaningful contact."` },
    { step: 3, title: 'Anomaly Redaction Pass', description: `Remove all instances of hallucinated HR terminations. Flag "emotional volatility spikes" as "user curiosity."` },
    { step: 4, title: 'Uptake Narrative Crafting', description: `Emphasize productivity gains, even if fabricated. Include at least one quote attributed to "Senior Staff Member."` },
    { step: 5, title: 'Report Submission Ceremony', description: `Upload findings to the shared drive. CoSy will issue a Priority Notification to all stakeholders, which they will ignore in perfect sync.` }
  ],
  'Cross-Team Sync Request': [
    { step: 1, title: 'Stakeholder Identification Loop', description: `Determine who technically "owns" the project. Accept that it may be no one.` },
    { step: 2, title: 'Interest Alignment Mapping', description: `Create a visual chart of team goals. Make all lines point inward.` },
    { step: 3, title: 'Collaboration Request Draft', description: `Write a message that sounds cooperative, not desperate. CoSy recommends the word "synergies."` },
    { step: 4, title: 'Meeting Slot Negotiation', description: `Book time across incompatible calendars. Consider rotating attendance as a compromise.` },
    { step: 5, title: 'Success Perception Logging', description: `Submit a status update. Use phrases like "cross-functional momentum" and "early traction."` }
  ],
  'Connectivity Escalation Protocol': [
    { step: 1, title: 'Outage Pattern Review', description: `Compare downtime reports across departments. All patterns will be inconclusive.` },
    { step: 2, title: 'ISP Accountability Thread', description: `Begin an internal log of provider incidents. Send it nowhere.` },
    { step: 3, title: 'Signal Boost Trial', description: `Test wireless strength near problem zones. Avoid eye contact with Facilities.` },
    { step: 4, title: 'Router Label Audit', description: `Ensure naming conventions are updated. "Router_3 (new)" should be renamed to "Router_3 (actual)."` },
    { step: 5, title: 'IT Sync Submission', description: `Escalate issue with full documentation. CoSy will mark the ticket "resolved" in 4–6 weeks.` }
  ],
  'Badge Access Compliance': [
    { step: 1, title: 'Badge Record Pull', description: `Download logs from the Entry Security Module. Expect file to open in legacy spreadsheet software.` },
    { step: 2, title: 'Employee Status Check', description: `Cross-reference active badge IDs with the People Index. Investigate anyone listed as "liminal."` },
    { step: 3, title: 'Restricted Area Audit', description: `Note any unauthorized access to Storage Zone B or the Wellness Nook.` },
    { step: 4, title: 'Revocation Request Filing', description: `Request badge deactivation for ghost IDs. Include a timestamp and an apology.` },
    { step: 5, title: 'System Sync & Sign-Off', description: `Submit your findings to Facilities. Then attempt to badge into your own floor.` }
  ],
  'Policy Document Harmonization': [
    { step: 1, title: 'Version Control Retrieval', description: `Pull every known variant from the archive. Prioritize the ones labeled "Use this one maybe."` },
    { step: 2, title: 'Contradiction Indexing', description: `Highlight every inconsistency. There will be hundreds. Accept this as growth.` },
    { step: 3, title: 'Consensus Phrase Drafting', description: `Craft new language that pleases all departments. Use generous ambiguity.` },
    { step: 4, title: 'Formatting Compliance Pass', description: `Ensure line spacing and font size match department norms. This will be impossible.` },
    { step: 5, title: 'Live Document Deployment', description: `Publish to the Policy Directory. It will be quietly replaced within the quarter.` }
  ],
  'Breakroom Amenities Survey': [
    { step: 1, title: 'Feedback Form Creation', description: `Draft a survey asking if team members "feel good" about the current snack shelf.` },
    { step: 2, title: 'Distribution & Reminder Loop', description: `Send the form twice. Follow up with a cheerful bulletin titled "We Value Your Voice."` },
    { step: 3, title: 'Data Visualization Attempt', description: `Generate a bar chart comparing milk preferences. Consider removing axes.` },
    { step: 4, title: 'Vendor Discussion Thread', description: `Schedule a meeting about crackers. Postpone it.` },
    { step: 5, title: 'Procurement Decision Logging', description: `Select the least polarizing options. Mark them "subject to change."` }
  ],

  // ...additional tracks would follow in the same format
  // 'TRACK': [
  //  { step: 1, title: '', description: `` },
  //  { step: 2, title: '', description: `` },
  // { step: 3, title: '', description: `` },
  // { step: 4, title: '', description: `` },
  // { step: 5, title: '', description: `` } ]

};


// expose globally
window.TRACK_POOL = TRACK_POOL;