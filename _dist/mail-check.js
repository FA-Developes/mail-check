"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkers = {};
function checkerImage(imagePath, allowNoId) {
    if (allowNoId === void 0) { allowNoId = false; }
    return function (req, res) {
        var params = req.params;
        var id = params.checkId.split(".")[0];
        if (!allowNoId && !id) {
            console.error("No Id specified");
            res.sendStatus(404);
        }
        else {
            if (id) {
                console.log("recieved: " + id);
                console.log(checkers[id] + " checked their E-mail");
            }
            res.sendFile(imagePath);
        }
    };
}
exports.checkerImage = checkerImage;
function generateId(data) {
    var id = Date.now().toString(36);
    checkers[id] = data;
    console.log("added: " + id);
    return id;
}
exports.generateId = generateId;
