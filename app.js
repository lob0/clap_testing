/* @flow */

(function() {
  var app = angular.module('clap', []);

  app.directive("restaurantFilter", function() {
    return {
      restrict: 'E',
      templateUrl: "restaurant-filter.html"
    }; 
  });

  app.directive("restaurantsPortfolio", function() {
    return {
      restrict: 'E',
      templateUrl: "restaurants-portfolio.html"
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

})();
