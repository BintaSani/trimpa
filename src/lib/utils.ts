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

export const subtractThirtyMins = (time: string, minutes: number): string => {
  // Parse the time
  const [hourMinute, modifier] = time.split(" ");
  let [hours, mins] = hourMinute.split(":").map(Number);

  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  // Create a Date object
  const date = new Date();
  date.setHours(hours, mins, 0, 0);

  // Subtract minutes
  date.setMinutes(date.getMinutes() - minutes);

  // Format back to 12-hour time
  let newHours = date.getHours();
  const newMinutes = date.getMinutes();
  const ampm = newHours >= 12 ? "PM" : "AM";
  newHours = newHours % 12 || 12;

  return `${newHours.toString().padStart(2, "0")}:${newMinutes
    .toString()
    .padStart(2, "0")} ${ampm}`;
};

// Example
export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) return "Invalid Date"; // handle invalid dates

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // e.g. "Nov"
  const year = date.getFullYear();

  // Handle special cases 11th, 12th, 13th
  const special = [11, 12, 13];
  const suffix = special.includes(day % 100)
    ? "th"
    : day % 10 === 1
      ? "st"
      : day % 10 === 2
        ? "nd"
        : day % 10 === 3
          ? "rd"
          : "th";

  return `${day}${suffix} ${month} ${year}`;
};

// "6th Nov 2025"
export function formatDuration(isoDuration: string): string {
  if (!isoDuration) return "";
  return isoDuration
    .replace("PT", "")
    .replace("H", "h ")
    .replace("M", "m")
    .trim();
}

export function getDurationBetween(start: string, end: string): string {
  const diffMs = new Date(end).getTime() - new Date(start).getTime();
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

export function formatTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
