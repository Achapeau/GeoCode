import { useEffect, useState } from "react";

import expressApi from "../service/expressAPI";
import getDateFr from "../service/getDateTimeFr";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [confirmation, setConfirmation] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await expressApi.get(`/messages`);
      setMessages(result.data);
    })();
  }, []);

  const handleOpened = (evt) => {
    const id = parseInt(evt.target.id, 10);
    expressApi.put(`/messages/${id}`, { opened: evt.target.checked });

    // TODO ask Loris
    setMessages(
      messages.map((elem) => {
        if (elem.messageId === id) {
          // eslint-disable-next-line no-param-reassign
          elem.opened = evt.target.checked;
        }
        return elem;
      })
    );
  };

  const handleConfirmation = (messageId) => {
    setConfirmation(!confirmation);
    setSelectedMessage(messageId);
  };

  const handleDelete = () => {
    expressApi.delete(`/messages/${selectedMessage}`);
    setMessages(messages.filter((elem) => elem.messageId !== selectedMessage));
    setConfirmation(!confirmation);
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col w-full border-[3px] border-blue rounded-xl lg:min-h-[30rem]">
        <h3 className="bg-blue p-2 text-primary w-full">Messages :</h3>
        <div className="bg-blue text-primary grid grid-cols-[1fr_2fr_1fr_2rem] rows-2 px-2">
          <p>Auteur</p>
          <p>Email</p>
          <p>Sujet</p>
          <p>Lu</p>
        </div>
        <div className="flex-grow flex flex-col rounded-b-xl bg-neutral-300">
          {messages.length ? (
            messages.map((elem) => (
              <div
                className=" grid grid-cols-[1fr_2fr_1fr_2rem] rows-3 items-center p-2 mb-2 bg-primary"
                key={elem.messageId}
              >
                <div className="text-blue">{elem.authorNickname}</div>
                <div className="text-blue">{elem.authorEmail}</div>
                <div className="text-blue">{elem.type}</div>
                <input
                  type="checkbox"
                  id={elem.messageId}
                  checked={elem.opened}
                  onChange={handleOpened}
                  className="checkbox checkbox-success justify-self-center"
                />
                <div className="col-span-4 mt-4">{elem.content}</div>
                <div className="col-span-3 text-sm font-medium">
                  {`Reçu le : ${getDateFr(elem.received)} à ${
                    elem.received.split("T")[1].replace(":", "h").split(":")[0]
                  }`}
                </div>

                <button
                  type="button"
                  onClick={() => handleConfirmation(elem.messageId)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32px"
                    height="32px"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    color="#be5e69"
                    className="p-1"
                  >
                    <path
                      stroke="#be5e69"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m20 9-1.995 11.346A2 2 0 0 1 16.035 22h-8.07a2 2 0 0 1-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 0 1 2-2h2.75a2 2 0 0 1 2 2v2m-6.75 0h6.75"
                    />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="p-6 bg-primary rounded-b-xl flex-grow  flex justify-center items-center">
              Aucun messages{" "}
            </div>
          )}
        </div>
      </div>
      {confirmation && (
        <div className="fixed inset-0 h-[90vh] lg:mt-[10vh] bg-secondary bg-opacity-40 flex justify-center items-center">
          <div className="w-80 bg-primary flex flex-col rounded-xl">
            <div className="bg-rose-700 bg-opacity-75 text-xl text-primary p-3 rounded-t-xl">
              Confirmation :
            </div>
            <div className="p-3">
              Vous êtes sur le point d'effacer un précieux message !
            </div>
            <div className="flex justify-between p-3">
              <button
                type="button"
                onClick={() => setConfirmation(!confirmation)}
                className="btn border-none bg-blue text-primary"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="btn border-none bg-rose-700 bg-opacity-75 text-primary"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
      {confirmation && (
        <div className="fixed inset-0 h-[90vh] lg:mt-[10vh] bg-secondary bg-opacity-40 flex justify-center items-center">
          <div className="w-80 bg-primary flex flex-col rounded-xl">
            <div className="bg-rose-700 bg-opacity-75 text-xl text-primary p-3 rounded-t-xl">
              Confirmation :
            </div>
            <div className="p-3">
              Vous êtes sur le point d'effacer un précieux message !
            </div>
            <div className="flex justify-between p-3">
              <button
                type="button"
                onClick={() => setConfirmation(!confirmation)}
                className="btn border-none bg-blue text-primary"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="btn border-none bg-rose-700 bg-opacity-75 text-primary"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;
