angular.module('timeApp').component('calendarComponent', {
    templateUrl: 'views/calendar.html',
    bindings: {
        requests: '='
    },
    controller: function(Report, $scope,moment, calendarConfig) {
        $scope.calendarView = 'month';
        $scope.events = [
            {
                title: 'An all day event',
                color: calendarConfig.colorTypes.warning,
                startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
                endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
                allDay: true
            }, {
                title: 'A non all day event',
                color: calendarConfig.colorTypes.important,
                startsAt: moment().startOf('day').add(7, 'hours').toDate(),
                endsAt: moment().startOf('day').add(19, 'hours').toDate(),
                draggable: true,
                resizable: true
            }
        ];

        $scope.calendarView = 'month';
        $scope.viewDate = moment().toDate();
    }
});