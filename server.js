const express = require("express");

const app = express();

app.post("/webhook", (req, res) => {
  console.log("webhook Listen Event");
  res.end(JSON.stringify({ ok: true }));
});

app.listen(4000, () => {
  console.log("webhook服务在4000端口运行");
});
