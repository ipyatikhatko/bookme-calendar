import Calendar from '@/components/Calendar'
import CheckoutFooter from '@/components/CheckoutFooter'
import { add, format, set } from 'date-fns'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Bookme'
}

interface Props {}

const formatDate = (date: Date) => 
  format(date, 'yyyy-MM-dd')

const dt = new Date()

// for demonstration purposes
const MOCK_AVAILABLE_DATES = [
  add(dt, { days: 1 }),
  add(dt, { days: 2 }),
  add(dt, { days: 3 }),

  add(dt, { days: 1, weeks: 1 }),
  add(dt, { days: 2, weeks: 1 }),
  add(dt, { days: 3, weeks: 1 }),
].map(formatDate)

function FrontOfficePage(props: Props) {
  const {} = props

  return (
    <>
      <Calendar availableDates={MOCK_AVAILABLE_DATES}/>
      <section className='border-t border-divider'>
        {/* TODO: Time slots */}
      </section>
      <CheckoutFooter cost={80}/>
    </>
  )
}

export default FrontOfficePage
