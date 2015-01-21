(function() {
  var app = angular.module('dash', ['angular-tour','ivpusic.cookie','ngCookies','angularFileUpload']);
  var host = "";//"http://193.136.19.86";
  var urlAddRest= host + "/restaurants/input/";
  var urlGetMenus= host + "/menus/get";
  var urlGetDishes= host + "/dishes/get";
  var urlGetImgsRestaurant = host + "/images/get";
  var urlAddImagesRestaurant = host + "/images/input";
  
  //Configuration needed to by pass Django's CSRF-Token 
  app.run(['$http', '$cookies', function($http, $cookies) {
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
  }]);

  app.controller('DemoCtrl', function($scope, ipCookie) {
          
          // load from cookie if possible, otherwise set step to 0
          $scope.currentStep = ipCookie('myTour') || 0;

          // callback for when we've finished going through the tour
          $scope.postTourCallback = function() {
            console.log('tour over');
          };

          // optional way of saving tour progress with cookies
          $scope.postStepCallback = function() {
            ipCookie('myTour', $scope.currentStep, { expires: 3000 });
          };    
        });

  app.controller( "ctrlAddRestaurant", function ($scope, $http, $q, $cookieStore ){
    $scope.restaurant = {};
    $scope.restaurant.addRestaurant = function (item, event)
    {
      console.log("submitting ");  
      console.log("" + $scope.restaurant.nameRestaurant + " " + $scope.restaurant.capacityRestaurant);
      var request = $http({
        method: "post",
        url: urlAddRest,
        params: {
          action: ""
        },
        data: {
          nameRestaurant: $scope.restaurant.nameRestaurant,
          descriptionRestaurant: $scope.restaurant.descriptionRestaurant,
          email: $scope.restaurant.email,
          phone: $scope.restaurant.phone,
          chefs: $scope.restaurant.chefs,
          cuisineType: $scope.restaurant.cuisineType,
          capacityRestaurant: $scope.restaurant.capacityRestaurant,
          minimumPrice: $scope.restaurant.minimumPrice,
          maximumPrice: $scope.restaurant.maximumPrice,
          wifi: $scope.restaurant.wifi,
          reserve: $scope.restaurant.reserve,
          facebook: $scope.restaurant.facebook,
          twitter: $scope.restaurant.twitter,
          googleplus: $scope.restaurant.googleplus
        }
      });
      return( request.then( handleSuccess, handleError ) );
    };
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
          ){
            return( $q.reject( "An unknown error occurred." ) );
      }

        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
      }

  // I transform the successful response, unwrapping the application data
  // from the API response payload.
      function handleSuccess( response ) 
      {
        window.alert( response.data );
        var cookieRM = $cookieStore.get("clap_restaurantManager");
        cookieRM['restaurantName'] = $scope.restaurant.nameRestaurant ;
        $cookieStore.put("clap_restaurantManager", cookieRM);
        return( response.data );
      }

    });

  /** Controllers which cannot be added in any directive **/
  app.controller( "ctrlAddMenu", function($scope, $http, $cookieStore,menuService ){
    var cookieRM = $cookieStore.get("clap_restaurantManager");
    var counterDish = 1;
    $scope.moreDishes = {};
    $scope.dishesToAdd = [{'id':'dish0'}];
    $scope.moreDishes.plusDish  = function() {
      var newItemNo = $scope.dishesToAdd.length+1;
      $scope.dishesToAdd.push({'id':'dish'+newItemNo});
    };

    $scope.showAddMinusButton = function(dish) {
      return dish.id === $scope.dishesToAdd[$scope.dishesToAdd.length-1].id;
    };

    $scope.moreDishes.lessDish  = function() {
      if($scope.dishesToAdd.length-1 !== 0)
        $scope.dishesToAdd.pop();
      else
        alert('Não pode remover mais pratos');
    };


    $scope.newMenu = {};
    $scope.getDishes = function(val) {
      return $http.get( urlGetDishes, {
        params: {
          address: val,
          restaurantName: cookieRM['restaurantName'],
          sensor: false
        }
      }).then(function(response){
        return response.data.results.map(function(item){
            return item.formatted_address;
          });
      });
    };
    
    $scope.newMenu.addMenu = function (item, event) {
      console.log("submitting new Menu");  
      requestDishes = [];
      console.log("debugging " + $scope.newMenu.vegetarian + "\n");
      for (var i = 0; i < $scope.dishesToAdd.length; i++) {
        requestDishes.push($scope.dishesToAdd[i].name);
        console.log( $scope.dishesToAdd[i].name + "\n");
      }
      if( $scope.newMenu.cheap === undefined  )
        $scope.newMenu.cheap = false;
      if ($scope.newMenu.vegetarian === undefined )
        $scope.newMenu.vegetarian = false;

      var request = $http({
          method: "post",
          url: urlAddRest,
          params: {
            action: ""
          },
          data: {
              restaurantName: cookieRM['restaurantName'],
              descriptionM: $scope.newMenu.descriptionM,
              price: $scope.newMenu.price,
              dishes: requestDishes,
              vegetarian: $scope.newMenu.vegetarian,
              cheap: $scope.newMenu.cheap
            }
          });
      return( request.then( menuService.handleSuccess, menuService.handleError ) ); 
    }
});

  app.controller("getMenus", function($scope, menuService){
    $scope.menusList = [];
    
    menuService.getMenus().then(function( menus ) {
      $scope.menusList = menus;
    });  
  });
  
  app.controller("ctrlAddImg",function($scope, $upload, $cookieStore,$q){
    var cookieRM = $cookieStore.get("clap_restaurantManager");
    $scope.filesToAdd = {};
    $scope.filesToAdd.uploadPic = function (picFiles){
      console.log("Here");
      for (var i = 0; i < $scope.filesToAdd.picFiles.length; i++) {
        var file = $scope.filesToAdd.picFiles[i];
        var fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = function(e) {
          $upload.http({
                        url: urlAddImagesRestaurant,
                        method: "POST",
                        restaurantName: cookieRM['restaurantName'],
                        fileStructure: file,
                        data: e.target.result
                    }).progress(function(evt) {
                        console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :'+ evt.config.file.name);
                    }).success(function(data) {
                        console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
                    }).error(function(data) {
                        if (
                        ! angular.isObject( data.data ) ||
                        ! data.data.message
                        ) {

                          return( $q.reject( "An unknown error occurred." ) );

                        }
                        // Otherwise, use expected error message.
                        return( $q.reject( data.data.message ) );
                      });
        }
      }
    }
  });

  app.controller("getImages",function($scope, getImagesService){
    $scope.restaurantImageList = [];
    getImagesService.getRestaurantImages().then(function( restImgs ) {
                        $scope.restaurantImageList = restImgs;
          });
  });


  /**Services**/
