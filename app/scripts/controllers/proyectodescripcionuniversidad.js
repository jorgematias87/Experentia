'use strict';

/**
 * @ngdoc function
 * @name experentiaWebSiteApp.controller:ProyectodescripcionuniversidadCtrl
 * @description
 * # ProyectodescripcionuniversidadCtrl
 * Controller of the experentiaWebSiteApp
 */
angular.module('experentiaWebSiteApp')
  .controller('ProyectoDescripcionUniversidadCtrl', function ($scope, $routeParams, ProyectoSrv, GrupoSrv, TareaSrv, AlumnoSrv, $rootScope, $cookieStore) {

    $rootScope.usuario = $cookieStore.get('usuario');

  	$scope.idProyecto = $routeParams.id;
    $scope.tareas = {};
    $scope.alumnos = {};

    $scope.tryAsignar = function(){
      $scope.msg = 'Asignado Correctamente';
    }

  	//Proyecto por ID
  	var onProyectoSucces = function(response){
  		$scope.proyecto = response;
  	},
  		onProyectoError = function(rejection){
  			console.log(rejection);
  		}

    ProyectoSrv.get({id: $scope.idProyecto}, onProyectoSucces, onProyectoError);

    //Lista de Tareas
    var onTareasSucces = function(response){
      $scope.tareas = response;
    },
      onTareasError = function(rejection){
        console.log(rejection);
      }

    TareaSrv.query({id: $scope.idProyecto}, onTareasSucces, onTareasError);

    //lista de alumnos
    var onAlumnosSuccess = function(response){
      $scope.alumnos = response;
    },
      onAlumnosError = function(rejection){
        console.log(rejection);
      }

    AlumnoSrv.query(onAlumnosSuccess, onAlumnosError);


    //Crear Tareas
    $scope.tarea= {};

    var onSaveTareaSuccess = function(response){
      alert('Tarea guardado exitosamente')
    },
      onSaveTareaError = function(rejection){
        console.log(rejection);
      }

    $scope.tryTarea = function(idProyecto){
      $scope.tarea.idProyecto =  idProyecto;
      console.log($scope.tarea);
      TareaSrv.save($scope.tarea, onSaveTareaSuccess, onSaveTareaError);
    }

  	var onGrupoSucces = function(response){
  		$scope.grupo = response;
  	},
  		onGrupoError = function(rejection){
  			console.log(rejection);
  		}

  	GrupoSrv.get({id:1}, onGrupoSucces, onGrupoError);
    
  });
