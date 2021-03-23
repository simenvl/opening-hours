import React, { useEffect, useState } from "react";
import { getOpeningHours } from "../utils/Clinic.utils";
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
              <ul></ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Clinics;
