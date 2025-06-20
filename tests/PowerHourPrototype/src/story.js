setup.validateTrackDefinitions = function() {
  const expectedSteps = 5;
  for (const [track, steps] of Object.entries(setup.trackDefinitions)) {
    if (!Array.isArray(steps)) {
      console.warn(`❌ Track '${track}' has a non-array step definition.`);
      continue;
    }
    if (steps.length !== expectedSteps) {
      console.warn(`❌ Track '${track}' has ${steps.length} steps (expected ${expectedSteps}).`);
    }
    steps.forEach((step, i) => {
      if (!step.title || !step.desc) {
        console.warn(`❌ Track '${track}' Step ${i + 1} is missing a title or desc.`);
      }
    });
  }
  console.log("✅ Track definition validation complete.");
};


/*────────────────  FLAVOR TEXT  ────────────────*/
setup.trackDefinitions = {
  "Expense Reconciliation": [
    { title: "Receipt Round-Up",
      desc : "Retrieve expense receipts scattered across inboxes and Slack. CoSy suggests this is \"an excellent opportunity for mindfulness.\""},
    { title: "Categorize Expenditures",
      desc : "Apply appropriate budget tags swiftly and silently. Efficiency is happiness."},
    { title: "Spreadsheet Synchronization",
      desc : "Populate the Master Sheet carefully. CoSy observes that perfection is aspirational, but audit trails are real."},
    { title: "Compliance Cross-Check",
      desc : "Verify expenses adhere to updated company policy. The policy last updated 17 minutes ago."},
    { title: "Final Submission Approval",
      desc : "Submit report for managerial approval. Await validation quietly at your workstation."}
  ],

  "Backlogged Emails": [
    { title: "Inbox Zeroing",
      desc : "Ruthlessly archive and delete emails older than two weeks. Emotional attachments to emails are strongly discouraged."},
    { title: "Priority Tagging",
      desc : "Label remaining emails with urgency: \"Immediate,\" \"Eventually,\" or \"Ignore Until Crisis.\""},
    { title: "Canned Response Barrage",
      desc : "Compose neutral, noncommittal replies, opening with vague apologies for your tardiness. Blame scheduling, calendar sync, or “the quarter.”"},
    { title: "Escalation Emails",
      desc : "Forward urgent emails upward and loop your manager in on replies as silent witness. Clearly delegate responsibility elsewhere."},
    { title: "Inbox Zero Victory Lap",
      desc : "Archive everything remaining. Briefly savor the illusion of productivity."}
  ],

  "Client Gratitude Outreach": [
    { title: "CRM Cleanup",
      desc : "Verify accuracy of client data. Remove duplicates, ghost entries, and any record that resembles a real human."},
    { title: "Personalized Email Drafts",
      desc : "Paste client names into warm-sounding templates. Emulate sincerity. Avoid specifics."},
    { title: "Scheduled Delivery Setup",
      desc : "Set emails to auto-send at algorithmically optimal times. Let timing suggest attentiveness."},
    { title: "Post-Outreach Tracking",
      desc : "Flag all non-responses for follow-up. Persistence is indistinguishable from care."},
    { title: "Client Happiness Metrics",
      desc : "Log anticipated satisfaction scores. CoSy reminds you: perceived delight is a performance driver."}
  ],

  "Project Tracker Maintenance": [
    { title: "Status Audit",
      desc : "Check project statuses for outdated information. Ignorance is non-compliant."},
    { title: "Assign Ticket Owner",
      desc : "Reassign overdue tasks. The dropdown offers one name: yours. CoSy flags this as “self-leadership.”"},
    { title: "Deadline Adjustment",
      desc : "Adjust impossible deadlines to slightly-less-impossible dates. Incremental optimism is mandatory."},
    { title: "Dashboard Refresh",
      desc : "Run Dashboard Sync to create the appearance of order from chaos. Perception is reality."},
    { title: "Stakeholder Notification",
      desc : "Email stakeholders summarizing how project turmoil is actually agile innovation."}
  ],

  "Facilities Work Order Requests": [
    { title: "Triage Work Requests",
      desc : "Review maintenance tickets. Prioritize HVAC, electrical, and anything that smells."},
    { title: "Technician Assignment",
      desc : "Assign available technicians. Choose based on proximity, availability, or personal vendetta."},
    { title: "Follow-Up Ping",
      desc : "Send polite yet pointed Slack reminders. Add a period to imply urgency."},
    { title: "Work Order Close-Out",
      desc : "Close work orders confidently, regardless of outcome. Completion is a state of mind."},
    { title: "Facilities Status Email",
      desc : "Circulate glowing reports of resolution. Omit unresolved tickets for clarity and morale."}
  ]
};

