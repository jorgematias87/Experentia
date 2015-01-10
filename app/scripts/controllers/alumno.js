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

  })
 .controller('AlumnoIdCtrl', function ($scope, AlumnoSrv) {
    
    //Proyecto por ID
    var onAlumnoSucces = function(response){
      return response;
    },
      onAlumnoError = function(rejection){
        console.log(rejection);
      }

 	$scope.getAlumno = function(idAlumno){
 		console.log(idAlumno);
 		AlumnoSrv.get({id: idAlumno}, onAlumnoSucces, onAlumnoError);
 	}
  });