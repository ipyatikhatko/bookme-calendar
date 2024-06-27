import { type DayProps } from "react-day-picker";
import { CalendarMode } from ".";
import clsx from "clsx";

interface CustomDayProps extends DayProps {
  month: Date;
  isAvailable: boolean;
  selected: boolean;
  mode: CalendarMode;
  onClick: () => void;
}

export default function CustomDay({ month, selected, isAvailable, onClick, mode, ...props }: CustomDayProps) {
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
        'text-primary-content font-semibold h-8 w-8 grid place-content-center rounded-full cursor-pointer',
        selected && 'text-white bg-primary-blue-500 hover:opacity-50',
        isAvailable && !selected && 'hover:bg-secondary-bg',
        !isAvailable && 'cursor-default'
      )}>
        <span className='text-sm'>
          {props.date.getDate()}
        </span>
      </div>
      <div className={clsx(
        'h-[3px] w-[3px] opacity-0 bg-primary-blue-500 absolute bottom-1 m-auto left-0 right-0 rounded-full',
        isAvailable && 'opacity-100',
        selected && '!opacity-0'
      )}/>
    </td>
  );
}