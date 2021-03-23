import { Clinic } from "../helpers";
import { getOpeningHours } from "./Clinic.utils";

test("moro", () => {
  let clinic: Clinic = {
    id: "bogstadveien30",
    name: "Bogstadveien 30",
    timezone: "Europe/Oslo",
    openingHours: {
      mon: { isOpen: true, periods: [{ to: 64800000, from: 32400000 }] },
      sat: { isOpen: false, periods: [{ to: 64800000, from: 32400000 }] },
      tue: { periods: [{ to: 64800000, from: 32400000 }], isOpen: true },
      fri: { periods: [{ to: 64800000, from: 32400000 }], isOpen: true },
      sun: { periods: [{ to: 64800000, from: 32400000 }], isOpen: true },
      wed: { isOpen: true, periods: [{ to: 64800000, from: 40000000 }] },
      thu: { isOpen: true, periods: [{ to: 64800000, from: 32400000 }] },
    },
    estimatedWaitingTimeInMinutes: 8,
    isOpen: true,
    isFull: false,
    delay: 0,
    priority: 10,
    nextAvailableVideo: 8,
    nextAvailableConsultation: 8,
    isVideoBookingOpen: true,
  };

  const result = getOpeningHours(clinic);

  console.log(result);

  // expect(result).toEqual([
  //   {
  //     from: 32400000,
  //     to: 64800000,
  //     groupLabel: ["Mandag", "Tirsdag"],
  //     status: "Åpen",
  //   },
  //   {
  //     from: 40000000,
  //     to: 64800000,
  //     groupLabel: ["Onsdag"],
  //     status: "Åpen",
  //   },
  //   {
  //     from: 32400000,
  //     to: 64800000,
  //     groupLabel: ["Torsdag", "Fredag", "Søndag"],
  //     status: "Åpen",
  //   },
  // ]);
});
