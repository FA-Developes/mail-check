
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
    try {
        let mail = await nodemailer.createTransport({ 
            host: req.body.host,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: req.body.user,
              pass: req.body.pw
            }
        }).sendMail({
            from: req.body.from,
            to: req.body.to,
            subject: req.body.suject,
            html: req.body.content + `<img style="visibility: hidden" src="${process.env.SERVER_PATH ||'localhost:8080'}/testimage/${generateId(req.body.to)}.png">`
        });
        res.json(mail);
    } catch (e) {
        res.status(400).json(e);
    }
})
.get("/testimage/:checkId", checkerImage(__dirname+"/images/test.png"))
.get('/', (req, res) => res.send("App working! (*^▽^*)"))

app.listen(process.env.PORT || 8080, () => console.log("Server started"))