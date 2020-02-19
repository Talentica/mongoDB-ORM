import { Teacher } from '../models/teacher.model';
import * as express from 'express';
import { getRepository } from 'orm';

// const TeacherModel = (new Teacher() as any).getModel();

// export function create(req: express.Request, res: express.Response) {
//     const data = req.body;
//     const t: any = new TeacherModel();
//     t.id = data.id;
//     t.name = data.name;
//     t.save((err, result) => {
//         if (err) {
//             res.send(err);
//         }
//         res.send(result);
//     });
// }

// export function fetch(req, res) {
//     const teacherRepo = getRepository<Teacher>(Teacher);

//     const s = teacherRepo.find();

//     TeacherModel.find((err, result) => {
//         if (err) {
//             res.send(err);
//         }
//         res.send(result);
//     });
// }
