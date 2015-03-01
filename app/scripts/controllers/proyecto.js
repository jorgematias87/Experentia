'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:proyectoCoordinador
 * @description
 * # proyectoCoordinador
 * Controller of the experentiaWebSiteApp
 */

 angular.module('experentiaWebSiteApp')
 .controller('ProyectosCoordinadorCtrl', function ($scope, $rootScope, $cookieStore, $filter, ProyectosSrv, GruposSrv) {
   $rootScope.usuario = $cookieStore.get('usuario');

   //Lista de Proyectos
  var onProyectosByIdSuccess = function(proyectos){
    $scope.proyectos= [];

    if(proyectos.length === 0){
      $scope.msg= '<strong>No tienes proyectos asignados!</strong>.'
    }else{
      proyectos.forEach(function(proyecto){
        var auxProyecto = {};
        auxProyecto = proyecto;

        //Grupo by id
        var onGrupoSuccess = function(grupo){
          auxProyecto.grupo= grupo;
          $scope.proyectos.push(auxProyecto);
        };

        if(proyecto.idGrupo != null){
          GruposSrv.byId(proyecto.idGrupo, onGrupoSuccess);
        }else{
          $scope.proyectos.push(auxProyecto);
        }

      });
    }

  };
  ProyectosSrv.listarById($rootScope.usuario.id, onProyectosByIdSuccess);

 })
 .controller('OfertaProyectosCtrl', function ($scope, $rootScope, $cookieStore, ProyectosSrv) {
   $rootScope.usuario = $cookieStore.get('usuario');

   var onProyectosSuccess = function(response){
      $scope.proyectos= response;
    };
    //Lista de Proyectos
    ProyectosSrv.listar(onProyectosSuccess);

 })
  .controller('ProyectoCoordinadorCtrl', function ($scope, $rootScope, $location, $routeParams, $cookieStore, $filter, ProyectosSrv, TareasSrv, GruposSrv, AlumnosSrv, MateriasSrv, NotificationsSrv) {
    $rootScope.usuario = $cookieStore.get('usuario');
    $scope.idProyecto = $rootScope.itemId = $routeParams.id;

    //proyecto by id
    var proyectoCallback= function(response){
      $scope.proyecto = response;

      if($scope.proyecto.idGrupo != null){
        GruposSrv.byId($scope.proyecto.idGrupo, grupoCallback);
      }
    };
    ProyectosSrv.byId($scope.idProyecto, proyectoCallback);

    //grupo by id
    var grupoCallback = function(response){
      $scope.grupo = response;

      AlumnosSrv.byGrupo($scope.proyecto.idGrupo, alumnosCallback);
    };

    //listar alumnos
    var alumnosCallback = function(response){
      $scope.alumnos = response;
      $scope.msgAlumnos= '';

      if($scope.alumnos.length ===0){
        $scope.msgAlumnos= 'No hay alumnos disponibles en ' + '<strong>'+$scope.grupo.nombre+'</strong>';
      }
    };

    var tareasCallback= function(response){
      $scope.tareas = response;
      $scope.msg= '';

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
    };

    $scope.checkboxAssignStudent = function(idAlumno){
      $scope.tarea.idAlumno = idAlumno;
    };

    $scope.tryTarea = function(idProyecto){
      $scope.tarea.idProyecto=  idProyecto;
      $scope.tarea.estado= 'pendiente';
      $scope.tarea.fechaCreacion = $filter('date')(new Date(), 'yyyy-MM-dd');
      console.log($scope.tarea);
      TareasSrv.crear($scope.tarea);
    };

    //editar tarea
    $scope.tryEditTarea = function(tarea){
      $scope.editTarea= true;
      $scope.tarea=  tarea;
    };

    $scope.saveEditTarea = function(){
      delete $scope.tarea.alumno;
      TareasSrv.editar($scope.tarea.id, $scope.tarea);
    };

    $scope.setTarea= function(tarea){
      $scope.tarea=  tarea;
    }

    //eliminar
    $rootScope.tryDeleteTarea = function(idTarea){
      TareasSrv.eliminar(idTarea);
    };

    $scope.deleteConfirm = function(nombre, id, elemento){
      NotificationsSrv.confirm('Estas seguro que quieres eliminar: '+nombre+'?', id, elemento);
    };

    //alumnos by id
    var alumnoCallback = function(response){
      $scope.alumno= response;
    };

    $scope.getAlumno = function(idAlumno){
      AlumnosSrv.byId(idAlumno, alumnosCallback);
    };

    //buscar materia en array
    var getMateriaInArray = function(materias, materia){
      var result;
      materias.forEach(function(item){
        if(item.nombre === materia){
          result= item;
        }
      });

      return result;
    };

    //Lista de Materias
    var onMateriasSuccess = function(response){
      $scope.materias= response;
    };
    MateriasSrv.listar($rootScope.usuario.id, onMateriasSuccess);

    //Grupo por materia
    var onGruposSuccess= function(response){
      $scope.grupos= response;
      $scope.msgGrupos='';

      if($scope.grupos.length === 0){
        $scope.msgGrupos= '<strong>No tienes grupos creados!</strong>.'
      }
    };

    $scope.getGruposByMateria= function(){
      var materia= getMateriaInArray($scope.materias, $scope.changedMateria);
      GruposSrv.byMateria(materia.idComision, onGruposSuccess);
    };

    $scope.editarProyecto= function(){
      console.log($scope.idProyecto, $scope.proyecto);
      ProyectosSrv.editar($scope.idProyecto, $scope.proyecto);
    };

    $scope.closeModal = function(element){
      $(element).modal('hide');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    };

  });