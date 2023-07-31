class DateHelper {
    dateIncriment(newDate) { // инкремент даты
       newDate.setDate(newDate.getDate() +1);
       return newDate;
    }
}

export default new DateHelper();