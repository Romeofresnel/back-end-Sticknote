const router = require("express").Router();
const folder = require("../Controllers/folder.controllers");
const { checkAuth } = require("../middlewares/ckeckAuth");

router.get("/folder/get",  folder.getAllFolder);
router.get("/folder/:id", checkAuth, folder.getFolder);
router.post("/folder/post", checkAuth, folder.Poster);
router.put("/folder/:id", checkAuth, folder.Update);
router.delete("/folder/:id", checkAuth, folder.Delete);
module.exports = router;
