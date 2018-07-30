var googleMap;
        function loadMap() {
            var mapOptions = {
                center: new google.maps.LatLng(-8.033, -34.881),
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                gestureHandling: 'greedy',
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                fullscreenControl: false
            };
            googleMap = new google.maps.Map(document.getElementById("mapElement"), mapOptions);
            drawPolygon();
            initializeMarkers();
        }
        function drawPolygon() {
            function getPolygon(myPath, i){
                if(i==0){
                    return new google.maps.Polygon({
                        path: myPath,
                        strokeColor:"#228B22",
                        strokeOpacity:0.8,
                        strokeWeight:2,
                        fillColor:"#32CD32",
                        fillOpacity:0.1
                     });
                }else{
                    return new google.maps.Polygon({
                        path: myPath,
                        strokeColor:"#FF0000",
                        strokeOpacity:0.8,
                        strokeWeight:2,
                        fillColor:"#FF6347",
                        fillOpacity:0.1
                     });
                }
            }

            const busAreas = [
                [
                    new google.maps.LatLng(-7.998, -34.872),
                    new google.maps.LatLng(-8.004, -34.868),
                    new google.maps.LatLng(-8.012, -34.875),
                    new google.maps.LatLng(-8.008, -34.885),
                    new google.maps.LatLng(-8.021, -34.891),
                    new google.maps.LatLng(-8.049, -34.886),
                    new google.maps.LatLng(-8.056, -34.878),
                    new google.maps.LatLng(-8.053, -34.872),
                    new google.maps.LatLng(-8.053, -34.870),
                    new google.maps.LatLng(-8.061, -34.872),
                    new google.maps.LatLng(-8.066, -34.875),
                    new google.maps.LatLng(-8.063, -34.884),
                    new google.maps.LatLng(-8.061, -34.882),
                    new google.maps.LatLng(-8.055, -34.892),
                    new google.maps.LatLng(-8.041, -34.894),
                    new google.maps.LatLng(-8.037, -34.893),
                    new google.maps.LatLng(-8.025, -34.895),
                    new google.maps.LatLng(-8.020, -34.910),
                    new google.maps.LatLng(-8.019, -34.912),
                    new google.maps.LatLng(-8.016, -34.915),
                    new google.maps.LatLng(-8.012, -34.916),
                    new google.maps.LatLng(-8.007, -34.912),
                    new google.maps.LatLng(-8.007, -34.905),
                    new google.maps.LatLng(-7.999, -34.895),
                    new google.maps.LatLng(-7.999, -34.892),
                    new google.maps.LatLng(-8.004, -34.886),
                    new google.maps.LatLng(-8.001, -34.882),
                    new google.maps.LatLng(-7.998, -34.876),
                    new google.maps.LatLng(-7.998, -34.872)
                ],[
                    new google.maps.LatLng(-8.003, -34.868),
                    new google.maps.LatLng(-8.003, -34.871), 
                    new google.maps.LatLng(-8.000, -34.873),
                    new google.maps.LatLng(-8.007, -34.889),
                    new google.maps.LatLng(-8.016, -34.888),
                    new google.maps.LatLng(-8.021, -34.892),
                    new google.maps.LatLng(-8.036, -34.889),
                    new google.maps.LatLng(-8.037, -34.888),
                    new google.maps.LatLng(-8.049, -34.873),
                    new google.maps.LatLng(-8.051, -34.875),
                    new google.maps.LatLng(-8.058, -34.880),
                    new google.maps.LatLng(-8.060, -34.877),
                    new google.maps.LatLng(-8.069, -34.873),
                    new google.maps.LatLng(-8.075, -34.880),
                    new google.maps.LatLng(-8.070, -34.887),
                    new google.maps.LatLng(-8.063, -34.883),
                    new google.maps.LatLng(-8.057, -34.886),
                    new google.maps.LatLng(-8.049, -34.879),
                    new google.maps.LatLng(-8.041, -34.891),
                    new google.maps.LatLng(-8.037, -34.897),
                    new google.maps.LatLng(-8.033, -34.894),
                    new google.maps.LatLng(-8.019, -34.896),
                    new google.maps.LatLng(-8.014, -34.892),
                    new google.maps.LatLng(-8.010, -34.891),
                    new google.maps.LatLng(-8.006, -34.896),
                    new google.maps.LatLng(-8.007, -34.900),
                    new google.maps.LatLng(-8.010, -34.905),
                    new google.maps.LatLng(-8.009, -34.914),
                    new google.maps.LatLng(-8.006, -34.912),
                    new google.maps.LatLng(-8.007, -34.905),
                    new google.maps.LatLng(-8.001, -34.898),
                    new google.maps.LatLng(-8.005, -34.891),
                    new google.maps.LatLng(-8.003, -34.886),
                    new google.maps.LatLng(-7.996, -34.874),
                    new google.maps.LatLng(-8.003, -34.868)
                 ]
            ];

            busAreas.forEach((val, i) => {
                getPolygon(val, i).setMap(googleMap);
            });

        }
        google.maps.event.addDomListener(window, 'load', loadMap);