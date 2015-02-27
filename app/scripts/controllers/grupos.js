'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:Grupos
 * @description
 * # Grupos
 * Controller of the experentiaWebSiteApp
 */

 angular.module('experentiaWebSiteApp')
  .controller('GruposCtrl', function ($scope, $rootScope, $cookieStore, NotificationsSrv, GruposSrv) {
    $rootScope.usuario = $cookieStore.get('usuario');

  	$scope.listAlumnos= false;

  	$scope.closeList= function(){
  		$scope.listAlumnos= false;
  	};

  	//Lista de Grupos
    $scope.grupoTecnologias=[];
    var parseTecnologias= function(grupos){
      grupos.forEach(function(grupo){
        var tecnologias= grupo.tecnologia.split(',');
        tecnologias.forEach(function(tecnologia){
          $scope.grupoTecnologias.push(tecnologia);
        });
      });
    };

    var onGruposSuccess = function(response){
      $scope.grupos= response;
      parseTecnologias($scope.grupos);
      if($scope.grupos.length === 0){
        $scope.msg= '<strong>No tienes grupos creados!</strong>.';
      }
    };
    GruposSrv.listar($rootScope.usuario.id, onGruposSuccess);

    //eliminar Grupo
    $rootScope.tryDeleteGrupo = function(idGrupo){
      GruposSrv.eliminar(idGrupo);
    };

    $scope.deleteConfirm = function(nombre, id, elemento){
      NotificationsSrv.confirm('Estas seguro que quieres eliminar: '+nombre+'?', id, elemento);
    };

  })
  .controller('GrupoCrearCtrl', function ($scope, $rootScope, $cookieStore, $filter, MateriasSrv, AlumnosSrv, GruposSrv) {
    $rootScope.usuario = $cookieStore.get('usuario');
    $scope.alumnosAsignados= [];

    //Lista de Materias
    var onMateriasSuccess = function(response){
      $scope.materias= response;
    };
    MateriasSrv.listar($rootScope.usuario.id, onMateriasSuccess);

    //Lista de alumnos
    var onAlumnosSuccess = function(response){
        $scope.alumnos= response;
      };

    $scope.getAlumnosByMaterias = function(){
      $scope.alumnosAsignados= [];
      AlumnosSrv.byMateria($scope.formGrupo.materia, onAlumnosSuccess);
    };

    //crear grupo
    var parseArray= function(object, item){
      var result= '';

      for (var i = object.length - 1; i >= 0; i--) {
        if(i === 0){
          result+= object[i][item];
        }else{
          result+= object[i][item]+',';
        }
      }
      return result;
    };

    $scope.crearGrupo= function(){
      //Lista de Materias
      var onMateriaSuccess = function(response){
        var materia= response;
        $scope.formGrupo.idComision= materia.idComision;
        $scope.formGrupo.fechaCreacion = $filter('date')(new Date(), 'yyyy-MM-dd');
        $scope.formGrupo.tecnologia= parseArray($scope.formGrupo.tecnologia, 'text');
        delete $scope.formGrupo.materia;

        GruposSrv.crear($scope.formGrupo, $scope.alumnosAsignados);
      };
      MateriasSrv.byId($scope.formGrupo.materia, onMateriaSuccess);
    };
  })
.controller('GrupoCtrl', function ($scope, $routeParams, GruposSrv, AlumnosSrv) {
  $scope.idGrupo = $routeParams.id;

  //Grupo by id
  var onGrupoSuccess = function(response){
    $scope.grupo= response;
  };
  GruposSrv.byId($scope.idGrupo, onGrupoSuccess);

  //Lista de alumnos
  var onAlumnosSuccess = function(response){
    $scope.alumnos= response;
  };
  AlumnosSrv.byGrupo($scope.idGrupo, onAlumnosSuccess);
})
.controller('GrupoEditarCtrl', function ($scope, $routeParams, GruposSrv, AlumnosSrv) {
  $scope.idGrupo = $routeParams.id;

  //Grupo by id
  var onGrupoSuccess = function(response){
    $scope.formGrupo= response;
  };
  GruposSrv.byId($scope.idGrupo, onGrupoSuccess);

  //Lista de alumnos asignados
  var onAlumnosSuccess = function(response){
    $scope.alumnosAsignados= response;
  };
  AlumnosSrv.byGrupo($scope.idGrupo, onAlumnosSuccess);

  //Lista de alumnos
    var onAlumnosSuccess = function(response){
        $scope.alumnos= response;
      };

    $scope.getAlumnosByMaterias = function(){
      $scope.alumnosAsignados= [];
      AlumnosSrv.byMateria($scope.formGrupo.materia, onAlumnosSuccess);
    };
});
