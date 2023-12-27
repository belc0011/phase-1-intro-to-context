function createEmployeeRecord(array) {
    const employeeRecord = {firstName: array[0], familyName: array[1],
    title: array[2], payPerHour: array[3], timeInEvents: [],
    timeOutEvents: []}

    return employeeRecord;
}
const sampleRec = createEmployeeRecord(["Monica", "Garcia", "Teacher", 20]);

function createEmployeeRecords(arrayOfArrays) {
    const arrayOfRecords = []
    for (let i = 0; i < arrayOfArrays.length; i++) {
        arrayOfRecords[i] = createEmployeeRecord(arrayOfArrays[i]);
    }
    return arrayOfRecords;
}

function createTimeInEvent(empRecObject, dateStamp) {
    let dateStampHourBeg;
    let dateStampHour;
    if (dateStamp.length === 15) {
        dateStampHourBeg = dateStamp.substr(11, 2);
    }
    else {dateStampHourBeg = dateStamp.substr(11, 1)}
    dateStampHour = dateStampHourBeg*100

    const dateStampDate = dateStamp.substr(0, 10);
    const timeInObject = {type: "TimeIn", hour: dateStampHour, 
    date: dateStampDate};
    let timeInEventsArray = empRecObject['timeInEvents'];
    timeInEventsArray.push(timeInObject);
    empRecObject['timeInEvents'] = timeInEventsArray;
    
    return empRecObject;
}
let newSampleRec = createTimeInEvent(sampleRec, "2023-12-28 848")

function createTimeOutEvent(empRecObject, dateStamp) {
    let dateStampHourBeg;
    let dateStampHour;
    if (dateStamp.length === 15) {
        dateStampHourBeg = dateStamp.substr(11, 2);
    }
    else {dateStampHourBeg = dateStamp.substr(11, 1)}
    dateStampHour = dateStampHourBeg*100

    const dateStampDate = dateStamp.substr(0, 10);
    const timeOutObject = {type: "TimeOut", hour: dateStampHour, 
    date: dateStampDate};
    let timeOutEventsArray = empRecObject['timeOutEvents'];
    timeOutEventsArray.push(timeOutObject);
    empRecObject['timeOutEvents'] = timeOutEventsArray;
    
    return empRecObject;
}

let newestSampleRec = createTimeOutEvent(newSampleRec, "2023-12-28 1123")

function hoursWorkedOnDate(empRecObject, dateOfInterest) {
    const timeInArray = empRecObject['timeInEvents'];
    const timeOutArray = empRecObject['timeOutEvents'];
    let timeStart;
    let timeEnd;
    let hoursWorked;
    for (let workObject of timeInArray) {
        if (workObject['date'] === dateOfInterest) {
            timeStart = workObject['hour']
        }
    }
    for (let workObject of timeOutArray) {
        if (workObject['date'] === dateOfInterest) {
            timeEnd = workObject['hour']
        }
    }
    hoursWorked = (timeEnd - timeStart)/100;
    return hoursWorked
}
hoursWorkedOnDate(newestSampleRec, "2023-12-28")

function wagesEarnedOnDate(empRecObject, date) {
    const wagesEarnedByDate = hoursWorkedOnDate(empRecObject, date) * empRecObject['payPerHour']
    return wagesEarnedByDate
}

function allWagesFor(empRecObject) {
    const timeInArray = empRecObject['timeInEvents'];
    const timeOutArray = empRecObject['timeOutEvents'];
    let totalHoursWorked = 0;
    let hoursWorkedPerDay;
    let payOwed = 0;
    for (let i = 0; i < timeInArray.length; i++) {
        hoursWorkedPerDay = (timeOutArray[i]['hour'] - timeInArray[i]['hour'])/100;
        totalHoursWorked += hoursWorkedPerDay
    }
    payOwed = totalHoursWorked * empRecObject['payPerHour']
    return payOwed
}

function calculatePayroll(empRecArray) {
    let totEmpWagesOwed = 0;
    for (let empRecord of empRecArray) {
        totEmpWagesOwed += allWagesFor(empRecord)
    }
    return totEmpWagesOwed;
}