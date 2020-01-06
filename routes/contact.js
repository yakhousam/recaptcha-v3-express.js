const router = require("express").Router();
const fetch = require("node-fetch");

router.get("/", (req, res) => {
  res.render("contact", {
    title: "Contact us",
    reCAPTCHA_site_key: process.env.RECAPTCHA_SITE_KEY
  });
});

router.post("/", async (req, res) => {
  const { name, email, token } = req.body;
  const secret = process.env.RECAPTCHA_SECRET_KEY;
   
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" }
    }
  );
  const json = await response.json();
  res.json(json);
});

module.exports = router;
