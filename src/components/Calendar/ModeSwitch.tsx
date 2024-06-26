import clsx from 'clsx'
import { format } from 'date-fns'
import React from 'react'
import { CalendarMode } from '.'

interface Props {
  mode: CalendarMode;
  month: Date;
  handleMode: (mode: CalendarMode) => void;
}

function ModeSwitch(props: Props) {
  const { mode, month, handleMode } = props

  return (
    <>
      {mode === 'week' && (
        <h4 className='flex-1 text-center transition-opacity font-semibold text-[16px] pb-3'>
          {format(month, 'MMMM')}
        </h4>
      )}
      <div className='bg-secondary-bg rounded-full h-[35px] flex relative w-full items-center mb-3'>
        <div className={clsx(
          'absolute left-[2px] top-[2px] mr-[2px] translate-x-0 w-1/2 h-[31px] bg-white border border-divider rounded-full transition-all',
          mode == 'month' && 'translate-x-[calc(100%-4px)]'
        )}/>
        <button className='z-10 flex-1 text-xs font-semibold' onClick={() => handleMode('week')}>Week</button>
        <button className='z-10 flex-1 text-xs font-semibold' onClick={() => handleMode('month')}>Month</button>
      </div>
    </>
  )
}

export default ModeSwitch
