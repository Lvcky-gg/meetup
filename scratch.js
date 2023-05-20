const startDate =new Date('2023-05-31 00:00:00.000 +00:00')


const newDay = new Date(new Date(startDate))
newDay.setHours(18,59,59,999)
const integerDay = startDate.getUTCDate()-1
const timeStamp = newDay.setDate(integerDay)
const newDate = new Date (timeStamp)
