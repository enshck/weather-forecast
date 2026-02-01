export interface CityResponse {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export interface ForecastRequestData {
  city: string;
  daysCount: number;
  startDate?: string;
}

interface ForecastResponseDataElement {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    condition: {
      text: string;
    };
  };
}

export interface ForecastResponseData {
  forecast: {
    forecastday: ForecastResponseDataElement[];
  };
}
