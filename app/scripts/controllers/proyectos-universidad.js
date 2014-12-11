'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:ProyectosUniversidadCtrl
 * @description
 * # ProyectosUniversidadCtrl
 * Controller of the experentiaWebSiteApp
 */
angular.module('experentiaWebSiteApp')
  .controller('ProyectosUniversidadCtrl', function ($scope, ProyectoSrv, $location, $rootScope, $cookieStore) {

    $rootScope.usuario = $cookieStore.get('usuario');

    console.log($rootScope.usuario);

    if($rootScope.usuario === ''){
      $location.path('/');
    }

  	$scope.proyecto = {};

  	//Lista de Proyectos
  	var onProyectosSucces = function(response){
  		$scope.proyectos = response;
  	},
  		onProyectosError = function(rejection){
  			console.log(rejection);
  		}

  	ProyectoSrv.query(onProyectosSucces, onProyectosError);

  	//Crear Proyecto

  	var onCrearProyectoSucces = function(response){
  		alert('Proyecto Creado Correctament');
  		$location.path('/proyectos-empresa');
  	},
  		onCrearProyectoError = function(rejection){
  			alert('Error: intenta mas tarde');
  		}

  	$scope.crearProyecto = function(){
  		$scope.proyecto.idEmpresa = 1;

  		ProyectoSrv.save($scope.proyecto, onCrearProyectoSucces, onCrearProyectoError);
  	}
    
  });
