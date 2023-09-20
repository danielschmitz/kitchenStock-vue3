

const utils = {
    today: new Date().toISOString().slice(0,10),
    isDateLessToday: (date:String) => date <= new Date().toISOString().split('T')[0],
    isDateLessOneMonth: (date:String) => (new Date() - new Date(date)) / (1000 * 3600 * 24) > -30
}

export default utils

