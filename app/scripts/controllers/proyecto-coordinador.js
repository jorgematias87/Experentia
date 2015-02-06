'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:proyectoCoordinador
 * @description
 * # proyectoCoordinador
 * Controller of the experentiaWebSiteApp
 */

 angular.module('experentiaWebSiteApp')
  .controller('ProyectoCoordinadorCtrl', function ($scope, $rootScope, $routeParams, ProyectosSrv, TareasSrv, GruposSrv, AlumnosSrv, NotificationsSrv) {

    $scope.idProyecto = $routeParams.id;

    //proyecto by id
    var proyectoCallback= function(response){
      $scope.proyecto = response;

      //grupo by id
      var grupoCallback = function(response){
        $scope.grupo = response;
      }
      GruposSrv.byId($scope.proyecto.idGrupo, grupoCallback);

    };
    ProyectosSrv.byId($scope.idProyecto, proyectoCallback);

    var tareasCallback= function(response){
      $scope.tareas = response;

      if($scope.tareas.length === 0){
        $scope.msg= '<strong>No hay tareas!</strong>, puedes crearlas.'
      };
    };
    TareasSrv.listar($scope.idProyecto, tareasCallback);

    //tarea by id
    $scope.tarea= {};

    var tareaCallback= function(response){
      $scope.tarea = response;
    };

    $scope.getTareaById= function(idTarea){
      TareasSrv.byId(idTarea, tareaCallback);
    };

    //crear tarea
    $scope.initTarea= function(){
      $scope.editTarea= false;
      $scope.tarea= {};
    }

    $scope.checkboxAssignStudent = function(idAlumno){
      $scope.tarea.idAlumno = idAlumno;
    };

    $scope.tryTarea = function(idProyecto){
      $scope.tarea.idProyecto=  idProyecto;
      $scope.tarea.estado= "pendiente";
      TareasSrv.crear($scope.tarea);
    }

    //editar tarea
    $scope.tryEditTarea = function(tarea){
      $scope.editTarea= true;
      $scope.tarea=  tarea;
    }

    $scope.saveEditTarea = function(){
      delete $scope.tarea.alumno;
      TareasSrv.editar($scope.tarea.id, $scope.tarea);
    };

    //eliminar
    $rootScope.tryDeleteTarea = function(idTarea){
      TareasSrv.eliminar(idTarea);
    }

    $scope.deleteConfirmTarea = function(nombreTarea, idTarea){
      NotificationsSrv.confirm('Estas seguro que quieres eliminar la tarea: '+nombreTarea+'?', idTarea);
    }

    //listar alumnos
    var alumnosCallback = function(response){
      $scope.alumnos = response;
    }

    AlumnosSrv.listar(alumnosCallback);

    //alumnos by id
    var alumnoCallback = function(response){
      $scope.alumno= response;
    }

    $scope.getAlumno = function(idAlumno){
      AlumnosSrv.byId(idAlumno, alumnosCallback);
    }

  });