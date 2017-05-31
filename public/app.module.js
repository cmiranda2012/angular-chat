(function() {
    'use strict';

    angular
        .module('app', [
            'ngMaterial',
            'ui.router',
            'ngCookies',
            'ngSanitize',
            'ngStorage',
            'ngLodash',
            'ngMessages',
        ])
        .config(function(
            $mdThemingProvider,
            $stateProvider,
            $locationProvider,
            $urlRouterProvider
        ) {

            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('orange');

            $locationProvider.html5Mode(true);

            $urlRouterProvider
                .otherwise('/');

            $stateProvider
                .state('join', {
                    url: '/',
                    templateUrl: 'views/join.html',
                    controller: 'joinCtrl'
                })
                .state('chat', {
                    url: '/chat',
                    templateUrl: 'views/chat.html',
                    controller: 'chatCtrl'
                })
        })
        .run(function($rootScope, $state) {
            $rootScope.$on("$locationChangeStart", function(event, next, current) {
                if (next == current) {
                    event.preventDefault();
                    $state.transitionTo('join');
                }
            });
        })
        .directive('ngEnter', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.bind("keydown keypress", function(event) {
                        if (event.which === 13) {
                            scope.$apply(function() {
                                scope.$eval(attrs.ngEnter);
                            });

                            event.preventDefault();
                        }
                    });
                }
            }
        });
}());
