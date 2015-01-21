var UrlSetMenudateURL="http://193.136.19.86:8080/restaurants/menudata/";


function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


function httpPOST(coisa, cena,tipo)
{
    var postdata = '{ "id" : "'+cena+'", "data" :"'+coisa+ '", "tipo" :"'+tipo+'"}';
    var client = new XMLHttpRequest();
    client.open("POST", UrlSetMenudateURL,true);
    client.setRequestHeader("Content-Type", "application/json");
    client.setRequestHeader("Content-length", postdata.length);
    client.setRequestHeader("Connection", "close");
    client.send(postdata);
}



var Script = function () {


    /* initialize the external events
     -----------------------------------------------------------------*/

    $('#external-events div.external-event').each(function() {

        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        // it doesn't need to have a start or end
        var eventObject = {
            title: $.trim($(this).text()) // use the element's text as the event title
	   
        };
	
        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject);

        // make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 999,
            revert: true,      // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
        });

    });


    /* initialize the calendar
     -----------------------------------------------------------------*/

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar !!!
        drop: function(date, allDay) { // this function is called when something is dropped

            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject');

            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);

            // assign it the date that was reported
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;
            // render the event on the calendar
            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
            alert(copiedEventObject.start);

            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                $(this).remove();
            }
	    if (!confirm("Are you sure about this change?")) {
            revertFunc();
            }else{alert(1);httpPOST(copiedEventObject.start,copiedEventObject.title, "added");}

		
    	

        },
        eventDrop: function(event,dayDelta,minuteDelta,allDay,revertFunc) {

        if (!confirm("Are you sure about this change?")) {
            revertFunc();
        }else{alert(2);httpPOST(event.start,event.id,"cenas");
		}
    	},
	eventDragStop: function(event) {
		alert("vou sair"+ event.start + "\n" + event.end);}
	

    });


}();
