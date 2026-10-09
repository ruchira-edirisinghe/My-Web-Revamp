/* Shared by the project pages (ProjectShowcase) and the Unity game pages (GameShowcase). */

/* ── Project facts ─────────────────────────────────────────────────────────── */

/** Line icons on a 20px grid, one per kind of fact. */
const ICON = {
  person: <><circle cx="10" cy="6.5" r="3.2" /><path d="M3.8 17c.7-3.3 3.2-5.2 6.2-5.2s5.5 1.9 6.2 5.2" /></>,
  people: <><circle cx="7.5" cy="7" r="2.8" /><path d="M2.5 16.5c.5-2.8 2.5-4.4 5-4.4s4.5 1.6 5 4.4" /><circle cx="14" cy="6" r="2.2" /><path d="M13.5 10.6c2.1.1 3.6 1.5 4 3.9" /></>,
  box: <><path d="M10 2.5 16.5 6v8L10 17.5 3.5 14V6Z" /><path d="M3.5 6 10 9.5 16.5 6M10 9.5v8" /></>,
  stack: <><path d="M10 2.8 17 6.4 10 10 3 6.4Z" /><path d="m3 10 7 3.6 7-3.6" /><path d="m3 13.6 7 3.6 7-3.6" /></>,
  pulse: <path d="M2.5 10h3.2l2-4.5 3.6 9 2-4.5h4.2" />,
  tag: <><path d="M3 3h6.5l7.5 7.5-6.5 6.5L3 9.5Z" /><circle cx="6.8" cy="6.8" r="1.2" /></>,
  device: <><rect x="2.5" y="4" width="15" height="10" rx="1.6" /><path d="M7 17h6M10 14v3" /></>,
  calendar: <><rect x="3" y="4.5" width="14" height="12.5" rx="2" /><path d="M3 8.5h14M7 2.5v4M13 2.5v4" /></>,
  shield: <><path d="M10 2.5 16 5v4.6c0 3.7-2.5 6.6-6 7.9-3.5-1.3-6-4.2-6-7.9V5Z" /><path d="m7.4 10 1.8 1.8 3.5-3.6" /></>,
  palette: <><path d="M10 2.8a7.2 7.2 0 1 0 0 14.4c1 0 1.4-.8 1-1.7-.6-1.2.2-2.4 1.5-2.4h1.8a2.9 2.9 0 0 0 2.9-2.9C17.2 6 14 2.8 10 2.8Z" /><circle cx="6.6" cy="9" r=".9" /><circle cx="9.3" cy="6.2" r=".9" /><circle cx="12.9" cy="7" r=".9" /></>,
  chart: <><path d="M3 16.5h14" /><path d="M5.5 13.5V10M9.2 13.5V6.5M12.9 13.5V8.5M16.5 13.5V4" /></>,
  flow: <><circle cx="5" cy="5" r="2" /><circle cx="15" cy="15" r="2" /><path d="M7 5h4.5a3 3 0 0 1 0 6h-3a3 3 0 0 0 0 6H13" /></>,
  sound: <><path d="M3 8v4h3l4 3.5v-11L6 8Z" /><path d="M13 7.2a4 4 0 0 1 0 5.6M15.2 5a7 7 0 0 1 0 10" /></>,
  spark: <path d="M10 2.5 11.7 8.3 17.5 10l-5.8 1.7L10 17.5l-1.7-5.8L2.5 10l5.8-1.7Z" />,
};

/** The labels used across design, dev and game facts, mapped to an icon. */
const FACT_ICON: Record<string, keyof typeof ICON> = {
  role: 'person', client: 'person',
  team: 'people', roles: 'people', multiplayer: 'people', opponents: 'people',
  type: 'box', genre: 'box', format: 'box', scope: 'box',
  stack: 'stack', engine: 'stack', tools: 'stack', model: 'stack', rendering: 'stack',
  status: 'pulse', published: 'pulse',
  version: 'tag', licence: 'tag',
  platform: 'device', platforms: 'device', screens: 'device', views: 'device', orientation: 'device',
  timeline: 'calendar', context: 'calendar', year: 'calendar',
  security: 'shield', fairness: 'shield', 'house edge': 'shield', accessibility: 'shield',
  themes: 'palette', 'type scale': 'palette', deliverables: 'palette', assets: 'palette',
  return: 'chart', scale: 'chart', research: 'chart',
  flow: 'flow', modes: 'flow', deal: 'flow',
  audio: 'sound',
};

/**
 * One spec-sheet panel instead of a row of separate boxes: every fact gets an
 * icon, and a value written as a list ("React · Express 5 · PostgreSQL")
 * becomes tags so it scans as separate things rather than one long line.
 */
export default function Facts({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <dl className="gs-facts">
      {facts.map((f) => {
        const parts = f.value.split(' · ');
        const live = /^status$/i.test(f.label) && /live|ongoing|shipped|playable/i.test(f.value);
        return (
          <div className="gs-fact" key={f.label}>
            <span className="gs-fact-ico" aria-hidden="true">
              <svg viewBox="0 0 20 20">{ICON[FACT_ICON[f.label.toLowerCase()] ?? 'spark']}</svg>
            </span>
            <div className="gs-fact-body">
              <dt>{f.label}{live && <span className="gs-fact-live" aria-hidden="true" />}</dt>
              <dd>
                {parts.length > 1
                  ? <ul className="gs-fact-tags">{parts.map((t) => <li key={t}>{t}</li>)}</ul>
                  : f.value}
              </dd>
            </div>
          </div>
        );
      })}
    </dl>
  );
}
