var map;
var uminho =   new google.maps.LatLng(41.56080846544578,-8.395882844924927);
var marker = {};

//inicia o mapa.
function initialize() {

  var mapProp = {
      center:uminho,
      zoom: 16,
      mapTypeControl:false,
      streetViewControl:false,
      draggable: true,
      scrollwheel: true,
      mapTypeId:mapTypeId="OSM"
  };
  
  map=new google.maps.Map(document.getElementById("map-canvas"),mapProp);
  map.mapTypes.set("OSM", new google.maps.ImageMapType({
                getTileUrl: function(coord, zoom) {
                    return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
                },
                tileSize: new google.maps.Size(256, 256),
                name: "OpenStreetMap",
                maxZoom: 18
            }));

  marker=new google.maps.Marker({
    draggable:true,
    icon:'/static/restaurants/img/greenMk.png',
    map:map,
    overviewMapControl:true,
    position:uminho
  });
            
   
  
  //navigator.geolocation.getCurrentPosition(callroute,errorCallback,{timeout:5000});
}
  
google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addDomListener(window, "resize", resizingMap());




