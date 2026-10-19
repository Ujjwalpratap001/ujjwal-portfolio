import { useState } from 'react';

/** Interface sketches, drawn in code. They are illustrations, not screenshots of the real apps. */
export function QuizMockup() {
  const [picked, setPicked] = useState<number | null>(null);
  const options = ['Queue', 'Stack', 'Linked list', 'Binary tree'];
  const correct = 1;
  return (
    <div className="mock mock--quiz">
      <div className="mock__bar" aria-hidden="true"><i /><i /><i /></div>
      <div className="quiz__head">
        <span>Sample subject</span>
        <span>Question 3 of 10</span>
      </div>
      <div className="quiz__progress" aria-hidden="true"><i /></div>
      <p className="quiz__q">Which data structure follows last-in, first-out order?</p>
      <ul className="quiz__opts">
        {options.map((o, i) => {
          const state = picked === null ? '' : i === correct ? 'is-correct' : i === picked ? 'is-wrong' : '';
          return (
            <li key={o}>
              <button type="button" className={`quiz__opt ${state}`} onClick={() => setPicked(i)} aria-pressed={picked === i}>
                {o}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="quiz__foot" aria-live="polite">
        <span>{picked === null ? 'Pick an answer' : picked === correct ? 'Correct. Stack is LIFO.' : 'Not quite. The answer is Stack.'}</span>
        <button type="button" className="quiz__reset" onClick={() => setPicked(null)}>Reset</button>
      </div>
    </div>
  );
}

export function GalleryMockup() {
  const tiles = [
    { h: 150, bg: 'linear-gradient(160deg,#ff6a2b,#31080d)' },
    { h: 110, bg: 'linear-gradient(200deg,#1b1b22,#ff3b24)' },
    { h: 190, bg: 'linear-gradient(140deg,#31080d,#0c0c10 60%,#ff6a2b)' },
    { h: 120, bg: 'radial-gradient(circle at 30% 30%,#ff6a2b,#1a0c0e 70%)' },
    { h: 170, bg: 'linear-gradient(180deg,#0c0c10,#4a1215 70%,#ff3b24)' },
    { h: 130, bg: 'conic-gradient(from 200deg at 60% 40%,#111113,#ff3b24,#31080d,#111113)' },
  ];
  return (
    <div className="mock mock--gallery">
      <div className="mock__bar" aria-hidden="true"><i /><i /><i /></div>
      <div className="gal__chips" aria-hidden="true">
        <span className="is-on">All</span><span>Nature</span><span>Abstract</span><span>Dark</span>
      </div>
      <div className="gal__grid" aria-hidden="true">
        {tiles.map((t, i) => (
          <div key={i} className="gal__tile" style={{ height: t.h, background: t.bg }}>
            <span>Download</span>
          </div>
        ))}
      </div>
    </div>
  );
}
