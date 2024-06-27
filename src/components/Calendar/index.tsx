'use client'
import { add, format, isSameDay, isSameMonth, set, sub } from 'date-fns';
import React, { useCallback, useState } from 'react'
import { DayPicker } from "react-day-picker";

import CustomRow from './CustomRow';
import CustomCaption from './CustomCaption';
import CustomHead from './CustomHead';
import ModeSwitch from './ModeSwitch';

const getWeekNumber = (date: Date) => {
  return Number(format(date, 'I'))
}

export type CalendarMode = 'month' | 'week'

interface Props {
  availableDates: string[]
  onDaySelected: (day: Date) => void
}

function Calendar(props: Props) {
  const { availableDates, onDaySelected } = props
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [month, setMonth] = useState(new Date())
  const [week, setWeek] = useState(getWeekNumber(month))
  const [mode, setMode] = useState<CalendarMode>('week')

  const isDateAvailable = useCallback(
    (date: Date) => availableDates.some(ad => {
      return isSameDay(ad, date);
    }), 
    [availableDates]
  )   

  const handlePrev = () => {
    if(mode == 'month') {
      if(!isSameMonth(month, new Date())) {
        setMonth(sub(month, { months: 1 }))
      }
    }

    if(mode == 'week') {
      if(week -1 >= getWeekNumber(new Date) ) {
        setWeek(week -1)
        setMonth(sub(month, { weeks: 1 }))
      }
    }
  }

  const handleNext = () => {
    if(mode == 'month') {
      setMonth(set(add(month, { months: 1 }), { date: 1 }))
    }

    if(mode == 'week') {
      const addedWeek = add(month, { weeks: 1 })
      setWeek(Number(format(addedWeek, 'I')))
      setMonth(addedWeek)
    }
  }

  const handleDayClick = (day: Date) => {
    if(isDateAvailable(day)) {
      setWeek(getWeekNumber(day))
      setSelectedDay(day)
      setMode('week')
      onDaySelected(day)
    }
  }

  const handleMode = (mode: CalendarMode) => {
    if (mode == 'week') {
      setMode('week')
      const firstWeekOfTheMonth = format(set(month, { date: 1 }), 'I')
      setWeek(Number(firstWeekOfTheMonth))
    }

    if (mode == 'month') {
      setMode('month')
    }
  }

  return (
    <div className='px-5 pt-4 pb-3'>
      <ModeSwitch 
        month={month} 
        mode={mode} 
        handleMode={handleMode} 
      />
      <DayPicker 
        month={month}
        mode='single'
        selected={selectedDay || undefined}
        weekStartsOn={1}
        classNames={{
          table: 'w-full relative',
        }}
        components={{
          Caption: (props) =>  mode == 'month' ? (
            <CustomCaption 
              onNext={handleNext} 
              onPrevious={handlePrev} 
              mode={mode}
              {...props}
            />
          ) : <></>,
          Head: () => (
           <CustomHead
              displayMonth={month}
              onNext={handleNext} 
              onPrevious={handlePrev} 
              mode={mode}
           /> 
          ),
          Row: (props) => (
            <CustomRow 
              week={week} 
              mode={mode} 
              month={month} 
              availableDates={availableDates}
              selected={selectedDay || undefined}
              onDayClick={handleDayClick}
              {...props}
            />
          )
        }}
      />
    </div>
  )
}

export default Calendar
