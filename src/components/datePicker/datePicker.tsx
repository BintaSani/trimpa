"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { TbCalendarEventFilled as CalendarIcon } from "react-icons/tb";
import { DateRange } from "react-day-picker";
import { useFlightSearchContext } from "../../../context/flightSearchContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  date: DateRange;
  setDate: (range: DateRange) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function DatePickerWithRange({
  className,
  date,
  setDate,
}: DatePickerProps) {
  const { tripType, setTripType } = useFlightSearchContext();
  // const [date, setDate] = useState<DateRange | undefined>({
  //   from: new Date(),
  //   to: addDays(new Date(), 20),
  // })

  const [open, setOpen] = useState(false);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal focus:ring-1 focus:[var(--color-purple-blue)]",
              !date && "text-[var(--color-grey-400)]"
            )}
          >
            <CalendarIcon className="size-5" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Depart - Retun</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-100" align="start">
          <div className="flex z-100 flex-col md:flex-row md:items-center md:justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="trip"
                  value="round-trip"
                  checked={tripType === "round-trip"}
                  onChange={() => setTripType?.("round-trip")}
                  className="accent-[var(--color-purple-blue)]"
                />

                <span className="text-gray-700">Round trip</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="trip"
                  value="one-way"
                  checked={tripType === "one-way"}
                  onChange={() => setTripType?.("one-way")}
                  className=" accent-[var(--color-purple-blue)]"
                />

                <span className="text-gray-700">One way</span>
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center gap-2 border-[1.5px] border-[var(--color-purple-blue)] rounded p-1.5 ">
                <CalendarIcon className="size-5" />
                {date?.from ? (
                  tripType === "round-trip" && date.to ? (
                    <>
                      {format(date.from, "LLL dd")} -{" "}
                      {format(date.to, "LLL dd")}
                    </>
                  ) : (
                    format(date.from, "LLL dd")
                  )
                ) : (
                  <span>Depart - Return</span>
                )}
              </div>
              <button
                onClick={() => setOpen(false)}
                className="bg-[var(--color-purple-blue)] text-white px-5 py-2 h-full rounded-md"
              >
                Done
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {tripType === "round-trip" ? (
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(range) => {
                  if (range) {
                    setDate(range);
                  }
                }}
                numberOfMonths={2}
              />
            ) : (
              <Calendar
                initialFocus
                mode="single"
                defaultMonth={date?.from}
                selected={date?.from}
                onSelect={(selectedDate) => {
                  setDate({ from: selectedDate, to: undefined });
                }}
                numberOfMonths={1}
              />
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
