var app = angular.module('wheather_details', []);
app.controller('wheather_data', function ($scope, $http, $window) {
    //alert("hghjgh")
    $scope.checkdata = function () {
        var data = {
            cityname: $scope.cityname
        }
        $http.post('http://localhost:3000/getwheather_details/wheather_deatils', data).then(function (res, err) {
            
            if (res.data.status == "Error") {
                $scope.city_error = true;
            }
            else {
                $scope.city_error = false;
                $scope.whtr_details = res.data.data.weather;
                $scope.temp_details = res.data.data.main;
            }
        })
        $http.post('http://localhost:3000/getwheather_details/currentwheather_deatils', data).then(function (res, err) {
            if (res.data.status == "Error") {
                $scope.city_error = true;
            }
            else {
                $scope.city_error = false;
                $scope.whtr_details1 = res.data.data;
                $scope.temp_details1 = res.data.data;
            }
        })
    }
})