angular.module("FLOKsports").run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    switch(error) {
      case "AUTH_REQUIRED":
        $state.go('anon.login');
        break;
      case "FORBIDDEN":
        //$state.go('root.home');
        break;
      case "UNAUTHORIZED":
      	console.log("Acceso Denegado");
				console.log("No tiene permiso para ver esta opción");
        break;
      default:
        $state.go('internal-client-error');
    }

    if (error === 'AUTH_REQUIRED') {
      $state.go('anon.login');
    }

  });
});


angular.module('FLOKsports').config(['$injector', function ($injector) {
  var $stateProvider = $injector.get('$stateProvider');
  var $urlRouterProvider = $injector.get('$urlRouterProvider');
  var $locationProvider = $injector.get('$locationProvider');	
  var $ionicConfigProvider = $injector.get("$ionicConfigProvider");
  
  $ionicConfigProvider.backButton.text('').icon('ion-android-arrow-back');
	
  /***************************
   * Anonymous Routes
   ***************************/
  $stateProvider
    .state('auth', {
      url: '',
      abstract: true,
      templateUrl: 'client/templates/auth/auth.html'
    })
    .state('auth.walkthrough', {
      url: '/walkthrough',
      templateUrl: "client/templates/auth/walkthrough.html"
    })

    .state('auth.login', {
      url: '/login',
      templateUrl: "client/templates/auth/login.html",
      controller: 'LoginCtrl as lc'
    })

    .state('auth.signup', {
      url: '/signup',
      templateUrl: "client/templates/auth/signup.html",
      controller: 'SignupCtrl as sc'
    })

    .state('auth.forgot-password', {
      url: "/forgot-password",
      templateUrl: "client/templates/auth/forgot-password.html",
      controller: 'ForgotPasswordCtrl as fpc'
    })
    .state('auth.logout', {
      url: '/logout',
      resolve: {
        'logout': ['$meteor', '$state', function ($meteor, $state) {
          return $meteor.logout().then(
            function () {
              $state.go('auth.login');
            },
            function (error) {
              console.log(error.reason);
            }
          );
        }]
      }
    }
	);

  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'client/templates/layout.html'
  })
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/home/home.html',
        controller: 'HomeCtrl as hc'
      }
    }
  })
  .state('app.perfil', {
    url: '/perfil',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/perfil/perfil.html',
        controller: 'PerfilCtrl as pc'
      }
    }
  })
  .state('app.reuniones', {
    url: '/reuniones',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/reuniones/reuniones.html',
        controller: 'ReunionesCtrl as rc'
      }
    }
  })
  .state('app.nuevaReunion', {
    url: '/reunionNueva',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/reuniones/form.html',
        controller: 'NuevaReunionCtrl as nrc'
      }
    }
  })
  .state('app.editarReunion', {
    url: '/editarReunion/:reunionId',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/reuniones/form.html',
        controller: 'NuevaReunionCtrl as nrc'
      }
    }
  })
  .state('app.verReunion', {
    url: '/verReunion/:reunionId',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/reuniones/reunion.html',
        controller: 'ReunionCtrl as rc'
      }
    }
  })
  .state('app.acuerdos', {
    url: '/acuerdos',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/acuerdos/acuerdos.html',
        controller: 'AcuerdosCtrl as ac'
      }
    }
  })
  .state('app.nuevoAcuerdo', {
    url: '/acuerdoNuevo',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/acuerdos/form.html',
        controller: 'NuevoAcuerdoCtrl as nac'
      }
    }
  })
  .state('app.editarAcuerdo', {
    url: '/editarAcuerdo/:acuerdoId',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/acuerdos/form.html',
        controller: 'NuevoAcuerdoCtrl as nac'
      }
    }
  })
  .state('app.verAcuerdo', {
    url: '/verAcuerdo/:acuerdoId',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/acuerdos/acuerdo.html',
        controller: 'AcuerdoCtrl as ac'
      }
    }
  })
  .state('app.agenda', {
    url: '/agenda',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/agenda/agenda.html',
        controller: 'AgendaCtrl'
      }
    }
  })
  .state('app.categorias', {
    url: '/categorias',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/categorias/categorias.html',
        controller: 'CategoriasCtrl as cc'
      }
    }
  })
  .state('app.nuevaCategoria', {
    url: '/categoriaNueva',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/categorias/form.html',
        controller: 'NuevaCategoriaCtrl as ncc'
      }
    }
  })
  .state('app.editarCategoria', {
    url: '/editarCategoria/:categoriaId',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/categorias/form.html',
        controller: 'NuevaCategoriaCtrl as ncc'
      }
    }
  })
  .state('app.editarPerfil', {
    url: '/editarPerfil',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/perfil/form.html',
        controller: 'EditarPerfilCtrl as epc'
      }
    }
  })
  .state('app.reunionesConfirmar', {
    url: '/reunionesConfirmar',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/reuniones/reunionesConfirmar.html',
        controller: 'ReunionesConfirmarCtrl as rcc'
      }
    }
  })
  ;
 
	$urlRouterProvider.otherwise('/login');
}]);
