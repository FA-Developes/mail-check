
import express from "express";
import bodyParser = require("body-parser");
import { generateId, checkerImage } from "./mail-check";
import nodemailer from 'nodemailer';
let app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*').header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, ContentType, Accept, Authorization, content-type'
    );
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }
    next();
});

app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: false }));

app.post("/sendmail", async (req, res) => {
    let mail = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: req.body.from,
          pass: req.body.pw
        }
    }).sendMail({
        to: req.body.to,
        subject: req.body.suject,
        html: req.body.content + `<img src="${process.env.PATH ||'localhost:8080'}/testimage/${generateId(req.body.to)}.png">`
    });
    res.json(mail);
})
.get("/testimage/:checkId", checkerImage(__dirname+"/images/test.png"))

app.listen(process.env.PORT || 8080, () => console.log("Server started"))