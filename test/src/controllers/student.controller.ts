import { Student } from '../models/student.model';
import * as express from 'express';

const StudentModel = (new Student() as any).getModel();

export function create(req: express.Request, res: express.Response) {
    const data = req.body;
    const s: any = new StudentModel();
    s.id = data.id;
    s.name = data.name;
    s.save((err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    });
}

export function fetch(req, res) {
    StudentModel.find((err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    });
}
