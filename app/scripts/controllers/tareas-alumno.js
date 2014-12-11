'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:TareasAlumnoCtrl
 * @description
 * # TareasAlumnoCtrl
 * Controller of the experentiaWebSiteApp
 */
angular.module('experentiaWebSiteApp')
  .controller('TareasAlumnosCtrl', function ($scope, $location, TareaSrv, $rootScope, $cookieStore) {

    $rootScope.usuario = $cookieStore.get('usuario');

  	$scope.tareas = {};

  	//Lista de Proyectos
  	var onTareasSucces = function(response){
  		$scope.tareas = response;
  	},
  		onTareasError = function(rejection){
  			console.log(rejection);
  		}

  	TareaSrv.query(onTareasSucces, onTareasError);
    
    $scope.trySendEmail = function(){
      $scope.msg = 'Email enviado';
      console.log($scope.msg);
    }

  });
