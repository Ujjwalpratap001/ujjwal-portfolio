import "./ActivityCards.css";

// Username screenshot me thoda cut tha -- agar galat ho to yahan sahi kar do
const MONKEYTYPE_USERNAME = "prataap";

// Ye saare numbers tumhare screenshot (20 Oct 2026) se hain.
// Jab numbers badle, bas yahan update kar do.
const monkeytype = {
  joined: "16 Jan 2026",
  level: 151,
  xp: "2.7k / 7.5k",
  testsStarted: 2885,
  testsCompleted: 2156,
  timeTyping: "60:31:35",
  leaderboards: [
    { mode: "15 seconds", rank: "367873rd", top: "Top 68.74%" },
    { mode: "60 seconds", rank: "329228th", top: "Top 62.44%" },
  ],
  timeBests: [
    { label: "15 seconds", wpm: 81, acc: "100%" },
    { label: "30 seconds", wpm: 76, acc: "97%" },
    { label: "60 seconds", wpm: 66, acc: "96%" },
    { label: "120 seconds", wpm: 58, acc: "95%" },
  ],
  wordBests: [
    { label: "10 words", wpm: 98, acc: "100%" },
    { label: "25 words", wpm: 76, acc: "100%" },
    { label: "50 words", wpm: 72, acc: "96%" },
    { label: "100 words", wpm: 63, acc: "97%" },
  ],
  snapshotDate: "20 Oct 2026",
};

type Best = { label: string; wpm: number; acc: string };

function BestsRow({ title, items }: { title: string; items: Best[] }) {
  return (
    <div className="mt-bests">
      <h4>{title}</h4>
      <div className="mt-bests-grid">
        {items.map((b) => (
          <div key={b.label}>
            <span className="mt-label">{b.label}</span>
            <strong>{b.wpm}</strong>
            <span className="mt-acc">{b.acc} acc</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MonkeytypeCard() {
  const profileUrl = `https://monkeytype.com/profile/${MONKEYTYPE_USERNAME}`;

  return (
    <div className="act-card">
      <div className="act-head">
        <h3>Typing on Monkeytype</h3>
        <a href={profileUrl} target="_blank" rel="noreferrer">
          @{MONKEYTYPE_USERNAME}
        </a>
      </div>

      <p className="act-note">
        Joined {monkeytype.joined} / Level {monkeytype.level} ({monkeytype.xp} XP)
      </p>

      <div className="act-stats">
        <div>
          <strong>{monkeytype.testsStarted}</strong>
          <span>tests started</span>
        </div>
        <div>
          <strong>{monkeytype.testsCompleted}</strong>
          <span>tests completed</span>
        </div>
        <div>
          <strong>{monkeytype.timeTyping}</strong>
          <span>time typing</span>
        </div>
      </div>

      <div className="act-stats">
        {monkeytype.leaderboards.map((lb) => (
          <div key={lb.mode}>
            <strong>{lb.rank}</strong>
            <span>
              {lb.mode} all-time English, {lb.top}
            </span>
          </div>
        ))}
      </div>

      <BestsRow title="Personal bests by time (WPM)" items={monkeytype.timeBests} />
      <BestsRow title="Personal bests by words (WPM)" items={monkeytype.wordBests} />

      <p className="act-note">Stats as of {monkeytype.snapshotDate}.</p>
    </div>
  );
}
