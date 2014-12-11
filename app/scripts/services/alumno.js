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

  var alumno = $resource( baseURL + 'api/Alumnos/:id', {}, {});
  return alumno;
});