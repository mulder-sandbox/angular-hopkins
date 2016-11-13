(
function () {
  "use strict";
  angular.module("FoodApp", [])
  .controller("LunchChecker", function($scope) {
    $scope.isVisible = false;
    $scope.message = "";
    $scope.lunchMenu = "";
    $scope.check = function() {
      var cnt = countItems($scope.lunchMenu);
      if (cnt == 0) {
        $scope.message = "Please enter data first";
      } else if (cnt <= 3) {
        $scope.message = "Enjoy!";
      } else if (cnt > 3) {
        $scope.message = "Too much!";
      }
    };

    function countItems(userInput) {
      var menu = userInput.split(',').map(
        function(item) {
           if (item.trim().length == 0) {return 0;} else {return 1;};
        });
      return menu.reduce(function(a, b) {
        return a + b;
      }, 0);
    };
  });
}
) ();
