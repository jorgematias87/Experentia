'use strict';

/**
 * @ngdoc service
 * @name experentiaWebSiteApp.Proyecto
 * @description
 * # Alumnos
 * Service in the experentiaWebSiteApp.
 */
angular.module('experentiaWebSiteApp')
.factory('AlumnoSrv', function ($resource, baseURL) {

  var alumno = $resource( baseURL + 'api/Alumno/:id', {}, {});
  return alumno;
})
.factory('AlumnosSrv', function (AlumnoSrv) {
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

	alumnos.byId= function(idAlumno, callback){
	   //Proyecto por ID
	   var onAlumnoSucces = function(response){
	     callback(response);
	   },
	     onAlumnoError = function(rejection){
	       console.log(rejection);
	     }

	    AlumnoSrv.get({id: idAlumno}, onAlumnoSucces, onAlumnoError);
	};

	return alumnos;
	
});