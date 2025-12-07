import moment from 'moment'

const formatDate = (value: string): string => {
    const numbers = value.replace(/\D/g, '').slice(0, 8)

    if (numbers.length === 0) {
        return ''
    }

    let dateFormat = 'DD/MM/YYYY'

    if (numbers.length < 3) {
        dateFormat = 'DD'
    } else if (numbers.length < 5) {
        dateFormat = 'DD/MM'
    }

    const momentDate = moment(numbers, 'DDMMYYYY')
    return momentDate.format(dateFormat).slice(0, numbers.length + Math.floor(numbers.length/2));
}

export {
    formatDate
}
