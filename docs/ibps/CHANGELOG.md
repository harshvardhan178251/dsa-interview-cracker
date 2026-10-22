# IBPS PO content changelog

Every entry here was produced by the automated content check
(`npm run check:ibps` in `web/`, run daily by the `IBPS PO content check` workflow).

When the IBPS notification changes, the check refreshes the recorded fingerprint, adds
an entry below, and the site shows a "content may be stale" banner on the IBPS PO page
until a human has reviewed the notes.

To clear the banner: update the affected notes in this folder, update the pattern figures
and topic weightage in `syllabus.json`, set `lastReviewedAt` to now and clear
`changeDetectedAt`, then run `npm run sync` in `web/`.

---

## 2026-10-22

Initial snapshot recorded. The pattern figures were taken from the CRP-PO/MT-XVI
notification:

- **Prelims** — 100 questions, 100 marks, 60 minutes. English 30/30, Quant 35/30,
  Reasoning 35/40, 20 minutes each.
- **Mains** — 170 questions, 200 marks, 160 minutes. Reasoning 40/60, General/Economy/
  Banking 50/60, English 40/20, DI 40/60.
- **Descriptive** — 2 questions, 25 marks, 30 minutes.
- **Interview** — 100 marks; final merit is Mains : Interview = 80 : 20.
- Negative marking — 0.25 per wrong objective answer.

Fingerprints were recorded for the IBPS homepage, the CRP-XVI notification PDF and the
CRP-PO notice listing.
