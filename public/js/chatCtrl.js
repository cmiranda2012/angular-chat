(function() {
    'use strict';

    angular
        .module('app')
        .controller('chatCtrl', function($scope, $localStorage, $rootScope, socket) {

            $scope.message = '';
            $scope.messages = [];
            $scope.users = [];
            $scope.time = new Date();
            $scope.myusername = $localStorage.username;
            $scope.myimage = $localStorage.image;

            socket.emit('get-users');

            socket.on('all-users', function(data) {
                $scope.users = data;
            });

            socket.on('message-received', function(data) {
                $scope.messages.push(data);
            });

            $scope.sendMessage = function(data) {
                var newMessage = {
                    message: $scope.message,
                    from: $scope.myusername,
                    image: $scope.myimage,
                    time: $scope.time
                };
                socket.emit('send-message', newMessage);
                $scope.message = '';
            };

        });
})();
