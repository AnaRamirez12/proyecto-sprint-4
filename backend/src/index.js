const jsonServer = require("json-server");
const server = jsonServer.create();
//const router = jsonServer.router(`${__dirname}/data/db.json`);
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3000;

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', '*');
    next()
})

server.use(jsonServer.bodyParser);
//server.use(router);
// Endpoint para poder obtener datos de un registro de la lista por su ID
server.get("/user/:id", (req, res, next) => {
    console.log("entre")
    const info = require('./data/users.json');
    const id = req.params.id;
    const data = info.users.filter(data => data.id == id)
    console.log(data)
    if (data == undefined || data == null) {
        return res.json({
            "error": `El usuario con ID ${id} no existe`
        })
    }
    res.json(data)
});

server.post("/login", (req, res, next) => {
    console.log(req.body)
    let phoneNumber = req.body.phone
    let userPassword = req.body.passwd
    console.log("entre")
    const info = require('./data/users.json');
    const data = info.users.filter(data => data.phone_number == phoneNumber && data.password == userPassword)
    console.log(data)
    if (data == undefined || data == null) {
        return res.json({
            "error": `El usuario con ID ${id} no existe`
        })
    }
    res.json(data)
});

server.get("/user/:senderId/chat/:receiverId", (req, res, next) => {
    console.log("entre al chat")
    const info = require('./data/messages.json');
    const senderId = req.params.senderId;
    const receiverId = req.params.receiverId;
    if (senderId == receiverId) {
        return res.json({
            "error": `No puedes tener una conversación contigo mismo... consigue amigos`
        })
    }
    const data = info.filter(data => (data.id_user_1 == senderId && data.id_user_2 == receiverId) || (data.id_user_1 == receiverId && data.id_user_2 == senderId))
    if (data == undefined || data == null) {
        return res.json({
            "error": `La conversación entre el ${senderId} y ${receiverId} no existe`
        })
    }
    res.json(data)
});


server.use(middlewares)

server.listen(port, () => {
    console.log(`JSON Server is running at http://localhost:${port}`)
})