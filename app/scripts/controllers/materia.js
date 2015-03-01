'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:MateriaCtrl
 * @description
 * # MateriaCtrl
 * Controller of the experentiaWebSiteApp
 */
angular.module('experentiaWebSiteApp')
  .controller('MateriasCtrl', function ($scope, $cookieStore, $rootScope, MateriasSrv, GruposSrv, AlumnosSrv) {

    $rootScope.usuario = $cookieStore.get('usuario');
    
    //Lista de Materias
    var onMateriasSuccess = function(materias){
      $scope.materias= [];

      materias.forEach(function(materia){
        var auxMateria = {};
        auxMateria= materia;

        //Grupo por materia
        var onGruposSuccess= function(grupos){
          auxMateria.grupos= grupos;

          //Lista de alumnos
          var onAlumnosSuccess = function(alumnos){
            auxMateria.alumnos= alumnos;

            $scope.materias.push(auxMateria);
          };
          AlumnosSrv.byMateria(materia.id, onAlumnosSuccess);

        };
        GruposSrv.byMateria(materia.idComision, onGruposSuccess);
      });
    };
    MateriasSrv.listar($rootScope.usuario.id, onMateriasSuccess);

  })
  .controller('MateriaCtrl', function ($scope, $rootScope, $routeParams, MateriasSrv, GruposSrv, AlumnosSrv) {

    $scope.idMateria = $rootScope.itemId = $routeParams.id;
    
    //Lista de Materias
    var onMateriaSuccess = function(materia){
      $scope.materia= materia;

      GruposSrv.byMateria($scope.materia.idComision, onGruposSuccess);
      AlumnosSrv.byMateria($scope.materia.id, onAlumnosSuccess);
    };
    MateriasSrv.byId($scope.idMateria, onMateriaSuccess);

    //Lista de alumnos
    var onAlumnosSuccess = function(alumnos){
      $scope.alumnos= alumnos;
    };

    //Grupo por materia
    var onGruposSuccess= function(grupos){
      $scope.grupos= grupos;
      if($scope.grupos.length === 0){
        $scope.msgGrupos= '<strong>No tienes grupos creados!</strong>.'
      }
    };

  });
  ;
