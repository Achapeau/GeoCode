import React from "react";

function messageModal({ setMessageModal }) {
  return (
    <div className="bg-secondary bg-opacity-40 fixed inset-0 h-screen flex justify-center items-center z-30">
      <div className="bg-primary p-6 flex flex-col items-center gap-6 rounded-xl">
        <h3 className="text-blue font-bold text-lg">
          Votre message à bien été envoyé
        </h3>
        <p className="text-2xl">🚀🚀</p>
        <button
          type="button"
          className="btn border-none bg-blue text-primary font-bold"
          onClick={() => setMessageModal(false)}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

export default messageModal;
