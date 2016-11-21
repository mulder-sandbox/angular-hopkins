(
function () {
    "use strict";

    var toBuyDef = [
        {
            name: "cookies",
            quantity: "10"
        },
        {
            name: "Milk",
            quantity: "2"
        },
        {
            name: "Donuts",
            quantity: "200"
        },
        {
            name: "Cookies",
            quantity: "300"
        },
        {
            name: "Chocolate",
            quantity: "5"
        }
    ];

    angular.module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    ToBuyController.$inject = ["$scope", "ShoppingListCheckOffService"];
    function ToBuyController($scope, ShoppingListCheckOffService) {
        $scope.getItems = function () {
            return ShoppingListCheckOffService.getToBuyItems();
        };
        $scope.isEmpty = function () {
            return ShoppingListCheckOffService.getToBuyItems().length == 0;
        };
        $scope.buyItem = function (index) {
            ShoppingListCheckOffService.buy(index);
        }
    }

    AlreadyBoughtController.$inject = ["$scope", "ShoppingListCheckOffService"];
    function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
        $scope.getItems = function () {
            return ShoppingListCheckOffService.getBoughtItems();
        };
        $scope.isEmpty = function () {
            return ShoppingListCheckOffService.getBoughtItems().length == 0;
        };
    }

    function ShoppingListCheckOffService() {
        var service = this;
        var toBuyItems = toBuyDef;
        var boughtItems = [];

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getBoughtItems = function () {
            return boughtItems;
        };

        service.buy = function (index) {
            boughtItems.push(toBuyItems[index]);
            toBuyItems.splice(index, 1);
        }
    }
}
) ();
