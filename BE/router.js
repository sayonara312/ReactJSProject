// routes/index.js
import express from "express";
const router = express.Router();

const portClient = 3000;

router.get("/getIP", async (req, res) => {
  try {
    const ipClient = req.ip.replace("::ffff:", "");
    console.log(`ip Client: ${ipClient}`);
    res.status(200).send(`${ipClient}`);
  } catch (error) {
    console.error("Error opening URL:", error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/sendMessage", async (req, res) => {
  try {
    const ipClient = req.ip.replace("::ffff:", "");
    console.log(`ip Client: ${ipClient}`);
    res.status(200).send(`${ipClient}`);
  } catch (error) {
    console.error("Error opening URL:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
