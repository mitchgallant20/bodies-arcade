import { describe, expect, it } from "vitest";
import { CONFUSABLE_GROUPS, DOLCH, GATE_ORDER, LISTS, confusablesOf, listById } from "./lists";

describe("word lists (Appendix A)", () => {
  it("keeps the deck sizes the stars were earned on", () => {
    expect(listById("rookie")?.words).toHaveLength(40);
    expect(listById("pro")?.words).toHaveLength(52);
    expect(listById("grade3")?.words.length).toBeGreaterThan(0);
    expect(listById("grade3plus")?.words.length).toBeGreaterThan(0);
  });

  it("has no duplicate words inside a list and none shared between lists", () => {
    const seen = new Map<string, string>();
    for (const list of LISTS) {
      const lower = list.words.map((w) => w.toLowerCase());
      expect(new Set(lower).size).toBe(lower.length);
      for (const w of lower) {
        expect(seen.get(w), `"${w}" appears in ${seen.get(w)} and ${list.id}`).toBeUndefined();
        seen.set(w, list.id);
      }
    }
  });

  it("gates in the order rookie, pro, allstar, grade3, grade3plus", () => {
    expect(GATE_ORDER).toEqual(["rookie", "pro", "allstar", "grade3", "grade3plus"]);
    expect(LISTS.map((l) => l.order)).toEqual([1, 2, 3, 4, 5]);
  });

  it("carries the legacy highlight set unchanged (219 words, no duplicates)", () => {
    expect(DOLCH).toHaveLength(219);
    expect(new Set(DOLCH).size).toBe(219);
    expect(DOLCH).toContain("says");
    // The two Dolch words the legacy set lacks are covered by the gated lists.
    expect(listById("allstar")?.words).toContain("always");
    expect(listById("grade3")?.words).toContain("better");
  });

  it("knows the confusable pairs", () => {
    expect(CONFUSABLE_GROUPS.flat().every((w) => w === w.toLowerCase())).toBe(true);
    expect(confusablesOf("was")).toEqual(["saw"]);
    expect(confusablesOf("There")).toEqual(["their", "they're"]);
    expect(confusablesOf("puck")).toEqual([]);
  });
});
