const { fromEvent, of } = rxjs;
const { map, delay, concatMap, tap } = rxjs.operators;
const { EventManager, Point, EventType } = rcep;

class GpsLocation extends EventType {
    constructor(occurrence, lat, lon, source) {
        super('GPS location', occurrence, '', `Bus ${source}`);
        this._location = new Point(lat, lon);
    }
    get location() {
        return this._location;
    }

    set location(point) {
        this._location = point;
    }
}

const socket = io('http://localhost:1337');

let patternStream, streamSubscription;

patternStream = fromEvent(socket, 'message');

patternStream
    .pipe(map(x => { delete x.occurrence; return x; }))
    .subscribe(location => updateMarker(location));

function updateMarker(gpsLocation) {
    marker[gpsLocation.source].setPosition(new google.maps.LatLng(gpsLocation.lat, gpsLocation.lon));
}

function setPattern() {
    toggleSetPattern();
    let eventSource = EventManager.create(patternStream, x => new GpsLocation(x.occurrence, x.lat, x.lon, x.source));

    streamSubscription = eventSource[$("#wintype option:selected").val()]($('#windowSize').val(), $('#size').val())
    [$('#pattype option:selected').val()](['GPS location'],
        new Point($('#latitude').val(), $('#longitude').val()),
        'location', parseQuery(), $('#newEventTypeId').val())
        .subscribe({
            next: derivedEvent => {
                sendAlert(derivedEvent);
                logInfo(derivedEvent);
            },
            error: err => console.log(err)
        });
}

function unset() {
    if (streamSubscription) {
        streamSubscription.unsubscribe();
    }
    toggleSetPattern();
}

function toggleSetPattern() {
    $("#setPattern").prop("disabled", !$("#setPattern").prop("disabled"));
    $("#unsetPattern").prop("disabled", !$("#unsetPattern").prop("disabled"));
    $("#viewCode").prop("disabled", !$("#viewCode").prop("disabled"));
}