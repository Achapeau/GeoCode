const {
  findOneByEmail,
  updateOne,
  updateOnePassword,
  destroyOneUser,
} = require("../models/userManager");

const browse = async (req, res) => {
  await findOneByEmail(req.body.email)
    .then(([result]) => {
      const resultat = result;
      delete resultat[0].password;
      res.status(200).send(result[0]);
    })
    .catch((e) => console.error(e));
};

const update = async (req, res) => {
  await updateOne(req.body)
    .then(([result]) => {
      if (result.affectedRows) {
        res.sendStatus(201);
      } else {
        res.status(400).json({ msg: "you can't update your data" });
      }
    })
    .catch((err) => console.error(err));
};

const updatePassword = async (req, res) => {
  const { id, password } = req.body;
  await updateOnePassword({ id, password })
    .then(([result]) => {
      if (result.affectedRows) {
        res.sendStatus(201);
      } else {
        res.status(400).json({ msg: "you can't update your data" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("controlleur");
    });
};

const removeOneUser = async (req, res) => {
  await destroyOneUser(req.params.userId)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  update,
  updatePassword,
  removeOneUser,
};
