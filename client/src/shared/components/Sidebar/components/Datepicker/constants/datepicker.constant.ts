const START_YEAR = 1990;

export const HEADER_YEARS = Array.from({ length: new Date().getFullYear() + 1 - START_YEAR }, (_, i) => START_YEAR + i);

export const HEADER_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
