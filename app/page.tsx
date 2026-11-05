import Link from "next/link";
import InstallCard from "@/components/InstallCard";

export default function Home() {
  return (
    <main className="wrap">
      <header className="marquee">
        <span className="kicker">BODIE&apos;S</span>
        <h1>ARCADE</h1>
        <p>Pick a door.</p>
      </header>

      <nav className="doors" aria-label="Wings">
        <Link className="door arcade" href="/arcade">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <rect x="10" y="6" width="44" height="52" rx="6" fill="#4a35a8" />
            <rect x="16" y="12" width="32" height="22" rx="3" fill="#0a0720" />
            <circle cx="32" cy="23" r="6" fill="#b07cf5" />
            <circle cx="24" cy="46" r="4" fill="#ff4a3d" />
            <circle cx="40" cy="46" r="4" fill="#ff4a3d" />
          </svg>
          <span className="label">ARCADE</span>
          <span className="sub">Purple Turtles and the Shootout. Play for fun, or play with words.</span>
        </Link>
        <Link className="door reading" href="/reading">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <path d="M8 12h20a6 6 0 0 1 4 2 6 6 0 0 1 4-2h20v38H36a4 4 0 0 0-4 2 4 4 0 0 0-4-2H8z" fill="#f6b73c" />
            <path d="M12 16h16v30H12zM36 16h16v30H36z" fill="#fff" />
            <path d="M15 22h10M15 28h10M15 34h8M39 22h10M39 28h10M39 34h8" stroke="#cbd8e4" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="label">READING ROOM</span>
          <span className="sub">Bodie&apos;s Books. Stories about you, flash cards, and the Shootout.</span>
        </Link>
      </nav>

      <InstallCard />

      <Link className="dadlink" href="/dad">
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style={{ verticalAlign: "-2px", marginRight: 6 }}>
          <path fill="currentColor" d="M17 9V7a5 5 0 0 0-10 0v2H5v13h14V9h-2zm-8-2a3 3 0 0 1 6 0v2H9V7z" />
        </svg>
        Dad&apos;s Corner
      </Link>
    </main>
  );
}
