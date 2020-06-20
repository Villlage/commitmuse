import moment from 'moment'

export const formatDate = (date: string) => moment(date).format('MM/DD/YYYY')

export const formatEmail = (email: string) => email.replace(/ /g, '').toLowerCase()
