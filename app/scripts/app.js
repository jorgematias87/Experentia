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
        controller: 'ProyectoEmpresaCtrl'
      })
      .when('/proyectos-universidad', {
        templateUrl: 'views/project-list-university.html',
        controller: 'ProyectosUniversidadCtrl'
      })
      .when('/proyecto-descripcion-universidad/:id', {
        templateUrl: 'views/project-description-university.html',
        controller: 'ProyectoDescripcionUniversidadCtrl'
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
