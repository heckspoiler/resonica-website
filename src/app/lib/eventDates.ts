/** One day of an event. `date` is an ISO day (YYYY-MM-DD) or '' if unknown. */
export type EventDate = { date: string; time: string };

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

/** "2026-06-27" → "27.06.2026" (anything else is returned as-is). */
export function formatEventDate(iso: string): string {
  if (!ISO_DAY.test(iso)) return iso;
  const [year, month, day] = iso.split('-');
  return `${day}.${month}.${year}`;
}

/** All days of an event from the `event_dates` group, earliest first. */
export function getEventDates(data: any): EventDate[] {
  const group: any[] = Array.isArray(data?.event_dates) ? data.event_dates : [];
  return group
    .map((item) => ({
      date: typeof item?.date === 'string' ? item.date : '',
      time: typeof item?.time === 'string' ? item.time.trim() : '',
    }))
    .filter((item) => item.date || item.time)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Earliest day (ISO) of an event, '' if unknown. */
export function firstEventDate(data: any): string {
  return getEventDates(data).find((d) => d.date)?.date ?? '';
}

/** Latest day (ISO) of an event, '' if unknown. */
export function lastEventDate(data: any): string {
  const dates = getEventDates(data).filter((d) => d.date);
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
export function isUpcoming(data: any, today: string = todayIso()): boolean {
  const last = lastEventDate(data);
  return Boolean(last) && last >= today;
}

/** Sort comparator on the first day, ascending; events without a date last. */
export function compareByFirstDate(a: any, b: any): number {
  const da = firstEventDate(a?.data ?? a);
  const db = firstEventDate(b?.data ?? b);
  if (!da && !db) return 0;
  if (!da) return 1;
  if (!db) return -1;
  return da.localeCompare(db);
}
