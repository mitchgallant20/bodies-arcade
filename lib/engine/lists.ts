// Word lists (docs/HANDOFF.md, Appendix A). Order and gating follow this sequence.
// Keep the exact words; they match the stars Bodie has already earned in Bodie's Books.

export interface WordList {
  id: string;
  name: string;
  sub: string;
  order: number;
  words: string[];
}

const split = (s: string) => s.trim().split(/\s+/);

export const LISTS: WordList[] = [
  {
    id: "rookie",
    name: "Rookie",
    sub: "The first 40 sight words",
    order: 1,
    words: split(
      "a and away big blue can come down find for funny go help here I in is it jump little look make me my not one play red run said see the three to two up we where yellow you",
    ),
  },
  {
    id: "pro",
    name: "Pro",
    sub: "The next 52 words",
    order: 2,
    words: split(
      "all am are at ate be black brown but came did do eat four get good have he into like must new no now on our out please pretty ran ride saw say she so soon that there they this too under want was well went what white who will with yes",
    ),
  },
  {
    id: "allstar",
    name: "All-Star",
    sub: "Grade 1 and 2 words",
    order: 3,
    words: split(
      "after again an any as ask by could every fly from give going had has her him his how just know let live may of old once open over put round some stop take thank them then think walk were when always around because been before best both call does fast first found gave green its made many off or pull read right sing sit sleep tell their these those upon us use very which why work would write your",
    ),
  },
  {
    id: "grade3",
    name: "Grade 3",
    sub: "The grade 3 sight words",
    order: 4,
    words: split(
      "about better bring carry clean cut done draw drink eight fall far full got grow hold hot hurt if keep kind laugh light long much myself never only own pick seven shall show six small start ten today together try warm",
    ),
  },
  {
    id: "grade3plus",
    name: "Grade 3 Stretch",
    sub: "Longer words grade 3 readers meet",
    order: 5,
    words: split(
      "above almost along answer became below between different during early enough finally friend group half heard important learn minute often people piece question really second sometimes special sure thought through toward until whole without young world",
    ),
  },
];

/** Gated lists in unlock order (Section 9: next list unlocks at 90% known). */
export const GATE_ORDER = LISTS.map((l) => l.id);

/**
 * The highlight set from legacy/bodies-books.html (var SIGHT), copied verbatim: 219 words.
 * It is the Dolch 220 with "day" and "says" added and "always", "better" and "don't" left out
 * (the first two are covered by the allstar and grade3 lists above). Highlight-only.
 */
export const DOLCH: string[] = split(
  "a about after again all am an and any are around as ask at ate away be because been before best big black blue both bring brown but buy by call came can carry clean cold come could cut day did do does done down draw drink eat eight every fall far fast find first five fly for found four from full funny gave get give go goes going good got green grow had has have he help her here him his hold hot how hurt i if in into is it its jump just keep kind know laugh let light like little live long look made make many may me much must my myself never new no not now of off old on once one only open or our out over own pick play please pretty pull put ran read red ride right round run said saw say says see seven shall she show sing sit six sleep small so some soon start stop take tell ten thank that the their them then there these they think this those three to today together too try two under up upon us use very walk want warm was wash we well went were what when where which white who why will wish with work would write yellow yes you your",
);

/** Words that get muddled together (Section 8). Distractor picking prefers these. */
export const CONFUSABLE_GROUPS: string[][] = [
  ["there", "their", "they're"],
  ["was", "saw"],
  ["where", "were"],
  ["then", "than"],
  ["of", "off"],
  ["on", "no"],
];

export const listById = (id: string): WordList | undefined => LISTS.find((l) => l.id === id);

export const confusablesOf = (word: string): string[] =>
  CONFUSABLE_GROUPS.find((g) => g.includes(word.toLowerCase()))?.filter((w) => w !== word.toLowerCase()) ?? [];
