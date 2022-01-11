const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const crypto = require("crypto");
const SECRET = "88888888";
const app = express();
const sign = (body) => {
  return `sha1=${crypto.createHmac("sha1", SECRET).update(body).digest("hex")}`;
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/webhook", (req, res) => {
  console.log("webhook Listen Event");
  const event = req.headers["x-github-event"]; // event === push
  const signnature = req.headers["x-hub-signature"];
  console.log(signnature, sign(JSON.stringify(req.body)), "signnature");
  if (signnature !== sign(JSON.stringify(req.body))) {
    return res.end("Not Allowed");
  }
  const branch = req.body["ref"].split("/").pop();
  if (branch === "master" && event === "push") {
    console.log("开始执行子进程");
    let child = spawn("sh", [
      `${req.body.repository.name.includes("fe") ? "front" : "back"}.sh`,
    ]);
    let buffers = [];
    child.stdout.on("data", (buffer) => {
      console.log("正在执行");
      buffers.push(buffer);
    });
    child.stdout.on("end", () => {
      const body = Buffer.concat(buffers);
      console.log(body, "执行结束");
    });
  }
  res.end(JSON.stringify({ ok: true }));
});

app.listen(4000, () => {
  console.log("webhook服务在4000端口运行");
});
