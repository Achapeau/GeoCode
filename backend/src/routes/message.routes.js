const express = require("express");

const router = express.Router();

const messageControllers = require("../controllers/messageControllers");

const validateMessage = require("../middlewares/message.validate");

router.get("/message-types", messageControllers.browseTypes);
router.get("/", messageControllers.browseMessages);
router.post("/", validateMessage, messageControllers.add);
router.put("/:id", messageControllers.editRead);
router.delete("/:id", messageControllers.destroy);

module.exports = router;
