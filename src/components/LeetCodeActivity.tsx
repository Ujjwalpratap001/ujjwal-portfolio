import { useEffect, useState } from "react";
import "./ActivityCards.css";

// Yahan apna LeetCode username daalo
const LEETCODE_USERNAME = "YOUR_LEETCODE_USERNAME";

type Calendar = Record<string, number>;

type LeetCodeData = {
  calendar: Calendar;
  solved: number | null;
  easy: number | null;
  medium: number | null;
  hard: number | null;
};

// Kuch APIs calendar ko string deti hain, kuch object -- dono handle karte hain
function toCalendar(raw: unknown): Calendar {
  if (typeof raw === "string") return JSON.parse(raw);
  return (raw as Calendar) || {};
}

async function loadLeetCode(user: string): Promise<LeetCodeData> {
  // Try 1: leetcode-stats-api
  try {
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${user}`);
    const d = await res.json();
    if (d.status === "success") {
      return {
        calendar: toCalendar(d.submissionCalendar),
        solved: d.totalSolved,
        easy: d.easySolved,
        medium: d.mediumSolved,
        hard: d.hardSolved,
      };
    }
  } catch (e) {
    // pehli API fail hui, dusri try karte hain
  }

  // Try 2: alfa-leetcode-api (backup)
  const base = `https://alfa-leetcode-api.onrender.com/${user}`;
  const calRes = await fetch(`${base}/calendar`);
  if (!calRes.ok) throw new Error("LeetCode API not reachable");
  const cal = await calRes.json();

  let solved = null, easy = null, medium = null, hard = null;
  try {
    const s = await (await fetch(`${base}/solved`)).json();
    solved = s.solvedProblem ?? null;
    easy = s.easySolved ?? null;
    medium = s.mediumSolved ?? null;
    hard = s.hardSolved ?? null;
  } catch (e) {
    // solved counts optional hain
  }

  return { calendar: toCalendar(cal.submissionCalendar), solved, easy, medium, hard };
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

// timestamp -> "2026-10-20" format me convert
function buildCounts(calendar: Calendar) {
  const counts: Record<string, number> = {};
  for (const ts in calendar) {
    const key = toDateKey(new Date(Number(ts) * 1000));
    counts[key] = (counts[key] || 0) + calendar[ts];
  }
  return counts;
}

function getStats(counts: Record<string, number>) {
  const activeDays = Object.keys(counts)
    .filter((k) => counts[k] > 0)
    .sort();

  let totalSubmissions = 0;
  for (const day of activeDays) totalSubmissions += counts[day];

  // longest streak
  let maxStreak = 0;
  let run = 0;
  let prev: number | null = null;
  for (const day of activeDays) {
    const t = new Date(day).getTime();
    run = prev !== null && t - prev === 86400000 ? run + 1 : 1;
    if (run > maxStreak) maxStreak = run;
    prev = t;
  }

  // current streak (aaj nahi kiya to kal se ginte hain)
  let currentStreak = 0;
  const cursor = new Date();
  cursor.setUTCHours(0, 0, 0, 0);
  if (!counts[toDateKey(cursor)]) cursor.setUTCDate(cursor.getUTCDate() - 1);
  while (counts[toDateKey(cursor)] > 0) {
    currentStreak++;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  return { activeDays: activeDays.length, totalSubmissions, maxStreak, currentStreak };
}

// 53 weeks x 7 days ka grid
function buildWeeks(counts: Record<string, number>) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const day = new Date(today);
  day.setUTCDate(day.getUTCDate() - 52 * 7 - today.getUTCDay());

  const weeks = [];
  for (let w = 0; w < 53; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const key = toDateKey(day);
      week.push({ key, count: counts[key] || 0, future: day > today });
      day.setUTCDate(day.getUTCDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

function getLevel(count: number) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export default function LeetCodeActivity() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    loadLeetCode(LEETCODE_USERNAME)
      .then(setData)
      .catch(() => setFailed(true));
  }, []);

  const profileUrl = `https://leetcode.com/u/${LEETCODE_USERNAME}/`;

  if (failed) {
    return (
      <div className="act-card">
        <p className="act-note">
          LeetCode activity could not be loaded right now.{" "}
          <a href={profileUrl} target="_blank" rel="noreferrer">
            View my LeetCode profile
          </a>
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="act-card">
        <p className="act-note">Loading LeetCode activity...</p>
      </div>
    );
  }

  const counts = buildCounts(data.calendar);
  const stats = getStats(counts);
  const weeks = buildWeeks(counts);

  return (
    <div className="act-card">
      <div className="act-head">
        <h3>LeetCode Activity</h3>
        <a href={profileUrl} target="_blank" rel="noreferrer">
          @{LEETCODE_USERNAME}
        </a>
      </div>

      <div className="act-stats">
        {data.solved !== null && (
          <div>
            <strong>{data.solved}</strong>
            <span>problems solved</span>
          </div>
        )}
        <div>
          <strong>{stats.totalSubmissions}</strong>
          <span>submissions (last year)</span>
        </div>
        <div>
          <strong>{stats.activeDays}</strong>
          <span>active days</span>
        </div>
        <div>
          <strong>{stats.currentStreak}</strong>
          <span>current streak</span>
        </div>
        <div>
          <strong>{stats.maxStreak}</strong>
          <span>max streak</span>
        </div>
      </div>

      {data.easy !== null && (
        <p className="act-note">
          Easy {data.easy} / Medium {data.medium} / Hard {data.hard}
        </p>
      )}

      <div className="heatmap-scroll">
        <div className="heatmap">
          {weeks.map((week, i) => (
            <div className="heatmap-col" key={i}>
              {week.map((d) => (
                <div
                  key={d.key}
                  className={`cell ${d.future ? "future" : "l" + getLevel(d.count)}`}
                  title={`${d.key}: ${d.count} submission${d.count === 1 ? "" : "s"}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
