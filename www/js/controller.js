var BASE_URL = 'http://172.26.97.139:8080';
var BASE_ADMIN_URL = BASE_URL + '/admin/';
var BASE_EVENTS_URL = BASE_ADMIN_URL + '#/events';


angular.module('starter.controller', [])

    .controller('AppCtrl', function($scope, $location, $cordovaBarcodeScanner, CheckInService, EventService, ConfigService) {
        $scope.lgged = false;
        $scope.selectedEvent = false;

        $scope.reserve = function(){
            window.open(BASE_URL + '/event/' + $scope.eventName, '_blank', 'location=no');
        };

        $scope.login = function () {
            var ref = window.open(BASE_URL + '/admin/', '_blank','location=no');
            ref.addEventListener('loadstop', function(event){
                if((event.url).startsWith(BASE_ADMIN_URL)){

                    var loop = setInterval(function(){
                        ref.executeScript({
                                code: " localStorage.getItem('Token')"

                            },
                            function(data){
                                clearInterval(loop);
                                ref.close();
                                ConfigService.setToken(data);
                                EventService.getAllEvents(BASE_URL).success(function(result){
                                    $scope.events = result
                                }).error(function(error, status){
                                    alert(status)
                                });
                                $scope.logged = true;
                            })
                    })
                }
                })
        };
        $scope.selectEvent = function(event){
            $scope.eventName = event.shortName;
           $scope.eventId = event.id;
            $scope.selectedEvent = true;
        };

        $scope.checkInFunc = function(){
            $cordovaBarcodeScanner.scan().then(function(result) {
                console.log(result.text);
                console.log("Barcode Format -> " + result.format);
                console.log("Cancelled -> " + result.cancelled);
                var ticket = {'code': result.text};
                CheckInService.checkIn(BASE_URL, $scope.eventId, ticket).success(function(result){
                   $scope.tickets = result;
                }).error(function(error, status){
                    alert(status);
                });

            }, function(error) {
                console.log("An error happened -> " + error);
            });
        };

        $scope.adminFunc = function(){
            window.open(BASE_URL + '/admin/#/', '_blank', 'location=no')
        };
        if (typeof String.prototype.startsWith != 'function') {
            String.prototype.startsWith = function (str) {
                return this.indexOf(str) == 0;
            };
        }
    });






