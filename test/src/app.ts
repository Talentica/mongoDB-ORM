import * as http from 'http'
import { createConnection } from 'orm'
import { employeeController } from './controllers/employee.controller'

createConnection('mongodb://localhost:27017/orm-test')

const port = 8081

http.createServer(function (req, res) {

    function end(data, statusCode = 200, header?: http.OutgoingHttpHeaders) {
        header = header ? header : { 'Content-Type': 'application/json' }
        res.writeHead(statusCode, header);
        res.write(JSON.stringify(data))
        res.end()
    }

    let data: any = []
    req.on('data', chunk => {
        data.push(chunk)
    })

    req.on('end', () => {
        data = (data.length && JSON.parse(data)) || {}
        const url = req.url
        switch (url.toLowerCase()) {
            case '/emp/create':
            case '/emp/fetch':
                employeeController(url, data).then(result => {
                    end(result, 200)
                }).catch(err => {
                    end(err, 400)
                })
        }
    })

}).listen(port, () => {
    console.log(`Started server at post ${port}`)
});
