(
    function () {
        "use strict";
        angular.module("Chinese-Menu", [])
            .controller("NarrowItDownController", NarrowItDownController)
            .service('MenuCategoriesService', MenuCategoriesService)
            .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
            .directive('foundItems', foundItemsDirective);

        NarrowItDownController.$inject = ["MenuCategoriesService"];
        function NarrowItDownController(MenuCategoriesService) {
            var menu = this;
            var promise;
            menu.getMatchedMenuItems = function(searchTerm) {
                if (searchTerm === "") {
                    menu.itemFound = [];
                    return;
                }
                promise = MenuCategoriesService.getMatchedMenuItems(searchTerm);
                promise.then(function (response) {
                    menu.itemFound = response.data.menu_items.filter(function (element, index, array) {
                        return element.description.toLowerCase().indexOf(searchTerm) !== -1;
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
            };
            menu.onRemove = function (index) {
                menu.itemFound.splice(index, 1);
            };
            menu.isEmpty = function () {
                return menu.itemFound == undefined || menu.itemFound.length != 0;
            };
        }

        function foundItemsDirective() {
            var ddo = {
                restrict: "E",
                templateUrl: 'foundItems.html',
                scope: {
                    itemFound: '<',
                    onRemove: '&',
                    isEmpty: '&'
                }
            };
            return ddo;
        }

        MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
        function MenuCategoriesService($http, ApiBasePath) {
            var service = this;
            service.itemFound = [];

            service.getMatchedMenuItems = function (searchTerm) {
                return $http({
                    method: "GET",
                    url: (ApiBasePath + "/menu_items.json")
                });
            };
        }
    }
) ();