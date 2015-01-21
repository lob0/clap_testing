/* @flow */

var URL="https://demo-project-anapmc-2.c9.io/";

//Univ Minho
$.ajax({

  url:URL,
  // whether this is a POST or GET request
  type: "GET",
 
    // the type of data we expect back
  dataType : "json",

  success:function(result){
    /* Write here the action function
    */
    info_campus=insertCampusInfo(result.foo,"CLUMA - Campus Life Universidade Minho Aplication");
    col5.appendChild(info_campus);
  
    },

  // code to run if the request fails; the raw request and
    // status codes are passed to the function
  error: function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    },

  // code to run regardless of success or failure
  complete: function( xhr, status ) {
        console.log("The request is complete!" );
    }


  });

//restaurantList(URL);
