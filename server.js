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
  const branch = req.body["ref"].split("/").pop();
  if (branch === "master" && event === "push") {
    // var download_file_wget = function (file_url) {
    //   // 提取文件名
    //   var file_name = url.parse(file_url).pathname.split("/").pop();
    //   // 组合wget命令
    //   var wget = "wget -P " + DOWNLOAD_DIR + " " + file_url;
    //   // 使用exec执行wget命令
    //   var child = exec(wget, function (err, stdout, stderr) {
    //     if (err) throw err;
    //     else console.log(file_name + " downloaded to " + DOWNLOAD_DIR);
    //   });
    // };
  }
  console.log("验证通过");
  res.end(JSON.stringify({ ok: true }));
});

app.listen(4000, () => {
  console.log("webhook服务在4000端口运行");
});
