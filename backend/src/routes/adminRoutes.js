const express = require("express");
const supabaseAdmin = require("../config/supabaseAdmin");

const router = express.Router();

router.get("/", async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*");

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

router.post("/create-user", async (req, res) => {
  const { email, password, role } = req.body;

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) return res.status(400).json({ error: error.message });

  // simpan role ke tabel users
  await supabaseAdmin.from("users").insert({
    id: data.user.id,
    role,
  });

  res.json({ message: "User berhasil dibuat" });
});




module.exports = router;
