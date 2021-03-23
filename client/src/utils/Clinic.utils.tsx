import { Clinic, getTime, IsOpenPeriods } from "../helpers";

type DayGroups = {
  from: number;
  to: number;
  groupLabel: string[];
  status: string;
};

export function getDays(clinic: Clinic): [string, IsOpenPeriods][] {
  let days: [string, IsOpenPeriods][] = [
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
  const openingHours = Object.entries(clinic.openingHours);
  console.log(openingHours);

  const dayGroupResult: DayGroups[] = [
    {
      from: clinic.openingHours.mon.periods[0].from,
      to: clinic.openingHours.mon.periods[0].to,
      groupLabel: ["Mandag"],
      status: "Åpen",
    },
  ];

  const days = getDays(clinic);

  days.slice(1).forEach(([dayKey, openPeriod], index) => {
    const mandag = dayGroupResult[dayGroupResult.length - 1];

    if (!openPeriod.isOpen) {
      return;
    }

    if (
      openPeriod.periods[0].from ===
        dayGroupResult[dayGroupResult.length - 1].from &&
      openPeriod.periods[0].to === dayGroupResult[dayGroupResult.length - 1].to
    ) {
      mandag.groupLabel.push(cleanDays(dayKey));
    } else {
      dayGroupResult.push({
        from: openPeriod.periods[0].from,
        to: openPeriod.periods[0].to,
        groupLabel: [cleanDays(dayKey)],
        status: "Åpen",
      });
    }
  });
  return dayGroupResult;
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
