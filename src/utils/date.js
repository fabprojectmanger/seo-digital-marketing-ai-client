const formatDate = (date) => {
    let inputDate = date;
  
    if (!(date instanceof Date)) {
      inputDate = new Date(date);
    }
  
    if (isNaN(inputDate)) {
      console.error("Invalid date input");
      return;
    }
  
    const year = inputDate.getFullYear().toString();
    const month = ("0" + (inputDate.getMonth() + 1)).slice(-2);
    const day = ("0" + inputDate.getDate()).slice(-2);
  
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  };
  
  export { formatDate };
  