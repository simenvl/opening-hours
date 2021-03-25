import {
  Clinic,
  ClinicWithDayGroups,
  DayGroups,
  Days,
  IsOpenPeriods,
} from "../helpers";

/* --- GET ALL DAYS --- */
export function getDays(clinic: Clinic): [string, IsOpenPeriods][] {
  let days: [string, IsOpenPeriods][] = [];
  days = [
    ["mon", clinic.openingHours.mon],
    ["tue", clinic.openingHours.tue],
    ["wed", clinic.openingHours.wed],
    ["thu", clinic.openingHours.thu],
    ["fri", clinic.openingHours.fri],
    ["sat", clinic.openingHours.sat],
    ["sun", clinic.openingHours.sun],
  ];
  return days;
}

/* --- GET OPENING HOURS FOR A SINGLE CLINIC --- */
export function getOpeningHours(clinic: Clinic): DayGroups[] {
  /* 
    Go through all days, to see if that uniqe day have the same opening hour
    as the on before.

    type DayGroups = {
      from: number;
      to: number;
      groupLabel: string[];
      isOpen: boolean;
    }

    Also returns a list of days that have matching opening hours.
  */

  const dayGroupResult: DayGroups[] = [
    {
      from: clinic.openingHours.mon.periods[0].from,
      to: clinic.openingHours.mon.periods[0].to,
      groupLabel: ["Mandag"],
      isOpen: clinic.openingHours.mon.isOpen,
    },
  ];

  const days = getDays(clinic);

  days.slice(1).forEach(([dayKey, openPeriod], index) => {
    const monday = dayGroupResult[dayGroupResult.length - 1];

    /* 
      Check if current day is not open and have the same 
      opening hours as the day before, along with opening status.
      If the day is closed, skip iteration and add to a label list.
     */
    if (
      !openPeriod.isOpen === dayGroupResult[dayGroupResult.length - 1].isOpen &&
      openPeriod.periods[0].from ===
        dayGroupResult[dayGroupResult.length - 1].from &&
      openPeriod.periods[0].to === dayGroupResult[dayGroupResult.length - 1].to
    ) {
      dayGroupResult.push({
        from: openPeriod.periods[0].from,
        to: openPeriod.periods[0].to,
        groupLabel: [cleanDays(dayKey)],
        isOpen: false,
      });

      return;
    }

    /* 
      Check if current day is open and have the same 
      opening hours as the day before, along with opening status.
      If the day is open, and have the same opening hours as the day before, 
      add to a label list. Otherwise add a new "day".
     */

    if (
      openPeriod.periods[0].from ===
        dayGroupResult[dayGroupResult.length - 1].from &&
      openPeriod.periods[0].to ===
        dayGroupResult[dayGroupResult.length - 1].to &&
      openPeriod.isOpen === dayGroupResult[dayGroupResult.length - 1].isOpen
    ) {
      monday.groupLabel.push(cleanDays(dayKey));
    } else {
      dayGroupResult.push({
        from: openPeriod.periods[0].from,
        to: openPeriod.periods[0].to,
        groupLabel: [cleanDays(dayKey)],
        isOpen: true,
      });
    }
  });
  return dayGroupResult;
}

/* --- GET ALL OPENING HOURS --- */
export function getAllOpeningHours(clinics: Clinic[]): ClinicWithDayGroups[] {
  /* 
    Get a list of Clinics and pass them through "getOpeningHours" for each clinic.

    type ClinicWithDayGroups = {
      clinic: Clinic;
      dayGroups: DayGroups[];
    }

    Returns all clinic information and the information about the day in a list.
  */
  let clinicListDayGroups: ClinicWithDayGroups[] = [];
  let week: Days[] = [];
  clinics.forEach((clinic) => {
    const dayGroupResult = getOpeningHours(clinic);
    week = [];
    week.push({
      Mandag: dayGroupResult,
      Tirsdag: dayGroupResult,
      Onsdag: dayGroupResult,
      Torsdag: dayGroupResult,
      Fredag: dayGroupResult,
      Lørdag: dayGroupResult,
      Søndag: dayGroupResult,
    });
    clinicListDayGroups.push({
      clinic: clinic,
      dayGroups: dayGroupResult,
    });

    return clinicListDayGroups;
  });

  return clinicListDayGroups;
}

export function cleanDays(day: string): string {
  switch (day) {
    case "mon":
      return "Mandag";
    case "tue":
      return "Tirsdag";
    case "wed":
      return "Onsdag";
    case "thu":
      return "Torsdag";
    case "fri":
      return "Fredag";
    case "sat":
      return "Lørdag";
    case "sun":
      return "Søndag";
    default:
      throw new Error("Ugyldig dag");
  }
}
