import { useEffect, useState } from "react";
import MessageModal from "../components/MessageModal";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import expressApi from "../service/expressAPI";

function ContacUsPage() {
  const { user } = useCurrentUserContext();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("default");
  const [catchedErrors, setCatchedErrors] = useState([]);
  const [messageModal, setMessageModal] = useState(false);
  const [fields, setFields] = useState({
    subject: "",
    message: "",
    userId: "",
  });

  useEffect(() => {
    const getTypes = async () => {
      const result = await expressApi.get(`/messages/message-types`);
      setSubjects(result.data);
      setFields({ ...fields, userId: user.id });
    };

    try {
      getTypes();
    } catch (err) {
      setCatchedErrors([...catchedErrors, err]);
    }
  }, []);

  const handleForm = (evt) => {
    setFields({ ...fields, [evt.target.id]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setCatchedErrors([]);
    try {
      const result = await expressApi.post("/messages", fields);
      if (result.status === 201) {
        setFields({ ...fields, subject: "", message: "" });
        setSelectedSubject("default");
        setMessageModal(true);
      }
    } catch (err) {
      setCatchedErrors([...catchedErrors, err]);
    }
  };

  return (
    <div className="bg-primary flex justify-center items-center lg:min-h-[90vh] lg:mb-0 min-h-[80vh] my-[10vh] z-0">
      <div className="w-80 flex flex-col gap-4 mt-2">
        <div>
          <h3 className="text-xl text-blue font-bold">Auteur:</h3>
          <p className="text-xl text-secondary font-bold">
            {user.nickname || user.username}
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-secondary text-lg font-bold"
        >
          <div className="flex flex-col ">
            <label htmlFor="subject" className="text-xl text-blue font-bold">
              Sujet :
            </label>
            <select
              name="subject"
              id="subject"
              className="select bg-neutral-300 focus:bg-primary"
              defaultValue={selectedSubject}
              onChange={handleForm}
            >
              <option value="default" disabled>
                Choissisez un sujet
              </option>
              {subjects?.map((subject) => (
                <option key={subject.id} value={subject.name}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col  ">
            <label htmlFor="message" className="text-xl text-blue font-bold">
              Message :
            </label>
            <textarea
              name="message"
              id="message"
              rows="6"
              className="textarea bg-neutral-300 focus:bg-primary"
              value={fields.message}
              onChange={handleForm}
            />
          </div>
          <button
            type="submit"
            className="btn bg-blue text-primary border-none"
          >
            Envoyer
          </button>
        </form>
        {Boolean(catchedErrors.length) &&
          catchedErrors.map((elem) => (
            <div className="border-2 border-rose-700 border-opacity-75 p-2 rounded-xl text-secondary">
              {elem.response.data}
            </div>
          ))}
      </div>
      {Boolean(messageModal) && (
        <MessageModal setMessageModal={setMessageModal} />
      )}
    </div>
  );
}

export default ContacUsPage;
