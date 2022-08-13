const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

// default, homepage
router.use("/", homeRoutes);
// all pages have the prefix /api
router.use("/api", apiRoutes);

module.exports = router;
