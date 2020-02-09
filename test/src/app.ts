import * as express from 'express'
import * as bodyParser from 'body-parser'
import { createConnection } from 'orm'
import teacherRoutes from './routes/teacher.routes'
import studentRoutes from './routes/student.routes'

createConnection('mongodb://localhost:27017/orm-test')

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/teachers', teacherRoutes);
app.use('/students', studentRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`)
})
