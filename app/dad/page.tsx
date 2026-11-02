import Link from "next/link";
import DadCorner from "@/components/DadCorner";

export const metadata = { title: "Dad's Corner" };

export default function DadPage() {
  return (
    <main className="wrap">
      <div className="topbar">
        <Link className="chip" href="/">&larr; Home</Link>
        <h1>DAD&apos;S CORNER</h1>
      </div>
      <DadCorner />
    </main>
  );
}
