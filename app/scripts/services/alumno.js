'use strict';

/**
 * @ngdoc service
 * @name experentiaWebSiteApp.Alumno
 * @description
 * # Alumnos
 * Service in the experentiaWebSiteApp.
 */
angular.module('experentiaWebSiteApp')
.factory('AlumnoSrv', function ($resource, baseURL) {

  var alumno = $resource( baseURL + 'api/Alumno/:action/:id', {}, {});
  return alumno;
})
.factory('AlumnosSrv', function (AlumnoSrv, NotificationsSrv) {
	var alumnos= {};

	//lista de alumnos
	alumnos.listar= function(callback){
		var onAlumnosSuccess = function(response){
		  callback(response);
		},
		  onAlumnosError = function(rejection){
		    console.log(rejection);
		  }

		AlumnoSrv.query(onAlumnosSuccess, onAlumnosError);
	};

	//alumno by Id
	alumnos.byId= function(idAlumno, alumnoCallback){
	    var onAlumnoSucces = function(response){
	      alumnoCallback(response);
	    },
	      onAlumnoError = function(rejection){
	        NotificationsSrv.error(rejection.data, 5000);
	      }

	    alumnoSrv.get({id: idAlumno, action: 'GetAlumno'}, onAlumnoSucces, onAlumnoError);
	};

	//alumnos by Materia
	alumnos.byMateria= function(idMateria, alumnoCallback){
	    var onAlumnosSucces = function(response){
	      alumnoCallback(response);
	    },
	      onAlumnosError = function(rejection){
	        NotificationsSrv.error(rejection.data, 5000);
	      }

	    AlumnoSrv.query({id: idMateria, action: 'GetAlumnosByMateria'}, onAlumnosSucces, onAlumnosError);
	}  

	//alumnos by Grupo
	alumnos.byGrupo= function(idGrupo, alumnoCallback){
	    var onAlumnosSucces = function(response){
	      alumnoCallback(response);
	    },
	      onAlumnosError = function(rejection){
	        NotificationsSrv.error(rejection.data, 5000);
	      }

	    AlumnoSrv.query({id: idGrupo, action: 'GetAlumnosByGrupo'}, onAlumnosSucces, onAlumnosError);
	}  

	return alumnos;
	
});