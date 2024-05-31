
export function getDate() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    const dayOfWeek = daysOfWeek[date.getDay()];
    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    return `${dayOfWeek}${",    "}${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
  }
  

  export function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    return `${(hours % 12).toString().padStart(2, '0')}.${minutes.toString().padStart(2, '0')} ${period}`;
  }
  