import { RowProps } from "react-day-picker";
import { isSameDay } from "date-fns";
import { useMemo, useCallback } from "react";
import { CalendarMode } from ".";
import CustomDay from "./CustomDay";

interface CustomRowProps extends RowProps {
  mode: CalendarMode;
  week: number;
  month: Date;
  availableDates: string[];
  selected?: Date;
  onDayClick: (day: Date) => void;
}
export default function CustomRow({ week, mode, month, availableDates, selected, onDayClick, ...props }: CustomRowProps) {

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