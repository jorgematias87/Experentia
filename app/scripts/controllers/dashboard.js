'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:Dashboard
 * @description
 * # Dashboard
 * Controller of the experentiaWebSiteApp
 */

 angular.module('experentiaWebSiteApp')
  .controller('DashboardCtrl', function ($scope, ProyectosSrv, AlumnosSrv) {

    var onProyectosSuccess = function(response){
      $scope.proyectos= response;
    };

    //Lista de Proyectos
    ProyectosSrv.listar(onProyectosSuccess);

    var onAlumnosSuccess = function(response){
      $scope.alumnos = response;
    };

    //Lista de Alumnos
    AlumnosSrv.listar(onAlumnosSuccess);


    
  });