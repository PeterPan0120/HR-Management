window.isMbscDemo = true;
mobiscroll.settings = {
    lang: 'en',                                                                                                                   // Specify language like: lang: 'pl' or omit setting to use default
    theme: 'ios'                                                                                                                  // Specify theme like: theme: 'ios' or omit setting to use default
};
app.controller('eventschedulerController', [
    '$scope',
    'hrmAPIservice',
    '$rootScope',
    'cookie',
    '$location',
    'uiGridConstants',
    '$timeout',
    function ($scope, hrmAPIservice, $rootScope, cookie, $location, uiGridConstants, $timeout) {
        var userData = cookie.checkLoggedIn();
        console.log(userData);
        cookie.getPermissions();
        $scope.userId = '';
        $scope.isEmployeeListExist = true;
        $scope.employees = [];
        $scope.gridOptionsComplexEply = {
            enableFiltering: true,
            showGridFooter: false,
            showColumnFooter: false,
            onRegisterApi: function(registeredApi) {
                $scope.gridApiEply = registeredApi;
            },
            columnDefs: [
                {
                    field: 'employee',
                    width: '100%',
                    cellClass: 'center',
                    cellTemplate: '<a ng-click="grid.appScope.selectEmployee(row.entity.id, $event)" class="ListItems">{{row.entity.employee}}</a>'
                },  
            ]
        };
        $scope.events = [];
        $scope.selected_emp;
        
        $scope.init = function () {

            $scope.userId = cookie
                .getCookie('user')
                .account_id;
            var perm = cookie.getCookie("permissions");
            console.log(perm);
            if (perm['52'] == null || perm['52']==undefined) {
                $scope.isAllowed = false;
            } else {
                if (perm['52'].r == '1') {
                    $scope.isAllowed = true;
                } else 
                    $scope.isAllowed = false;
            }
            if(!$scope.isAllowed){
                cookie.deleteCookie('user');
                cookie.deleteCookie('permissions');
                $rootScope.isLoggedin = 0;
                $location.path('/');
            }
            
            $("body, html").addClass("mbsc-page-ctx");
            $('.demo-view-update-event').addClass("mbsc-comp");
            $('.demo-view-update-event').addClass("mbsc-page");
            $('.demo-view-update-event').addClass("mbsc-ios");
            $('.demo-view-update-event').addClass("mbsc-ltr");
            $('.demo-view-update-event').attr("id", "mobiscroll1561612742918");
            console.log($(".demo-view-update-event"));
            if($(".mbsc-cal-cell-i.mbsc-cal-day-i >div:nth-child(2)").length>0)
                $(".mbsc-cal-cell-i.mbsc-cal-day-i >div:nth-child(2)").css("display", "none!important");
                
            hrmAPIservice
                .send('employee_list/' + $scope.userId)
                .then(function (response) {
                    if (response.data.res == null) return;
                    $scope.employees = response.data.res;
                    $scope.selected_emp = $scope.employees[0].id;
                    var tmp = angular.copy($scope.employees);
                    $scope.gridOptionsComplexEply.data = tmp;
                    setTimeout(function(){
                        $(".grid-employees .ui-grid-row:first-child .ListItems").addClass("selected");
                    },500);
                    $scope.gridOptionsComplexEply.data = $scope.employees;
                    $scope.employees_length = ($scope.gridOptionsComplexEply.data.length * 31) + 71;
                    if ($scope.employees_length >= 377)
                        $scope.employees_length = 'noNeed';
                    getAlloacatedEvents();
                });
        }
        $scope.selectEmployee = function(emp, event) {
            if($(".grid-employees .ListItems.selected").length>0)
                $(".grid-employees .ListItems.selected").removeClass("selected");
            $(event.target).addClass('selected');
            $scope.selected_emp = emp;
            getAlloacatedEvents();
        } 
        
        
        function getAlloacatedEvents(){
            hrmAPIservice.getAllocatedEvents(userData, $scope.selected_emp).then(function(response) {
                console.log(response.data.alloc_events);
                var events = [];
                events = response.data.alloc_events;
            });
        }
    }
]);
