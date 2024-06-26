'use client'
import { add, format, isBefore, isPast, isSameDay, isSameMonth, isSameWeek, parse, set, sub } from 'date-fns';
import React, { useCallback, useMemo, useState } from 'react'
import { CaptionProps, DayClickEventHandler, DayPicker, RowProps, type DayContentProps, type DayProps } from "react-day-picker";
import ChevronDownIcon from './ChevronDownIcon';
import clsx from 'clsx';

const getWeekNumber = (date: Date) => {
  return Number(format(date, 'I'))
}

type CalendarMode = 'month' | 'week'

interface CustomDayProps extends DayProps {
  month: Date;
  isAvailable: boolean;
  selected: boolean;
  mode: CalendarMode;
  onClick: () => void;
}

export function CustomDay({ month, selected, isAvailable, onClick, mode, ...props }: CustomDayProps) {
  if(
    props.displayMonth.getMonth() 
    !== props.date.getMonth()
    && mode !== 'week'
  ){
    return <td className='first:pl-3 last:pr-3 flex-1' />
  }
  return (
    <td onClick={onClick} className='group overflow-visible relative text-center first:ml-3 last:mr-3 flex-1 grid place-content-center'>
      <div className={clsx(
        'text-primary-content h-8 w-8 grid place-content-center rounded-full cursor-pointer',
        selected && 'text-white bg-priamry-blue-500 hover:opacity-50',
        isAvailable && !selected && 'hover:bg-secondary-bg',
        !isAvailable && 'cursor-default'
      )}>
        <span className={clsx('text-sm', !isAvailable && 'text-neutral-content')}>
          {props.date.getDate()}
        </span>
      </div>
      <div className={clsx(
        'h-[3px] w-[3px] opacity-0 bg-priamry-blue-500 absolute bottom-1 m-auto left-0 right-0 rounded-full',
        isAvailable && 'opacity-100',
        selected && '!opacity-0'
      )}/>
    </td>
  );
}

interface CustomCaptionProps extends CaptionProps {
  mode: CalendarMode;
  onPrevious: () => void;
  onNext: () => void;
}

interface CustomRowProps extends RowProps {
  mode: CalendarMode;
  week: number;
  month: Date;
  availableDates: string[];
  selected?: Date;
  onDayClick: (day: Date) => void;
}
function CustomRow({ week, mode, month, availableDates, selected, onDayClick, ...props }: CustomRowProps) {

  const isSelectedWeek = useMemo(
    () => props.weekNumber === week, 
    [props.weekNumber, week]
  )

  const isDateAvailable = useCallback(
    (date: Date) => availableDates.some(ad => isSameDay(ad, date)), 
    [availableDates]
  ) 

  if(!isSelectedWeek && mode == 'week') {
    return <></>;
  }
  return (
    <tr className='w-full h-12 flex flex-start'>
      {props.dates.map((d) => (
        <CustomDay
          selected={selected ? isSameDay(selected, d) : false} 
          isAvailable={isDateAvailable(d)}
          key={d.getTime()} 
          month={month} 
          mode={mode}
          date={d} 
          onClick={() => onDayClick(d)}
          {...props}
        />
      ))}
    </tr>
  )
}

function CustomCaption({ mode, onPrevious, onNext, ...props }: CustomCaptionProps) {
  return (
    <div className='flex my-4 min-w-[350px] z-20'>
      <button onClick={onPrevious} className='appearance-none'>
        <ChevronDownIcon className='transform rotate-90'/>
      </button>
      <h4 
        className={clsx(
          'flex-1 text-center opacity-0 transition-opacity font-semibold text-[16px]', 
          mode == 'month' && 'opacity-100'
        )}>
          {format(props.displayMonth, 'MMMM')}
      </h4>
      <button onClick={onNext} className='appearance-none'>
        <ChevronDownIcon className='transform -rotate-90'/>
      </button>
    </div>
  )
}

interface Props {
  availableDates: string[]
}

function Calendar(props: Props) {
  const { availableDates } = props
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
      {mode === 'week' && (
        <h4 
          className={clsx(
            'flex-1 text-center transition-opacity font-semibold text-[16px] pb-3', 
          )}>
            {format(month, 'MMMM')}
        </h4>
      )}
      <div className='bg-secondary-bg rounded-full h-[35px] flex relative w-full items-center'>
        <div className={clsx(
          'absolute left-[2px] top-[2px] mr-[2px] translate-x-0 w-1/2 h-[31px] bg-white border border-divider rounded-full transition-all',
          mode == 'month' && 'translate-x-[calc(100%-4px)]'
        )}/>
        <button className='z-10 flex-1 text-xs font-semibold' onClick={() => handleMode('week')}>Week</button>
        <button className='z-10 flex-1 text-xs font-semibold' onClick={() => handleMode('month')}>Month</button>
      </div>
      <DayPicker 
        month={month}
        mode='single'
        selected={selectedDay || undefined}
        weekStartsOn={1}
        classNames={{
          table: clsx(
            'transition-all w-full',
            // mode == 'week' && '-translate-y-[40px]'
          ),
          head_row: 'border-b border-divider h-[35px] flex',
          head_cell: 'text-neutral-content font-semibold text-xs first:pl-3 last:pr-3 flex-1',
        }}
        components={{
          Caption: (props) => (
            <CustomCaption 
              onNext={handleNext} 
              onPrevious={handlePrev} 
              mode={mode}
              {...props}
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
