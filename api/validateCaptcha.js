export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Falta el token de reCAPTCHA" });
  }

  const secretKey = "6Lc9rrMqAAAAAIzVsW3677sfxAjUEsDV8WY7Bgyf"; 

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    if (data.success) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, error: "CAPTCHA inválido" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
}

