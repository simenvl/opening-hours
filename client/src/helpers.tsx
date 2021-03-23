export interface Clinic {
  id: string;
  name: string;
  timezone: string;
  openingHours: OpeningHours;
  estimatedWaitingTimeInMinutes: number;
  isOpen: boolean;
  isFull: boolean;
  delay: number;
  priority: number;
  nextAvailableVideo: number;
  nextAvailableConsultation: number;
  isVideoBookingOpen: boolean;
}
export interface OpeningHours {
  mon: IsOpenPeriods;
  tue: IsOpenPeriods;
  wed: IsOpenPeriods;
  thu: IsOpenPeriods;
  fri: IsOpenPeriods;
  sat: IsOpenPeriods;
  sun: IsOpenPeriods;
}
export interface Periods {
  to: number;
  from: number;
}
export interface IsOpenPeriods {
  isOpen: boolean;
  periods: Periods[];
}

export const daysOfWeek = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
};

/* -- Milliseconds to hour -- */
export function getTime(time: number): number {
  // 3600000 milliseconds
  const hour = 3600000;
  const hours = time / hour;

  return hours;
}
