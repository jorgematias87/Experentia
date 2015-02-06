'use strict';

/**
 * @ngdoc service
 * @name experentiaWebSiteApp.Proyecto
 * @description
 * # Proyecto
 * Service in the experentiaWebSiteApp.
 */
angular.module('experentiaWebSiteApp')
.factory('ProyectoSrv', function ($resource, baseURL) {

  var proyecto = $resource( baseURL + 'api/Proyecto/:id', {}, {});
  return proyecto;
})
.factory('ProyectosSrv', function (ProyectoSrv, $location) {
	var proyectos= {};

	//Lista de Proyectos
	proyectos.listar = function(callback){
		var onProyectosSuccess = function(response){
		   callback(response);
		},
		  onProyectosError = function(rejection){
		    console.log(rejection);
		  }

		ProyectoSrv.query(onProyectosSuccess, onProyectosError);
	};

	//Proyecto por ID
	proyectos.byId= function(id, proyectoCallback){

		var onProyectoSucces = function(response){
		  proyectoCallback(response);
		},
		  onProyectoError = function(rejection){
		    console.log(rejection);
		  }

		ProyectoSrv.get({id: id}, onProyectoSucces, onProyectoError);
	}

	proyectos.crear = function(){
		//Crear Proyecto
		var onCrearProyectoSucces = function(response){
		  alert('Proyecto Creado Correctament');
		  $location.path('/proyectos-empresa');
		},
		  onCrearProyectoError = function(rejection){
		    alert('Error: intenta mas tarde');
		  }

		  ProyectoSrv.save($scope.proyecto, onCrearProyectoSucces, onCrearProyectoError);
	};

	return	proyectos;
  
});
