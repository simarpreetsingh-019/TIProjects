"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

export function DateTimePickerComponent() {
  const [date, setDate] = React.useState<Date>();
  const [hours, setHours] = React.useState<string>("12");
  const [minutes, setMinutes] = React.useState<string>("00");

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };

  const handleHoursChange = (value: string) => {
    setHours(value);
  };

  const handleMinutesChange = (value: string) => {
    setMinutes(value);
  };

  const formatDateTime = () => {
    if (!date) return "Pick a date and time";
    const formattedDate = format(date, "PPP");
    return `${formattedDate} at ${hours}:${minutes}`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDateTime()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
        <div className="flex items-center justify-between p-3 border-t">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Time:</span>
            <Select value={hours} onValueChange={handleHoursChange}>
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="Hour" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }, (_, i) => (
                  <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                    {i.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>:</span>
            <Select value={minutes} onValueChange={handleMinutesChange}>
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="Minute" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 60 }, (_, i) => (
                  <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                    {i.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
