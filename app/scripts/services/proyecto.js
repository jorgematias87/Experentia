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

  var proyecto = $resource( baseURL + 'api/Proyecto/:action/:id', {}, {
  	'update': { method:'PUT' }
  });
  return proyecto;
})
.factory('ProyectosSrv', function (ProyectoSrv, $location, $route, NotificationsSrv) {
	var proyectos= {};

	//Lista de Proyectos
	proyectos.listar = function(callback){
		var onProyectosSuccess = function(response){
		   callback(response);
		},
		  onProyectosError = function(rejection){
		    NotificationsSrv.error(rejection.Message, 5000);
		  };

		ProyectoSrv.query(onProyectosSuccess, onProyectosError);
	};

	//Proyecto por ID
	proyectos.byId= function(id, proyectoCallback){

		var onProyectoSucces = function(response){
		  proyectoCallback(response);
		},
		  onProyectoError = function(rejection){
		    NotificationsSrv.error(rejection.Message, 5000);
		  };

		ProyectoSrv.get({id: id, action: 'GetProyecto'}, onProyectoSucces, onProyectoError);
	};

	//Proyectos por ID
	proyectos.listarById= function(id, proyectoCallback){

		var onProyectoSucces = function(response){
		  proyectoCallback(response);
		},
		  onProyectoError = function(rejection){
		    NotificationsSrv.error(rejection.Message, 5000);
		  };

		ProyectoSrv.query({id: id, action: 'GetProyectosById'}, onProyectoSucces, onProyectoError);
	};

	//Proyectos by Empresa
	proyectos.byEmpresa= function(idEmpresa, proyectoCallback){

		var onProyectosSucces = function(response){
		  proyectoCallback(response);
		},
		  onProyectosError = function(rejection){
		    NotificationsSrv.error(rejection.Message, 5000);
		  };

		ProyectoSrv.query({id: idEmpresa, action: 'GetProyectosByEmpresa'}, onProyectosSucces, onProyectosError);
	};

	//Proyectos by Empresa
	proyectos.byAlumno= function(idAlumno, proyectoCallback){

		var onProyectosSucces = function(response){
		  proyectoCallback(response);
		},
		  onProyectosError = function(rejection){
		    NotificationsSrv.error(rejection.Message, 5000);
		  };

		ProyectoSrv.query({id: idAlumno, action: 'GetProyectosByAlumno'}, onProyectosSucces, onProyectosError);
	};

	proyectos.crear = function(proyecto){
		//Crear Proyecto
		var onCrearProyectoSucces = function(response){
			NotificationsSrv.success('Proyecto Creado exitosamente.', 5000);
			$route.reload();
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
		},
		  onCrearProyectoError = function(rejection){
		  	NotificationsSrv.error('intenta más tarde.', 5000);
		  };

		  ProyectoSrv.save(proyecto, onCrearProyectoSucces, onCrearProyectoError);
	};

	//Editar Proyecto
	proyectos.editar = function(idProyecto, proyecto){
		var onEditarProyectoSucces = function(response){
			NotificationsSrv.success('Proyecto Editado exitosamente.', 5000);
		  	$route.reload();
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
		},
		  onEditarProyectoError = function(rejection){
		  	NotificationsSrv.error('intenta más tarde.', 5000);
		  };

		  ProyectoSrv.update({id: idProyecto}, proyecto, onEditarProyectoSucces, onEditarProyectoError);
	};

	//Eliminar Proyecto
	proyectos.eliminar = function(idProyecto){
		var onEliminarProyectoSucces = function(response){
			NotificationsSrv.success('Proyecto Eliminado exitosamente.', 5000);
		  	$route.reload();
		},
		  onEliminarProyectoError = function(rejection){
		  	NotificationsSrv.error('intenta más tarde.', 5000);
		  };

		  ProyectoSrv.delete({id: idProyecto}, onEliminarProyectoSucces, onEliminarProyectoError);
	};

	return	proyectos;
  
});
