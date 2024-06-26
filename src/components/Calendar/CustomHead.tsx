import React from 'react'
import CustomCaption, { CustomCaptionProps } from './CustomCaption'
import clsx from 'clsx'

interface Props extends CustomCaptionProps {}

function CustomHead(props: Props) {
  const { mode } = props

  return (
    <thead>
      <tr className='relative border-b border-divider h-[35px] flex'>
        {mode == 'week' && (
          <th colSpan={2} className='absolute top-0 left-0 w-full h-full'>
            <CustomCaption
              className='h-full'
              {...props}
            />
          </th>
        )}
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((dw, i, arr) => (
          <th 
            key={dw} 
            className={
              clsx(
                'flex-1 flex justify-center items-center text-neutral-content font-semibold text-xs',
                i === 0 && 'pl-3',
                i === arr.length -1 && 'pr-3',
              )
            }
          >
            {dw}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default CustomHead
