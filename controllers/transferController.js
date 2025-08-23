const express = require("express");
const router = express.Router();
const transferService = require("../services/transferService");
const authMiddleware = require("../middleware/authMiddleware");

// Realizar transferência
router.post("/", authMiddleware, (req, res) => {
  const { from, to, amount } = req.body;
  if (!from || !to || typeof amount !== "number") {
    return res.status(400).json({ error: "Dados de transferência inválidos" });
  }
  try {
    const transfer = transferService.transfer({ from, to, amount });
    res.status(201).json({ message: "Transferência realizada", transfer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar transferências
router.get("/", authMiddleware, (req, res) => {
  res.json(transferService.getTransfers());
});

module.exports = router;
