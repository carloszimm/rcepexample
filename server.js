const fs = require('fs');
const csv = require('fast-csv');
const Utm = require('geodesy').Utm;

const {fromEvent, zip, timer, from} = require('rxjs');
const {map, mergeMap, skip} = require('rxjs/operators');
const R = require('ramda');

const stream1 = fs.createReadStream("./dataset/3333_data.csv");
const stream2 = fs.createReadStream("./dataset/3336_data.csv");

const stream3333 = csv
        .fromStream(stream1, {headers : true, delimiter:';'});
const stream3336 = csv
        .fromStream(stream2, {headers : true, delimiter:';'});

const filterCsv = 
    data => (data.CoordX != null && data.CoordX != 0) &&
        (data.CoordY != null && data.CoordY != 0) &&
            (data.Unidade == 3333 || data.Unidade == 3336);

const getCoords = data => {
    const coords = new Utm(25, 'S', data.CoordX, data.CoordY).toLatLonE();
    return {
        source: typeBus(data),
        occurrence: new Date(data.Instante),
        lat: coords.lat,
        lon: coords.lon
    }
};

const typeBus = data => data.Unidade == 3333 ? 'A': 'B';

const sendData = R.curry((socket, data) => socket.emit('message', data));

const defaultTo30s = R.defaultTo(30000);
const checkParam = R.compose(R.not, R.isNil);
const testParam = R.cond([
        [checkParam, R.compose(defaultTo30s, Math.abs, parseInt)], 
        [R.compose(R.not, checkParam), defaultTo30s]
    ]);

var io = require('socket.io')();

let array3333 = [], array3336 = [];
let arrayZip, sendDataSocket;

const timeParam = testParam(process.argv[2]);

const file1Promise = new Promise((resolve) => {
    stream3333
        .on('data', function(data) {
            array3333 = R.append(data, array3333);
        })
        .on('end', function() {
            //console.log('file 1 done');
            resolve();
        });
});

const file2Promise = new Promise((resolve) => {
    stream3336
        .on('data', function(data) {
            array3336 = R.append(data, array3336);
        })
        .on('end', function() {
            //console.log('file 2 done');
            resolve();
        });
});
    
Promise.all([
    file1Promise,
    file2Promise,
]).then(() => {
    array3333 = R.filter(filterCsv, array3333);
    array3336 = R.filter(filterCsv, array3336);

    arrayZip = R.pipe(R.zip, R.flatten)(array3333, array3336);

    io.listen(1337);

    console.log('Server running at http://127.0.0.1:1337/');

    fromEvent(io, 'connection')
        .pipe(mergeMap(socket =>{
            sendDataSocket = sendData(socket);
            return zip(from(arrayZip).pipe(skip(2)), timer(0, timeParam), (item, i)=> item);
        }), map(getCoords))
        .subscribe(
            data => sendDataSocket(data)
        );
});