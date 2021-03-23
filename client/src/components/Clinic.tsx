import React, { useEffect, useState } from "react";
import { Clinic, getTime } from "../helpers";

const Clinics = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getClinics() {
    await fetch("https://staging-core.api.drdropin.no/v1/clinics")
      .then((response) => response.json())
      .then((response) => {
        setClinics(response);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  }

  useEffect(() => {
    getClinics();
    console.log(getOpeningHours());
  }, []);

  function checkHour(arr: any[], from: number, to: number) {
    return arr.filter((time: any) => time.from === from && time.to === to);
  }

  const daysOfWeek = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };

  function getOpeningHours() {
    clinics.map((clinic) => {
      const daysList = clinic.openingHours;

      console.log(clinic);

      //const { mon, tue, wed, thu, fri, sat, sun } = daysList;
      const days = Object.entries(clinic.openingHours);
      console.log("Klinikk: " + clinic.name);
      days.map((day) => {
        console.log("Dag: " + day[0]);
        const from = day[1].periods[0].from;
        const to = day[1].periods[0].to;
        const toFrom = day[1].periods;
        const open = day[1].isOpen;

        if (open) {
          console.log(getTime(from) + "-" + getTime(to));
        } else {
          console.log("Stengt");
        }

        return;
      });
      return <div>{days}</div>;
    });
  }

  /*  For hver klinikk         
        Hente ut åpningstider  
          For hver dag         
          
          Er dager sine åpningstider like
            Finn hvilke dager og sett fra første dag i uka til siste dag i uka
            Er dag stengt, returner stengt   */

  return (
    <div>
      <h1>Klinikker</h1>
      <div className="clinic-holder">
        {loading && <div>Loading..</div>}
        {!loading &&
          !error &&
          clinics.map((clinic) => (
            <div className="clinic" key={clinic.id}>
              <h5>{clinic.name}</h5>
              <p>Åpningstider</p>
              <ul>
                {/* {Object.entries(clinic.openingHours).map(([key, value]) => (
                  <div>
                    {key}: {value.isOpen.toString()}: {typeof value.periods}
                  </div>
                ))} */}
                {/* {!clinic.isOpen ? (
                  <li>Mandag: Stengt</li>
                ) : (
                  clinic.openingHours.mon.periods.map((hour) => (
                    <li>
                      Mandag:{" "}
                      {hour.from !== 0
                        ? getTime(hour.from) + "-" + getTime(hour.to)
                        : "Stengt"}
                    </li>
                  ))
                )} */}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Clinics;
