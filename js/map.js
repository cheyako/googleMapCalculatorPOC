var map, directionsService;

function renderDirections(result, polylineOpts) {
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var price = $('input[name="price"]').val();
    directionsRenderer.setMap(map);

    if(polylineOpts) {
        directionsRenderer.setOptions({
            polylineOptions: polylineOpts
        });
    }

    directionsRenderer.setDirections(result);

    for (i = 0; i < result.routes.length; i++) {
      var route = result.routes[i];
      var total = 0;
      for (j = 0; j < route.legs.length; j++) {
        total += route.legs[j].distance.value;
      }
      var line = "<li>Маршрут №:"+(i+1)+" Расстояние:"+(total/1000)+" км. Стоимость:"+ Math.round( price*total/1000)+"</li>";
      $('#routeList').append(line);

      $('#routeWrapper').fadeIn();
    }
}

function requestDirections(start, end, polylineOpts) {
    console.log("From:"+start+" To:"+end);
    directionsService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    }, function(result) {
        renderDirections(result, polylineOpts);
    });
}

function draw(from1, to1){
  directionsService = new google.maps.DirectionsService();
  requestDirections(from1, to1, { strokeColor:'#ff0000' });
}


function initialize() {
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(39.5, -98.35),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),    mapOptions);
}


function bindCalcButton() {
    $('#calc-button').click(function(){
        var from = $('input[name="from"]').val();
        var to = $('input[name="to"]').val();

        draw(from, to);
    })
}

google.maps.event.addDomListener(window, 'load', initialize);

$(function(){
  bindCalcButton();
})
