//function to calculate time gap between current time and question asked time
function CompareTime(askedTime) {
    let askedDate = new Date(askedTime);
    let msAskedDate = askedDate.getTime();  
    let currDate = Date.now();
    let gapTime = currDate - msAskedDate;

    const secs = Math.floor(gapTime / 1000);
    const mins = Math.floor(secs / 60);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years) {
      return years + ' years';
    } else if (months) {
      return months + ' months';
    } else if (days) {
      return days + ' days';
    } else if (hours) {
      return hours + ' hours';
    } else if (mins) {
      return mins + ' minutes';
    } else {
      return secs + ' seconds';
    }
  }
  
  export default CompareTime;