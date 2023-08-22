import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export default class DateUtil{
    formatToPtString(date: string | Date){
        const dateString = typeof date === 'string' ? date : date.toISOString()

        const [splittedDate, splittedTime] = dateString.split('T')
        const [year, month, day] = splittedDate.split('-')
        const time = splittedTime.split('.')[0]

        return `${day}/${month}/${year} ${time}`
    }

    formatToPtStringMonthAndYear(date: string | Date){
        const dateString = typeof date === 'string' ? date : date.toISOString()

        const [splittedDate] = dateString.split('T')
        const [year, month] = splittedDate.split('-')

        return `${month}/${year}`
    }

    formatToPtStringDayMonthAndYear(date: string | Date){
        const dateString = typeof date === 'string' ? date : date.toISOString()

        const [splittedDate] = dateString.split('T')
        const [year, month, day] = splittedDate.split('-')

        return `${day}/${month}/${year}`
    }
}
