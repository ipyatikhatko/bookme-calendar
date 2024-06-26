import clsx from "clsx";
import { format } from "date-fns";
import { CaptionProps } from "react-day-picker";
import { CalendarMode } from ".";
import ChevronDownIcon from "../ChevronDownIcon";

export interface CustomCaptionProps extends CaptionProps {
  mode: CalendarMode;
  className?: string;
  onPrevious: () => void;
  onNext: () => void;
}

export default function CustomCaption({ mode, className, onPrevious, onNext, ...props }: CustomCaptionProps) {
  return (
    <div className={clsx('flex z-20', className)}>
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