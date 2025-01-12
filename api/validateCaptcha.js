// Ejemplo con Node.js
const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

app.post("/validate-captcha", async (req, res) => {
  const { token } = req.body;

  const secretKey = "TU_SECRET_KEY";
  const response = await fetch(`https://challenges.cloudflare.com/turnstile/v0/siteverify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: secretKey,
      response: token
    })
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("Server running on port 3000"));


