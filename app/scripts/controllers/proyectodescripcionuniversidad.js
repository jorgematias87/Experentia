'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:ProyectodescripcionuniversidadCtrl
 * @description
 * # ProyectodescripcionuniversidadCtrl
 * Controller of the experentiaWebSiteApp
 */
angular.module('experentiaWebSiteApp')
  .controller('ProyectoDescripcionUniversidadCtrl', function ($scope, GrupoSrv) {

  	var onGrupoSucces = function(response){
  		$scope.grupo = response;
  	},
  		onGrupoError = function(rejection){
  			console.log(rejection);
  		}

  	GrupoSrv.get({id:1}, onGrupoSucces, onGrupoError);
    
  });
