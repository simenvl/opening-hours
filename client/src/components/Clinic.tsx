import React, { useEffect, useState } from "react";
import { getAllOpeningHours } from "../utils/Clinic.utils";
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
  }, []);

  const clinicStatus = getAllOpeningHours(clinics);

  return (
    <div>
      <h1>Klinikker</h1>
      <div className="clinic-holder">
        {loading && <div>Loading..</div>}
        {!loading &&
          !error &&
          clinicStatus.map((clinic) => (
            <div className="clinic-holder">
              <div className="clinic">
                <div className="clinic-name">
                  <h2>{clinic.clinic.name}</h2>
                </div>
                <div className="clinic-hours">
                  <h3>Åpningstider</h3>
                  <ul>
                    {clinic.dayGroups.map((day) => (
                      <li>
                        <span className="day">
                          {day.groupLabel.length > 1
                            ? day.groupLabel[0] +
                              " - " +
                              day.groupLabel[day.groupLabel.length - 1]
                            : day.groupLabel[0]}
                        </span>
                        {": "}
                        <span>
                          {getTime(day.from) === 24 && getTime(day.to) === 24
                            ? "Døgnåpent"
                            : !day.isOpen
                            ? "Stengt"
                            : getTime(day.from) + "-" + getTime(day.to)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Clinics;
