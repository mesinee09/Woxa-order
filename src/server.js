const https = require("https");
const express = require("express");
const middleware = require("@line/bot-sdk").middleware;
const JSONParseError = require("@line/bot-sdk").JSONParseError;
const SignatureValidationFailed =
  require("@line/bot-sdk").SignatureValidationFailed;

const app = express();

const config = {
  channelAccessToken:
    "wplhq4wpByjPcScpnlfrwPrXjeakp+ptm69Dp9xOamULM1SCdOu8WlFGcZmMnDLW7uX9ItH8FvGwRmqwjRLKPU1ts3z1b1oE6qRrLDh/zJS7siZRtd91mXc9CE9+8C5KSwh4FAxm4lHyn712hukgTgdB04t89/1O/w1cDnyilFU=",
  channelSecret: "d07fe29a95cae664ef8e47ac26c2239f",
};

let TOKEN =
  "wplhq4wpByjPcScpnlfrwPrXjeakp+ptm69Dp9xOamULM1SCdOu8WlFGcZmMnDLW7uX9ItH8FvGwRmqwjRLKPU1ts3z1b1oE6qRrLDh/zJS7siZRtd91mXc9CE9+8C5KSwh4FAxm4lHyn712hukgTgdB04t89/1O/w1cDnyilFU=";

app.use(middleware(config));

app.post("/webhook", function (req, res) {
  res.send("HTTP POST request sent to the webhook URL!");
  // If the user sends a message to your bot, send a reply message
  if (req.body.events[0].type === "message") {
    // Message data, must be stringified
    const dataString = JSON.stringify({
      replyToken: req.body.events[0].replyToken,
      messages: [
        {
          type: "text",
          text: "Hello, user",
        },
        {
          type: "text",
          text: "May I help you?",
        },
      ],
    });

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
