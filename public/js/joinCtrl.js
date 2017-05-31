(function() {

    'use strict';

    angular
        .module('app')
        .controller('joinCtrl', function($scope, $localStorage, $state, socket) {

            const img = 'https://www.grumpycats.com/images/archive/1454356893-o1w0ma.jpg'
            $scope.username = '';
            $scope.image = '';

            $scope.join = function() {
                $localStorage.username = $scope.username;
                $localStorage.image = $scope.image ? $scope.image : img;

                socket.emit('join', {
                    username: $scope.username,
                    image: $scope.image ? $scope.image : img
                });

                $state.go('chat');
            };
        });
})();