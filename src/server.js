const https = require("https");
const express = require("express");
const middleware = require("@line/bot-sdk").middleware;
const JSONParseError = require("@line/bot-sdk").JSONParseError;
const SignatureValidationFailed = require("@line/bot-sdk")
  .SignatureValidationFailed;

const app = express();

const config = {
  channelAccessToken:
    "eixCDwO9gpWOEPVN2/X5G0FUuDpUzREf1152/mfHBGclafT25rWItvCE/NUcGLoS4yfDnSn3GKE/F3bONR8dlS7a/mh9h1uT1ki/CGlJfmGB3aReURLKnzSStDZQI2zlYdxZ1qYLSwopB7mMArrpWwdB04t89/1O/w1cDnyilFU=",
  channelSecret: "8a7877200ffb01b860ddc365fed4e735",
};

let TOKEN =
  "eixCDwO9gpWOEPVN2/X5G0FUuDpUzREf1152/mfHBGclafT25rWItvCE/NUcGLoS4yfDnSn3GKE/F3bONR8dlS7a/mh9h1uT1ki/CGlJfmGB3aReURLKnzSStDZQI2zlYdxZ1qYLSwopB7mMArrpWwdB04t89/1O/w1cDnyilFU=";
app.use(middleware(config));

app.post("/webhook", function(req, res) {
  res.send("HTTP POST request sent to the webhook URL!");
  // If the user sends a message to your bot, send a reply message
  if (req.body.events[0].type === "message") {
    // Message data, must be stringified
    console.log(req.body.events[0]);
    if (
      req.body.events[0].message.type === "text" &&
      req.body.events[0].message.text === "ขอดูเมนูอาหาร"
    ) {
      dataString = JSON.stringify({
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            type: "text",
            text: "นี่เลย!!! เมนูของร้านเรา",
          },
        ],
      });
    } else {
      dataString = JSON.stringify({
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            type: "text",
            text: "ถ้าอยากสั่งข้าวกดปุ่มสั่งอาหารด้านล่างเลยครับ หรือว่าอยากจะดูเมนูก่อนก็ได้นะ",
          },
          
        ],
      });
    }
    // Request header
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + TOKEN,
    };

    // Options to pass into the request
    const webhookOptions = {
      hostname: "api.line.me",
      path: "/v2/bot/message/reply",
      method: "POST",
      headers: headers,
      body: dataString,
    };

    // Define request
    const request = https.request(webhookOptions, (res) => {
      res.on("data", (d) => {
        process.stdout.write(d);
      });
    });

    // Handle error
    request.on("error", (err) => {
      console.error(err);
    });

    // Send data
    request.write(dataString);
    request.end();
  }
});

app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature);
    return;
  } else if (err instanceof JSONParseError) {
    res.status(400).send(err.raw);
    return;
  }
  next(err); // will throw default 500
});

console.log("ASASASASASAS");
app.listen(4000);
