const express = require('express')
const app = express()

var server_port = process.env.PORT || 3000;
var server_host = '0.0.0.0';
//app.get('/', (req, res) => res.send('Hello World!'))

app.use(express.static('public'))

app.listen(server_port, server_host, () => console.log('Example app listening on port %d!', server_port))