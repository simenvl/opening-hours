import { Clinic } from "../helpers";
import { getAllOpeningHours, getOpeningHours } from "./Clinic.utils";

test("moro", () => {
  let clinics: Clinic[] = [
    {
      id: "bogstadveien30",
      name: "Bogstadveien 30",
      timezone: "Europe/Oslo",
      openingHours: {
        mon: { periods: [{ from: 32400000, to: 64800000 }], isOpen: true },
        fri: { periods: [{ to: 64800000, from: 32400000 }], isOpen: true },
        sun: { periods: [{ to: 64800000, from: 32400000 }], isOpen: true },
        thu: { isOpen: true, periods: [{ from: 32400000, to: 64800000 }] },
        tue: { isOpen: true, periods: [{ to: 64800000, from: 32400000 }] },
        sat: { periods: [{ to: 64800000, from: 32400000 }], isOpen: true },
        wed: { periods: [{ from: 32400000, to: 64800000 }], isOpen: true },
      },
      estimatedWaitingTimeInMinutes: 0,
      isOpen: true,
      isFull: false,
      delay: 0,
      priority: 10,
      nextAvailableVideo: 0,
      nextAvailableConsultation: 0,
      isVideoBookingOpen: false,
    },
    {
      id: "fysikalskemajorstua",
      name: "Fysikalske majorstua",
      timezone: "Europe/Oslo",
      openingHours: {
        fri: { isOpen: true, periods: [{ from: 32400000, to: 79200000 }] },
        sat: { periods: [{ to: 79200000, from: 32400000 }], isOpen: true },
        tue: { isOpen: true, periods: [{ to: 72000000, from: 39600000 }] },
        thu: { isOpen: true, periods: [{ to: 79200000, from: 32400000 }] },
        wed: { isOpen: true, periods: [{ to: 79200000, from: 36000000 }] },
        mon: { periods: [{ to: 79200000, from: 32400000 }], isOpen: true },
        sun: { isOpen: true, periods: [{ from: 32400000, to: 68400000 }] },
      },
      estimatedWaitingTimeInMinutes: 0,
      isOpen: true,
      isFull: false,
      delay: 0,
      priority: 10,
      nextAvailableVideo: 0,
      nextAvailableConsultation: 0,
      isVideoBookingOpen: false,
    },
  ];

  const result = getAllOpeningHours(clinics);
  expect(result).toEqual([
    {
      clinic: {
        id: "bogstadveien30",
        name: "Bogstadveien 30",
        timezone: "Europe/Oslo",
        openingHours: {
          mon: { periods: [{ from: 32400000, to: 64800000 }], isOpen: true },
          fri: { periods: [{ to: 64800000, from: 32400000 }], isOpen: true },
          sun: { periods: [{ to: 64800000, from: 32400000 }], isOpen: true },
          thu: { isOpen: true, periods: [{ from: 32400000, to: 64800000 }] },
          tue: { isOpen: true, periods: [{ to: 64800000, from: 32400000 }] },
          sat: { periods: [{ to: 64800000, from: 32400000 }], isOpen: true },
          wed: { periods: [{ from: 32400000, to: 64800000 }], isOpen: true },
        },
        estimatedWaitingTimeInMinutes: 0,
        isOpen: true,
        isFull: false,
        delay: 0,
        priority: 10,
        nextAvailableVideo: 0,
        nextAvailableConsultation: 0,
        isVideoBookingOpen: false,
      },
      dayGroups: [
        {
          from: 32400000,
          to: 64800000,
          groupLabel: [
            "Mandag",
            "Tirsdag",
            "Onsdag",
            "Torsdag",
            "Fredag",
            "Lørdag",
            "Søndag",
          ],
          isOpen: true,
        },
      ],
    },
    {
      clinic: {
        id: "fysikalskemajorstua",
        name: "Fysikalske majorstua",
        timezone: "Europe/Oslo",
        openingHours: {
          fri: { isOpen: true, periods: [{ from: 32400000, to: 79200000 }] },
          sat: { periods: [{ to: 79200000, from: 32400000 }], isOpen: true },
          tue: { isOpen: true, periods: [{ to: 72000000, from: 39600000 }] },
          thu: { isOpen: true, periods: [{ to: 79200000, from: 32400000 }] },
          wed: { isOpen: true, periods: [{ to: 79200000, from: 36000000 }] },
          mon: { periods: [{ to: 79200000, from: 32400000 }], isOpen: true },
          sun: { isOpen: true, periods: [{ from: 32400000, to: 68400000 }] },
        },
        estimatedWaitingTimeInMinutes: 0,
        isOpen: true,
        isFull: false,
        delay: 0,
        priority: 10,
        nextAvailableVideo: 0,
        nextAvailableConsultation: 0,
        isVideoBookingOpen: false,
      },
      dayGroups: [
        {
          from: 32400000,
          to: 79200000,
          groupLabel: ["Mandag"],
          isOpen: true,
        },
        {
          from: 39600000,
          to: 72000000,
          groupLabel: ["Tirsdag"],
          isOpen: true,
        },
        {
          from: 36000000,
          to: 79200000,
          groupLabel: ["Onsdag"],
          isOpen: true,
        },
        {
          from: 32400000,
          to: 79200000,
          groupLabel: ["Torsdag", "Fredag", "Lørdag"],
          isOpen: true,
        },
        {
          from: 32400000,
          to: 68400000,
          groupLabel: ["Søndag"],
          isOpen: true,
        },
      ],
    },
  ]);
});
