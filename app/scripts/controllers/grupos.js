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

    $scope.conf={};
    $scope.conf.titulo= 'Crear Grupo';
    $scope.conf.accion= 'crearGrupo';
    $scope.conf.boton= 'crear';

    $scope.alumnosAsignados= [];

    if(!$scope.alumnos){
      $scope.msg='Seleccione una materia';
    }

    //Lista de Materias
    var onMateriasSuccess = function(response){
      $scope.materias= response;
    };
    MateriasSrv.listar($rootScope.usuario.id, onMateriasSuccess);

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

    //Lista de alumnos
    var onAlumnosSuccess = function(response){
      $scope.msg='';
      $scope.alumnos= response;

      $scope.alumnosGrupoMateria.forEach(function(alumnoGrupoMateria){
        for (var i = $scope.alumnos.length - 1; i >= 0; i--) {
          if($scope.alumnos[i].id === alumnoGrupoMateria.id ){
            $scope.alumnos.splice(i,1);

            if($scope.alumnos.length === 0){
              $scope.msg= 'Todos los alumnos estan asignados'
            }
          };
        };
      });
    };

    //Lista de alumnos asignados
    var onAlumnosByGrupoMateriaSuccess = function(response){
        $scope.alumnosGrupoMateria= response;
        AlumnosSrv.byMateria($scope.changedMateria.id, onAlumnosSuccess);
    };

    $scope.getAlumnosByMaterias = function(){
      $scope.alumnosAsignados= [];
      $scope.changedMateria= getMateriaInArray($scope.materias, $scope.formGrupo.materia);
      AlumnosSrv.byGrupoMateria($scope.changedMateria.idComision, onAlumnosByGrupoMateriaSuccess);
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
      $scope.formGrupo.idComision= $scope.changedMateria.idComision;
      $scope.formGrupo.fechaCreacion = $filter('date')(new Date(), 'yyyy-MM-dd');
      $scope.formGrupo.tecnologia= parseArray($scope.formGrupo.tecnologia, 'text');
      delete $scope.formGrupo.materia;

      GruposSrv.crear($scope.formGrupo, $scope.alumnosAsignados);
    };
  })
.controller('GrupoCtrl', function ($scope, $rootScope, $routeParams, NotificationsSrv, GruposSrv, AlumnosSrv) {
  $scope.idGrupo = $rootScope.itemId = $routeParams.id;

  //Grupo by id
  var onGrupoSuccess = function(response){
    $scope.grupo= response;
  };
  GruposSrv.byId($scope.idGrupo, onGrupoSuccess);

  //Lista de alumnos
  var onAlumnosSuccess = function(response){
    $scope.alumnos= response;

    if($scope.alumnos.length === 0){
      $scope.msg= 'No hay alumnos asignados';
    }
  };
  AlumnosSrv.byGrupo($scope.idGrupo, onAlumnosSuccess);

  //eliminar Grupo
  $rootScope.tryDeleteGrupo = function(idGrupo){
    GruposSrv.eliminar(idGrupo);
  };

  $scope.deleteConfirm = function(nombre, id, elemento){
    NotificationsSrv.confirm('Estas seguro que quieres eliminar: '+nombre+'?', id, elemento);
  };

})
.controller('GrupoEditarCtrl', function ($scope, $rootScope, $cookieStore, $routeParams, GruposSrv, AlumnosSrv, MateriasSrv) {
  $rootScope.usuario = $cookieStore.get('usuario');

  $scope.conf={};
  $scope.conf.titulo= 'Editar Grupo';
  $scope.conf.accion= 'editarGrupo';
  $scope.conf.boton= 'editar';

  $scope.idGrupo = $rootScope.itemId = $routeParams.id;

  //Grupo by id
  var onGrupoSuccess = function(response){
    $scope.formGrupo= response;

    var tecnologias= response.tecnologia.split(',');
    preSelectedTecnologias(tecnologias);

    MateriasSrv.listar($rootScope.usuario.id, onMateriasSuccess);
  };
  GruposSrv.byId($scope.idGrupo, onGrupoSuccess);

  var preSelectedTecnologias= function(tecnologias){
    
    $scope.formGrupo.tecnologia= [];
    tecnologias.forEach(function(item){
      var tecnologia= {};
      tecnologia.id= item;
      tecnologia.text= item;
      $scope.formGrupo.tecnologia.push(tecnologia);
    });
  }

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
    $scope.materia= getMateriaInArray($scope.materias, $scope.formGrupo.materia);

    $scope.getAlumnosByMaterias();
  };

  //Lista de alumnos asignados
  var onAlumnosSuccess = function(response){
    $scope.auxAlumnosAsignados= response
    $scope.alumnosAsignados= $scope.auxAlumnosAsignados;
  };
  AlumnosSrv.byGrupo($scope.idGrupo, onAlumnosSuccess);

  //grupos by materia
  var onGruposSuccess = function(response){
    $scope.grupos= response;
  };

  //Lista de alumnos
  var onAlumnosSuccess = function(response){
    $scope.msg='';
    $scope.alumnos= response;

    $scope.alumnosGrupoMateria.forEach(function(alumnoGrupoMateria){
      for (var i = $scope.alumnos.length - 1; i >= 0; i--) {
        if($scope.alumnos[i].id === alumnoGrupoMateria.id ){
          $scope.alumnos.splice(i,1);

          if($scope.alumnos.length === 0){
            $scope.msg= 'Todos los alumnos estan asignados'
          }
        };
      };
    });
  };

  var onAlumnosByGrupoMateriaSuccess = function(response){
      $scope.alumnosGrupoMateria= response;
      AlumnosSrv.byMateria($scope.changedMateria.id, onAlumnosSuccess);
  };

  $scope.getAlumnosByMaterias = function(){
    $scope.changedMateria= getMateriaInArray($scope.materias, $scope.formGrupo.materia);

    if($scope.materia.nombre === $scope.changedMateria.nombre){
      $scope.alumnosAsignados= $scope.auxAlumnosAsignados;
    }else{
      $scope.alumnosAsignados= [];
    }

    AlumnosSrv.byGrupoMateria($scope.changedMateria.idComision, onAlumnosByGrupoMateriaSuccess);
  };

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

  $scope.editarGrupo= function(){
    delete $scope.formGrupo.materia;
    $scope.formGrupo.idComision= $scope.changedMateria.idComision;
    $scope.formGrupo.tecnologia= parseArray($scope.formGrupo.tecnologia, 'text');

    console.log($scope.formGrupo, $scope.alumnosAsignados);

    GruposSrv.editar($scope.idGrupo, $scope.formGrupo, $scope.alumnosAsignados);
  };

});