/*─────  Visibility Pledges  (one per track) ─────*/
setup.pledgeDefinitions = {
  "Expense Reconciliation":
    "Announce intent to complete expense reconciliation. Success offers recognition. Failure ensures documentation.",
  "Backlogged Emails":
    "Pledge to reach inbox zero. A bold move. CoSy is recording emotional tone.",
  "Client Gratitude Outreach":
    "Commit to measurable client appreciation outcomes. Your optimism has been timestamped.",
  "Project Tracker Maintenance":
    "Declare ownership of tracker maintenance. A reminder: unfinished work becomes part of your digital profile.",
  "Facilities Work Order Requests":
    "Commit openly to clearing facilities requests. CoSy reminds you promises are binding and consequential."
};

/*─────  Hazards & Morale Moments  ─────*/
setup.hazardDefinitions = {
  "Policy Change":
    { burnout:+1,
      desc:"Urgent: Expense policies revised during lunch break. Your immediate compliance is anticipated." },
  "System Outage":
    { burnout:+2,
      desc:"Alert: UpCycle™ experiencing unexpected downtime. CoSy encourages independent problem-solving." }
};

setup.moraleDefinitions = {
  "Surprise Donuts":
    { burnout:-1,
      desc:"Attention: Half-eaten donuts in the break room. Temporary morale improvement authorized." },
  "Praise From The VP":
    { extraAction:1,
      desc:"VP noticed your alignment efforts. CoSy acknowledges your existence positively." }
};


// —— Global config ——
setup.FEED_SIZE = 4;  // change feed size here

// —— Debug modal config ——
setup.debugModalOnStart   = false;
setup.debugModalMessage   = "🛠️  Debug: PowerHour initialized successfully!";

/* Initialize the entire Power Hour module */
setup.initPowerHour = function() {
  State.variables.pph = {
    burnout:      0,
    actionsLeft: 20,
    score:        0,
    deck:         setup.buildDeck(),
    taskFeed:     [],
    activeTracks: {},
    trackOrder:   [],
    pledgedTrack: null,
    completed:    0,
    lastEvent: null,  // hazards/morale
    errorMessage: null,   // out-of-order errors
    roundStarted: false,
    seen:          {},    // ← track every card we’ve ever drawn
    drawLog:	[] // Intializing draw log

  };
  setup.refillFeed();
  setup.ensureFullFeed();
  
    // ←— DEBUG: show a popup on startup
  if (setup.debugModalOnStart) {
    State.variables.pph.lastEvent = setup.debugModalMessage;
  }
  
};

/* Build & shuffle the deck */
setup.buildDeck = function() {
  const defs = setup.trackDefinitions;
    let deck = [];

  /* 25 normal tickets with flavor text */
  Object.entries(setup.trackDefinitions).forEach(([track, steps]) =>
    steps.forEach((stepDef, i) => {
      const step = i + 1;
const stepObj = setup.trackDefinitions[t][i];
      deck.push({
        type: "normal",
        track: t,
        step,
        title: stepDef.title,
        description: stepDef.desc
      });

    })
  );

  /* 2 hazards */
  deck.push({ type: "hazard", id: "Policy Change",     burnout: 1 });
  deck.push({ type: "hazard", id: "System Outage",      burnout: 2 });

  /* 2 morale moments */
  deck.push({ type: "morale", id: "Surprise Donuts",    burnout: -1 });
  deck.push({ type: "morale", id: "Praise From The VP", extraAction: 1 });

  /* 5 visibility pledges */
  tracks.forEach(t =>
    deck.push({ type: "pledge", track: t })
  );

  return deck.shuffle();
};

