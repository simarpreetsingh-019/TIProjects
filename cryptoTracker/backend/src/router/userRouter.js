const express = require("express");
const router = express.Router();
router.get("/login", (req, res) => {
  const body = req.body;
  //
  setTimeout(() => {
    /**runniing the process */
  }, 2000);
  return res.json({
    message: "The user is logged in successfully",
    body: body,
    data: {
      id: "1",
      username: body.username,
      email: body.email,
    },
  });
});
const userRouter = router;
module.exports = userRouter;
