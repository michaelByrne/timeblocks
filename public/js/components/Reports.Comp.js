angular.module('timeApp').component('reportComponent', {
    templateUrl: 'views/reports.html',
    bindings: {
        requests: '=',
        user: '='
    },
    controller: function ($scope, $location, Report, uiGridConstants, $dialogs) {
        var vm = this;
        vm.statuses = ['pending', 'accepted', 'denied'];
        vm.currentStatus = 'pending';


        vm.$onInit = function () {


            var pendingFilter = function (value, status) {
                return value.status == 'pending'
            };
            var deniedFilter = function (value, status) {
                return value.status == 'denied'
            };
            var acceptedFilter = function (value, status) {
                return value.status == 'accepted'
            };
            var scheduledFilter = function (value, status) {
                return value.status == 'scheduled'
            };

            vm.isActive = function (status) {
                return status == vm.currentStatus;
            };


            vm.selectedReq = null;
            vm.statusSelection = 'pending';
            vm.gridOptions = {
                enableSorting: false,
                enableColumnMenus: false,
                enableCellEditOnFocus: true,
                enableSelectAll: false,
                enableFullRowSelection: true,
                showSelectionCheckbox: false,
                enableRowHeaderSelection: false,
                enableRowSelection: true,
                enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
                columnDefs: [
                    {name: 'empName', field: 'emp_name', enableCellEdit: false},
                    {name: 'reason', field: 'reason', enableCellEdit: false},
                    {name: 'start', field: 'start', enableCellEdit: false, cellFilter: 'date:\'MM-dd-yyyy\''},
                    {name: 'stop', field: 'end', enableCellEdit: false, cellFilter: 'date:\'MM-dd-yyyy\''},
                    {
                        name: 'note', field: 'note', enableCellEdit: true, cellTooltip: function (row, col) {
                        return 'Note: ' + row.entity.note;
                    }
                    },
                    {
                        name: 'status',
                        field: 'status',
                        enableCellEdit: false,
                        cellTemplate: "<div ng-class='{\"yellow\":row.entity.status==\"pending\",\"red\":row.entity.status==\"denied\",\"green\":row.entity.status==\"accepted\",\"blue\":row.entity.status==\"scheduled\"  }' class='ui-grid-cell-contents status-field' >{{COL_FIELD }}</div>"
                    }
                ],
                data: {}

            };

            vm.gridOptions.onRegisterApi = function (gridApi) {
                vm.gridApi = gridApi;
                vm.pending = vm.requests.data.filter(pendingFilter);
                vm.denied = vm.requests.data.filter(deniedFilter);
                vm.accepted = vm.requests.data.filter(acceptedFilter);
                vm.scheduled = vm.requests.data.filter(scheduledFilter);
                vm.all = vm.requests.data;

                vm.gridOptions.data = vm.pending;

                //filter data as directed by user


                gridApi.selection.on.rowSelectionChanged(null, function (row) {
                    vm.selectedReq = row;
                });
                vm.acceptReq = function () {
                    var selectedRows = vm.gridApi.selection.getSelectedRows();
                    var row;
                    for (var i = 0; i < selectedRows.length; i++) {
                        if (selectedRows[i].status == 'pending') {
                            var dex = vm.pending.indexOf(selectedRows[i]);
                            vm.pending.splice(dex, 1);
                            vm.accepted.unshift(selectedRows[i]);
                        }
                    }
                    if (vm.currentStatus == 'pending') {
                        vm.gridOptions.data = vm.pending;
                    }
                    Report.acceptRequests(selectedRows);
                };
                vm.denyReq = function () {
                    var selectedRows = vm.gridApi.selection.getSelectedRows();
                    if (selectedRows.length < 2) {
                        var row;
                        for (var i = 0; i < selectedRows.length; i++) {
                            if (selectedRows[i].status == 'pending') {
                                var dex = vm.pending.indexOf(selectedRows[i]);
                                vm.pending.splice(dex, 1);
                                vm.denied.unshift(selectedRows[i]);
                            }
                        }
                        if (vm.currentStatus == 'pending') {
                            vm.gridOptions.data = vm.pending;
                        }
                        Report.denyRequests(selectedRows);
                    }

                };

                vm.scheduleReq = function () {
                    var selectedRows = vm.gridApi.selection.getSelectedRows();
                    var row;
                    for (var i = 0; i < selectedRows.length; i++) {
                        if (selectedRows[i].status == 'accepted') {
                            var dex = vm.accepted.indexOf(selectedRows[i]);
                            vm.accepted.splice(dex, 1);
                            vm.scheduled.unshift(selectedRows[i]);
                        }
                    }
                    if (vm.currentStatus == 'accepted') {
                        console.log("hey");
                        vm.gridOptions.data = vm.accepted;
                    }
                    Report.scheduleRequests(selectedRows);
                };

                vm.deleteReq = function () {
                    var selectedRows = vm.gridApi.selection.getSelectedRows();
                    for (var i = 0; i < selectedRows.length; i++) {
                        var dex = vm.gridOptions.data.indexOf(selectedRows[i]);
                        vm.gridOptions.data.splice(dex, 1);
                        if (selectedRows[i].status == 'accepted') {
                            var dex = vm.accepted.indexOf(selectedRows[i]);
                            vm.accepted.splice(dex, 1);
                        }
                        else if (selectedRows[i].status == 'denied') {
                            var dex = vm.denied.indexOf(selectedRows[i]);
                            vm.denied.splice(dex, 1);
                        }
                        else if (selectedRows[i].status == 'scheduled') {
                            var dex = vm.scheduled.indexOf(selectedRows[i]);
                            vm.scheduled.splice(dex, 1);
                        }
                    }
                    Report.deleteRequests(selectedRows);
                };


                vm.toggleStatus = function (status) {
                    switch (status) {
                        case 'pending':
                            vm.gridOptions.data = vm.pending;
                            vm.currentStatus = 'pending';
                            break;
                        case 'denied':
                            vm.gridOptions.data = vm.denied;
                            vm.currentStatus = 'denied';
                            break;
                        case 'accepted':
                            vm.gridOptions.data = vm.accepted;
                            vm.currentStatus = 'accepted';
                            break;
                        case 'all':
                            vm.gridOptions.data = vm.all;
                            vm.currentStatus = 'all';
                            break;
                        case 'scheduled':
                            vm.gridOptions.data = vm.scheduled;
                            vm.currentStatus = 'scheduled';
                            break;
                        default:
                            vm.gridOptions.data = vm.pending;
                            vm.currentStatus = 'pending';
                    }
                };
            }
        }
        ;


    }

});