/* Set up Refilling the Feed */
setup.refillFeed = function(index = null) {
  const pph = State.variables.pph;
  let card, key;

  while (true) {
    card = pph.deck.shift();
    if (!card) {
      console.warn("PPH: deck exhausted!");
      return;
    }

    // 1) Gate hazards/morale until first action
    if (!pph.roundStarted && (card.type === "hazard" || card.type === "morale")) {
      pph.deck.push(card);
      continue;
    }

    // 2) Build a unique key
    if (card.type === "normal") {
      key = `normal|${card.track}|${card.step}`;
    } else if (card.type === "pledge") {
      key = `pledge|${card.track}`;
    } else {
      key = `event|${card.id}`;
    }

    // 3) Skip if we’ve already seen it
    if (pph.seen[key]) {
      continue;
    }

    // 4) Mark it and log it
    pph.seen[key] = true;
    pph.drawLog.push({
      type:  card.type,
      track: card.track || null,
      step:  card.step  || null,
      event: card.id    || null
    });

    // now break out to handle the card
    break;
  }

  console.log("PPH:: Drew card →", card);

  // —— then your existing hazard/morale handlers ——
  if (card.type === "hazard") {
    pph.burnout += card.burnout;
    pph.lastEvent = `${card.id} (+${card.burnout} Burnout)`;
    setup.checkBurnout();
    return setup.refillFeed(index);
  }
  if (card.type === "morale") {
    if (card.burnout) {
      pph.burnout = Math.max(0, pph.burnout + card.burnout);
      pph.lastEvent = `${card.id} (${card.burnout} Burnout)`;
    } else if (card.extraAction) {
      pph.actionsLeft += card.extraAction;
      pph.lastEvent = `${card.id} (+${card.extraAction} Action)`;
    }
    return setup.refillFeed(index);
  }

  // —— finally deal it into the feed ——
  if (index === null) {
    pph.taskFeed.push(card);
  } else {
    pph.taskFeed[index] = card;
  }
};


/* Ensure feed size determines # cards in feed */
setup.ensureFullFeed = function() {
  const pph = State.variables.pph;
  // for every slot 0…FEED_SIZE–1, if it’s falsy, refill that index
  for (let i = 0; i < setup.FEED_SIZE; i++) {
    if (!pph.taskFeed[i]) {
      setup.refillFeed(i);
    }
  }
};

/* Open a new initiative track with escalating burnout */
setup.openTrack = function(track) {
  const pph = State.variables.pph;
  if (!pph.activeTracks.hasOwnProperty(track)) {
    pph.trackOrder.push(track);
    const order = pph.trackOrder.length - 1;
    const delta = Math.min(order, 4);
    pph.burnout += delta;
    pph.activeTracks[track] = 0;
    setup.checkBurnout();
  }
};

/* Handle executing a card */
setup.handleExecute = function(index) {
  const pph = State.variables.pph;
  pph.roundStarted = true;  // mark that we’ve now begun
  const card = pph.taskFeed[index];
  if (!card) return;

  // 1) Pledges still route to the pledge handler
  if (card.type === "pledge") {
    return setup.handlePledge(index);
  }

  // 2) Normal‐ticket sequencing guard
  //    currentStep is 0 if unopened, or the last completed step
  const currentStep = pph.activeTracks[card.track] || 0;
  if (card.step !== currentStep + 1) {
    // Out-of-order click → bail with an error
    pph.errorMessage = "Please adhere to CoSy-mandated productivity sequencing chains."; return Engine.play("PowerHourLoop");
  }

  // 3) It’s valid: if it’s Step 1, opening the track (and burnout) happens here
  if (!pph.activeTracks.hasOwnProperty(card.track)) {
    setup.openTrack(card.track);
  }

  // 4) Advance the step
  pph.activeTracks[card.track] = currentStep + 1;
  if (pph.activeTracks[card.track] === 5) {
    pph.completed += 1;
  }

  // 5) Spend an action, refill that slot
  pph.actionsLeft -= 1;
  setup.refillFeed(index);   
   // at the very end clear errorMessage so it doesn't linger
  pph.errorMessage = null;

  // 6) Route to next - only end when actions run out or burnout
  if (pph.burnout >= 10) {
    return Engine.play("HardFail");
  }
  if (pph.actionsLeft <= 0) {
    // if you've finished ≥1 track by the end, go to Win, otherwise SoftFail
    return pph.completed > 0
      ? Engine.play("Win")
      : Engine.play("SoftFail");
  }
  Engine.play("PowerHourLoop");

};

