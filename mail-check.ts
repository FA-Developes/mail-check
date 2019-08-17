

import { Request, Response } from "express";
import { ParamsArray, ParamsDictionary } from "express-serve-static-core";



const checkers:{[name: string]: any} = {}

export function checkerImage(imagePath: string, allowNoId = false) {
    return (req: Request, res: Response) => {
        let params = req.params as ParamsDictionary;
        let id = params.checkId.split(".")[0];
        if(!allowNoId && !id) {
            console.error("No Id specified");
            res.sendStatus(404);
        } else {
            if(id) {
                console.log("recieved: " + id);
                console.log(checkers[id] + " checked their E-mail")
            }
            res.sendFile(imagePath);
        }
    }
}

export function generateId(data: any) {
    let id = Date.now().toString(36);
    checkers[id] = data;
    console.log("added: " + id);
    return id;
}