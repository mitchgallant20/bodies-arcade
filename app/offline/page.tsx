import Link from "next/link";
import { withBase } from "@/lib/base";

export const metadata = { title: "Offline" };

export default function OfflinePage() {
  return (
    <main className="wrap">
      <header className="marquee">
        <span className="kicker">NO SIGNAL</span>
        <h1>STILL OPEN</h1>
        <p>The games and books are saved on this phone. Pick one.</p>
      </header>
      <div className="card">
        <div className="row">
          <Link className="btn" href="/">HOME</Link>
          <a className="btn ghost" href={withBase("/play/purple-turtles.html")}>TURTLES</a>
          <a className="btn ghost" href={withBase("/play/bodies-books.html")}>BOOKS</a>
        </div>
      </div>
    </main>
  );
}
