(function() {
    'use strict';

    angular
        .module('app.tasks')
        .controller('TaskFour', TaskFour);

    TaskFour.$inject = ['dataservice', 'logger'];
    /* @ngInject */
    function TaskFour(dataservice, logger) {
        var vm = this;
        vm.showInput = false;
        vm.toggleInstructions = toggleInstructions;
        vm.title = 'Task 4';

        var keypad = [
            [-1, -1, "1", -1, -1],
            [-1, "2", "3", "4", -1],
            ["5", "6", "7", "8", "9"],
            [-1, "A", "B", "C", -1],
            [-1, -1, "D", -1, -1]
        ];
        var startX = 0;
        var startY = 2;

        function getElement(x, y) {
            return keypad[y][x];
        }

        function step(way, x, y) {
            var nX = x;
            var nY = y;
            switch (way) {
                case "U":
                    nY = (y - 1 >= 0) ? y - 1 : 0;
                    break;
                case "D":
                    nY = (y + 1 <= keypad.length - 1) ? y + 1 : keypad.length - 1;
                    break;
                case "L":
                    nX = (x - 1 >= 0) ? x - 1 : 0;
                    break;
                case "R":
                    nX = (x + 1 <= keypad[0].length - 1) ? x + 1 : keypad[0].length - 1;
                    break;
            }

            var newElem = getElement(nX, nY);
            if (newElem !== -1) {
                startX = nX;
                startY = nY;
                return newElem;
            } else {
                startX = x;
                startY = y;
                return getElement(x, y);
            }
        }

        function getDirection(input) {
            var finalCode = "";
            for (var i = 0; i < input.length; i++) {
                var el;
                for (var j = 0; j < input[i].length; j++) {
                    var dir = input[i][j].toUpperCase();
                    el = step(dir, startX, startY);
                }
                finalCode += el;
            }

            return finalCode;
        }

        activate();

        function activate() {
            dataservice.getInput().then(function(data) {
                vm.input = data;
                vm.finalCode = getDirection(vm.input);
            });
        }

        function toggleInstructions() {
            vm.showInput = !vm.showInput;
        }
    }

})();
