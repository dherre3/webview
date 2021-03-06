var myApp=angular.module('MUHCApp');
myApp.controller('ForgotPasswordController', ['$scope', 'FirebaseService','$state','$timeout', function ($scope,FirebaseService, $state,$timeout) {
    $scope.email="";
    $scope.alert={};
    $scope.submitPasswordReset = function (email) {
        var ref = new Firebase(FirebaseService.getFirebaseUrl());
        console.log(email);
        try{
          ref.resetPassword({
            email: email
          }, function(error) {
            if (error) {
              switch (error.code) {
                case "INVALID_USER":
                  console.log("The specified user account does not exist.");
                  $timeout(function(){
                    $scope.alert.type="danger";
                    $scope.alert.content="INVALID_USER";
                  });

                  break;
                default:
                  console.log(error);
                  $timeout(function(){
                    $scope.alert.type="danger";
                    $scope.alert.content="INVALID_EMAIL";
                  });
              }
            } else {
              console.log("Password reset email sent successfully!");
              $timeout(function(){
                $scope.alert.type="success";
                $scope.alert.content="EMAILPASSWORDSENT";
              });
            }
          });
        }catch(err){
          console.log(err);
          $timeout(function(){
            $scope.alert.type="danger";
            $scope.alert.content="INVALID_EMAIL";
          });
        }


    };
}]);
