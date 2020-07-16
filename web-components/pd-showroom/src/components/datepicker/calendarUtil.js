const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const weekDay = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];
const monthDays = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function getIsBisiesto(year) {
    if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
        return true;
    }
    return false;
}

let monthData; // eslint-disable-line import/no-mutable-exports

function setDate(date) { // year-month-day
    const dateObj = date ? new Date(date) : new Date();

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const day = dateObj.getDate();
    const isBisiesto = getIsBisiesto(year);
    monthDays[1] = isBisiesto ? 29 : 28;
    const numberDaysMonth = monthDays[month];

    let firstWeekDay = new Date(year, month, 1).getDay();
    firstWeekDay = (firstWeekDay === 0) ? 7 : firstWeekDay; // getDay domingo = 0, convertimos a 7
    let lastWeekDay = (numberDaysMonth + (firstWeekDay - 1)) % 7;
    lastWeekDay = (lastWeekDay === 0) ? 7 : lastWeekDay; // domingo = 0, convertimos a 7
    const prevMonthDaysGap = firstWeekDay - 1;
    const nextMonthDaysGap = 7 - lastWeekDay;

    const datePrevObj = date ? new Date(date) : new Date();
    datePrevObj.setDate(1);
    datePrevObj.setMonth(datePrevObj.getMonth() - 1);

    const prevMonthYear = datePrevObj.getFullYear();
    const prevMonth = datePrevObj.getMonth();

    const dateNextObj = date ? new Date(date) : new Date();
    dateNextObj.setDate(1);
    dateNextObj.setMonth(dateNextObj.getMonth() + 1);

    const nextMonthYear = dateNextObj.getFullYear();
    const nextMonth = dateNextObj.getMonth();

    monthData = {
        year, // number - año
        month, // number - mes zero-based-index
        day, // number - día
        isBisiesto, // boolean - bisiesto
        numberDaysMonth, // number - días que tiene el mes
        firstWeekDay, // number - primer día del mes lunes: 1, martes: 2...
        lastWeekDay, // number - último día del mes lunes: 1, martes: 2...
        prevMonthDaysGap, // número de días a rellenar del anterior mes
        nextMonthDaysGap, // número de días a rellenar del siguiente mes
        prevMonth, // number - mes anterior
        nextMonth, // number - mes siguiente
        prevMonthYear, // number - año anterior TODO: prevMonthYear
        nextMonthYear, // number - año siguiente TODO: nextMonthYear
        monthDays, // array de dias en cada mes
        months, // array de nombres de meses
        weekDay, // array de nombres de días de la semana
        datePrevObj, // date - fecha anterior mes
        dateNextObj, // date - fecha siguiente mes
        dateSelectedObj: dateObj, // date
    };
}


export {setDate, monthData};
