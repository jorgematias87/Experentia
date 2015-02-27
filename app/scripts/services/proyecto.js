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

  var proyecto = $resource( baseURL + 'api/Proyecto/:action/:id', {}, {});
  return proyecto;
})
.factory('ProyectosSrv', function (ProyectoSrv, $location, NotificationsSrv) {
	var proyectos= {};

	//Lista de Proyectos
	proyectos.listar = function(callback){
		var onProyectosSuccess = function(response){
		   callback(response);
		},
		  onProyectosError = function(rejection){
		    NotificationsSrv.error(rejection.data, 5000);
		  }

		ProyectoSrv.query(onProyectosSuccess, onProyectosError);
	};

	//Proyecto por ID
	proyectos.byId= function(id, proyectoCallback){

		var onProyectoSucces = function(response){
		  proyectoCallback(response);
		},
		  onProyectoError = function(rejection){
		    NotificationsSrv.error(rejection.data, 5000);
		  }

		ProyectoSrv.get({id: id, action: 'GetProyecto'}, onProyectoSucces, onProyectoError);
	};

	//Proyectos por ID
	proyectos.listarById= function(id, proyectoCallback){

		var onProyectoSucces = function(response){
		  proyectoCallback(response);
		},
		  onProyectoError = function(rejection){
		    NotificationsSrv.error(rejection.data, 5000);
		  }

		ProyectoSrv.query({id: id, action: 'GetProyectosById'}, onProyectoSucces, onProyectoError);
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
