function formatDate(second : any, nanosecond : any) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const milliseconds = second * 1000 + nanosecond / 1000000;
    
    const date = new Date(milliseconds);
    
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
    
    return formattedDate;
}


export {
    formatDate
}
