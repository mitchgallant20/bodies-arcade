"use client";
import { CABINETS } from "@/games/registry";
import { withBase } from "@/lib/base";
import { getItem } from "@/lib/storage";
import { useClientValue } from "@/lib/useClientValue";

function readStats() {
  const best: Record<string, number> = {};
  for (const c of CABINETS) if (c.bestKey) best[c.id] = Number(getItem(c.bestKey) ?? 0) || 0;
  const deck = getItem("bb:gdeck") ?? "rookie";
  return {
    best,
    shootoutGames: Number(getItem("bb:games") ?? 0) || 0,
    shootoutBest: Number(getItem(`bb:gbest:${deck}`) ?? 0) || 0,
    shootoutDeck: deck,
  };
}

export default function CabinetRow() {
  const stats = useClientValue(readStats);

  return (
    <div className="cabinets">
      {CABINETS.map((c) => (
        <article className="cabinet" key={c.id} aria-label={c.title}>
          <div className={`screen${c.status === "soon" ? " soon" : ""}`}>{c.status === "soon" ? `${c.title}\nCOMING SOON` : c.title}</div>
          <p className="blurb">{c.blurb}</p>
          {c.status === "ready" && stats && (
            <div className="stats">
              {c.bestKey && <span>Best <b>{stats.best[c.id] ?? 0}</b></span>}
              {c.id === "shootout" && (
                <>
                  <span>Games <b>{stats.shootoutGames}</b></span>
                  <span>Best ({stats.shootoutDeck}) <b>{stats.shootoutBest}/10</b></span>
                </>
              )}
              {c.supportsReadingMode && <span>Word mode ready</span>}
            </div>
          )}
          <div className="actions">
            {c.status === "ready" && c.href && (
              <a className="btn" href={withBase(c.href)}>PLAY</a>
            )}
            {c.status === "ready" && c.readingHref && (
              <a className="btn ghost" href={withBase(c.readingHref)}>WORD MODE</a>
            )}
            {c.status === "soon" && <span className="chip">{c.phase}</span>}
          </div>
        </article>
      ))}
    </div>
  );
}
