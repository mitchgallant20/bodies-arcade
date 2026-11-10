"use client";
import { useEffect, useState } from "react";
import { LISTS } from "@/lib/engine/lists";
import { withBase } from "@/lib/base";
import { getItem, getJSON, keysWithPrefix, removeItem, setItem } from "@/lib/storage";
import { useClientValue } from "@/lib/useClientValue";

// Dad's Corner, Phase 1 scope (docs/HANDOFF.md, Section 15): PIN gate, Today, Words,
// Settings, Guide. Reads the legacy apps' own storage so earned stars show up today.
// The word engine and Dexie replace the direct reads in Phase 2.

const PIN_HASH = "dad:pinHash";
const UNLOCK_UNTIL = "dad:unlockUntil";
const FAILS = "dad:fails";
const LOCK_UNTIL = "dad:lockUntil";
const UNLOCK_MS = 30 * 60 * 1000;
const LOCK_MS = 60 * 1000;

async function hashPin(pin: string): Promise<string> {
  const data = new TextEncoder().encode(`bodies-arcade:${pin}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function dayKey(d = new Date()): string {
  // Same format as Bodie's Books (local date, YYYY-MM-DD).
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

type Tab = "today" | "words" | "settings" | "guide";

export default function DadCorner() {
  const stored = useClientValue(() => ({ hasPin: !!getItem(PIN_HASH), unlocked: Number(getItem(UNLOCK_UNTIL) ?? 0) > Date.now() }));
  const [hasPin, setHasPin] = useState<boolean | null>(null);
  const [unlocked, setUnlocked] = useState<boolean | null>(null);

  if (!stored) return <p className="fine">Loading</p>;
  if (!(hasPin ?? stored.hasPin)) return <SetPin onDone={() => { setHasPin(true); setUnlocked(true); }} />;
  if (!(unlocked ?? stored.unlocked)) return <PinGate onUnlock={() => setUnlocked(true)} />;
  return <Corner onLock={() => { removeItem(UNLOCK_UNTIL); setUnlocked(false); }} />;
}

function PinPad({ title, hint, onPin, message, disabled }: { title: string; hint: string; onPin: (pin: string) => void; message?: string; disabled?: boolean }) {
  const [pin, setPin] = useState("");
  const press = (d: string) => {
    if (disabled) return;
    const next = (pin + d).slice(0, 4);
    setPin(next);
    if (next.length === 4) { onPin(next); setPin(""); }
  };
  return (
    <div className="pinpad" aria-label={title}>
      <div className="card" style={{ alignItems: "center", textAlign: "center" }}>
        <h2>{title}</h2>
        <p>{hint}</p>
      </div>
      <div className="dots" aria-label={`${pin.length} of 4 digits`}>
        {[0, 1, 2, 3].map((i) => <span key={i} className={i < pin.length ? "on" : ""} />)}
      </div>
      <div className="keys">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
          <button key={d} type="button" onClick={() => press(d)} disabled={disabled}>{d}</button>
        ))}
        <button type="button" className="soft" onClick={() => setPin("")}>Clear</button>
        <button type="button" onClick={() => press("0")} disabled={disabled}>0</button>
        <button type="button" className="soft" onClick={() => setPin(pin.slice(0, -1))} aria-label="Delete last digit">&larr;</button>
      </div>
      <p className={`pinmsg${message?.startsWith("!") ? " bad" : ""}`}>{message?.replace(/^!/, "")}</p>
    </div>
  );
}

function SetPin({ onDone }: { onDone: () => void }) {
  const [first, setFirst] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const onPin = async (pin: string) => {
    if (first === null) { setFirst(pin); setMsg("Now type it again."); return; }
    if (pin !== first) { setFirst(null); setMsg("!Those did not match. Start again."); return; }
    setItem(PIN_HASH, await hashPin(pin));
    setItem(UNLOCK_UNTIL, String(Date.now() + UNLOCK_MS));
    onDone();
  };
  return <PinPad title="Set a PIN" hint="Pick 4 digits only you know. Bodie never needs this screen." onPin={onPin} message={msg} />;
}

function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [msg, setMsg] = useState("");
  const secondsLeft = () => Math.max(0, Math.ceil((Number(getItem(LOCK_UNTIL) ?? 0) - Date.now()) / 1000));
  const initialLock = useClientValue(secondsLeft) ?? 0;
  const [lockedForState, setLockedFor] = useState<number | null>(null);
  const lockedFor = lockedForState ?? initialLock;

  useEffect(() => {
    const id = setInterval(() => setLockedFor(secondsLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const onPin = async (pin: string) => {
    if (lockedFor > 0) return;
    if ((await hashPin(pin)) === getItem(PIN_HASH)) {
      setItem(FAILS, "0");
      setItem(UNLOCK_UNTIL, String(Date.now() + UNLOCK_MS));
      onUnlock();
      return;
    }
    const fails = (Number(getItem(FAILS) ?? 0) || 0) + 1;
    setItem(FAILS, String(fails));
    if (fails >= 3) {
      setItem(FAILS, "0");
      setItem(LOCK_UNTIL, String(Date.now() + LOCK_MS));
      setLockedFor(60);
      setMsg("!Three misses. Wait a minute.");
    } else {
      setMsg(`!Not it. ${3 - fails} more ${3 - fails === 1 ? "try" : "tries"}.`);
    }
  };

  return (
    <PinPad
      title="Dad's Corner"
      hint="Type the 4-digit PIN."
      onPin={onPin}
      disabled={lockedFor > 0}
      message={lockedFor > 0 ? `!Locked for ${lockedFor}s` : msg}
    />
  );
}

function Corner({ onLock }: { onLock: () => void }) {
  const [tab, setTab] = useState<Tab>("today");
  const tabs: [Tab, string][] = [["today", "Today"], ["words", "Words"], ["settings", "Settings"], ["guide", "Guide"]];
  return (
    <>
      <div className="tabs" role="tablist" aria-label="Dad's Corner">
        {tabs.map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)} type="button">{label}</button>
        ))}
        <button type="button" onClick={onLock} aria-label="Lock Dad's Corner">Lock</button>
      </div>
      {tab === "today" && <Today />}
      {tab === "words" && <Words />}
      {tab === "settings" && <Settings />}
      {tab === "guide" && <Guide />}
    </>
  );
}

function readProgress() {
  const stars: Record<string, number> = {};
  for (const k of keysWithPrefix("bb:wm:")) stars[k.slice(6)] = Number(getItem(k) ?? 0) || 0;
  const shootoutBest: Record<string, number> = {};
  for (const l of LISTS) shootoutBest[l.id] = Number(getItem(`bb:gbest:${l.id}`) ?? 0) || 0;
  const booksFinished = keysWithPrefix("bb:done:").reduce((n, k) => n + (Number(getItem(k) ?? 0) || 0), 0);
  return {
    bigCatchWords: getJSON<Record<string, { right: number; wrong: number; streak: number; last: number }>>("bbc_words", {}),
    bigCatchJar: getJSON<{ bait?: number; jars?: number; words?: number }>("bbc_save", {}),
    turtlesBest: Number(getItem("bpt_best") ?? 0) || 0,
    shootoutGames: Number(getItem("bb:games") ?? 0) || 0,
    shootoutBest,
    booksFinished,
    cardDays: getJSON<string[]>("bb:fcdays", []),
    stars,
  };
}

function useProgress() {
  return { p: useClientValue(readProgress) };
}

function Today() {
  const { p } = useProgress();
  if (!p) return null;
  const gold = Object.values(p.stars).filter((n) => n >= 3).length;
  const learning = Object.values(p.stars).filter((n) => n > 0 && n < 3).length;
  const now = new Date();
  const dow = (now.getDay() + 6) % 7;
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dow);
  const week = "MTWTFSS".split("").map((l, i) => {
    const d = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
    return { l, on: p.cardDays.includes(dayKey(d)), today: i === dow };
  });
  const daysOn = week.filter((d) => d.on).length;
  return (
    <section style={{ display: "grid", gap: 16 }}>
      <div className="tiles">
        <div className="tile"><span className="n">{gold}</span><span className="l">gold star words</span></div>
        <div className="tile"><span className="n">{learning}</span><span className="l">words in progress</span></div>
        <div className="tile"><span className="n">{p.booksFinished}</span><span className="l">books finished</span></div>
        <div className="tile"><span className="n">{p.turtlesBest}</span><span className="l">Purple Turtles best</span></div>
        <div className="tile"><span className="n">{p.shootoutGames}</span><span className="l">Shootout games</span></div>
      </div>
      <div className="card">
        <h2>Flash card days this week</h2>
        <div className="week" aria-label={`${daysOn} days this week`}>
          {week.map((d, i) => <span key={i} className={d.on ? "on" : ""} title={d.today ? "Today" : undefined}>{d.l}</span>)}
        </div>
        <p>{daysOn === 0 ? "No cards yet this week. A quick run is three minutes." : `${daysOn} ${daysOn === 1 ? "day" : "days"} with cards. Three good days turns a word gold.`}</p>
        <div className="row">
          <a className="btn small" href={withBase("/play/bodies-books.html#cards")}>START CARDS</a>
          <a className="btn ghost small" href={withBase("/play/purple-turtles.html#reading")}>TURTLES, WORD MODE</a>
        </div>
      </div>
      <p className="fine">Guided sessions with a timer arrive with the word engine (Phase 2).</p>
    </section>
  );
}

function BigCatchWords({ words, jar }: { words: Record<string, { right: number; wrong: number; streak: number; last: number }>; jar: { bait?: number; jars?: number; words?: number } }) {
  const entries = Object.entries(words);
  if (!entries.length) return (
    <div className="card">
      <h2>Big Catch, word mode</h2>
      <p>Nothing yet. Turn on word mode in the fishing game (pause menu) and he hears a sight word on every bite.</p>
      <div className="row"><a className="btn small" href={withBase("/play/big-catch.html#reading")}>BIG CATCH, WORD MODE</a></div>
    </div>
  );
  const right = entries.reduce((n, [, v]) => n + (v.right || 0), 0);
  const wrong = entries.reduce((n, [, v]) => n + (v.wrong || 0), 0);
  // Recency is read from the newest record, not the clock, so this stays pure during render
  const newest = entries.reduce((n, [, v]) => Math.max(n, v.last || 0), 0);
  const week = newest - 7 * 86400000;
  const missed = entries.filter(([, v]) => (v.wrong || 0) > 0 && v.last > week && (v.streak || 0) < 2).sort((a, b) => (b[1].wrong || 0) - (a[1].wrong || 0)).map(([w]) => w);
  const solid = entries.filter(([, v]) => (v.streak || 0) >= 3).map(([w]) => w);
  return (
    <div className="card">
      <h2>Big Catch, word mode</h2>
      <div className="tiles">
        <div className="tile"><span className="n">{right}</span><span className="l">words right</span></div>
        <div className="tile"><span className="n">{wrong}</span><span className="l">misses</span></div>
        <div className="tile"><span className="n">{jar.jars ?? 0}</span><span className="l">bait jars filled</span></div>
        <div className="tile"><span className="n">{jar.bait ?? 0}/10</span><span className="l">worms in the jar</span></div>
      </div>
      {missed.length > 0 && (<>
        <p style={{ margin: "10px 0 6px" }}>Missed this week, coming back soon in the game:</p>
        <div className="words">{missed.slice(0, 24).map((w) => <span key={w} className="s1">{w}</span>)}</div>
      </>)}
      {solid.length > 0 && (<>
        <p style={{ margin: "10px 0 6px" }}>Solid in the game (three right in a row):</p>
        <div className="words">{solid.slice(0, 40).map((w) => <span key={w} className="s3">{w}</span>)}</div>
      </>)}
      <p className="fine" style={{ textAlign: "left" }}>Words come from the same lists as the books. He hears a word on each bite and taps the match; after a catch he can spell the fish. Fishing never writes to the book stars.</p>
    </div>
  );
}

function Words() {
  const { p } = useProgress();
  if (!p) return null;
  return (
    <section className="lists">
      {LISTS.map((list) => {
        const counts = list.words.map((w) => p.stars[w] ?? 0);
        const gold = counts.filter((n) => n >= 3).length;
        const started = counts.filter((n) => n > 0).length;
        return (
          <details className="listrow" key={list.id}>
            <summary>
              <span>{list.name} <small style={{ color: "var(--muted)", fontWeight: 500 }}>{list.sub}</small></span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{gold} / {list.words.length}</span>
            </summary>
            <div className="meter" aria-hidden="true"><i style={{ width: `${(gold / list.words.length) * 100}%` }} /></div>
            <p className="fine" style={{ textAlign: "left" }}>{gold} gold, {started - gold} on the way, {list.words.length - started} not started. Shootout best on this deck: {p.shootoutBest[list.id] ?? 0}/10.</p>
            <div className="words">
              {list.words.map((w) => <span key={w} className={`s${Math.min(3, p.stars[w] ?? 0)}`} title={`${p.stars[w] ?? 0} of 3 stars`}>{w}</span>)}
            </div>
          </details>
        );
      })}
      <BigCatchWords words={p.bigCatchWords} jar={p.bigCatchJar} />
      <p className="fine">Gold = read first try on three different days (the legacy star rule). Modality mix and the practice pile come with the engine.</p>
    </section>
  );
}

function Settings() {
  const stored = useClientValue(() => ({
    sound: getJSON<boolean>("bpt_sound", true),
    reading: getJSON<boolean>("bpt_reading", false),
    highlight: getItem("bb:sw") !== "0",
  }));
  const [soundState, setSound] = useState<boolean | null>(null);
  const [readingState, setReading] = useState<boolean | null>(null);
  const [highlightState, setHighlight] = useState<boolean | null>(null);
  const sound = soundState ?? stored?.sound ?? true;
  const reading = readingState ?? stored?.reading ?? false;
  const highlight = highlightState ?? stored?.highlight ?? true;
  const [resetText, setResetText] = useState("");
  const [toast, setToast] = useState("");
  const [changingPin, setChangingPin] = useState(false);

  const flash = (t: string) => { setToast(t); setTimeout(() => setToast(""), 2500); };

  const resetAll = () => {
    for (const k of [...keysWithPrefix("bb:"), ...keysWithPrefix("bpt_")]) removeItem(k);
    setResetText("");
    flash("All progress cleared.");
  };

  if (changingPin) {
    return (
      <SetPin onDone={() => { setChangingPin(false); flash("PIN changed."); }} />
    );
  }

  return (
    <section className="settings">
      <label className="opt">
        <input id="opt-sound" type="checkbox" checked={sound} onChange={(e) => { setSound(e.target.checked); setItem("bpt_sound", JSON.stringify(e.target.checked)); }} />
        <span>Sound effects in Purple Turtles<small>iOS mutes web audio when the ring/silent switch is off. Nothing in the app can change that.</small></span>
      </label>
      <label className="opt">
        <input id="opt-reading" type="checkbox" checked={reading} onChange={(e) => { setReading(e.target.checked); setItem("bpt_reading", JSON.stringify(e.target.checked)); }} />
        <span>Purple Turtles starts in word mode<small>At the far dock he hears a word and taps the sign. Wrong picks never cost a life.</small></span>
      </label>
      <label className="opt">
        <input id="opt-highlight" type="checkbox" checked={highlight} onChange={(e) => { setHighlight(e.target.checked); setItem("bb:sw", e.target.checked ? "1" : "0"); }} />
        <span>Highlight sight words in books<small>The abc button in the reader. Uses the Dolch 220 list.</small></span>
      </label>
      <div className="card">
        <h2>PIN</h2>
        <p>Unlocks for 30 minutes at a time. Three misses means a one-minute wait.</p>
        <div className="row"><button className="btn ghost small" type="button" onClick={() => setChangingPin(true)}>CHANGE PIN</button></div>
      </div>
      <div className="danger">
        <h2 style={{ margin: 0, fontSize: 18 }}>Reset all progress</h2>
        <p className="fine" style={{ textAlign: "left" }}>Clears every star, best score and saved page on this phone. Type RESET to confirm.</p>
        <div className="field">
          <label htmlFor="reset-confirm">Type RESET</label>
          <input id="reset-confirm" value={resetText} onChange={(e) => setResetText(e.target.value)} autoCapitalize="characters" autoComplete="off" />
        </div>
        <div className="row"><button className="btn small" type="button" aria-disabled={resetText !== "RESET"} onClick={resetAll}>RESET</button></div>
      </div>
      <p className="toast" role="status">{toast}</p>
    </section>
  );
}

function Guide() {
  return (
    <section style={{ display: "grid", gap: 14 }}>
      <div className="card">
        <h2>The parent Guide</h2>
        <p>Why two levels, the stuck-words finger test, the three-night routine, prompts when he is stuck, signs of progress, and goals through the year. The checklists save on this phone.</p>
        <div className="row"><a className="btn small" href={withBase("/play/bodies-books.html#guide")}>OPEN THE GUIDE</a></div>
      </div>
      <div className="card">
        <h2>Quick rules</h2>
        <ol>
          <li>Errors in reading never cost a life, a point or a star.</li>
          <li>End every session on a win.</li>
          <li>10 to 12 minutes for a full session, about 3 for a quick run.</li>
          <li>Free play is never the price of reading.</li>
        </ol>
      </div>
      <div className="card">
        <h2>Khan Academy</h2>
        <p>Grade 2 and 3 Reading and Vocabulary units, for extra practice on a laptop.</p>
        <div className="row">
          <a className="chip" href="https://www.khanacademy.org/ela/cc-2nd-reading-vocab" target="_blank" rel="noreferrer">Grade 2</a>
          <a className="chip" href="https://www.khanacademy.org/ela/cc-3rd-reading-vocab" target="_blank" rel="noreferrer">Grade 3</a>
        </div>
      </div>
    </section>
  );
}
