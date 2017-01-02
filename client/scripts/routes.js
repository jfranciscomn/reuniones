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

angular.module('FLOKsports').config(function ($translateProvider) {
  $translateProvider.translations('en', {
		//Layout
	  HOLA: 'Hi ',
	  BIENVENIDO:'Welcome',
    ABOUT: 'About',
    MENUINICIO: 'Home',
    REUNIONES: 'Meetings',
    MISACUERDOS: 'My action items',
    PORCONFIRMAR: 'To confirm',
    CERRARSESION: 'Logout',
		//Home
		RESUMEN: 'Summary',
    ACUERDOS: 'Action items',
    ACUERDOSVENCIDOS: 'Late action items',
    ACUERDOSHOY: "Today's action items",
    ACUERDOSSEMANA: "This week's action items",
    ACUERDOSMES: "This month's action items",
    ACUERDOSFUTUROS: 'Future action items',
    AGREGARACUERDO: 'Add action item',
    		//Nuevo Acuerdo, Acuerdo, Nueva Reunion
    		NUEVOACUERDO: 'New action item',
    		CATEGORIA: 'Category',
        CATEGORIAS: 'Categories',
    		ACUERDO: 'Action item',
    		DESCRIPCION: 'Description',
    		FECHAINICIO: 'Start date',
    		FECHALIMITE: 'Limit date',
    		RESPONSABLES: 'Responsible',
    		PRIORIDAD: 'Priority',
    		ESTATUS: 'Status',
    		FECHACIERRE: 'Closing date',
    		REPETIR: 'Repeat',
    		HASTA: 'Until',
    		SEGUIDORES: 'Followers',
    		TEMAS: 'Themes',
    		AGREGARACALENDARIO: 'Add calendar',
    		RECORDATORIOS: 'Reminders',
    		BAJA: 'Low',
    		MEDIA: 'Medium',
    		ALTA: 'High',
    		ACTIVO: 'Active',
    		CERRADO: 'Closed',
    		VENCIDO: 'Missed',
    		NUNCA: 'Never',
    		TODOSLOSDIAS: 'Every day',
    		CADASEMANA: 'Every week',
    		CADADOS: 'Every two weeks',
    		CADAMES: 'Every month',
    		CADAANO: 'Every year',
    		//
    		NUEVAREUNION: 'New meeting',
    		EDITARREUNION: 'Edit meeting',
    		TITULO: 'Title',
    		FECHA: 'Date',
    		HORAINICIO: 'Start time',
    		HORAFIN: 'End time',
    		UBICACION: 'Location',
    		CONVOCA: 'Convenes',
    		PARTICIPANTES: 'Participants',
    		ALERTAS: 'Alerts',
    //
    REUNIONES: 'Meetings',
    CONFIRMAR: 'Confirm',
    RECHAZAR: 'Reject',
    REUNIONESVENCIDAS: 'Missed meetings',
    REUNIONESHOY: "Today's meetings",
    REUNIONESSEMANA: "This week's meetings",
    REUNIONESMES: "This month's meetings",
    REUNIONESFUTURO: 'Future meetings',
    REUNIONESPORCONFIRMAR: 'To confirm',
    AGREGARREUNION: 'Add meeting',
    FUTUROS: 'Futures',
    INICIARREUNION: 'Start meeting',
    FINALIZARREUNION: 'End meeting',
    //Reuniones y Acuerdos
    VENCIDAS: 'Missed',
    HOY: 'Today',
    SEMANA: 'week',
    MES: 'month',
    TODAS: 'All',
    FUTURO: 'Future',
    //Reunión invitado
    ENTRAR: 'Enter',
    NOTAS: 'Notes',
    //Reuniones por Confirmar
    RCONFIRMAR: 'Confirm meetings',
    PORCONFIRMAR: 'To confirm',
    //Perfil
    PERFIL: 'Profile',
    CONFIGURACION: 'Configuration',
    MIPERFIL: 'My Profile',
    PREFERENCIASREUNION: 'Meeting preferences',
    PREFERENCIASAPLICACION: 'Application preferences',
    ACERCA: 'About my meetings',
    PASAVOZ: '',
    AYUDA: 'Help',
		    //Perfil
		    NOMBRE: 'Name',
		    PUESTO: 'Position',
		    TELEFONO: 'Phone',
		    CIUDAD: 'City',
		    ESTADO: 'State',
		    PAIS: 'Country',
		//Login y Signup
		EMAIL: 'Mail',
		PASSWORD: 'Password',
		INICIARSESION: 'Login',
		OLVIDASTECONTRASENA: 'Forgot your password?',
		REGISTRO: 'Registry',
		REGISTRAR: 'To Register',
		//Preferencias de Reunion
		DURACION: 'Duration of the meeting in minutes',
		PRIMERA: 'First alert',
		MINUTOS: 'Minutes',
		HORAS: 'Hours',
		DIAS: 'Days',
		ANTES: 'Before',
		DESPUES: 'After',
		SEGUNDA: 'Second alert',
		LEYENDA: 'Legends for post exchange:',
		REPROGRAMACION: 'Reprogramming',
		CANCELACION: 'Cancellation',
		ELIMINAR: 'Remove',
		//Acerca de
		EMAILADSUM: 'misreuniones@adsum.com.mx',
		SIGUENOS: 'Follow us',
		SITIO: 'www.misreuniones.com',
		POWER: 'Power by Adsum ©',
		DERECHOSRESERVADOS: 'All rights reserved CUSTOMSOFT, S.C. 2012',
		
  });
  $translateProvider.translations('es', {
		//Layout
	  HOLA: 'Hola ',
	  BIENVENIDO:'Bienvenid@',
    ABOUT: 'Acerca de',
    MENUINICIO: 'Inicio',
    REUNIONES: 'Reuniones',
    MISACUERDOS: 'Mis acuerdos',
    PORCONFIRMAR: 'Por confirmar',
    CERRARSESION: 'Cerrar sesión',
		//Home
		RESUMEN: 'Resumen',
    ACUERDOS: 'Acuerdos',
    ACUERDOSVENCIDOS: 'Acuerdos vencidos',
    ACUERDOSHOY: 'Acuerdos para hoy',
    ACUERDOSSEMANA: 'Acuerdos de la semana',
    ACUERDOSMES: 'Acuerdos del mes',
    ACUERDOSFUTUROS: 'Acuerdos futuros',
    AGREGARACUERDO: 'Agregar acuerdo',
    		//Nuevo Acuerdo, Acuerdo, Nueva Reunion
    		NUEVOACUERDO: 'Nuevo acuerdo',
    		CATEGORIA: 'Categoría',
        CATEGORIAS: 'Categorias',
    		ACUERDO: 'Acuerdo',
    		DESCRIPCION: 'Descripción',
    		FECHAINICIO: 'Fecha inicio',
    		FECHALIMITE: 'Fecha límite',
    		RESPONSABLES: 'Responsables',
    		PRIORIDAD: 'Prioridad',
    		ESTATUS: 'Estatus',
    		FECHACIERRE: 'Fecha cierre',
    		REPETIR: 'Repetir',
    		HASTA: 'Hasta',
    		SEGUIDORES: 'Seguidores',
    		TEMAS: 'Temas',
    		AGREGARACALENDARIO: 'Agregar a calendario',
    		RECORDATORIOS: 'Recordatorio',
    		BAJA: 'Baja',
    		MEDIA: 'Media',
    		ALTA: 'Alta',
    		ACTIVO: 'Activo',
    		CERRADO: 'Cerrado',
    		VENCIDO: 'Vencido',
    		NUNCA: 'Nunca',
    		TODOSLOSDIAS: 'Todos los días',
    		CADASEMANA: 'Cada semana',
    		CADADOS: 'Cada dos semanas',
    		CADAMES: 'Cada Mes',
    		CADAANO: 'Cada año',
    		//
    		NUEVAREUNION: 'Nueva reunión',
    		EDITARREUNION: 'Editar reunión',
    		TITULO: 'Título',
    		FECHA: 'Fecha',
    		HORAINICIO: 'Hora inicio',
    		HORAFIN: 'Hora fin',
    		UBICACION: 'Ubicación',
    		CONVOCA: 'Convoca',
    		PARTICIPANTES: 'Participantes',
    		ALERTAS: 'Alertas',
    //
    REUNIONES: 'Reuniones',
		CONFIRMAR: 'Confirmar',
    RECHAZAR: 'Rechazar',
    REUNIONESVENCIDAS: 'Reuniones vencidas',
    REUNIONESHOY: 'Reuniones para hoy',
    REUNIONESSEMANA: 'Reuniones de la semana',
    REUNIONESMES: 'Reuniones del mes',
    REUNIONESFUTURO: 'Reuniones futuras',
    REUNIONESPORCONFIRMAR: 'Por confirmar',
    AGREGARREUNION: 'Agregar reunión',
    FUTUROS: 'Futuros',
    INICIARREUNION: 'Iniciar reunión',
    FINALIZARREUNION: 'Finalizar reunión',
    //Reuniones y Acuerdos
    VENCIDAS: 'Vencidas',
    HOY: 'Hoy',
    SEMANA: 'Semana',
    MES: 'Mes',
    TODAS: 'Todas',
    FUTURO: 'Futuro',
    //Reunión invitado
    ENTRAR: 'Entrar',
    NOTAS: 'Notas',
    //Reuniones por Confirmar
    RCONFIRMAR: 'Confirmar reuniones',
    PORCONFIRMAR: 'Por confirmar',
    //Perfil
    PERFIL: 'Perfil',
    CONFIGURACION: 'Configuración',
    MIPERFIL: 'Mi Perfil',
    PREFERENCIASREUNION: 'Preferencias de reunión',
    PREFERENCIASAPLICACION: 'Preferencias de aplicación',
    ACERCA: 'Acerca de mis reuniones',
    PASAVOZ: 'Pasar la Voz',
    AYUDA: 'Ayuda',
		    //Perfil
		    NOMBRE: 'Nombre',
		    PUESTO: 'Puesto',
		    TELEFONO: 'Teléfono',
		    CIUDAD: 'Ciudad',
		    ESTADO: 'Estado',
		    PAIS: 'Pais',
		//Login y Signup
		EMAIL: 'Correo',
		PASSWORD: 'Contraseña',
		INICIARSESION: 'Iniciar sesión',
		OLVIDASTECONTRASENA: '¿Olvidaste tu contraseña?',
		REGISTRO: 'Registro',
		REGISTRAR: 'Registrar',
		//Preferencias de Reunion
		DURACION: 'Duración de la reunión en minutos',
		PRIMERA: 'Primer alerta',
		MINUTOS: 'Minutos',
		HORAS: 'Horas',
		DIAS: 'Dias',
		ANTES: 'Antes',
		DESPUES: 'Despues',
		SEGUNDA: 'Segunda alerta',
		LEYENDA: 'Leyendas para correos de cambio:',
		REPROGRAMACION: 'Reprogramación',
		CANCELACION: 'Cancelación',
		ELIMINAR: 'Eliminar',
		//Acerca de
		EMAILADSUM: 'misreuniones@adsum.com.mx',
		SIGUENOS: 'Síguenos',
		SITIO: 'www.misreuniones.com',
		POWER: 'Poder por Adsum ©',
		DERECHOSRESERVADOS: 'Todos los derechos reservados CUSTOMSOFT, S.C. 2012',
		
  });
  $translateProvider.translations('pt', {
		//Layout
	  HOLA: 'Olá ',
	  BIENVENIDO:'Bem-vindo',
    ABOUT: 'Sobre',
    MENUINICIO: 'Início',
    REUNIONES: 'Reuniões',
    MISACUERDOS: 'Meus acordos',
    PORCONFIRMAR: 'Por confirmar',
    CERRARSESION: 'Fechar sessão',
		//Home
		RESUMEN: 'Resumo',
    ACUERDOS: 'Acordos',
    ACUERDOSVENCIDOS: 'Acordos expirados',
    ACUERDOSHOY: 'Acordos para hoje',
    ACUERDOSSEMANA: 'Acordos para esta semana',
    ACUERDOSMES: 'Acordos para este mês',
    ACUERDOSFUTUROS: 'Future action items',
    AGREGARACUERDO: 'Adicionar acordo',
    		//Nuevo Acuerdo, Acuerdo, Nueva Reunion
    		NUEVOACUERDO: 'Novo acordo',
    		CATEGORIA: 'Categoria',
        CATEGORIAS: 'Categorias',
    		ACUERDO: 'Acordo',
    		DESCRIPCION: 'Descrição',
    		FECHAINICIO: 'Data de início',
    		FECHALIMITE: 'Data limite',
    		RESPONSABLES: 'Responsável',
    		PRIORIDAD: 'Prioridade',
    		ESTATUS: 'Estado',
    		FECHACIERRE: 'Data de encerramento',
    		REPETIR: 'Repetição',
    		HASTA: 'Para cima',
    		SEGUIDORES: 'Seguidores',
    		TEMAS: 'Temas',
    		AGREGARACALENDARIO: 'Adicionar ao calendário',
    		RECORDATORIOS: 'Lembretes',
    		BAJA: 'Cair',
    		MEDIA: 'Média',
    		ALTA: 'Alto',
    		ACTIVO: 'Ativo',
    		CERRADO: 'Fechado',
    		VENCIDO: 'Expirado',
    		NUNCA: 'Nem',
    		TODOSLOSDIAS: 'Todos os dias',
    		CADASEMANA: 'Cada semana',
    		CADADOS: 'A cada duas semanas',
    		CADAMES: 'Cada mês',
    		CADAANO: 'Cada ano',
    		//
    		NUEVAREUNION: 'Nova reunião',
    		EDITARREUNION: 'Editar meeting',
    		TITULO: 'Título',
    		FECHA: 'Data',
    		HORAINICIO: 'Hora de início',
    		HORAFIN: 'Tempo do fim',
    		UBICACION: 'Localização',
    		CONVOCA: 'Reune',
    		PARTICIPANTES: 'Participantes',
    		ALERTAS: 'Alertas',
    //
    REUNIONES: 'Reuniões',
		CONFIRMAR: 'Confirmar',
    RECHAZAR: 'Rejeitar',
    REUNIONESVENCIDAS: 'Reuniões em atraso',
    REUNIONESHOY: 'Hoje reuniões',
    REUNIONESSEMANA: 'Reuniões semana',
    REUNIONESMES: 'Reuniões mês',
    REUNIONESFUTURO: 'Reuniões futuras',
    REUNIONESPORCONFIRMAR: 'Confirme reuniões',
    AGREGARREUNION: 'Adicionar meeting',
    FUTUROS: 'Futuros',
    INICIARREUNION: 'Iniciar reunião',
    FINALIZARREUNION: 'Finish reunion',
    //Reuniones y Acuerdos
    VENCIDAS: 'Você expirou',
    HOY: 'Hoje',
    SEMANA: 'Semana',
    MES: 'Mês',
    TODAS: 'Tudo',
    FUTURO: 'Futuro',
    //Reuniones por Confirmar
    RCONFIRMAR: 'Confirmar reunião',
    PORCONFIRMAR: 'Por confirmar',
    //Perfil
    PERFIL: 'Perfil',
    CONFIGURACION: 'Configuração',
    MIPERFIL: 'Meu perfil',
    PREFERENCIASREUNION: 'Preferências da reunião',
    PREFERENCIASAPLICACION: 'Preferências da aplicação',
    ACERCA: 'Sobre',
    PASAVOZ: 'Espalhe a palavra',
    AYUDA: 'Ajudar',
		    //Perfil
		    NOMBRE: 'Nome',
		    PUESTO: 'Posto',
		    TELEFONO: 'Telefone',
		    CIUDAD: 'Cidade',
		    ESTADO: 'Estado',
		    PAIS: 'País',
		//Login y Signup
		EMAIL: 'e-mail',
		PASSWORD: 'Senha',
		INICIARSESION: 'Iniciar sessão',
		OLVIDASTECONTRASENA: '¿Olvidaste tu contraseña?',
		REGISTRO: 'Inscrição',
		REGISTRAR: 'Registro',
		//Preferencias de Reunion
		DURACION: 'Duração da reunião em minutos',
		PRIMERA: 'Alerta primeiro',
		MINUTOS: 'Atas',
		HORAS: 'Hora',
		DIAS: 'Dias',
		ANTES: 'Antes',
		DESPUES: 'Depois',
		SEGUNDA: 'Alerta segunda',
		LEYENDA: 'Legends para troca de pós:',
		REPROGRAMACION: 'Reprogramação',
		CANCELACION: 'Cancelamento',
		ELIMINAR: 'Remover',
		//Acerca de
		EMAILADSUM: 'misreuniones@adsum.com.mx',
		SIGUENOS: 'siga-nos',
		SITIO: 'www.misreuniones.com',
		POWER: 'Power pela Adsum ©',
		DERECHOSRESERVADOS: 'Todos os direitos reservados CUSTOMSOFT, S.C. 2012',
		
  });
  
  $translateProvider
  .preferredLanguage('es')
  .registerAvailableLanguageKeys(['en', 'es', 'pt'], {
    'en_US': 'en'
  })
  .determinePreferredLanguage()
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
    templateUrl: 'client/templates/layout.html',
    controller: 'MainCtrl as mainc'
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
  .state('app.siguienteReunion', {
    url: '/siguienteReunion/:reunionId/:siguiente',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/reuniones/form.html',
        controller: 'NuevaReunionCtrl as nrc'
      }
    }
  })
  .state('app.iniciarReunionIpad', {
    url: '/iniciarReunionIpad/:reunionId',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/reuniones/iniciarReunionIpad.html',
        controller: 'IniciarReunionCtrl as irc'
      }
    }
  })
  .state('app.iniciarReunionCel', {
    url: '/iniciarReunionCel/:reunionId',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/reuniones/iniciarReunionCel.html',
        controller: 'IniciarReunionCtrl as irc'
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
  .state('app.agregarAcuerdo', {
    url: '/agregarAcuerdo/:reunionId',
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
  .state('app.acercaDe', {
    url: '/acercaDe',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/acercaDe/acercaDe.html',
        controller: 'AcercaDeCtrl as adc'
      }
    }
  })
  .state('app.preferenciasAplicacion', {
    url: '/preferenciasAplicacion',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/preferenciasAplicacion/preferenciasAplicacion.html',
        controller: 'PreferenciasAplicacionCtrl as pac'
      }
    }
  })
  .state('app.preferenciasReunion', {
    url: '/preferenciasReunion/:preferencia_id',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/preferenciasReunion/preferenciasReunion.html',
        controller: 'PreferenciasReunionCtrl as prc'
      }
    }
  })
  .state('app.pasaLaVoz', {
    url: '/pasaLaVoz',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/pasaLaVoz/pasaLaVoz.html',
        controller: 'PasaLaVozCtrl as pvc'
      }
    }
  })
  .state('app.reunionesFiltradas', {
    url: '/reunionesFiltradas/:tipo',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/reuniones/reunionesFiltradas.html',
        controller: 'ReunionesFiltradasCtrl as rfc'
      }
    }
  })
  .state('app.acuerdosFiltrados', {
    url: '/acuerdosFiltrados/:tipo',
    views: {
      'menuContent': {
        templateUrl: 'client/templates/acuerdos/acuerdosFiltrados.html',
        controller: 'AcuerdosFiltradosCtrl as afc'
      }
    }
  })
  ;
 
	$urlRouterProvider.otherwise('/login');
}]);
