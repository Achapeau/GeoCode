import { useState } from "react";
import PropTypes from "prop-types";
import expressAPI from "../../service/expressAPI";

function UploadCSV({ toggleCSVUpload }) {
  const [file, setFile] = useState(null);
  const [version, setVersion] = useState("");
  const [csvAppear, setCsvAppear] = useState(false);

  const toggleCsv = () => {
    setCsvAppear(!csvAppear);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleVersionChange = (event) => {
    const { value } = event.target;
    setVersion(value);
  };
  const handleConfirmClick = (e) => {
    e.preventDefault();
    expressAPI
      .post(`/admin/dbversion`, {
        version,
      })
      .then(() => {
        toggleCsv();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("csv-File", file);

      expressAPI
        .post(`/admin/import-csv`, formData)
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="absolute inset-0 h-[90vh] flex items-center justify-center bg-secondary bg-opacity-40 z-20 mt-[10vh] pb-[10vh]">
      <div className="bg-primary flex flex-col  rounded-xl shadow-md  w-80">
        <div className="flex items-center justify-between bg-blue rounded-t-xl p-3">
          <h3 className="text-xl text-primary font-bold">Upload de BDD :</h3>
          <button type="button" onClick={toggleCSVUpload}>
            <svg
              width="32px"
              height="32px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#E5E9E7"
            >
              <path
                d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                stroke="#E5E9E7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleConfirmClick}
          className="flex flex-col gap-3 p-3 text-lg font-bold "
        >
          <p className=" text-secondary">
            Indiquez le numéro de version de votre fichier
          </p>
          <div className="flex justify-between ">
            <input
              className="input bg-neutral-300 w-24 uppercase focus:border-[3px] border-[3px] focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
              type="text"
              placeholder="1.x.x"
              value={version}
              onChange={handleVersionChange}
            />
            <button
              className="btn bg-blue border-none text-primary "
              type="submit"
            >
              Confirmer
            </button>
          </div>
        </form>
        {csvAppear && (
          <div className="p-3 flex flex-col gap-3">
            <p className="text-blue font-bold">CSV File Import :</p>

            <input
              className="focus:border-[3px] border-[3px] focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
              type="file"
              onChange={handleFileChange}
            />
            <button
              className="btn bg-blue border-none text-primary max-w-xs "
              type="submit"
              onClick={handleUpload}
            >
              Upload CSV
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
UploadCSV.propTypes = {
  toggleCSVUpload: PropTypes.func.isRequired,
};
export default UploadCSV;
