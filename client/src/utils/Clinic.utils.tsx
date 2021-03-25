import {
  Clinic,
  ClinicWithDayGroups,
  DayGroups,
  Days,
  IsOpenPeriods,
} from "../helpers";

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

export function getOpeningHours(clinic: Clinic): DayGroups[] {
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
  console.log(dayGroupResult);
  return dayGroupResult;
}

export function getAllOpeningHours(clinics: Clinic[]): ClinicWithDayGroups[] {
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
