import type {
  CityResponse,
  ForecastRequestData,
  ForecastResponseData,
} from "@/shared/types";

export const searchCities = (query: string): Promise<CityResponse[]> =>
  new Promise((resolve) => {
    google.script.run.withSuccessHandler(resolve).searchCities(query);
  });

export const putForecastToSheet = (data: ForecastRequestData): Promise<any> =>
  new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler((result: ForecastResponseData) =>
        google.script.run
          .withSuccessHandler(resolve)
          .withFailureHandler(reject)
          .writeForecastToSheet(result.forecast.forecastday),
      )
      .withFailureHandler(reject)
      .getForecast(data);
  });
