function CallCtrl($scope, $http) {
  $scope.msg = '';

  $scope.fireCall = function() {
    var phone = $scope.phoneNumber || '', 
        phone_is_valid = true;

    $scope.msg = '';

    if (! phone.match(/^sip:.*@.*$/i) ) {
      phone = phone.replace(/[^0-9]/g, '');
      if (phone.length < 11) phone_is_valid = false; 
    }
    if (phone_is_valid) {
      $http.post('/', {phoneNumber: $scope.phoneNumber}).
        success(function(data, status, headers, config) {
          console.log(data);
          console.log(console);
          console.log(headers);
          console.log(config);
        });
    } else {
      $scope.msg = 'Enter a valid sip number or at least 11-digit length number please :)';
    }
  };
}
