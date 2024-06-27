import React from 'react'
import ChevronDownIcon from './ChevronDownIcon'
import clsx from 'clsx';

interface Props {
  price?: number;
  isSelected: boolean;
  onCheckout: () => void;
}

function CheckoutFooter(props: Props) {
  const { price, isSelected, onCheckout } = props

  return (
    <footer className={clsx(
      'absolute bottom-0 left-0 right-0 px-4 h-[72px]',
      'flex justify-between items-center border-t border-divider bg-white',
    )}>
      <div className='flex flex-col'>
        <div className='flex gap-2 items-center'>
          <h4 className='text-[16px] font-semibold text-neutral-600'>Intakegesprek</h4>
          <ChevronDownIcon/>
        </div>
        <span className={clsx(
          'text-sm font-semibold text-neutral-content opacity-0',
          isSelected && 'opacity-100'
        )}>
          €{price}
        </span>
      </div>
      <button 
        onClick={onCheckout}
        disabled={!isSelected} 
        className='btn-secondary h-fit transition-all disabled:opacity-30'
      >
        Checkout
      </button>
    </footer>
  )
}

export default CheckoutFooter
