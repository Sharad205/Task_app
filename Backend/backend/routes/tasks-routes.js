const express = require("express");
const { check } = require("express-validator");

const tasksControllers = require("../controllers/tasks-controllers");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/:pid", tasksControllers.getTaskById);

router.get("/user/:uid", tasksControllers.getTasksByUserId);

router.use(checkAuth);

router.post(
	"/",
	fileUpload.single("image"),
	[
		check("title").not().isEmpty(),
		check("description").isLength({ min: 5 }),
		check("requirements").isLength({ min: 5 }),
		check("notes").not().isEmpty(),
	],
	tasksControllers.createTask
);

router.patch(
	"/:pid",
	[
		check("title").not().isEmpty(),
		check("description").isLength({ min: 5 }),
		check("requirements").isLength({ min: 5 }),
	],
	tasksControllers.updateTask
);

router.delete("/:pid", tasksControllers.deleteTask);

module.exports = router;
