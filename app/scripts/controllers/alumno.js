'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:AlumnoCtrl
 * @description
 * # AlumnoCtrl
 * Controller of the experentiaWebSiteApp
 */
angular.module('experentiaWebSiteApp')
  .controller('AlumnosCtrl', function ($scope, $cookieStore, $rootScope, AlumnosSrv) {

    $rootScope.usuario = $cookieStore.get('usuario');

    var onAlumnosSuccess= function(alumnos){
    	$scope.alumnos= alumnos;
    };
    AlumnosSrv.byCoordinador($rootScope.usuario.id, onAlumnosSuccess);
    
  });
