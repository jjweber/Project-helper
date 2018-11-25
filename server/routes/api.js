const express = require("express");
const router = express.Router();

console.log("Here in api route!");

/* GET api listing. */
router.get("/", (req, res) => {
  console.log("Here in api route!");

  console.log("Here are the results: ", result);
  return "I got this Api shit";
});

router.use("/files", require("./files"));
// router.use("/profiles", require("./profiles"));

module.exports = router;
