var app =  angular.module("timesheet.events", ["daypilot", "ngRoute"]);
app.controller('eventschedulerController', [
    '$scope',
    'hrmAPIservice',
    '$rootScope',
    'cookie',
    '$location',
    'uiGridConstants',
    '$timeout',
    '$http',
    '$routeParams',
    function ($scope, hrmAPIservice, $rootScope, cookie, $location, uiGridConstants, $timeout, $http, $routeParams) {
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
                    cellTemplate: '<a ng-click="grid.appScope.updateEmployee(row.entity.employee, $event)" class="ListItems">{{row.entity.employee}}</a>'
                },  
            ]
        };
        
        $scope.navigatorConfig = {
            selectMode: "month",
            showMonths: 3,
            skipMonths: 3,
            onTimeRangeSelected: function(args) {
                loadEvents();
            }
        };
    
        $scope.events = null;
    
        $scope.scheduler = {
            viewType: "Days",
            startDate: DayPilot.Date.today().firstDayOfMonth(),
            days: DayPilot.Date.today().daysInMonth(),
            showNonBusiness: false,
            businessBeginsHour: 9,
            businessEndsHour: 17,
            cellWidthSpec: "Auto",
            scale: "CellDuration",
            cellDuration: "15",
            useEventBoxes: "Never",
            timeFormat: 'Clock12Hours',
            timeHeaders: [
                { groupBy: "Hour" },
                { groupBy: "Cell", format: "" }
            ],
            rowHeaderColumns: [
                {title: "Date"},
                {title: "Total"}
            ],
            onBeforeEventRender: function(args) {
                if (args.data.project) {
                    args.data.html = args.data.text + " (" + args.data.project + ")";
                }
            },
            onBeforeRowHeaderRender: function(args) {
                var duration = args.row.events.totalDuration();
                if (duration.ticks > 0) {
                    args.row.columns[0].html = duration.toString("h") + "h " + duration.toString("m") + "m";
                }
            },
            onEventMoved: function(args) {
                var params = {
                    id: args.e.id(),
                    start: args.newStart.toString(),
                    end: args.newEnd.toString()
                };
                $http.post("backend_move.php", params).then(function(response) {
                    $scope.dp.message("Moved.");
                });
            },
            onEventResized: function(args) {
                var params = {
                    id: args.e.id(),
                    start: args.newStart.toString(),
                    end: args.newEnd.toString()
                };
                $http.post("backend_move.php", params).then(function(response) {
                    $scope.dp.message("Resized.");
                });
            },
            onTimeRangeSelected: function(args) {
                /*var params = {
                    start: args.start.toString(),
                    end: args.end.toString(),
                    text: "Activity",
                    resource: $scope.selectedPerson.id
                };
                $scope.dp.clearSelection();
                $http.post("backend_create.php", params).then(function(response) {
                    var data = response.data;
                    $scope.events.push({
                        id: data.id,
                        text: params.text,
                        start: params.start,
                        end: params.end
                    });
                });*/
            },
            onEventClick: function(args) {
                var modal = new DayPilot.Modal({
                    onClosed: function() {
                        loadEvents();
                    }
                });
    
                modal.showUrl("edit.html#/?id=" + args.e.id());
            }
        };
    
        $scope.onSelectedPersonChanged = function() {
            loadEvents();
        };
    
        function loadPeople() {
            //console.log("Loading people");
           /* $http.post("backend_resources.php").then(function(response) {
                var data = response.data;
                $scope.people = data;
                $scope.selectedPerson = data[0];
    
                if (!$scope.events) {
                    loadEvents();
                }
            });*/
        }
    
        function loadEvents() {
            //console.log("Loading events");
    
            /*var start = $scope.navigator.selectionStart;
            var days = start.daysInMonth();
            var end = start.addDays(days);
    
            var params = {
                start: start.toString(),
                end: end.toString(),
                resource: $scope.selectedPerson.id
            };
    
            $http.post("backend_events_resource.php", params).then(function(response) {
                var data = response.data;
                $scope.scheduler.startDate = start;
                $scope.scheduler.days = days;
                $scope.events = data;
            });*/
        }

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
            hrmAPIservice
                .send('employee_list/' + $scope.userId)
                .then(function (response) {
                    if (response.data.res == null) return;
                    $scope.employees = response.data.res;
                    var tmp = angular.copy($scope.employees);
                    $scope.gridOptionsComplexEply.data = tmp;
                    $scope.employees_length = ($scope.gridOptionsComplexEply.data.length * 31) + 71;
                    if ($scope.employees_length >= 377)
                        $scope.employees_length = 'noNeed';
                });
        }
    }
]);
