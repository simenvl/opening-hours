import Clinics from "../components/Clinic";
import { Clinic, DayGroups, IsOpenPeriods, OpeningHours } from "../helpers";

type ClinicListDayGroups = {
  id: string;
  name: string;
  timezone: string;
  openingHours: Days[];
  estimatedWaitingTimeInMinutes: number;
  isOpen: boolean;
  isFull: boolean;
  delay: number;
  priority: number;
  nextAvailableVideo: number;
  nextAvailableConsultation: number;
  isVideoBookingOpen: boolean;
};

type Days = {
  [key: string]: DayGroups[];
};

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
      status: "",
      isOpen: clinic.openingHours.mon.isOpen,
    },
  ];

  const days = getDays(clinic);

  days.slice(1).forEach(([dayKey, openPeriod], index) => {
    const monday = dayGroupResult[dayGroupResult.length - 1];

    if (!openPeriod.isOpen) {
      dayGroupResult.push({
        from: openPeriod.periods[0].from,
        to: openPeriod.periods[0].to,
        groupLabel: [cleanDays(dayKey)],
        status: "Stengt",
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
        status: "Åpen",
        isOpen: true,
      });
    }
  });

  return dayGroupResult;
}

export function getAllOpeningHours(clinics: Clinic[]): ClinicListDayGroups[] {
  let clinicListDayGroups: ClinicListDayGroups[] = [];
  clinics.forEach((clinic) => {
    let days = getDays(clinic);
    days.forEach((day) => {
      let dayKey = cleanDays(day[0]);
      let week: Days[] = [{ dayKey: getOpeningHours(clinic) }];
      clinicListDayGroups.push({
        id: clinic.id,
        name: clinic.name,
        timezone: clinic.timezone,
        openingHours: week,
        estimatedWaitingTimeInMinutes: clinic.estimatedWaitingTimeInMinutes,
        isOpen: clinic.isOpen,
        isFull: clinic.isFull,
        delay: clinic.delay,
        priority: clinic.priority,
        nextAvailableVideo: clinic.nextAvailableVideo,
        nextAvailableConsultation: clinic.nextAvailableConsultation,
        isVideoBookingOpen: clinic.isVideoBookingOpen,
      });
      const dayGroupResult = getOpeningHours(clinic);

      //clinicListDayGroups.push(clinic, dayGroupResult);
    });
  });

  //console.log(clinicListDayGroups);
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
