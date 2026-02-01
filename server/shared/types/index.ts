export interface SearchParameter {
  key: string;
  value: string;
}

export interface ForecastRequestData {
  city: string;
  startDate: string;
  daysCount: number;
}
