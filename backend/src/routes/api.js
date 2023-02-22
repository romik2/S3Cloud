import express from "express";

var router = express.Router();

router.get("/", function (req, res) {
    res.json({ ok: true });
});

export default router;