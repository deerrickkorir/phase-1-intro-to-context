// Your code here
// Function to create an employee record
function createEmployeeRecord(employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create employee records from an array of arrays
function createEmployeeRecords(employeesData) {
    return employeesData.map(employeeInfo => createEmployeeRecord(employeeInfo));
}

// Function to add a time in event to an employee's record
function createTimeInEvent(employeeRecord, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return employeeRecord;
}

// Function to add a time out event to an employee's record
function createTimeOutEvent(employeeRecord, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return employeeRecord;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payOwed = hoursWorked * employeeRecord.payPerHour;
    return payOwed;
}

// Function to calculate total wages earned for all dates
function allWagesFor(employeeRecord) {
    const allDates = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = allDates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
    return totalWages;
}

// Function to calculate total payroll for all employees
function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => total + allWagesFor(employeeRecord), 0);
    return totalPayroll;
}

module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
};


