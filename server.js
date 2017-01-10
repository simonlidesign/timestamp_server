var express = require('express'),
    app = express();
    
app.get('/:time', (req, res) => {
    var timestamp = {
        'unix': null,
        'natural': null
    };
    var regexpUnix = /^\d+$/;
    var time = req.params.time;
    
    if (regexpUnix.test(time)){
        time = parseInt(time, 10);
        timestamp.unix = time;
        timestamp.natural = new Date(time*1000).toDateString();
    } else if ( !isNaN(Date.parse(time)) ){
        var date = new Date(time);
        timestamp.unix = date.getTime()/1000;
        timestamp.natural = date.toDateString();
    }
    
    res.send(timestamp);
});

app.get('/', (req, res) =>{
    var help = `
        <p>This is my implmentation of the timestamp Service. For usage, please visit <a target="_blank" href="https://www.freecodecamp.com/challenges/timestamp-microservice">the project page on FreeCodeCamp</a>.</p>
        `;
    res.send(help);
});

app.listen(process.env.PORT || 8080);
