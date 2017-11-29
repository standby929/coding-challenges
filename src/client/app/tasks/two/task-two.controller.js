(function() {
    'use strict';

    angular
        .module('app.tasks')
        .controller('TaskTwo', TaskTwo);

    TaskTwo.$inject = ['$scope', '$filter', 'dataservice', 'logger'];
    /* @ngInject */
    function TaskTwo($scope, $filter, dataservice, logger) {
        var vm = this;
        vm.problem2Solved = problem2Solved;
        $scope.selected = {
            chBoxes: []
        };

        activate();

        function activate(){
            return dataservice.getTaskTwo().then(function(data){
                vm.checkBoxes = data;
                return vm.checkBoxes;
            });
        }
        function problem2Solved(){
            logger.success('Hurray!', '');
        }

    }

})();
