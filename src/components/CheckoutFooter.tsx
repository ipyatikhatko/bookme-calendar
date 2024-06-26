import React from 'react'
import ChevronDownIcon from './ChevronDownIcon'

interface Props {
  cost: number;
}

function CheckoutFooter(props: Props) {
  const { cost } = props

  return (
    <footer className='absolute bottom-0 left-0 right-0 px-4 py-3 flex justify-between border-t border-divider'>
        <div className='flex flex-col'>
          <div className='flex gap-2 items-center'>
            <h4 className='text-[16px] font-semibold'>Intakegesprek</h4>
            <ChevronDownIcon/>
          </div>
          <span>€{cost}</span>
        </div>
        <button className='btn-secondary'>Checkout</button>
      </footer>
  )
}

export default CheckoutFooter
