const express = require('express');
const app = express();

const port = process.env.PORT || 4000; // PORT=4000 npm start

app.use(express.static('public'));

app.use('/css', express.static(__dirname + '/public/css')); // http://localhost:3000/css
app.use('/js', express.static(__dirname + '/public/js')); // http://localhost:3000/css


app.listen(3000, function() {
    console.log('Server started at http://localhost:%s', 3000)
});
