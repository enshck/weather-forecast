import { type CityResponse } from "@/shared/types";

export const searchCities = (query: string): Promise<CityResponse[]> =>
  new Promise((resolve) => {
    google.script.run.withSuccessHandler(resolve).searchCities(query);
  });
