(function() {
    'use strict';

    angular
        .module('app.tasks')
        .controller('TaskFive', TaskFive);

    TaskFive.$inject = ['dataservice', 'logger'];
    /* @ngInject */
    function TaskFive(dataservice, logger) {
        var vm = this;
        vm.showInstructions = true;
        vm.getNewList = getNewList;
        vm.toggleInstructions = toggleInstructions;
        vm.task = {
            list: [2,3,1,1,4],
            solution: 2
        };
        vm.result = {};
        
        activate();
                
        function activate() {
            vm.result = {
                count: 0, // should be the total number of stops required to reach the end of the array
                stops: []
            };
            // Let start examining the elements from the zero index of list array to the value of the zero index
            vm.result = calculateStops(0, vm.task.list[0]);
        }

        function calculateStops(from, to) {
            if (from === 0 && to > 1) {
                from++;
                to++;
            }
            // Get a slice from the original array
            var my_arr = vm.task.list.slice(from, to);
            var tmp = [];
            // Check each element and calculate the maximum index where we can get and push it in a temporary array
            for (var i = 0; i < my_arr.length; i++) {
                tmp.push((from + i) + my_arr[i]);
            }
            // Get the maximum value from "tmp" array
            var max = Math.max.apply(Math, tmp.map(function(item){ return item;}));
            // Get the last occurence of the maximum value
            var index = tmp.lastIndexOf(max);
            // Set new from and to values for the recursive function call
            var newFrom = to;
            var newTo = max + 1;
            // Update result object
            if (to > 1) {
                vm.result.stops.push({
                    index: from + index,
                    value: vm.task.list[((from + index) < vm.task.list.length) ? (from + index) : (vm.task.list.length - 1)]
                });
            }
            
            if (newFrom >= vm.task.list.length) {
                // Update result object's count variable with the length of the stops array and return with the whole object
                vm.result.count = vm.result.stops.length;
                return vm.result;
            } else {
                // We didn't reach the end of the "road" -> recursive function call
                return calculateStops(newFrom, newTo);
            }
        }

        // Optional use. Only used to present the result
        function setResult(count, stops) {
            return {
                numberOfStops: count,
                stops: stops
            };
        }

        // Optional use. Only used to present the result
        function getStopsObj(index, value) {
            return {index: index, value: value};
        }

        function getNewList() {
            var exampleArrays = [
                {
                    list: [1,2,6,6,5,6,2,4,1,3,1,6],
                    solution:4
                },
                {
                    list: [2,5,5,4,3,1,3,4,2,3,2,3],
                    solution:3
                },
                {
                    list: [3,2,6,6,5,5,1,4,2,2,3,4],
                    solution:3
                },
                {
                    list: [1,5,4,1,3,3,6,5,3,3,2,3],
                    solution:3
                },
                {
                    list: [5,4,2,3,6,2,6,5,2,6,5,2],
                    solution:3
                },
                {
                    list: [4,4,2,3,3,1,4,2,4,2,1,2],
                    solution:4
                },
                {
                    list: [5,5,6,1,2,4,3,2,6,2,5,3,
                           4,6,2,5,4,3,1,1,6,3,2,6,
                           1,3,4,4,4,3,4,5],
                    solution:8
                },
                {
                    list: [4,1,4,6,5,1,1,9,1,2,4,1,
                           9,7,5,4,7,8,4,7,2,5,6,2,
                           7,8,2,4,3,1,9,4,5,9,4,6,
                           7,3,4,4,6,7,9,7,9,7,8,1,
                           7,8,8,3,4,4,2,5,3,6,8,6,
                           8,9,5,8,4,1,9,9,6,7,1,4,
                           2,2,4,9,4,2,8,4,5,6,2,7,
                           3,5,8,2,6,9,7,5,3,6,2,3,
                           4,7,9,7,8,6,4,6,8,3,6,1,
                           4,4,3,9,4,3,7,2,4,8,5,7,
                           7,3,8,4,3,9,5,7,2,1,6,9,
                           9,4,4,5,6,3,3,8,4,3,4,1,
                           8,7,3,3,3,7,3,9],
                    solution:22
                }
            ];
            var selectedList = exampleArrays[(Math.floor(Math.random() * exampleArrays.length-1) + 1)];
            vm.task.list = selectedList.list;
            vm.task.solution = selectedList.solution;
            activate();
        }

        function toggleInstructions() {
            vm.showInstructions = !vm.showInstructions;
        }        
    }
    
})();