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
    'ui.bootstrap',
    'duScroll'
  ])
  .value('duScrollOffset', 49)
  .constant( 'baseURL', 'http://localhost:1409/' )
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/landing.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/proyectos-empresa', {
        templateUrl: 'views/project-list-company.html',
        controller: 'MainCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/proyectos-universidad', {
        templateUrl: 'views/project-list-university.html',
        controller: 'MainCtrl'
      })
      .when('/proyecto-descripcion-universidad/:id', {
        templateUrl: 'views/project-description.html',
        controller: 'ProyectoCoordinadorCtrl'
      })
      .when('/proyecto-descripcion-empresa/:id', {
        templateUrl: 'views/project-description.html',
        controller: 'MainCtrl'
      })
      .when('/alumnos', {
        templateUrl: 'views/students.html',
        controller: 'MainCtrl'
      })
      .when('/tareas-alumno', {
        templateUrl: 'views/tareas-alumno.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
