import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToMonthDay(isoString: string | undefined): string {
  const date = new Date(isoString || "");
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export const subtractThirtyMins = (timeString: string | undefined): string => {
  const dummyDate = new Date("2000-01-01" + timeString);
  dummyDate.setMinutes(dummyDate.getMinutes() - 30);
  const hours = dummyDate.getHours();
  const minutes = dummyDate.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};
