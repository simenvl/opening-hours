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

export type DayGroups = {
  from: number;
  to: number;
  groupLabel: string[];
  isOpen: boolean;
};

export type Days = {
  Mandag: DayGroups[];
  Tirsdag: DayGroups[];
  Onsdag: DayGroups[];
  Torsdag: DayGroups[];
  Fredag: DayGroups[];
  Lørdag: DayGroups[];
  Søndag: DayGroups[];
};

export type ClinicWithDayGroups = {
  clinic: Clinic;
  dayGroups: DayGroups[];
};

/* -- Milliseconds to hour -- */
export function getTime(time: number): number {
  // 3600000 milliseconds
  if (time === 0) {
    return 24;
  } else {
    const hour = 3600000;
    const hours = time / hour;

    return hours;
  }
}
