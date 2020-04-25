const express = require('express');
const app = express();

const port = process.env.PORT || 3000; // PORT=4000 npm start

app.use(express.static('public'));

app.listen(port, function() {
    console.log('Server started at http://localhost:%s', port)
});
