// 24: combine four cards with + − × ÷ to make 24.
(function () {
  const TARGET = 24;
  const ROUND_SECONDS = 60;
  const OP_SYMBOLS = { "+": "+", "-": "−", "*": "×", "/": "÷" };

  // Exact fraction math so 8 / 3 × 9 lands on 24 instead of 23.999...
  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) [a, b] = [b, a % b];
    return a || 1;
  }
  function frac(n, d = 1) {
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d);
    return { n: n / g, d: d / g };
  }
  function apply(a, op, b) {
    switch (op) {
      case "+": return frac(a.n * b.d + b.n * a.d, a.d * b.d);
      case "-": return frac(a.n * b.d - b.n * a.d, a.d * b.d);
      case "*": return frac(a.n * b.n, a.d * b.d);
      case "/": return b.n === 0 ? null : frac(a.n * b.d, a.d * b.n);
    }
  }
  function isTarget(f) { return f.d === 1 && f.n === TARGET; }
  function format(f) { return f.d === 1 ? String(f.n) : f.n + "/" + f.d; }

  function solvable(values) {
    if (values.length === 1) return isTarget(values[0]);
    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < values.length; j++) {
        if (i === j) continue;
        const rest = values.filter((_, k) => k !== i && k !== j);
        for (const op of ["+", "-", "*", "/"]) {
          const r = apply(values[i], op, values[j]);
          if (r && solvable(rest.concat([r]))) return true;
        }
      }
    }
    return false;
  }

  function deal() {
    let nums;
    do {
      nums = Array.from({ length: 4 }, () => 1 + Math.floor(Math.random() * 10));
    } while (!solvable(nums.map((n) => frac(n))));
    return nums;
  }

  const els = {
    cards: document.getElementById("game-cards"),
    ops: document.querySelectorAll(".game-op"),
    time: document.getElementById("game-time"),
    score: document.getElementById("game-score"),
    start: document.getElementById("game-start"),
    undo: document.getElementById("game-undo"),
    reset: document.getElementById("game-reset"),
    message: document.getElementById("game-message"),
  };

  let hand = [];      // the four starting numbers
  let slots = [];     // four slots, each a fraction or null once merged away
  let history = [];   // previous slot states for Undo
  let selected = null;
  let op = null;
  let locked = false; // true while showing a result or after a round ends
  let round = null;   // { endsAt, score, timer } while a timed round runs
  let pending = null; // timeout that moves on after a finished hand

  function newHand() {
    hand = deal();
    resetHand();
  }

  function resetHand() {
    clearTimeout(pending);
    slots = hand.map((n) => frac(n));
    history = [];
    selected = null;
    op = null;
    locked = false;
    render();
  }

  function say(text) { els.message.textContent = text; }

  function render() {
    els.cards.replaceChildren(...slots.map((value, i) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "game-card";
      if (value === null) {
        card.classList.add("is-empty");
        card.disabled = true;
        card.setAttribute("aria-hidden", "true");
        card.tabIndex = -1;
      } else {
        card.textContent = format(value);
        if (value.d !== 1) card.classList.add("is-fraction");
        if (i === selected) card.classList.add("is-selected");
        card.setAttribute("aria-pressed", String(i === selected));
        card.disabled = locked;
        card.addEventListener("click", () => pickCard(i));
      }
      return card;
    }));
    els.ops.forEach((b) => {
      b.classList.toggle("is-selected", b.dataset.op === op);
      b.setAttribute("aria-pressed", String(b.dataset.op === op));
      b.disabled = locked;
    });
    els.undo.disabled = locked || history.length === 0;
    els.reset.disabled = locked || history.length === 0;
  }

  function pickCard(i) {
    if (locked || slots[i] === null) return;
    if (selected === null || op === null) {
      selected = selected === i ? null : i;
      render();
      return;
    }
    if (i === selected) {
      op = null;
      render();
      return;
    }
    const result = apply(slots[selected], op, slots[i]);
    if (result === null) {
      say("You can't divide by zero.");
      op = null;
      render();
      return;
    }
    history.push(slots.slice());
    slots[selected] = null;
    slots[i] = result;
    selected = i;
    op = null;
    render();
    if (slots.filter((v) => v !== null).length === 1) finishHand(result);
  }

  function pickOp(next) {
    if (locked) return;
    if (selected === null) {
      say("Pick a number first.");
      return;
    }
    op = op === next ? null : next;
    render();
  }

  function finishHand(result) {
    locked = true;
    render();
    if (isTarget(result)) {
      if (round) {
        round.score++;
        els.score.textContent = round.score;
      }
      say("24! Nice.");
      pending = setTimeout(newHand, 700);
    } else {
      say("That makes " + format(result) + ", not 24. Try again.");
      pending = setTimeout(resetHand, 1200);
    }
  }

  function undo() {
    if (locked || history.length === 0) return;
    slots = history.pop();
    selected = null;
    op = null;
    render();
  }

  // Timed round
  function startRound() {
    round = { endsAt: Date.now() + ROUND_SECONDS * 1000, score: 0, timer: null };
    els.score.textContent = "0";
    els.start.disabled = true;
    round.timer = setInterval(tick, 200);
    tick();
    newHand();
    say("Go! Solve as many as you can.");
  }

  function tick() {
    const left = Math.max(0, Math.ceil((round.endsAt - Date.now()) / 1000));
    els.time.textContent = Math.floor(left / 60) + ":" + String(left % 60).padStart(2, "0");
    if (left === 0) endRound();
  }

  function endRound() {
    clearInterval(round.timer);
    clearTimeout(pending);
    const score = round.score;
    round = null;
    els.start.disabled = false;
    newHand();
    say("Time's up! You solved " + score + ". Press Start to play again.");
  }

  els.ops.forEach((b) => b.addEventListener("click", () => pickOp(b.dataset.op)));
  els.undo.addEventListener("click", undo);
  els.reset.addEventListener("click", () => { if (!locked) resetHand(); });
  els.start.addEventListener("click", startRound);

  // Keyboard: 1-4 pick cards, + - * x / pick operations, Backspace undoes.
  document.addEventListener("keydown", (e) => {
    if (e.target instanceof HTMLInputElement || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key >= "1" && e.key <= "4") pickCard(Number(e.key) - 1);
    else if (e.key === "x" || e.key === "X") pickOp("*");
    else if (e.key in OP_SYMBOLS) pickOp(e.key);
    else if (e.key === "Backspace") undo();
    else return;
    e.preventDefault();
  });

  // Welcome shower of sparkles, rainbows and unicorns when the page opens.
  function rain() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sky = document.createElement("div");
    sky.className = "rain";
    sky.setAttribute("aria-hidden", "true");
    const pieces = ["✨", "🌈", "🦄", "✨", "🌈", "🦄", "⭐"];
    for (let i = 0; i < 45; i++) {
      const drop = document.createElement("span");
      drop.textContent = pieces[i % pieces.length];
      drop.style.left = Math.random() * 100 + "%";
      drop.style.fontSize = 18 + Math.random() * 20 + "px";
      drop.style.animationDuration = 2.5 + Math.random() * 2 + "s";
      drop.style.animationDelay = Math.random() * 1.5 + "s";
      sky.append(drop);
    }
    document.body.append(sky);
    setTimeout(() => sky.remove(), 6500);
  }

  newHand();
  rain();
})();
