function getDayMonthYearHour (time_stamp) {

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const date = new Date(time_stamp);
    
    return `${date.getDate()}-${months[date.getMonth()]}-${date.getUTCFullYear()}   ${date.getHours() > 9  ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes():'0' + date.getMinutes()} `  
}

function getDayMonthYear () {

    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '10', '12']
    const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
    const date = new Date();
    
    return `${days[date.getDate()]}-${months[date.getMonth()]}-${date.getFullYear()}`  
}

export { getDayMonthYearHour, getDayMonthYear }
