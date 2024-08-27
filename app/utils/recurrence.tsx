// utils/recurrence.ts
import { RRule, RRuleSet, rrulestr } from 'rrule';

export function isEventToday(eventRule: string, date: Date): boolean {
    debugger;
  const rule = rrulestr(eventRule);
  return rule.after(new Date(date.setHours(0, 0, 0, 0)), true) === date;
}
