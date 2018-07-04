const express = require ('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

const server = app.listen(8000, function(){
    console.log('Listening on port: 8000');
})

// Create Socket variable
const io = require('socket.io')(server);

// Create listener for connection from client
io.on('connection', function(socket) {
    // You should see this message once connection is made
    console.log('Socket connection complete...' , socket.id)
    // Create count variable
    var count = 0;
    // Create listener for count request
    socket.on('count', function(){
        // Increment count
        count++
        // Send count to client
        io.sockets.emit('response', count)
        // socket.broadcast.send('response', count)
        // ^^ This will braodcast changes to everyone but the one who sent the update
    })
    // Create listner for clear request from client
    socket.on('clear', function(){
        // Reset count to Zero
        count = 0;
        // Send count to client via emit
        io.sockets.emit('clear', count)
    })
})
// Render index.ejs
app.get('/', function(req, res){
    res.render('index')
})
