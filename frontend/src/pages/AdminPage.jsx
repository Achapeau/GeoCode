import { useState, useEffect } from "react";
import expressAPI from "../service/expressAPI";
import Messages from "../components/Messages";

function AdminPage() {
  const [userTotal, setUsertotal] = useState("");
  const [vehicleTotal, setVehiculeTotal] = useState("");
  const [stationTotal, setStationTotal] = useState("");
  const [userSevenDay, setUserSevenDay] = useState("");
  const [dbVersion, setDbVersion] = useState("");

  useEffect(() => {
    try {
      expressAPI.get(`/admin/totalUser`).then((response) => {
        setUsertotal(response.data);
      });
      expressAPI.get(`/admin/totalVehicle`).then((response) => {
        setVehiculeTotal(response.data);
      });
      expressAPI.get(`/admin/totalStation`).then((response) => {
        setStationTotal(response.data);
      });
      expressAPI.get(`/admin/sevenDayUser`).then((response) => {
        setUserSevenDay(response.data);
      });
      expressAPI.get(`/admin/dbversion`).then((response) => {
        setDbVersion(response.data);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="bg-primary flex flex-col gap-6 lg:min-h-[90vh] lg:mb-0 lg:mt-[10vh] min-h-[80vh] mb-[10vh] z-0 lg:p-0 p-3 lg:text-lg text-base font-bold text-secondary">
      <div className="lg:flex hidden mt-6 w-full justify-center">
        <h2 className=" w-2/3 bg-teal-500 text-center p-4 rounded-xl shadow-lg text-xl font-bold text-primary">
          Administration
        </h2>
      </div>
      <div className="flex-grow lg:grid lg:grid-cols-2 items-center flex flex-col gap-3 lg:pr-6">
        <div className="flex flex-col justify-center items-center gap-4 ">
          <div className="w-full max-w-lg grid grid-cols-[4fr_2fr] items-center p-3 border-[3px] border-blue rounded-xl">
            <p className="">Version de la base de donnée des Bornes :</p>
            <p className="">V{dbVersion.version}</p>
          </div>
          <div className="w-full max-w-lg grid grid-cols-[4fr_2fr] items-center p-3 border-[3px] border-blue rounded-xl">
            <p className="">Date de mise à jour de la base de données:</p>
            <p className="">{dbVersion.register_date?.split("T")[0]}</p>
          </div>
          <div className="w-full max-w-lg grid grid-cols-[4fr_1fr_1fr] grid-rows-2 items-center border-[3px] border-blue rounded-xl p-3">
            <p className="">Nombre d'utilisateurs :</p>
            <p className="">{userTotal}</p>

            <p className="">Inscritions sur 7 jours :</p>
            <p className="">{userSevenDay}</p>

            <svg
              width="45px"
              height="45px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#21A89A"
              className="col-start-3 row-start-1 row-end-3"
            >
              <path
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                stroke="#21A89A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 100-6 3 3 0 000 6z"
                stroke="#21A89A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="w-full max-w-lg grid grid-cols-[4fr_1fr_1fr] items-center border-[3px] border-blue rounded-xl p-3">
            <p className="">Nombre de véhicules :</p>
            <p className="">{vehicleTotal}</p>
            <svg
              width="45px"
              height="45px"
              strokeWidth="1.5"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#21A89A"
            >
              <path
                d="M10.9166 14.5833C10.9166 14.169 11.2524 13.8333 11.6666 13.8333H23.3333C23.7475 13.8333 24.0833 14.169 24.0833 14.5833C24.0833 14.9975 23.7475 15.3333 23.3333 15.3333H11.6666C11.2524 15.3333 10.9166 14.9975 10.9166 14.5833ZM9.45825 20.4166C9.45825 20.0024 9.79404 19.6666 10.2083 19.6666H11.6666C12.0808 19.6666 12.4166 20.0024 12.4166 20.4166C12.4166 20.8308 12.0808 21.1666 11.6666 21.1666H10.2083C9.79404 21.1666 9.45825 20.8308 9.45825 20.4166ZM22.5833 20.4166C22.5833 20.0024 22.919 19.6666 23.3333 19.6666H24.7916C25.2058 19.6666 25.5416 20.0024 25.5416 20.4166C25.5416 20.8308 25.2058 21.1666 24.7916 21.1666H23.3333C22.919 21.1666 22.5833 20.8308 22.5833 20.4166Z"
                fill="#21A89A"
              />
              <path
                d="M10.6735 5.08325L24.3265 5.08325C25.0439 5.08333 25.7457 5.29389 26.3446 5.68886C26.9436 6.0838 27.4135 6.64577 27.6962 7.30516C27.6962 7.30513 27.6962 7.30519 27.6962 7.30516L31.0795 15.1947C31.2749 15.6519 31.3757 16.1448 31.375 16.642L30.625 16.641H31.375V16.642V29.7499C31.375 30.1809 31.2038 30.5942 30.899 30.899C30.5943 31.2037 30.181 31.3749 29.75 31.3749H25.6667C25.4533 31.3749 25.242 31.3329 25.0448 31.2512C24.8477 31.1696 24.6685 31.0499 24.5176 30.899C24.3667 30.7481 24.247 30.5689 24.1654 30.3718C24.0837 30.1746 24.0417 29.9633 24.0417 29.7499V26.9999H25.5417V29.7499C25.5417 29.7663 25.5449 29.7826 25.5512 29.7978C25.5575 29.8129 25.5667 29.8267 25.5783 29.8383C25.5899 29.8499 25.6037 29.8591 25.6188 29.8654C25.634 29.8717 25.6502 29.8749 25.6667 29.8749H29.75C29.7832 29.8749 29.8149 29.8617 29.8384 29.8383C29.8618 29.8149 29.875 29.7831 29.875 29.7499V26.9999H30.625V25.4999H29.875V16.641L29.875 16.6399C29.8754 16.3464 29.8162 16.0559 29.7009 15.7859L26.3176 7.89635C26.1505 7.50668 25.8728 7.1745 25.5189 6.94111C25.165 6.70774 24.7504 6.58331 24.3265 6.58325M29.7009 15.7859C29.7008 15.7857 29.701 15.7862 29.7009 15.7859V15.7859ZM5.125 25.4999H29.875V26.9999H25.5417V26.2499H24.0417V26.9999H10.9583V26.2499H9.45833V26.9999H5.125V25.4999ZM5.125 16.6398V25.4999H4.375V26.9999H5.125V29.7499C5.125 29.7831 5.13817 29.8149 5.16161 29.8383C5.18505 29.8617 5.21685 29.8749 5.25 29.8749H9.33333C9.36649 29.8749 9.39828 29.8617 9.42172 29.8383C9.44516 29.8149 9.45833 29.7831 9.45833 29.7499V26.9999H10.9583V29.7499C10.9583 30.1809 10.7871 30.5942 10.4824 30.899C10.1776 31.2037 9.76431 31.3749 9.33333 31.3749H5.25C4.81902 31.3749 4.4057 31.2037 4.10095 30.899C3.7962 30.5942 3.625 30.1809 3.625 29.7499V16.6395C3.62538 16.1434 3.72641 15.652 3.922 15.1961L7.30363 7.30709C7.58605 6.64747 8.05595 6.08485 8.65483 5.68962C9.25381 5.29432 9.95587 5.08348 10.6735 5.08325M5.125 16.6398C5.12526 16.3467 5.18496 16.0568 5.3005 15.7875L8.68246 7.8977C8.84934 7.50783 9.12711 7.17515 9.48105 6.94156C9.83493 6.70802 10.2496 6.58344 10.6735 6.58325H24.3265M5.125 16.6398C5.125 16.6397 5.125 16.6399 5.125 16.6398V16.6398Z"
                fill="#21A89A"
              />
            </svg>
          </div>
          <div className="w-full max-w-lg grid grid-cols-[4fr_1fr_1fr] items-center border-[3px] border-blue rounded-xl p-3">
            <p className="">Nombre de stations :</p>
            <p className="">{stationTotal}</p>
            <svg
              width="45px"
              height="45px"
              strokeWidth="1.5"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#21A89A7"
            >
              <path
                d="M30.625 7.2915V13.1248"
                stroke="#21A89A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.29175 27.7085V13.1252C7.29175 12.3516 7.59904 11.6097 8.14602 11.0628C8.693 10.5158 9.43487 10.2085 10.2084 10.2085H23.3334C24.107 10.2085 24.8488 10.5158 25.3958 11.0628C25.9428 11.6097 26.2501 12.3516 26.2501 13.1252V27.7085C26.2501 28.482 25.9428 29.2239 25.3958 29.7709C24.8488 30.3179 24.107 30.6252 23.3334 30.6252H10.2084C9.43487 30.6252 8.693 30.3179 8.14602 29.7709C7.59904 29.2239 7.29175 28.482 7.29175 27.7085Z"
                stroke="#21A89A"
                strokeWidth="1.5"
              />
              <path
                d="M7.29175 14.5833V7.29167C7.29175 6.51812 7.59904 5.77625 8.14602 5.22927C8.693 4.68229 9.43487 4.375 10.2084 4.375H23.3334C24.107 4.375 24.8488 4.68229 25.3958 5.22927C25.9428 5.77625 26.2501 6.51812 26.2501 7.29167V14.5833"
                stroke="#21A89A"
                strokeWidth="1.5"
              />
              <path
                d="M16.2853 16.0415L13.8542 20.4165H19.6876L17.2565 24.7915"
                stroke="#21A89A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <Messages />
      </div>
    </div>
  );
}

export default AdminPage;
