import type { Content } from '@prismicio/client';

/** One day of an event. `date` is an ISO day (YYYY-MM-DD) or '' if unknown. */
export type EventDate = { date: string; time: string };

/** A date document's data, or an event whose days are already normalized. */
export type Dated =
  | Pick<Content.DateDocumentData, 'event_dates'>
  | { eventDates: EventDate[] };

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

/** "2026-06-27" → "27.06.2026" (anything else is returned as-is). */
export function formatEventDate(iso: string): string {
  if (!ISO_DAY.test(iso)) return iso;
  const [year, month, day] = iso.split('-');
  return `${day}.${month}.${year}`;
}

/** All days of an event from the `event_dates` group, earliest first. */
export function getEventDates(event: Dated): EventDate[] {
  if ('eventDates' in event) return event.eventDates;
  const group = Array.isArray(event?.event_dates) ? event.event_dates : [];
  return group
    .map((item) => ({
      date: typeof item?.date === 'string' ? item.date : '',
      time: typeof item?.time === 'string' ? item.time.trim() : '',
    }))
    .filter((item) => item.date || item.time)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Earliest day (ISO) of an event, '' if unknown. */
export function firstEventDate(event: Dated): string {
  return getEventDates(event).find((d) => d.date)?.date ?? '';
}

/** Latest day (ISO) of an event, '' if unknown. */
export function lastEventDate(event: Dated): string {
  const dates = getEventDates(event).filter((d) => d.date);
  return dates.length ? dates[dates.length - 1].date : '';
}

/** Today as a local ISO day. */
export function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

/** An event counts as upcoming until its last day is over. */
export function isUpcoming(event: Dated, today: string = todayIso()): boolean {
  const last = lastEventDate(event);
  return Boolean(last) && last >= today;
}

/** Sort comparator on the first day, ascending; events without a date last. */
export function compareByFirstDate(a: Dated, b: Dated): number {
  const da = firstEventDate(a);
  const db = firstEventDate(b);
  if (!da && !db) return 0;
  if (!da) return 1;
  if (!db) return -1;
  return da.localeCompare(db);
}
