//Updated 14 01 2015
var map;
var uminho =   new google.maps.LatLng(41.56080846544578,-8.395882844924927);
var destinationMarker;
var originMarke;
var howToGo = 0;

var directionsRequest={};
var directionsService = {};
var directionsRenderer = {};
var watchID = {};
var marker = {};
var originMarkerSet=true;
var lat;
var lon;
//inicia o mapa.
function initialize(id,a,b) {

  var mapProp = {
      center:new google.maps.LatLng(a,b),
      zoom: 16,
      mapTypeControl:false,
      streetViewControl:false,
      draggable: true,
      scrollwheel: true,
      mapTypeId:mapTypeId="OSM"
  };
  
  map=new google.maps.Map(document.getElementById("map-canvas"+id),mapProp);
  map.mapTypes.set("OSM", new google.maps.ImageMapType({
                getTileUrl: function(coord, zoom) {
                    return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
                },
                tileSize: new google.maps.Size(256, 256),
                name: "OpenStreetMap",
                maxZoom: 18
            }));

  originMarker=new google.maps.Marker({
    draggable:true,
    icon:'/static/clap_uminho/map/image/greenMk.png',
    map:map,
    overviewMapControl:true,
    position:uminho
  });
  
  destinationMarker=new google.maps.Marker({
    draggable:false,
    icon:'/static/clap_uminho/map/image/redMk.png',
    map:map,
    overviewMapControl:true,
    position:new google.maps.LatLng(a,b)
  });
            
            
            
            
            
//##Inicia as routes
  var directionsRendererOptions={};
  directionsRendererOptions.draggable=false;
  directionsRendererOptions.hideRouteList=true;
  directionsRendererOptions.suppressMarkers=true;
  directionsRendererOptions.preserveViewport=true;
  directionsRenderer=new google.maps.DirectionsRenderer(directionsRendererOptions);
  directionsService=new google.maps.DirectionsService();
  
//##Inicia os menus
  var contextMenuOptions={};
  contextMenuOptions.classNames={menu:'context_menu', menuSeparator:'context_menu_separator'};
  
  //  create an array of ContextMenuItem objects
  //  an 'id' is defined for each of the four directions related items
  var menuItems=[];
  menuItems.push({className:'context_menu_item',
    eventName:'directions_origin_click', id:'directionsOriginItem', label:'Directions from here'});
  menuItems.push({className:'context_menu_item', 
  eventName:'GPS_click', id:'GPSItem', label:'Directions from my GPS'});
  menuItems.push({className:'context_menu_item',
    eventName:'clear_directions_click', id:'clearDirectionsItem', label:'Clear directions'});
  menuItems.push({className:'context_menu_item', 
    eventName:'get_directions_click', id:'getDirectionsItem', label:'Get route'});
  //  a menuItem with no properties will be rendered as a separator
  menuItems.push({});
  menuItems.push({className:'context_menu_item', 
    eventName:'Event_click', id:'Eventitem', label:'Add an Event'});
 //  a menuItem with no properties will be rendered as a separator
  menuItems.push({});
  menuItems.push({className:'context_menu_item', 
    eventName:'drive_directions_click', id:'driveItem', label:'Drive route'});
  menuItems.push({className:'context_menu_item', 
    eventName:'walk_directions_click', id:'walkItem', label:'Walk route'});
  menuItems.push({});
  menuItems.push({className:'context_menu_item', 
    eventName:'zoom_in_click', label:'Zoom in'});
  menuItems.push({className:'context_menu_item', 
    eventName:'zoom_out_click', label:'Zoom out'});
  menuItems.push({});
  menuItems.push({className:'context_menu_item', 
    eventName:'center_map_click', label:'Center map here'});
  contextMenuOptions.menuItems=menuItems;
  
  var contextMenu=new ContextMenu(map, contextMenuOptions);
  
  google.maps.event.addListener(map, 'rightclick', function(mouseEvent){
    contextMenu.show(mouseEvent.latLng);
  });

  //  listen for the ContextMenu 'menu_item_selected' event
  google.maps.event.addListener(contextMenu, 'menu_item_selected', function(latLng, eventName){
    switch(eventName){
      case 'Event_click':
        var res = (""+latLng).split(",");
        lat = res[0].substring(1);
        lon = res[1].substring(0, res[1].length - 1)
        $('#panel'+id).show();
        break;
      case 'drive_directions_click':
        howToGo=1;
        setRoute();
        break;
      case 'walk_directions_click':
        howToGo=0;
        setRoute();
        break;
      case 'directions_origin_click':
        originMarker.setPosition(latLng);
        setRoute();
        break;
      case 'GPS_click':
          if (navigator.geolocation) {
              //if(isMobile() )
              // navigator.geolocation.watchPosition(showPosition);
              //else
              navigator.geolocation.getCurrentPosition(
                  showPosition,errorCallback,{timeout:5000}  
               );
               setRoute();
               
          } else { alert('GPS  not available\n'); }        
        break;
      case 'clear_directions_click':
        directionsRenderer.setMap(null);
        originMarker.setDraggable(true);
        navigator.geolocation.clearWatch(watchID);
        break;
      case 'get_directions_click':
        setRoute();
        break;
      case 'zoom_in_click':
        map.setZoom(map.getZoom()+1);
        break;
      case 'zoom_out_click':
        map.setZoom(map.getZoom()-1);
        break;
      case 'center_map_click':
        map.panTo(latLng);
        break;
    }
 });

// navigator.geolocation.getCurrentPosition(callroute,errorCallback,{timeout:5000});

makerIt(map,"http://193.136.19.86:8080/restaurants/local/get/");
}
  
