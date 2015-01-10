'use strict';

/**
 * @ngdoc directive
 * @name experentiaWebSiteApp.directive:getAlumno
 * @description
 * # getAlumno
 */
 angular.module('experentiaWebSiteApp')
 .directive('getAlumno', function(AlumnoSrv) {
 	return {
 		restrict: 'A',
 		link: function (scope, element, attr) {
 			console.log(attr.idalumno);
           //Proyecto por ID
           var onAlumnoSucces = function(response){
             scope.alumno= response;
           },
             onAlumnoError = function(rejection){
               console.log(rejection);
             }

        	AlumnoSrv.get({id: attr.idalumno}, onAlumnoSucces, onAlumnoError);
        }
 		};
 	});
