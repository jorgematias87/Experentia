'use strict';

/**
 * @ngdoc overview
 * @name experentiaWebSiteApp
 * @description
 * # experentiaWebSiteApp
 *
 * Main module of the application.
 */
angular
  .module('experentiaWebSiteApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.jq',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/landing.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'MainCtrl'
      })
      .when('/proyectos-empresa', {
        templateUrl: 'views/project-list-company.html',
        controller: 'MainCtrl'
      })
      .when('/proyectos-universidad', {
        templateUrl: 'views/project-list-university.html',
        controller: 'MainCtrl'
      })
      .when('/proyecto-descripcion-universidad', {
        templateUrl: 'views/project-description-university.html',
        controller: 'MainCtrl'
      })
      .when('/proyecto-descripcion-empresa', {
        templateUrl: 'views/project-description-university.html',
        controller: 'MainCtrl'
      })
      .when('/alumnos', {
        templateUrl: 'views/students.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
