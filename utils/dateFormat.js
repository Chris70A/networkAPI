const addDateSuffix = (date) => {
    let dateStr = date.toString();                              // Convert to string
  

    
    
    const lastChar = dateStr.charAt(dateStr.length - 1);        // Get last char
  
    if (lastChar === '1' && dateStr !== '11') {                 // append st 
      dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {          // append nd
      dateStr = `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {          // append rd
      dateStr = `${dateStr}rd`;
    } else {
      dateStr = `${dateStr}th`;                                 // append th
    }
  
    return dateStr;
  };
  



  // Format a timestamp
  module.exports = (
    timestamp,                                                  // Timestamp input
    { monthLength = 'short', dateSuffix = true } = {}           // Set options
  ) => {



    const months = {                                            // Define months
      0: monthLength === 'short' ? 'Jan' : 'January',
      1: monthLength === 'short' ? 'Feb' : 'February',
      2: monthLength === 'short' ? 'Mar' : 'March',
      3: monthLength === 'short' ? 'Apr' : 'April',
      4: monthLength === 'short' ? 'May' : 'May',
      5: monthLength === 'short' ? 'Jun' : 'June',
      6: monthLength === 'short' ? 'Jul' : 'July',
      7: monthLength === 'short' ? 'Aug' : 'August',
      8: monthLength === 'short' ? 'Sep' : 'September',
      9: monthLength === 'short' ? 'Oct' : 'October',
      10: monthLength === 'short' ? 'Nov' : 'November',
      11: monthLength === 'short' ? 'Dec' : 'December',
    };
  
    const dateObj = new Date(timestamp);                        // Create date obj

    const formattedMonth = months[dateObj.getMonth()];           // Get month name
  


    const dayOfMonth = dateSuffix                               // Add date suffix
      ? addDateSuffix(dateObj.getDate())
      : dateObj.getDate();
  


    const year = dateObj.getFullYear();                         // Get year
    let hour =                                                  // Set hour
      dateObj.getHours() > 12
        ? Math.floor(dateObj.getHours() - 12)
        : dateObj.getHours();
  
    
    if (hour === 0) {                                           // Handle midnight
      hour = 12;
    }
  
    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();              // Format minutes
  
    
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';                                 // Set AM/PM        
  


    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;     // Format minutes
  


    return formattedTimeStamp;
  };
  