app.service(
            "menuService",
            function( $http, $q, $cookieStore ) 
            {

                // Return public API.
                return({
                    getMenus: getMenus,
                });


                // ---
                // PUBLIC METHODS.
                // ---

                // I get all of the Restaurants in the remote collection.
                function getMenus() {
                    var cookieRM = $cookieStore.get("clap_restaurantManager");
                    var request = $http({
                        method: "get",
                        url: urlGetMenus,
                        params: {
                            action: "get",
                            nameRestaurant: cookieRM['restaurantName']
                        }
                    });

                    return( request.then( handleSuccess, handleError ) );

                }
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

  app.service(
            "getImageService",
            function( $http, $q, $cookieStore ) 
            {

                // Return public API.
                return({
                    getRestaurantImages: getRestaurantImages,
                });


                // ---
                // PUBLIC METHODS.
                // ---

                // I get all of the Restaurants in the remote collection.
                function getRestaurantImages(){
                    var cookieRM = $cookieStore.get("clap_restaurantManager");
                    var request = $http({
                        method: "get",
                        url: urlGetImgsRestaurant,
                        params: {
                            action: "get",
                            nameRestaurant: cookieRM['restaurantName']
                        }
                    });

                    return( request.then( handleSuccess, handleError ) );

                }
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

  /*
  app.directive("dashHeader", function() {
    return {
      restrict: 'E',
      replace:true,
      templateUrl: "dash-header.html"
    }; 
  });

  app.directive("asideMenu", function() {
    return {
      restrict: 'E',
      replace:true,
      templateUrl: "aside-menu.html",
      controller:function($scope, $location){

        $scope.isSelected = function(route) {
          alert(route);
          return route == $location.path();
        };

      },
      controllerAs:'panel'
    }; 
  });
  
  app.directive("dashboardContent", function() {
    return {
      restrict: 'E',
      replace:true,
      templateUrl: "dashboard-content.html"
    }; 
  });

  app.directive("dashFooter", function() {
    return {
      restrict: 'E',
      replace:true,
      templateUrl: "dash-footer.html"
    }; 
  }); 

  app.directive("detailsContent", function() {
    return {
      restrict: 'E',
      replace:true,
      templateUrl: "details-content.html"
    }; 
  }); 

  app.directive("ementasContent", function() {
    return {
      restrict: 'E',
      replace:true,
      templateUrl: "ementas-content.html"
    }; 
  }); 

  app.directive("galleryContent", function() {
    return {
      restrict: 'E',
      replace:true,
      templateUrl: "gallery-content.html"
    }; 
  }); 

  app.directive("statsContent", function() {
    return {
      restrict: 'E',
      replace:true,
      templateUrl: "stats-content.html"
    }; 
  });  */ 
})();
