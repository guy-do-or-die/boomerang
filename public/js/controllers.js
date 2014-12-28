'use strict';

/* Controllers */

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function PayPalCtrl($scope, $http, $location) {
  $scope.paypal_button_key = '';
  $http.post('/keys').success(function(data) {
    $scope.paypal_button_key = data.paypal_button_key;
  })
}

function PartsCtrl($scope) {
  $scope.show_part = '';
  $scope.faq_is_active = '';
  $scope.togglePart = function(key) {
    $scope.show_part = $scope.show_part == key ? '' : key;
    $scope.faq_is_active = $scope.show_part == 'faq' ? 'active' : '';
    $scope.disclaimer_is_active = $scope.show_part == 'disclaimer' ? 'active' : '';
  }
}

function NewCallCtrl($scope, $http, $location) {
  var initInputWidth = 360,
      inputPadding = 20,
      letterWidth = 22;
  $scope.form = {phoneNumber: ''};
  $scope.message = '';
  $scope.inputStyle = {width: (initInputWidth + inputPadding) + 'px'};

  $scope.resizeInput = function () {
    var l = letterWidth*$scope.form.phoneNumber.length || initInputWidth;
    $scope.inputStyle.width = (l + inputPadding)+'px';
  };

  $scope.submitCall = function () {
    $scope.message = 'Thanks for calling! Please wait a bit...';
    $http.post('/', $scope.form).
      success(function(data) {
        if (data.msg == 'error') {
          $scope.message = 'Your number is not OK, sorry.';
        } else {
          $scope.message = capitaliseFirstLetter(data.msg) + '. Calling ' + data.to;
        }
        $location.path('/');
      });
  };
}

