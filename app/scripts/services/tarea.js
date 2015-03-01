'use strict';

/**
 * @ngdoc service
 * @name experentiaWebSiteApp.Proyecto
 * @description
 * # Servicio
 * Service in the experentiaWebSiteApp.
 */
angular.module('experentiaWebSiteApp')
.factory('TareaSrv', function ($resource, baseURL) {

  var tarea = $resource( baseURL + 'api/Tarea/:action/:id', null, {
  	'update': { method:'PUT' }
  });
  return tarea;
})
.factory('TareasSrv', function (TareaSrv, $route, NotificationsSrv) {
	var tareas= {};

	//Lista de Tareas
	tareas.listar= function(idProyecto, tareasCallback){
		var onTareasSucces = function(response){
		 tareasCallback(response);
		},
		onTareasError = function(rejection){
		 NotificationsSrv.error(rejection.data.Message, 5000);
		}

		TareaSrv.query({id: idProyecto, action: 'GetTareasProyecto'}, onTareasSucces, onTareasError);
	};

	//Lista de Tareas
	tareas.listarByIdCoordinador= function(idProyecto, tareasCallback){
		var onTareasSucces = function(response){
		 tareasCallback(response);
		},
		onTareasError = function(rejection){
		 NotificationsSrv.error(rejection.data.Message, 5000);
		}

		TareaSrv.query({id: idProyecto, action: 'GetTareasCoordinador'}, onTareasSucces, onTareasError);
	};

	//Tareas by alumno
	tareas.byAlumno= function(idAlumno, tareasCallback){
		var onTareasSucces = function(response){
		 tareasCallback(response);
		},
		onTareasError = function(rejection){
		 NotificationsSrv.error(rejection.data.Message, 5000);
		}

		TareaSrv.query({id: idAlumno, action: 'GetTareasAlumno'}, onTareasSucces, onTareasError);
	};

	//Tarea por ID
	tareas.byId= function(idTarea, tareasCallback){
		 var onTareaSucces = function(response){
		   tareasCallback(response);
		 },
		   onTareaError = function(rejection){
		     console.log(rejection);
		   }

		TareaSrv.get({id: idTarea, action: 'GetTarea'}, onTareaSucces, onTareaError);
	};

	//Crear Tarea
	tareas.crear= function(tarea){
		var onSaveTareaSuccess = function(response){
		  NotificationsSrv.success('Tarea creada exitosamente.', 5000);
		  $route.reload();
		  $('body').removeClass('modal-open');
		  $('.modal-backdrop').remove();
		},
		onSaveTareaError = function(rejection){
		  console.log(rejection);
		}

		TareaSrv.save(tarea, onSaveTareaSuccess, onSaveTareaError);
	};

	//Editar Tarea
	tareas.editar= function(idTarea, tarea){
		var onEditTareaSuccess = function(response){
		  NotificationsSrv.success('Tarea editada exitosamente.', 5000);
		  $route.reload();
		  $('body').removeClass('modal-open');
		  $('.modal-backdrop').remove();
		},
		onEditTareaError = function(rejection){
		  NotificationsSrv.error(rejection.data.Message, 5000);
		}

		TareaSrv.update({id: idTarea},tarea, onEditTareaSuccess, onEditTareaError);
	};

	//Eliminar Tarea
	tareas.eliminar= function(idTarea){
		var onDeleteTareaSuccess = function(response){
		  NotificationsSrv.success('Tarea eliminada exitosamente.', 5000);
		  $route.reload();
		},
		onDeleteTareaError = function(rejection){
		  NotificationsSrv.error(rejection.data.Message, 5000);
		}

		TareaSrv.delete({id: idTarea}, onDeleteTareaSuccess, onDeleteTareaError);
	};

  return tareas;
});