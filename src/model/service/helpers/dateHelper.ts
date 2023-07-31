class DateHelper {
    dateIncriment(newDate) {
       newDate.setDate(newDate.getDate() +1);
       return newDate;
    }
}

export default new DateHelper();