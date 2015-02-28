'use strict';

/**
 * @ngdoc service
 * @name experentiaWebSiteApp.Grupo
 * @description
 * # Grupo
 * Service in the experentiaWebSiteApp.
 */
angular.module('experentiaWebSiteApp')
.factory('GrupoSrv', function ($resource, baseURL) {

  var grupo = $resource( baseURL + 'api/Grupo/:action/:id', {
      id: '@id',
  }, {
    update: {
      method: 'PUT',
      isArray: false,
      params: { id: '@id'}
    }
  });
  return grupo;
})
.factory('GruposSrv', function ($location, $route, GrupoSrv, NotificationsSrv) {
  var grupos= {};

  //Lista de grupos
  grupos.listar= function(idComision, gruposCallback){
    var onGruposSuccess = function(response){
     gruposCallback(response);
    },
    onGruposError = function(rejection){
     NotificationsSrv.error(rejection.data, 5000);
    }

    GrupoSrv.query({id: idComision, action: 'GetGrupos'}, onGruposSuccess, onGruposError);
  };

  //grupos by materia
  grupos.byMateria= function(idMateria, gruposCallback){
    var onGruposSuccess = function(response){
     gruposCallback(response);
    },
    onGruposError = function(rejection){
     NotificationsSrv.error(rejection.data, 5000);
    }

    GrupoSrv.query({id: idMateria, action: 'GetGruposByMateria'}, onGruposSuccess, onGruposError);
  };

  //Grupo by Id
  grupos.byId= function(idGrupo, grupoCallback){
      var onGrupoSucces = function(response){
        grupoCallback(response);
      },
        onGrupoError = function(rejection){
          NotificationsSrv.error(rejection.data, 5000);
        }

      GrupoSrv.get({id: idGrupo, action: 'GetGrupo'}, onGrupoSucces, onGrupoError);
  };

  //Crear grupo
  grupos.crear= function(grupo, alumnos){
    var onSaveGrupoSuccess = function(response){
      NotificationsSrv.success('grupo creado exitosamente.', 5000);
      $location.path('/grupos');
    },
    onSaveGrupoError = function(rejection){
      NotificationsSrv.error(rejection.data, 5000);
    }

    GrupoSrv.save({grupo: grupo, alumnos: alumnos}, onSaveGrupoSuccess, onSaveGrupoError);
  };

  //Eliminar grupo
  grupos.eliminar= function(idGrupo){
    var onSaveGrupoSuccess = function(response){
      NotificationsSrv.success('grupo eliminado exitosamente.', 5000);
      $route.reload();
      $location.path('/grupos');
    },
    onSaveGrupoError = function(rejection){
      NotificationsSrv.error(rejection.data, 5000);
    }

    GrupoSrv.delete({id: idGrupo}, onSaveGrupoSuccess, onSaveGrupoError);
  };

  return grupos;
});
