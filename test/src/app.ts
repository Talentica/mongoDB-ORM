import * as express from 'express'
import * as bodyParser from 'body-parser'
import employeeRouter from './routes/employee.routes'
import { createConnection } from 'orm'

createConnection('mongodb://localhost:27017/orm-test')

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/employees', employeeRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`)
})