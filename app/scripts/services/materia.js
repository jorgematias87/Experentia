'use strict';

/**
 * @ngdoc service
 * @name experentiaWebSiteApp.Materia
 * @description
 * # Materia
 * Service in the experentiaWebSiteApp.
 */
angular.module('experentiaWebSiteApp')
.factory('MateriaSrv', function ($resource, baseURL) {

  var materia = $resource( baseURL + 'api/Materia/:action/:id');
  return materia;
})
.factory('MateriasSrv', function (MateriaSrv, NotificationsSrv) {
  var materias= {};

  //Lista de materias
  materias.listar= function(idComision, materiasCallback){
    var onMateriasSucces = function(response){
     materiasCallback(response);
    },
    onMateriasError = function(rejection){
     NotificationsSrv.error(rejection.data, 5000);
    }

    MateriaSrv.query({id: idComision, action: 'GetMaterias'}, onMateriasSucces, onMateriasError);
  };

  //Materia por ID
  materias.byId= function(idMateria, materiasCallback){
     var onMateriaSuccess = function(response){
       materiasCallback(response);
     },
       onMateriaError = function(rejection){
         console.log(rejection);
       }

    MateriaSrv.get({id: idMateria, action: 'GetMateria'}, onMateriaSuccess, onMateriaError);
  };
  return materias;
});
