const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const SECRET = "88888888";
const app = express();
// const sign = (body) => {
//   return `sha1=${crypto.createHmac("sha1", SECRET).update(body).digest("hex")}`;
// };
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/webhook", (req, res) => {
  console.log("webhook Listen Event");
  const event = req.headers["x-github-event"]; // event === push
  const signnature = req.headers["x-hub-signature"];
  // if (signnature !== sign()) {
  //   return res.end("Not Allowed");
  // }
  console.log("-------------------");
  console.log(req.headers, "req.headers", req.body, "req.body");
  console.log("-------------------");
  console.log("验证通过");
  res.end(JSON.stringify({ ok: true }));
});

app.listen(4000, () => {
  console.log("webhook服务在4000端口运行");
});
