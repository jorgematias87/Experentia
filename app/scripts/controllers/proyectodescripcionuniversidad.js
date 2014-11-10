'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:ProyectodescripcionuniversidadCtrl
 * @description
 * # ProyectodescripcionuniversidadCtrl
 * Controller of the experentiaWebSiteApp
 */
angular.module('experentiaWebSiteApp')
  .controller('ProyectoDescripcionUniversidadCtrl', function ($scope, $routeParams, ProyectoSrv, GrupoSrv) {

  	$scope.idProyecto = $routeParams.id;
  	console.log($scope.idProyecto);

  	//Proyecto por ID
  	var onProyectoSucces = function(response){
  		$scope.proyecto = response;
  	},
  		onProyectoError = function(rejection){
  			console.log(rejection);
  		}

  	ProyectoSrv.get({id: $scope.idProyecto}, onProyectoSucces, onProyectoError);

  	var onGrupoSucces = function(response){
  		$scope.grupo = response;
  	},
  		onGrupoError = function(rejection){
  			console.log(rejection);
  		}

  	GrupoSrv.get({id:1}, onGrupoSucces, onGrupoError);
    
  });