/* Handle deleting a card */
setup.handleDelete = function(index) {
  const pph = State.variables.pph;
  pph.roundStarted = true;
  pph.actionsLeft -= 1;

  // 1) Clear just that slot
  pph.taskFeed[index] = null;

  // 2) Refill that slot (handles hazards, morale, seen-logic)
  setup.refillFeed(index);

  // 3) Then top up any other empty slots
  setup.ensureFullFeed();

  // 4) Route to next passage
  if (pph.burnout >= 10)      return Engine.play("HardFail");
  if (pph.actionsLeft <= 0) {
    return pph.completed > 0
      ? Engine.play("Win")
      : Engine.play("SoftFail");
  }
  return Engine.play("PowerHourLoop");
};


/* Handle pledging */
setup.handlePledge = function(index) {
  const pph = State.variables.pph;
  pph.roundStarted = true;  // mark that we’ve now begun
  const card = pph.taskFeed[index];
  // Safety check
  if (!card || card.type !== "pledge") {
    return Engine.play("PowerHourLoop");
  }

  // Record pledge and spend an action
  pph.pledgedTrack = card.track;
  pph.actionsLeft -= 1;
  // 1) Refill exactly that slot (auto-firing hazards/morale as needed)
  setup.refillFeed(index);
  // 2) Then top up any remaining gaps so we always have 3 cards
  setup.ensureFullFeed();

  // Finally, route to the correct passage
  if (pph.completed > 0)       return Engine.play("Win");
  if (pph.burnout >= 10)       return Engine.play("HardFail");
  if (pph.actionsLeft <= 0)    return Engine.play("SoftFail");
  return Engine.play("PowerHourLoop");
};


// Animate then call handleDelete
setup.animateDelete = function(index) {
  const pph = State.variables.pph;
  pph.roundStarted = true;
  const el = document.querySelector('.ticket-card[data-index="'+index+'"]');
  if (!el) return setup.handleDelete(index);
  el.classList.add('slide-out');
  el.addEventListener('animationend', function once() {
    el.removeEventListener('animationend', once);
    setup.handleDelete(index);
  });
};

// Animate then call handleExecute
setup.animateExecute = function(index) {
  const pph = State.variables.pph;
  pph.roundStarted = true;
  const el = document.querySelector('.ticket-card[data-index="'+index+'"]');
  if (!el) return setup.handleExecute(index);
  el.classList.add('slide-out');
  el.addEventListener('animationend', function once() {
    el.removeEventListener('animationend', once);
    setup.handleExecute(index);
  });
};

// Animate then call handlePledge
setup.animatePledge = function(index) {
  const pph = State.variables.pph;
  pph.roundStarted = true;
  const el = document.querySelector('.ticket-card[data-index="'+index+'"]');
  if (!el) return setup.handlePledge(index);
  el.classList.add('slide-out');
  el.addEventListener('animationend', function once() {
    el.removeEventListener('animationend', once);
    setup.handlePledge(index);
  });
};



/* Fail on burnout ≥10 */
setup.checkBurnout = function() {
  if (State.variables.pph.burnout >= 10) {
    Engine.play("HardFail");
  }
};

/* Win if any track complete, else soft-fail on out of actions */
setup.checkWinOrFail = function() {
  const pph = State.variables.pph;
  if (pph.completed > 0)      Engine.play("Win");
  else if (pph.actionsLeft <= 0) Engine.play("SoftFail");
};

/*─────────────────────────────────────────────────────
  Calculate Productivity Score at win/lose time
─────────────────────────────────────────────────────*/
setup.calculateScore = function() {
  const pph = State.variables.pph;
  let partialPoints = 0;

  // 0.6 points per step in any unfinished track (capped at 3 per track)
  Object.entries(pph.activeTracks).forEach(([track, progress]) => {
    if (progress < 5) {
      partialPoints += Math.min(progress * 0.6, 3);
    }
  });

  // raw formula:
  //   7 × full tracks  +  partialPoints  −  0.75 × burnout
  const raw = (7 * pph.completed) + partialPoints - (pph.burnout * 0.75);

  // round and clamp ≥0
  pph.score = Math.max(Math.round(raw), 0);
};

// Expose a console‐logging helper
window.pphLog = function() {
  console.table(State.variables.pph.drawLog);
};


// Allow ENTER key to dismiss an active modal
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const modal = document.getElementById('modal');
    if (!modal || modal.classList.contains('exit')) return;
    modal.classList.add('exit');
    modal.addEventListener('animationend', function handler() {
      modal.removeEventListener('animationend', handler);
      // clear whichever flag was showing it
      const pph = State.variables.pph;
      pph.errorMessage = null;
      pph.lastEvent    = null;
      Engine.play('PowerHourLoop');
    });
  }
});
