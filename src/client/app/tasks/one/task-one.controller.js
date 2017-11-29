(function() {
    'use strict';

    angular
        .module('app.tasks')
        .controller('TaskOne', TaskOne);

    TaskOne.$inject = ['$scope', 'dataservice', 'logger'];

    function TaskOne($scope, dataservice, logger) {
        var vm = this;
        vm.title = "Problem 1";
        vm.bowerJsonData = { test: "hello" };
        $scope.classA = "box-red";
        $scope.classB = "box-blue";
        activate();

        function activate(){
            dataservice.getTaskOne().then(function(data){
                vm.boxes = data;
            });
        }

        $scope.changeClasses = function(a, b) {
            $scope.classA = a;
            $scope.classB = b;
        }
    }
})();