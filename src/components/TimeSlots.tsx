import clsx from 'clsx'
import { formatDuration, intervalToDuration } from 'date-fns';
import React, { useCallback } from 'react'

export function convertMillisecondsToDuration(milliseconds: number) {
  const duration = intervalToDuration({ start: 0, end: milliseconds });
  const formattedDuration = formatDuration(duration, { format: ['hours', 'minutes'] });
  const shortenedDuration = formattedDuration
    .replace(/hour(s)?/, 'hr')
    .replace(/minute(s)?/, 'min');
  return shortenedDuration;
}

export interface TimeSlot {
  hours: number,
  minutes: number,
  duration: number;
  price: number;
}

export type TimeSlotsByDate = {
  [date: string]: TimeSlot[];
};

interface Props {
  timeSlots: TimeSlot[]
  selected?: TimeSlot
  onSelect: (slot: TimeSlot) => void
}

function TimeSlots(props: Props) {
  const { timeSlots, selected, onSelect } = props

  const isTimeSlotSelected = useCallback(
    (hours: number, minutes: number) => {
      if(selected) {
        return selected.hours === hours 
          && selected.minutes === minutes;
      }
    }, 
    [selected]
  )

  return (
    <section className='border-t border-divider flex-1 pb-24 px-3 overflow-auto'>
      {!!timeSlots.length ? (
        <ul className='flex flex-col gap-3 pt-4'>
        {timeSlots.map(({ hours, minutes, duration, price }) => (
          <li 
            key={hours + minutes} 
            onClick={() => onSelect({ hours, minutes, duration, price })}
            className={clsx(
              'flex justify-between items-center px-4 py-3 rounded-lg border border-divider',
              isTimeSlotSelected(hours, minutes) && 'border-primary-blue-500'
            )}
          >
            <div className='flex gap-2 items-center'>
              <span className='text-sm font-semibold text-primary-content'>{hours}:{minutes || '00'}</span>
              <span className='text-sm text-secondary-content'>
              {convertMillisecondsToDuration(duration)}
              </span>
            </div>
            <span className='font-semibold text-sm text-secondary-content'>{price}</span>
          </li>
        ))}
      </ul>
      ) : (
        <div className='h-full grid place-content-center'>
          <h4 className='text-xl font-semibold text-center text-neutral-200'>Select available day</h4>
        </div>
      )}
      
    </section>
  )
}

export default TimeSlots
