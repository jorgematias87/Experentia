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
    'duScroll',
    'ui.sortable',
    'ui.select2'
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
      .when('/coordinador/proyectos', {
        templateUrl: 'views/proyectos.html',
        controller: 'ProyectosCoordinadorCtrl'
      })
      .when('/coordinador/proyecto/:id', {
        templateUrl: 'views/proyecto.html',
        controller: 'ProyectoCoordinadorCtrl'
      })
      .when('/coordinador/oferta-proyectos', {
        templateUrl: 'views/proyectos.html',
        controller: 'OfertaProyectosCtrl'
      })
      .when('/proyecto/:id', {
        templateUrl: 'views/proyecto.html',
        controller: 'MainCtrl'
      })
      .when('/grupos', {
        templateUrl: 'views/grupos.html',
        controller: 'GruposCtrl'
      })
      .when('/grupo/:id', {
        templateUrl: 'views/grupo.html',
        controller: 'GrupoCtrl'
      })
      .when('/crear-grupo', {
        templateUrl: 'views/grupo-datos.html',
        controller: 'GrupoCrearCtrl'
      })
      .when('/editar-grupo/:id', {
        templateUrl: 'views/grupo-datos.html',
        controller: 'GrupoEditarCtrl'
      })
      .when('/materias', {
        templateUrl: 'views/materias.html',
        controller: 'MateriasCtrl'
      })
      .when('/materia/:id', {
        templateUrl: 'views/materia.html',
        controller: 'MateriaCtrl'
      })
      .when('/alumnos', {
        templateUrl: 'views/alumnos.html',
        controller: 'AlumnosCtrl'
      })
      .when('/alumno/tareas', {
        templateUrl: 'views/tareas.html',
        controller: 'TareasAlumnoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
