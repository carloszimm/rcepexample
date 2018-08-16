var marker;
function initializeMarkers(){
    let localMarker = {};
    let markerOptions = {
        url: 'https://mt.google.com/vt/icon?psize=16&font=fonts/Roboto-Regular.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=48&scale=1',
        scaledSize: new google.maps.Size(26, 40),
        labelOrigin: new google.maps.Point(12.5, 12)
    }

    localMarker.A = new SlidingMarker({
        position: new google.maps.LatLng(-8.00156157933, -34.8703980792),
        map: googleMap,
        title: "Bus B",
        duration: 500,
        easing: "easeOutExpo",
        label:{
            text: String.fromCharCode("0xe530"),
            fontFamily: 'Material Icons'
        },
        icon: markerOptions
    });

    markerOptions = {
        url: "https://mt.google.com/vt/icon?color=ff004C13&name=icons/spotlight/spotlight-waypoint-b.png",
        scaledSize: new google.maps.Size(26, 40),
        labelOrigin: new google.maps.Point(12.5, 12)
    };
    localMarker.B = new SlidingMarker({
        position: new google.maps.LatLng(-8.00835276674, -34.90757933112),
        map: googleMap,
        title: "Bus A",
        duration: 500,
        easing: "easeOutExpo",
        label:{
            text: String.fromCharCode("0xe530"),
            fontFamily: 'Material Icons'
        },
        icon: markerOptions
    });

    localMarker.location = new google.maps.Marker({
        position: new google.maps.LatLng(-8.008,-34.891),
        map: googleMap,
        title: "location",
        draggable: true,
        label:{
            text: String.fromCharCode("0xe55c"),
            fontFamily: 'Material Icons', 
            fontSize: "15px"
        }
    });

    google.maps.event.addListener(localMarker.location, 'dragend', function(evt){
        $('#latitude').val(evt.latLng.lat().toFixed(3));
        $('#longitude').val(evt.latLng.lng().toFixed(3));
    });

    marker = localMarker;
}