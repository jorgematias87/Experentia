'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:AlumnoCtrl
 * @description
 * # AlumnoCtrl
 * Controller of the experentiaWebSiteApp
 */
 angular.module('experentiaWebSiteApp')
 .controller('ListarAlumnosCtrl', function ($scope, AlumnoSrv) {

    //lista de alumnos
    var onAlumnosSuccess = function(response){
      $scope.alumnos = response;
    },
      onAlumnosError = function(rejection){
        console.log(rejection);
      }

    AlumnoSrv.query(onAlumnosSuccess, onAlumnosError);

  });