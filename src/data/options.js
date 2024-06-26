import { formatDate } from "../helpers/date.js";

export const DOMAIN_OPTIONS = [
  { id: 0, name: "One day analysis.", oneDayAgo: true },
  { id: 1, name: "One week analysis.", oneWeekAgo: true },
  { id: 2, name: "One month analysis.", oneMonthAgo: true },
  {
    id: 3,
    name: "Compare dates.",
    value: { startDate: formatDate(new Date()), endDate: formatDate(new Date()) },
    compareDates: true,
  },
];

export const PRIMARY_OPTIONS = {
  DOMAIN: "domain",
  WRITING: "writing",
};