google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addDomListener(window, "resize", resizingMap());


function setRoute() {
  directionsRequest.destination=destinationMarker.getPosition();
  directionsRequest.origin=originMarker.getPosition();
  if(!howToGo)  directionsRequest.travelMode=google.maps.TravelMode.WALKING;
  else          directionsRequest.travelMode=google.maps.TravelMode.DRIVING;

  directionsService.route(directionsRequest, function(result, status){
    if(status===google.maps.DirectionsStatus.OK){
    originMarker.setDraggable(false);
    directionsRenderer.setDirections(result);
    directionsRenderer.setMap(map);
  } 
  else {
        alert("Sorry, the map was unable to obtain directions.\n"
        //+ "The request failed with the message: "+status
        );
      }
  });
}


function resizeMap(id,a,b) {
   initialize(id,a,b);
   if(typeof map =="undefined") return;
   setTimeout( function(){resizingMap();} , 400);
}

function resizingMap() {
   if(typeof map =="undefined") return;
   var center = map.getCenter();
   google.maps.event.trigger(map, "resize");
   map.setCenter(center); 
}

function showPosition(local) {
    originMarker.position=new google.maps.LatLng(local.coords.latitude,local.coords.longitude);
}


function callroute(local){
  showPosition(local);
  setRoute();
  
}

function errorCallback(err){
alert('Fail to obtain GPS location');
}

function panel_cancel_action(id){
  $('#panel'+id).hide();
}

function httpGet(theUrl)
{
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    
    //alert("FF" + xmlHttp.responseText);
    if (xmlHttp.status != "200") {
    alert(">"+xmlHttp.status);
    return "[]";
    }
    else {
    xmlHttp.send( null );
    return xmlHttp.responseText;
    }
}

function makerIt(map,theUrl){ 
    obj = JSON.parse( httpGet(theUrl) );
    for (i = 0; i < obj.length; i++) {
      addM(obj[i].lat,obj[i].long, obj[i].desc);
    }
}

function addM(la,lo,str){
  var contentString = str;
  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });
  
  var mark = new google.maps.Marker({
      position: new google.maps.LatLng(la,lo),
      map: map,
      draggable:false,
      icon:'/static/clap_uminho/map/image/restaurant.png',
      size:4,
      zoomControl:false
  });
  google.maps.event.addListener(mark, 'click', function() {
    infowindow.open(map,mark);
  });
  
}

function panel_insert_action(id){
  $('#panel'+id).hide();
  var theUrl ="http://193.136.19.86:8080/restaurants/local/put/";
  var strDes= document.getElementById("pDescription"+id).value;
  var postData = '{ "lat" : "'+lat+'", "lon" :"'+lon+'", "type": "'+strDes+'"}';
  //Test alert(""+postData);
  addM(""+lat,""+lon,strDes);
  httpPOST(theUrl,postData);
  
}

function httpPOST(theUrl,postdata)
{

    var client = new XMLHttpRequest();
    client.open("POST", theUrl,true);
    client.setRequestHeader("Content-Type", "application/json");
    client.setRequestHeader("Content-length", postdata.length);
    client.setRequestHeader("Connection", "close");
    client.send(postdata);
}

 

