import { DateTime } from 'luxon';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getTargetDate(): DateTime {
  const now = DateTime.now().setZone('Africa/Cairo');
  const thisYear = now.year;
  
  // Target: August 28, 00:00:00 in Cairo timezone
  let target = DateTime.fromObject(
    { year: thisYear, month: 8, day: 28, hour: 0, minute: 0, second: 0 },
    { zone: 'Africa/Cairo' }
  );
  
  // If current time is >= target, move to next year
  if (now >= target) {
    target = target.plus({ years: 1 });
  }
  
  return target;
}

export function calculateCountdown(target: DateTime): CountdownTime {
  const now = DateTime.now().setZone('Africa/Cairo');
  const diff = target.diff(now, ['days', 'hours', 'minutes', 'seconds']);
  
  return {
    days: Math.max(0, Math.floor(diff.days)),
    hours: Math.max(0, Math.floor(diff.hours % 24)),
    minutes: Math.max(0, Math.floor(diff.minutes % 60)),
    seconds: Math.max(0, Math.floor(diff.seconds % 60))
  };
}

export function hasReachedTarget(): boolean {
  const now = DateTime.now().setZone('Africa/Cairo');
  const thisYear = now.year;
  
  const target = DateTime.fromObject(
    { year: thisYear, month: 8, day: 28, hour: 0, minute: 0, second: 0 },
    { zone: 'Africa/Cairo' }
  );
  
  return now >= target;
}
