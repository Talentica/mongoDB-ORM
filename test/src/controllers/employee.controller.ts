import { Employee } from '../models/employee.model'
import * as express from 'express'

const EmployeeModel = (new Employee() as any).getModel()

export function create(req: express.Request, res: express.Response) {
    const data = req.body
    const emp: any = new EmployeeModel()
    emp.id = data.id
    emp.name = data.name
    emp.save((err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result)
    })
}

export function fetch(req, res) {
    EmployeeModel.find((err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result)
    })
};