import Link from "next/link";
import { withBase } from "@/lib/base";

export const metadata = { title: "Reading Room" };

const SHELVES = [
  { hash: "l1", title: "Level 1", sub: "Short books. One line a page." },
  { hash: "l2", title: "Level 2", sub: "Same stories, more words." },
  { hash: "cards", title: "Cards", sub: "Flash cards. Every card ends in a win." },
  { hash: "game", title: "Shootout", sub: "Hear a word. Shoot it in the net." },
  { hash: "guide", title: "Guide", sub: "For Dad: how to read together." },
];

export default function ReadingPage() {
  return (
    <main className="wrap">
      <div className="topbar">
        <Link className="chip" href="/">&larr; Home</Link>
        <h1>READING ROOM</h1>
      </div>
      <p className="fine">Bodie&apos;s Books. Tap any word to hear it.</p>
      <nav className="shelf" aria-label="Shelves">
        {SHELVES.map((s) => (
          <a key={s.hash} href={withBase(`/play/bodies-books.html#${s.hash}`)}>
            <b>{s.title}</b>
            <span>{s.sub}</span>
          </a>
        ))}
      </nav>
    </main>
  );
}
