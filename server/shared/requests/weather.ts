import { appScriptProperties, baseUrls } from "../const/index";

const getApiKey = (): string => {
  const apiKey = PropertiesService.getScriptProperties().getProperty(
    appScriptProperties.WEATHER_API_KEY,
  );

  if (!apiKey) {
    throw new Error("Weather API key is not set");
  }

  return apiKey;
};

export const searchCities = (query: string) => {
  const apiKey = getApiKey();

  const response = UrlFetchApp.fetch(
    `${baseUrls.WEATHER_API_BASE}/search.json?key=${apiKey}&q=${encodeURIComponent(query)}`,
    {
      muteHttpExceptions: true,
    },
  );

  if (response.getResponseCode() !== 200) {
    throw new Error("WeatherAPI search failed");
  }

  return JSON.parse(response.getContentText());
};
