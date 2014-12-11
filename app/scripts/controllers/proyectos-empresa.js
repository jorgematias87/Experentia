'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:ProyectosEmpresaCtrl
 * @description
 * # ProyectosEmpresaCtrl
 * Controller of the experentiaWebSiteApp
 */
angular.module('experentiaWebSiteApp')
  .controller('ProyectoEmpresaCtrl', function ($scope, ProyectoSrv, $location, $rootScope, $cookieStore) {

    $rootScope.usuario = $cookieStore.get('usuario');

  	$scope.tecnologias = ['.NET', 'Javascript', 'HTML', 'CSS', 'Java', 'PHP', 'AngularJS', 'NodeJS'];
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
  		$scope.msg = 'Proyecto creado exitosamente';
  		$location.path('/proyectos-empresa');
  	},
  		onCrearProyectoError = function(rejection){
  			alert('Error: intenta mas tarde');
  		}

  	$scope.crearProyecto = function(){
  		$scope.proyecto.idEmpresa = 1;

      console.log($scope.proyecto);

  		ProyectoSrv.save($scope.proyecto, onCrearProyectoSucces, onCrearProyectoError);
  	}
    
  });
