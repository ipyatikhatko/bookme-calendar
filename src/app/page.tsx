'use client'
import Calendar from '@/components/Calendar'
import CheckoutFooter from '@/components/CheckoutFooter'
import TimeSlots, { convertMillisecondsToDuration, TimeSlot, TimeSlotsByDate } from '@/components/TimeSlots'
import { add, format } from 'date-fns'
import React, { useState } from 'react'

/* 
  NOTE: I think would be better to use Date/UTC string, not "yyyy-MM-dd" 
  and use date-fns utcToZonedTime(date, userTimezone) to allow users to see date/time in their timezone.

  (?) This might need adjustments on BE also, saving the dates with same approach when creating available slots in CRM
*/

const dt = new Date()
const formatDate = (date: Date) => 
  format(date, 'yyyy-MM-dd')

// mock 3 days from tomorrow and 3 days 1 week later
const MOCK_AVAILABLE_DATES = [
  add(dt, { days: 1 }),
  add(dt, { days: 2 }),
  add(dt, { days: 3 }),

  add(dt, { days: 1, weeks: 1 }),
  add(dt, { days: 2, weeks: 1 }),
  add(dt, { days: 3, weeks: 1 }),
]

// mock time slots, duration and pricing for available dates
const MOCK_AVAILABLE_TIMESLOTS = MOCK_AVAILABLE_DATES.reduce<TimeSlotsByDate>((acc, ad) => {
  const dateKey = format(ad, 'yyyy-MM-dd');

  const generatedTimeSlots = [
    { hours: 11, minutes: 0, duration: 1000 * 60 * 60, price: 70 },
    { hours: 11, minutes: 30, duration: 1000 * 60 * 60, price: 70 },
    { hours: 13, minutes: 30, duration: 1000 * 60 * 90, price: 80 },
    { hours: 15, minutes: 0, duration: 1000 * 60 * 60, price: 70 },
    { hours: 15, minutes: 30, duration: 1000 * 60 * 90, price: 80 },
    { hours: 16, minutes: 30, duration: 1000 * 60 * 60, price: 70 },
    { hours: 17, minutes: 0, duration: 1000 * 60 * 60, price: 80 },
    { hours: 18, minutes: 30, duration: 1000 * 60 * 90, price: 80 },
    { hours: 19, minutes: 0, duration: 1000 * 60 * 90, price: 80 },
    { hours: 20, minutes: 30, duration: 1000 * 60 * 60, price: 70 },
  ]

  acc[dateKey] = generatedTimeSlots;
  return acc;
}, {});

const getTimeSlots = (dateString: string): TimeSlot[] => {
  return MOCK_AVAILABLE_TIMESLOTS[dateString] || []
};

function FrontOfficePage() {
  const [selected, setSelected] = useState<Date | null>()
  const [timeSlot, setTimeSlot] = useState<TimeSlot>();

  const availableDates = MOCK_AVAILABLE_DATES.map(formatDate)
  const timeSlots = selected ? getTimeSlots(formatDate(selected)) : []

  const handleDaySelected = (date: Date) => {
    setSelected(date)
  }

  const handleCheckout = () => {
    if(!timeSlot || !selected) return;
    alert(`
      Date: ${selected.toLocaleDateString()}\n
      Time: ${timeSlot.hours}:${timeSlot.minutes || '00'}\n
      Duration: ${convertMillisecondsToDuration(timeSlot.duration)}
      Price: €${timeSlot.price}
    `)
  }

  return (
    <>
      <Calendar 
        availableDates={availableDates} 
        onDaySelected={handleDaySelected}
      />
      <TimeSlots 
        selected={timeSlot} 
        timeSlots={timeSlots} 
        onSelect={setTimeSlot}
      />
      <CheckoutFooter 
        isSelected={!!timeSlot} 
        price={timeSlot?.price} 
        onCheckout={handleCheckout}/>
    </>
  )
}

export default FrontOfficePage
