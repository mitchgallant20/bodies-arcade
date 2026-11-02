import Link from "next/link";
import CabinetRow from "@/components/CabinetRow";

export const metadata = { title: "Arcade" };

export default function ArcadePage() {
  return (
    <main className="wrap">
      <div className="topbar">
        <Link className="chip" href="/">&larr; Home</Link>
        <h1>ARCADE</h1>
      </div>
      <CabinetRow />
      <p className="fine">Free play is always on. Word mode is a bonus, never a gate. Turn the phone sideways for the games.</p>
    </main>
  );
}
