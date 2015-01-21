(function() {
  var app = angular.module('clap', []);

  var urlGetRests="http://193.136.19.86:8080/restaurants/main/";

  app.directive("restaurantFilter", function() {
    return {
      restrict: 'E',
      templateUrl: "restaurant-filter.html"
    }; 
  });

  app.directive("restaurantsPortfolio",function() {
    return {
      restrict: 'E',
      templateUrl: "restaurants-portfolio.html",
      controller: function($scope,restaurantService){
           $scope.restaurantList = [];

         // The RestaurantService returns a promise.
         restaurantService.getRestaurants().then(function( rests ) {
                        $scope.restaurantList = rests;
          });
          }      
    };

  });

  app.directive("news", function() {
    return {
      restrict: 'E',
      templateUrl: "news.html"
    }; 
  });

  app.directive("callToAction", function() {
    return {
      restrict: 'E',
      templateUrl: "call-to-action.html"
    }; 
  });

  app.directive("mainMenu", function() {
    return {
      restrict: 'E',
      templateUrl: "main-menu.html"
    };
  });

  app.directive("topMenu", function() {
    return {
      restrict: 'E',
      templateUrl: "top-menu.html"
    };
  });

app.service(
            "restaurantService",
            function( $http, $q ) {

                // Return public API.
                return({
                   // addRestaurant: addRestaurant,
                    getRestaurants: getRestaurants,
                   // removeRestaurant: removeRestaurant
                });


                // ---
                // PUBLIC METHODS.
                // ---


                /* I add a Restaurant with the given name to the remote collection.
                function addRestaurant( name ) {

                    var request = $http({
                        method: "post",
                        url: urlAddRest,
                        params: {
                            action: "add"
                        },
                        data: {
                            name: name
                            FILL WITH REST DATA
                        }
                    });

                    return( request.then( handleSuccess, handleError ) );

                }*/


                // I get all of the Restaurants in the remote collection.
                function getRestaurants() {

                    var request = $http({
                        method: "get",
                        url: urlGetRests,
                        params: {
                            action: "get"
                        }
                    });

                    return( request.then( handleSuccess, handleError ) );

                }


                /* I remove the Restaurant with the given ID from the remote collection.
                function removeRestaurant( id ) {

                    var request = $http({
                        method: "delete",
                        url: urlRemoveRest,
                        params: {
                            action: "delete"
                        },
                        data: {
                            id: id
                        }
                    });

                    return( request.then( handleSuccess, handleError ) );

                }*/


                // ---
                // PRIVATE METHODS.
                // ---


                // I transform the error response, unwrapping the application dta from
                // the API response payload.
                function handleError( response ) {

                    // The API response from the server should be returned in a
                    // nomralized format. However, if the request was not handled by the
                    // server (or what not handles properly - ex. server error), then we
                    // may have to normalize it on our end, as best we can.
                    if (
                        ! angular.isObject( response.data ) ||
                        ! response.data.message
                        ) {

                        return( $q.reject( "An unknown error occurred." ) );

                    }

                    // Otherwise, use expected error message.
                    return( $q.reject( response.data.message ) );

                }


                // I transform the successful response, unwrapping the application data
                // from the API response payload.
                function handleSuccess( response ) {

                    return( response.data );

                }

            });


})();
