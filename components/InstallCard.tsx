"use client";
import { useState } from "react";
import { getItem, setItem } from "@/lib/storage";
import { useClientValue } from "@/lib/useClientValue";

const KEY = "arcade:install-card";

function shouldShow(): boolean {
  const nav = navigator as Navigator & { standalone?: boolean };
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const installed = nav.standalone === true || window.matchMedia("(display-mode: standalone)").matches;
  return isIOS && !installed && getItem(KEY) !== "done";
}

/** One-time "Add to Home Screen" card. Shows only in iOS Safari when the app is not installed. */
export default function InstallCard() {
  const show = useClientValue(shouldShow);
  const [dismissed, setDismissed] = useState(false);
  if (!show || dismissed) return null;
  return (
    <section className="card" aria-label="Put Bodie's Arcade on the Home Screen">
      <h2>Put it on the Home Screen</h2>
      <p>Then it opens full screen, with no browser bars, and works with no signal.</p>
      <ol>
        <li>
          Tap the Share button{" "}
          <svg className="share" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M12 2 7 7h3v8h4V7h3l-5-5zm-7 13v5h14v-5h-2v3H7v-3H5z" />
          </svg>{" "}
          at the bottom of Safari.
        </li>
        <li>Scroll down and tap <b>Add to Home Screen</b>.</li>
        <li>Tap <b>Add</b>. Open it from the icon from now on.</li>
      </ol>
      <div className="row">
        <button className="btn ghost small" type="button" onClick={() => { setItem(KEY, "done"); setDismissed(true); }}>
          GOT IT
        </button>
      </div>
    </section>
  );
}
