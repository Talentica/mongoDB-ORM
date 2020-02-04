import { Employee } from '../models/employee.model'

const EmployeeModel = (new Employee() as any).getModel()

export function employeeController(path: string, data: any): Promise<any> {
    switch (path) {
        case '/emp/create':
            return create(data)
        case '/emp/fetch':
            return fetch()
    }
}

function create(data: Employee): Promise<any> {
    return new Promise((resolve, reject) => {
        const emp: any = new EmployeeModel()
        emp.id = data.id
        emp.name = data.name
        emp.save((err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })
}

function fetch(): Promise<any> {
    return new Promise((resolve, reject) => {
        EmployeeModel.find((err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })

}
