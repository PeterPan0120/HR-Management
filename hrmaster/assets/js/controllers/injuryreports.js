app.controller('injuryreportsController', [
    '$scope',
    'hrmAPIservice',
    '$rootScope',
    'cookie',
    '$location',
    'uiGridConstants',
    function ($scope, hrmAPIservice, $rootScope, cookie, $location, uiGridConstants) {
        var userData = cookie.checkLoggedIn();
        cookie.getPermissions();
        
        /*var directUserHome = function(usertype) {
            switch(parseInt(usertype)) {
                case 17: $location.path("/administrator"); break;
                case 18: $location.path("/manager"); break;
                case 19: $location.path("/employer"); break;
                case 281: $location.path("/learner"); break;
            }
         
        }
        
        if (angular.isUndefined($rootScope.perms['injuryreports'])) {
            directUserHome(userData.usertype_id);
        } else {
            if (parseInt($rootScope.perms['injuryreports'].read) == 0) {
                directUserHome(userData.usertype_id);
            }
        }
        */
        
        $scope.userId = '';
        
        var barchartOption = {
            plugins: {
                datalabels: {
                    display: false
                }
            },
            maintainAspectRatio: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            stepSize: 1
                        }
                    }
                ]
            },
        };
        
        
        var barTipOption = {
            plugins: {
                datalabels: {
                    display: false
                }
            },
            maintainAspectRatio: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        }
                    }
                ]
            },
            legend: {
                display: true,
                labels: {
                    fontColor: 'rgb(0, 0, 0)'
                }
            }
        };
        var pieTipOption = {
            plugins: {
                datalabels: {
                    display: false
                }
            },
            maintainAspectRatio: false,
            legend: {
                display: true,
                position: 'top',
                fullWidth: true,
                labels: {
                    fontColor: 'rgb(0, 0, 0)',
                    fontSize: 10,
                    boxWidth: 20
                }
            }
        };
        
        $scope.injuryList = [];
        $scope.injuryListMaster = [];
        $scope.totalBarLabels = [];
        $scope.totalBarData = [];
        $scope.filter = {};

        $scope.totalBarColors = [];
        $scope.blueColor = {
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            pointBackgroundColor: 'rgba(54, 162, 235, 1)'
        };
        $scope.redColor = {
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointBackgroundColor: 'rgba(255,99,132,1)'
        };

        $scope.departmentBarLabels = [];
        $scope.departmentBarData = [];
        $scope.departmentBarColors = [];
        
        $scope.LocationBarData = [];
        $scope.LocationBarLabels = [];

        $scope.departmentPieHeight = '150px';
        $scope.departmentPieData = [];
        $scope.departmentPieLabels = [];
        $scope.departmentPieOptions = pieTipOption;

        $scope.locationPieHeight = '150px';
        $scope.locationPieData = [];
        $scope.locationPieLabels = [];
        $scope.locationPieOptions = pieTipOption;

        $scope.compensationBarData = [];
        $scope.compensationBarLabels = [];
        $scope.compensationBarSeries = [];
        $scope.compensationBarColors = [];

        $scope.departmentCompensationHeight = '150px';
        $scope.departmentCompensationData = [];
        $scope.departmentCompensationLabels = [];
        $scope.departmentCompensationBarSeries = ['Salary', 'Bonus', 'Overtime', 'Commission'];
        $scope.departmentCompensationOptions = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        stacked: true
                    }
                ],
                yAxes: [
                    {
                        stacked: true
                    }
                ]

            },
            legend: {
                display: true,
                labels: {
                    fontColor: 'rgb(0, 0, 0)'
                }
            }
        };
        $scope.departmentCompensationColors = [
            {
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                pointBackgroundColor: 'rgba(255,99,132,1)'
            }, {
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                pointBackgroundColor: 'rgba(75, 192, 192, 1)'
            }, {
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                pointBackgroundColor: 'rgba(54, 162, 235, 1)'
            }, {
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                pointBackgroundColor: 'rgba(153, 102, 255, 1)'
            }
        ];
        
        $scope.departmentBarOptions = barchartOption;
        $scope.locationBarOptions = barchartOption;

        $scope.baseSalaryData = [];
        $scope.baseSalaryLabels = [];

        $scope.employee = [];

        $scope.currentYear = null;
        $scope.currentLocation = null;
        $scope.currentDepartment = null;
        $scope.currentEmployee = null;

        $scope.userCountForYear = [];
        $scope.isAllowed = false;
        $scope.isYearListExist = false;

        $scope.gridOptionsComplexDprt = {
            enableFiltering: true,
            showGridFooter: false,
            showColumnFooter: false,
            onRegisterApi: function onRegisterApi(registeredApi) {
                gridApi = registeredApi;
            },
            columnDefs: [
                {
                    field: 'department',
                    width: '100%',
                    cellClass: 'center',
                    cellTemplate: '<a ng-click="grid.appScope.updateDepartment(row.entity.id)" class="ListItems">{{row.entity.department}}</a>'
                }
            ]
        };
        $scope.gridOptionsComplexLtn = {
            enableFiltering: true,
            showGridFooter: false,
            showColumnFooter: false,
            onRegisterApi: function onRegisterApi(registeredApi) {
                gridApi = registeredApi;
            },
            columnDefs: [
                {
                    field: 'location',
                    width: '100%',
                    cellClass: 'center',
                    cellTemplate: '<a ng-click="grid.appScope.updateLocation(row.entity.id)" class="ListItems">{{row.entity.location}}</a>'
                }
            ]
        };
        $scope.gridOptionsComplexEply = {
            enableFiltering: true,
            showGridFooter: false,
            showColumnFooter: false,
            onRegisterApi: function onRegisterApi(registeredApi) {
                gridApi = registeredApi;
            },
            columnDefs: [
                {
                    field: 'employee',
                    width: '100%',
                    cellClass: 'center',
                    cellTemplate: '<a ng-click="grid.appScope.updateEmployee(row.entity.id)" class="ListItems">{{row.entity.employee}}</a>'
                },  
            ]
        };
        
        $scope.gridOptionsComplexPosition = {
            enableFiltering: true,
            showGridFooter: false,
            showColumnFooter: false,
            onRegisterApi: function onRegisterApi(registeredApi) {
                gridApi = registeredApi;
            },
            columnDefs: [
                {
                    field: 'position',
                    width: '100%',
                    cellClass: 'center',
                    cellTemplate: '<a ng-click="grid.appScope.updatePosition(row.entity.id)" class="ListItems">{{row.entity.position}}</a>'
                },  
            ]
        };
        
        
        $scope.gridOptionsComplexInjNature = {
            enableFiltering: true,
            showGridFooter: false,
            showColumnFooter: false,
            onRegisterApi: function onRegisterApi(registeredApi) {
                gridApi = registeredApi;
            },
            columnDefs: [
                {
                    field: 'display_text',
                    displayName: 'Nature of Injury',
                    width: '100%',
                    cellClass: 'center',
                    cellTemplate: '<a ng-click="grid.appScope.updateInjuryNature(row.entity.id)" class="ListItems">{{row.entity.display_text}}</a>'
                },      
            ]
        };
        $scope.gridOptionsComplexInjMech = {
            enableFiltering: true,
            showGridFooter: false,
            showColumnFooter: false,
            onRegisterApi: function onRegisterApi(registeredApi) {
                gridApi = registeredApi;
            },
            columnDefs: [
                {
                    field: 'display_text',
                    displayName: 'Mechanism of Injury',
                    width: '100%',
                    cellClass: 'center',
            cellTemplate: '<a ng-click="grid.appScope.updateInjuryMechanism(row.entity.id)" class="ListItems">{{row.entity.display_text}}</a>'
        },  
            ]
        };        
        
        $scope.isEmployeeListExist = true;
        $scope.isDepartmentListExist = true;
        $scope.isLocationListExist = true;
        $scope.isPositionListExist = true;
        $scope.isInjuryNatureListExist = true;
        $scope.isInjuryMechanismListExist = true;
        
        $scope.selected_department_id = 0;
        $scope.selected_location_id = 0;
        $scope.selected_employee_id = 0;
        $scope.selected_position_id = 0;
        $scope.selected_mechanism_id = 0;
        $scope.selected_nature_id = 0;
        
        var formatDate = function(date) {
            var mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
            var dte = new Date(parseInt(date));
            var d = dte.getDate();
            var m = mlist[dte.getMonth()];

            return m + '-' + dte.getFullYear();        
        }        
        
        var buildInjuryByDepartmentGraph = function(deptId) {
            $scope.selectedDepartment = $scope.departments.filter(function(dept) {
                return parseInt(dept.id) == parseInt(deptId);
            });
           
            $scope.departmentBarLabels = [];
            $scope.departmentBarData = [];
            $scope.departmentBarColors = [];
            var obj = {};
            var timeArr = {};
            var dateMth;
            
            deptId = parseInt(deptId);
            var sDate = (angular.isUndefined($scope.filter.date_from) || $scope.filter.date_from == null) ? $scope.injuryList[0].incident_date : $scope.filter.date_from;
            var eDate = (angular.isUndefined($scope.filter.date_to)  || $scope.filter.date_to == null) ? $scope.injuryList[$scope.injuryList.length - 1].incident_date : $scope.filter.date_to;
            var start = new Date(sDate);
            var end = new Date(eDate);
            while (start.getTime() <= end.getTime()) {
                timeArr[formatDate(start.getTime())] = 0;
                start.setMonth(start.getMonth() + 1);
            }
  
            var ts = 0;
            for(var i=0; i<$scope.injuryList.length; i++) {
                
                if (parseInt($scope.selected_employee_id) > 0) {
                    if ($scope.selected_employee_id != parseInt($scope.injuryList[i].employee_id)) {
                        continue;
                    }
                }
                
                if (parseInt($scope.selected_mechanism_id) > 0) {
                    if ($scope.selected_mechanism_id != parseInt($scope.injuryList[i].mechanismofinjury_id)) {
                        continue;
                    }
                }
                if (parseInt($scope.selected_nature_id) > 0) {
                    if ($scope.selected_nature_id != parseInt($scope.injuryList[i].natureofinjury_id)) {
                        continue;
                    }
                }                
                
                               
                if (parseInt($scope.injuryList[i].department_id) == deptId || deptId == 0) {
                    dateMth =  $scope.injuryList[i].IncidentDateMth;
                    if (angular.isUndefined(obj[dateMth])) {
                        obj[dateMth] = 0;
                    }
                    var ts = new Date($scope.injuryList[i].incident_date);
                    ts.setDate(1);
                    var timestamp = ts.getTime();
                    obj[dateMth]++;
                    if (angular.isDefined(timeArr[formatDate(timestamp)])) {
                        timeArr[formatDate(timestamp)]++;
                    }
                }
            }
            
            for (var key in timeArr) {
                if (timeArr.hasOwnProperty(key)) {
                    $scope.departmentBarLabels.push(key);
                    $scope.departmentBarData.push(timeArr[key]);
                    //$scope.departmentBarColors.push($scope.blueColor);
                }
            }          
        }
        
        const buildInjuryByLocationGraph = function(locId){ 
            $scope.selectedLocation = $scope.locations.filter(function(loc) {
                return parseInt(loc.id) == parseInt(locId);
            });
           
            $scope.locationBarLabels = [];
            $scope.locationBarData = [];
            $scope.locationBarColors = [];
            var obj = {};
            var timeArr = {};
            var dateMth;
            
            locId = parseInt(locId);
            var sDate = (angular.isUndefined($scope.filter.date_from) || $scope.filter.date_from == null) ? $scope.injuryList[0].incident_date : $scope.filter.date_from;
            var eDate = (angular.isUndefined($scope.filter.date_to)  || $scope.filter.date_to == null) ? $scope.injuryList[$scope.injuryList.length - 1].incident_date : $scope.filter.date_to;
            var start = new Date(sDate);
            var end = new Date(eDate);
            while (start.getTime() <= end.getTime()) {
                timeArr[formatDate(start.getTime())] = 0;
                start.setMonth(start.getMonth() + 1);
            }
  
            var ts = 0;
            for(var i=0; i<$scope.injuryList.length; i++) {   
                
                if (parseInt($scope.selected_employee_id) > 0) {
                    if ($scope.selected_employee_id != parseInt($scope.injuryList[i].employee_id)) {
                        continue;
                    }
                }
                if (parseInt($scope.selected_mechanism_id) > 0) {
                    if ($scope.selected_mechanism_id != parseInt($scope.injuryList[i].mechanismofinjury_id)) {
                        continue;
                    }
                }
                if (parseInt($scope.selected_nature_id) > 0) {
                    if ($scope.selected_nature_id != parseInt($scope.injuryList[i].natureofinjury_id)) {
                        continue;
                    }
                }                  
                
                if (parseInt($scope.injuryList[i].SLOC) == locId || locId == 0) {
                    dateMth =  $scope.injuryList[i].IncidentDateMth;
                    if (angular.isUndefined(obj[dateMth])) {
                        obj[dateMth] = 0;
                    }
                    var ts = new Date($scope.injuryList[i].incident_date);
                    ts.setDate(1);
                    var timestamp = ts.getTime();
                    obj[dateMth]++;
                    if (angular.isDefined(timeArr[formatDate(timestamp)])) {
                        timeArr[formatDate(timestamp)]++;
                    }
                }
            }
            
            for (var key in timeArr) {
                if (timeArr.hasOwnProperty(key)) {
                    $scope.locationBarLabels.push(key);
                    $scope.locationBarData.push(timeArr[key]);
                    //$scope.departmentBarColors.push($scope.blueColor);
                }
            }          
        }        
        
        const updateInjuryListGrid = function() {
            // Update the Injury list grid
            $scope.gridOptionsComplex.data = $scope.injuryListMaster.filter(function(injury) {
                var deptOK = ($scope.selected_department_id == 0 || injury.department_id == $scope.selected_department_id) ? true : false;
                var locationOK = ($scope.selected_location_id == 0 || injury.SLOC == $scope.selected_location_id) ? true : false;
                var employeeOK = ($scope.selected_employee_id == 0 || injury.employee_id == $scope.selected_employee_id) ? true : false;
                var positionOK = ($scope.selected_position_id == 0 || injury.position_id == $scope.selected_position_id) ? true : false;
                var mechanismOK = ($scope.selected_mechanism_id == 0 || injury.mechanismofinjury_id == $scope.selected_mechanism_id) ? true : false;
                var natureOK = ($scope.selected_nature_id == 0 || injury.natureofinjury_id == $scope.selected_nature_id) ? true : false;
                
                return (deptOK  && locationOK && employeeOK && positionOK && mechanismOK && natureOK);
            });              
        }
        
        $scope.updateDepartment = function(dept) {
            buildInjuryByDepartmentGraph(dept);
            $scope.selected_department_id = dept;

            updateInjuryListGrid();            
        }
        
        $scope.updateLocation = function(loc) {
            buildInjuryByLocationGraph(loc);
            $scope.selected_location_id = loc;
           
            updateInjuryListGrid();             
        }
        
        $scope.updateEmployee = function(emp) {
            $scope.selected_employee_id = emp;
            $scope.updateReport();
        } 
        
        $scope.updatePosition = function(pos) {
            $scope.selected_position_id = pos;
            updateInjuryListGrid();             
        }        
        
        
        $scope.updateInjuryMechanism = function(id) {
            $scope.selected_mechanism_id = id;
            $scope.updateReport();
        }
        
        $scope.updateInjuryNature = function(id) {
            $scope.selected_nature_id = id;
            $scope.updateReport();
        }
        
        $scope.updateReport = function() {
            buildInjuryByDepartmentGraph($scope.selectedDepartment[0].id);
            buildInjuryByDepartmentPie();
            buildInjuryByLocationGraph($scope.selectedLocation[0].id);
            buildInjuryByLocationPie();
            
            updateInjuryListGrid();
        }
        
        const getDepartment = function(id){
            var dept = $scope.departments.filter(function(dept) {
                return parseInt(dept.id) == parseInt(id);
            }); 
            return dept[0].department;
        }
        const getLocation = function(id){  
            var location = $scope.injuryList.filter(function(loc) {
                return parseInt(loc.SLOC) == parseInt(id);
            }); 
            
            return (angular.isDefined(location[0])) ? location[0].LocationName : '';
        }        
        
        const buildInjuryByDepartmentPie = function(){
            $scope.departmentPieLabels = [];
            $scope.departmentPieData = [];
            var obj = {};
            var timeArr = {};
            var dateMth;
            
            //deptId = parseInt(deptId);
            var sDate = (angular.isUndefined($scope.filter.date_from) || $scope.filter.date_from == null) ? $scope.injuryList[0].incident_date : $scope.filter.date_from;
            var eDate = (angular.isUndefined($scope.filter.date_to)  || $scope.filter.date_to == null) ? $scope.injuryList[$scope.injuryList.length - 1].incident_date : $scope.filter.date_to;
            var start = new Date(sDate);
            var end = new Date(eDate);
            while (start.getTime() <= end.getTime()) {
                timeArr[formatDate(start.getTime())] = 0;
                start.setMonth(start.getMonth() + 1);
            }
  
            var ts = 0;
            var total = 0;
            var department = {};
            for(var i=0; i<$scope.injuryList.length; i++) {         
                    dateMth =  $scope.injuryList[i].IncidentDateMth;
                    if (angular.isUndefined(obj[dateMth])) {
                        obj[dateMth] = 0;
                    }
                    var ts = new Date($scope.injuryList[i].incident_date);
                    ts.setDate(1);
                    var timestamp = ts.getTime();
                    obj[dateMth]++;
                    if (angular.isDefined(timeArr[formatDate(timestamp)])) {
                        timeArr[formatDate(timestamp)]++;
                        if (angular.isUndefined(department[$scope.injuryList[i].department_id])) {
                            department[$scope.injuryList[i].department_id] = 0;
                        }
                        department[$scope.injuryList[i].department_id]++;
                        total++;
                    }
            }
            
            for (var key in department) {
                if (department.hasOwnProperty(key)) {
                    var num = parseInt(department[key]);
                    var perc = (num / total) * 100;
                    var label = getDepartment(key) + "(" + num + ") " + perc.toFixed(2) + "%";
                    $scope.departmentPieLabels.push(label);
                    $scope.departmentPieData.push(num);
                }
            } 
        }
        
        const buildInjuryByLocationPie = function(){
            $scope.locationPieLabels = [];
            $scope.locationPieData = [];
            var obj = {};
            var timeArr = {};
            var dateMth;
            
            //deptId = parseInt(deptId);
            var sDate = (angular.isUndefined($scope.filter.date_from) || $scope.filter.date_from == null) ? $scope.injuryList[0].incident_date : $scope.filter.date_from;
            var eDate = (angular.isUndefined($scope.filter.date_to)  || $scope.filter.date_to == null) ? $scope.injuryList[$scope.injuryList.length - 1].incident_date : $scope.filter.date_to;
            var start = new Date(sDate);
            var end = new Date(eDate);
            while (start.getTime() <= end.getTime()) {
                timeArr[formatDate(start.getTime())] = 0;
                start.setMonth(start.getMonth() + 1);
            }
  
            var ts = 0;
            var total = 0;
            var location = {};
            for(var i=0; i<$scope.injuryList.length; i++) {         
                    dateMth =  $scope.injuryList[i].IncidentDateMth;
                    if (angular.isUndefined(obj[dateMth])) {
                        obj[dateMth] = 0;
                    }
                    var ts = new Date($scope.injuryList[i].incident_date);
                    ts.setDate(1);
                    var timestamp = ts.getTime();
                    obj[dateMth]++;
                    if (angular.isDefined(timeArr[formatDate(timestamp)])) {
                        timeArr[formatDate(timestamp)]++;
                        if (angular.isUndefined(location[$scope.injuryList[i].SLOC])) {
                            location[$scope.injuryList[i].SLOC] = 0;
                        }
                        location[$scope.injuryList[i].SLOC]++;
                        total++;
                    }
            }
            
            for (var key in location) {
                if (location.hasOwnProperty(key)) {
                    var num = parseInt(location[key]);
                    var perc = (num / total) * 100;
                    var label = getLocation(key) + "(" + num + ") " + perc.toFixed(2) + "%";
                    $scope.locationPieLabels.push(label);
                    $scope.locationPieData.push(num);
                }
            } 
        }        
        
        $scope.gridOptionsComplex = {
            enableFiltering: true,
            showGridFooter: true,
            showColumnFooter: false,
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            onRegisterApi: function onRegisterApi(registeredApi) {
                gridApi = registeredApi;
            },
            columnDefs: [
              { name: 'id', visible: false },
              { name: 'injuredName', width: '20%',enableFiltering: false, },
              { name: 'incident_date', width: '15%', cellClass: 'center', type: 'date', cellFilter: 'date:"dd/MM/yyyy"',enableFiltering: false,  },
              { name: 'LocationName', width: '20%', cellClass: 'center',enableFiltering: false, },
              { name: 'Nature', width: '20%', cellClass: 'center', displayName: 'Nature of Injury',enableFiltering: false, },
              { name: 'Mechanism', width: '25%', cellClass: 'center', displayName: 'Mechanism of Injury',enableFiltering: false, },
              { name: 'action', enableFiltering: false, width: '10%',  cellClass: 'center', enableCellEdit: false, visible: false,
                  cellTemplate: '<div class="ui-grid-cell-contents grid-center-cell"><div ng-click="grid.appScope.editInjury(row.entity)"><span class="glyphicon glyphicon-edit text-edit"></span></div>&nbsp;&nbsp;&nbsp;<div ng-click="grid.appScope.completeInjury(row.entity)" ng-hide="row.entity.is_complete == 1"><span class="glyphicon glyphicon-ok text-success" title="Mark injury as complete"></span></div></div>'
              }
            ]
        };        
        
        $scope.init = function () {

            $scope.userId = cookie
                .getCookie('user')
                .account_id;

            var perm = cookie.getCookie("permissions");
            console.log(perm);
            if (perm['49'] == null || perm['49']==undefined) {
                $scope.isAllowed = false;
            } else {
                if (perm['49'].r == '1') {
                    $scope.isAllowed = true;
                } else 
                    $scope.isAllowed = false;
                }
            if(!$scope.isAllowed){
                console.log("AAAAAAAAAAAAAAAA");
                cookie.deleteCookie('user');
                cookie.deleteCookie('permissions');
                $rootScope.isLoggedin = 0;
                $location.path('/');
            }
            var temp = [];
            for (var i = 0; i < 9; i++) {
                temp.push($scope.blueColor);
            }
            
            hrmAPIservice.getWHSReportData(userData).then(function(response) {
                
                $scope.injuryList = angular.copy(response.data.injuries);
                $scope.injuryListMaster = angular.copy(response.data.injuries);
                $scope.gridOptionsComplex.data = angular.copy(response.data.injuries);
                
                // Departments
                $scope.departments = angular.copy(response.data.departments);
                $scope.gridOptionsComplexDprt.data = angular.copy($scope.departments);
                $scope.department_length = ($scope.gridOptionsComplexDprt.data.length * 31) + 71;
                if ($scope.department_length >= 377) {
                    $scope.department_length = 'noNeed';
                }

                $scope.currentDepartment = $scope.departments[0].department;

                $scope.sendDprtReq($scope.departments[0]);    
                
                // Locations
                $scope.locations = angular.copy(response.data.locations);
                $scope.gridOptionsComplexLtn.data = angular.copy($scope.locations);
                $scope.location_length = ($scope.gridOptionsComplexLtn.data.length * 31) + 71;
                if ($scope.location_length >= 377) {
                    $scope.location_length = 'noNeed';
                }
                $scope.currentLocation = $scope.locations[0].location;
                $scope.sendLctnReq($scope.locations[0]);
                
                // Employees
                $scope.employees = angular.copy(response.data.employees);
                $scope.gridOptionsComplexEply.data = angular.copy($scope.employees);
                $scope.employees_length = ($scope.gridOptionsComplexEply.data.length * 31) + 71;
                if ($scope.employees_length >= 377) {
                    $scope.employees_length = 'noNeed';
                }
                $scope.sendEmployee($scope.employees[0].id);
                
                // Positions
                $scope.positions = angular.copy(response.data.positions);
                $scope.gridOptionsComplexPosition.data = angular.copy($scope.positions);
                $scope.positions_length = ($scope.gridOptionsComplexPosition.data.length * 31) + 71;
                if ($scope.positions_length >= 377) {
                    $scope.positions_length = 'noNeed';
                }           
                
                
                // Injury Nature
                $scope.nature = angular.copy(response.data.injurynature);
                $scope.gridOptionsComplexInjNature.data = angular.copy($scope.nature);
                $scope.nature_length = ($scope.gridOptionsComplexInjNature.data.length * 31) + 71;
                if ($scope.nature_length >= 377) {
                    $scope.nature_length = 'noNeed';
                }   
                
                // Injury Mechanism
                $scope.mechanism = angular.copy(response.data.mechanism);
                $scope.gridOptionsComplexInjMech.data = angular.copy($scope.mechanism);
                $scope.mech_length = ($scope.gridOptionsComplexInjMech.data.length * 31) + 71;
                if ($scope.mech_length >= 377) {
                    $scope.mech_length = 'noNeed';
                }
                
                buildInjuryByDepartmentGraph(0);
                buildInjuryByDepartmentPie();
                buildInjuryByLocationGraph(0);
                buildInjuryByLocationPie();

            });
        }

        $scope.GoBack = function () {
            $location.path('/');
        }
        $scope.sendDprtReq = function (param) {
            $scope.currentDepartment = param.department;
            hrmAPIservice
                .send("department/" + param.id + '/' + $scope.userId)
                .then(function (response) {
                    if (response.data.res == null) {
                        return;
                    }
                    var temp = response.data.res,
                        temp_data = [],
                        temp_year = [],
                        j = 0;

                    for (var i = parseInt(temp[0].year); i <= parseInt(temp[temp.length - 1].year); i++) {
                        temp_year.push(i);
                        if (parseInt(temp[j].year) == i) {
                            temp_data.push(temp[j].count);
                            j++;
                        } else {
                            temp_data.push(0);
                        }
                    }
                    //$scope.departmentBarLabels = temp_year;
                    //$scope.departmentBarData = temp_data;
                    // console.log("response total", response.data.res);
                });
            return;
        }

        $scope.sendLctnReq = function (param) {
            $scope.currentLocation = param.location;
            hrmAPIservice
                .send("location/" + param.id + '/' + $scope.userId)
                .then(function (response) {
                    if (response.data.res == null) {
                        return;
                    }
                    var temp = response.data.res,
                        temp_data = [],
                        temp_year = [],
                        j = 0;

                    for (var i = parseInt(temp[0].year); i <= parseInt(temp[temp.length - 1].year); i++) {
                        temp_year.push(i);
                        if (parseInt(temp[j].year) == i) {
                            temp_data.push(temp[j].count);
                            j++;
                        } else {
                            temp_data.push(0);
                        }
                    }
                    $scope.LocationBarLabels = temp_year;
                    $scope.LocationBarData = temp_data;
                    // console.log("response total", response.data.res);
                });
            return;

        }

        $scope.sendYrReq = function (param) {
            if ($scope.currentEmployee != null) {
                hrmAPIservice
                    .send("selectedEply/" + $scope.currentEmployee + "/" + param + '/' + $scope.userId)
                    .then(function (response) {
                        if (response.data.res == null) {
                            //alert('There is no record that matches.');
                            $scope.employeeName = null;
                            $scope.employee = [];
                            return;
                        }
                        var temp = response.data.res.employee_data;
                        temp['Name'] = temp['firstname'] + ' ' + temp['lastname'];
                        temp['Base Salary'] = temp['annual_rate'];

                        temp["Annual Leave"] = parseFloat(temp["Annual Leave"]).toFixed(2);
                        temp["Base Salary"] = parseFloat(temp["Base Salary"]).toFixed(2);
                        temp["Bonus"] = parseFloat(temp["Bonus"]).toFixed(2);
                        temp["Commission"] = parseFloat(temp["Commission"]).toFixed(2);
                        temp["Overtime"] = parseFloat(temp["Overtime"]).toFixed(2);
                        temp["Sick Days"] = parseFloat(temp["Sick Days"]).toFixed(2);
                        temp["Total Comp."] = parseFloat(temp["Total Comp."]).toFixed(2);

                        $scope.employee = temp;
                        $scope.employeeName = $scope.employee['Name'];
                        delete $scope.employee.Name;
                        //console.log("response ", response.data.res);
                    });

            }
            $scope.currentYear = param;
            // console.log("param ", param);
            /*hrmAPIservice
                .send("department_count/" + param + '/' + $scope.userId)
                .then(function (response) {
                    if (response.data.res == null) {
                        $scope.departmentPieData = [];
                        $scope.departmentPieLabels = [];
                        return;
                    }
                    //  console.log('response',response.data.res);
                    var PieData = PieCommon_calc(response.data.res);
                    var legendHeight = Math.round(PieData.label.length / 2.4) * 30;
                    legendHeight = legendHeight > 50 ? legendHeight : 50;

                    $scope.departmentPieData = PieData.data;
                    $scope.departmentPieLabels = PieData.label;
                    $scope.departmentPieHeight = legendHeight + 120 + 'px';
                });
            /*hrmAPIservice
                .send("location_count/" + param + '/' + $scope.userId)
                .then(function (response) {
                    if (response.data.res == null) {
                        $scope.locationPieData = [];
                        $scope.locationPieLabels = [];
                        return;
                    }
                    var PieData = PieCommon_calc(response.data.res);
                    var legendHeight = Math.round(PieData.label.length / 1.8) * 30;
                    legendHeight = legendHeight > 50 ? legendHeight : 50;

                    $scope.locationPieData = PieData.data;
                    $scope.locationPieLabels = PieData.label;
                    $scope.locationPieHeight = legendHeight + 120 + 'px';
                });
            /*hrmAPIservice
                .send("department_compensation_count/" + param + '/' + $scope.userId)
                .then(function (response) {
                    if (response.data.res == null) {
                        $scope.departmentCompensationData = [];
                        $scope.departmentCompensationLabels = [];
                        return;
                    }
                    var label = [],
                        data = [];
                    data[0] = [];
                    data[1] = [];
                    data[2] = [];
                    data[3] = [];
                    var temp = response.data.res;
                    for (var i = 0; i < temp.length; i++) {
                        label.push(temp[i].name);
                        data[0].push(temp[i].salary);
                        data[1].push(temp[i].bonus);
                        data[2].push(temp[i].overtime);
                        data[3].push(temp[i].commission);
                    }
                    $scope.departmentCompensationData = data;
                    $scope.departmentCompensationLabels = label;
                    $scope.departmentCompensationHeight = (25 * temp.length ) > 150 ? (25 * temp.length ) : 150;
                    $scope.departmentCompensationHeight += 'px';
                });
           /* hrmAPIservice
                .send("location_compensation_count/" + param + '/' + $scope.userId)
                .then(function (response) {
                    if (response.data.res == null) {
                        $scope.locationCompensationData = [];
                        $scope.locationCompensationLabels = [];
                        return;
                    }
                    var label = [],
                        data = [];
                    data[0] = [];
                    data[1] = [];
                    data[2] = [];
                    data[3] = [];
                    var temp = response.data.res;
                    for (var i = 0; i < temp.length; i++) {
                        label.push(temp[i].name);
                        data[0].push(temp[i].salary);
                        data[1].push(temp[i].bonus);
                        data[2].push(temp[i].overtime);
                        data[3].push(temp[i].commission);
                    }
                    
                    $scope.locationCompensationData = data;
                    $scope.locationCompensationLabels = label;
                    $scope.locationCompensationHeight = (43 * temp.length) > 150 ? (43 * temp.length) : 150;
                    $scope.locationCompensationHeight += 'px';
                });
            hrmAPIservice
                .send("base_salary_count/" + param + '/' + $scope.userId)
                .then(function (response) {
                    if (response.data.res == null) {
                        $scope.baseSalaryData = [];
                        return;
                    }
                    $scope.baseSalaryLabels = response.data.res.label;
                    $scope.baseSalaryData = response.data.res.data;
                    //      console.log("response ",response.data.res);
                });
            hrmAPIservice
                .send("total_salary_count/" + param + '/' + $scope.userId)
                .then(function (response) {
                    if (response.data.res == null) {
                        //alert('There is no record that matches.');
                        temp = [];
                        temp['Total Employees'] = '0';
                        temp['Average Salary'] = '0';
                        temp['Average Sick Days per Emp'] = '0';
                        return;
                    }
                    var temp = response.data.res.total_data,
                        temp_employees = [];
                    for (var i = 0; i < $scope.userCountForYear.length; i++) {
                        if ($scope.userCountForYear[i].year == param) {
                            temp['Total Employees'] = $scope.userCountForYear[i].count;
                            break;
                        }
                    }
                    if (temp['Total Employees'] == null) {
                        temp['Total Employees'] = 0;
                    }
                    temp['Average Salary'] = temp['Total Salaries'] == null
                        ? 0
                        : temp['Total Salaries'] / temp['Total Employees'];
                    temp['Average Sick Days per Emp'] = temp['Total Sick Days'] == null
                        ? 0
                        : temp['Total Sick Days'] / temp['Total Employees'];
                    
                    temp["Average Salary"] = parseFloat(temp["Average Salary"]).toFixed(2);
                    temp["Average Sick Days per Emp"] = parseFloat(temp["Average Sick Days per Emp"]).toFixed(2);
                    temp["Total Bonuses"] = parseFloat(temp["Total Bonuses"]).toFixed(2);
                    temp["Total Commissions"] = parseFloat(temp["Total Commissions"]).toFixed(2);
                    temp["Total Compensations"] = parseFloat(temp["Total Compensations"]).toFixed(2);
                    temp["Total Overtimes"] = parseFloat(temp["Total Overtimes"]).toFixed(2);
                    temp["Total Salaries"] = parseFloat(temp["Total Salaries"]).toFixed(2);
                    temp["Total Sick Days"] = parseFloat(temp["Total Sick Days"]).toFixed(2);

                    $scope.summary = temp;
                });*/
            return;
        }
        $scope.sendEmployee = function (param) {
            $scope.currentEmployee = param;
            if ($scope.currentYear != null) {
                hrmAPIservice
                    .send("selectedEply/" + param + "/" + $scope.currentYear + '/' + $scope.userId)
                    .then(function (response) {
                        if (response.data.res == null) {
                            //alert('There is no record that matches.');
                            $scope.employee = [];
                            $scope.employeeName = null;
                            return;
                        }
                        var temp = response.data.res.employee_data;
                        temp['Name'] = temp['firstname'] + ' ' + temp['lastname'];
                        temp['Base Salary'] = temp['annual_rate'];

                        temp["Annual Leave"] = parseFloat(temp["Annual Leave"]).toFixed(2);
                        temp["Base Salary"] = parseFloat(temp["Base Salary"]).toFixed(2);
                        temp["Bonus"] = parseFloat(temp["Bonus"]).toFixed(2);
                        temp["Commission"] = parseFloat(temp["Commission"]).toFixed(2);
                        temp["Overtime"] = parseFloat(temp["Overtime"]).toFixed(2);
                        temp["Sick Days"] = parseFloat(temp["Sick Days"]).toFixed(2);
                        temp["Total Comp."] = parseFloat(temp["Total Comp."]).toFixed(2);

                        $scope.employee = temp;
                        $scope.employeeName = $scope.employee['Name'];
                        delete $scope.employee.Name;
              //console.log("response ", response.data.res);          
                    });

            }

            hrmAPIservice
                .send("total_Compensation/" + param + '/' + $scope.userId)
                .then(function (response) {
                    if (response.data.res == null) {
                        return;
                    }
                    var temp = [],
                        temp_label = [],
                        temp_data = [],
                        j = 0,
                        color = [];
                    temp = response.data.res
                    if (temp.length == 0) {
                        return;
                    }

                    for (var i = parseInt(temp[0].year); i <= parseInt(temp[temp.length - 1].year); i++) {
                        color.push($scope.blueColor);
                        temp_label.push(i);
                        if (temp[j].year != i) {
                            color.push($scope.blueColor);
                            temp_data.push('');
                        } else {
                            temp_data.push(parseFloat(temp[j].total).toFixed(2));
                            j++;
                        }
                    }
                    $scope.compensationBarLabels = temp_label;
                    $scope.compensationBarData = temp_data;
                    $scope.compensationBarColors = color;
                });
            return;

        }

        function PieCommon_calc(get) {
            if (get == null) {
                return "{'data':'','label':''}";
            }
            var pieData = {};
            var labels = [],
                counts = [];
            var temp = 0,
                j = 0,
                temp_label;

            for (var i = 0; i < get.length; i++) {
                if (labels.length == 0) {
                    labels.push(get[i].name);
                    temp_label = get[i].name;
                    temp++;
                    if (i == get.length - 1) {
                        counts.push(temp);
                    }
                } else {
                    if (get[i].name == temp_label) {
                        temp++;
                        if (i == get.length - 1) {
                            counts.push(temp);
                        }
                    } else {
                        labels.push(get[i].name);
                        counts.push(temp);
                        temp_label = get[i].name;
                        temp = 1;
                        if (i == get.length - 1) {
                            counts.push(temp);
                        }
                    }
                }
            }
            pieData['data'] = counts;
            pieData['label'] = labels;
            return pieData;
        }

    }
]);
