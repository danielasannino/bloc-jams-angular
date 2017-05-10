(function() {
     function config($stateProvider, $locationProvider) {
         $locationProvider
         .html5Mode({
             enabled: true,
             requireBase: false
         });
         
         $stateProvider
             .state('landing', {
                 url: '/',
                 controller: 'LandingCtrl as landing',
                 templateUrl: '/templates/landing.html'
             });
     }
 
     angular
         .module('blocJams', ['ui.router'])
         .config(config);
 })();