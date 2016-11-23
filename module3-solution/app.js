(
    function () {
        "use strict";
        angular.module("Chinese-Menu", [])
            .controller("NarrowItDownController", NarrowItDownController)
            .service('MenuCategoriesService', MenuCategoriesService)
            .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
            .directive('foundItems', foundItems);

        function foundItems() {
            var ddo = {
                restrict: "E",
                templateUrl: 'foundItems.html'
            };

            return ddo;
        }

        NarrowItDownController.$inject = ["$scope", "MenuCategoriesService"];
        function NarrowItDownController($scope, MenuCategoriesService) {
            $scope.searchTerm = "";
            $scope.itemFound = [];
            $scope.getMatchedMenuItems = function(searchTerm) {
                $scope.itemFound = MenuCategoriesService.getMatchedMenuItems(searchTerm).then(
                    function (itemFound) {
                        $scope.itemFound = itemFound;
                    }
                );
            }


        }

        MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
        function MenuCategoriesService($http, ApiBasePath) {
            var service = this;
            service.itemFound = [];

            service.getMatchedMenuItems = function (searchTerm) {
                return $http({
                    method: "GET",
                    url: (ApiBasePath + "/menu_items.json")
                }).then(function (response) {
                    return response.data.menu_items.filter(function (element, index, array) {
                        return element.description.toLowerCase().indexOf(searchTerm) !== -1;
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
            };

        }
    }
) ();