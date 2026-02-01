import { appScriptProperties, baseUrls } from "../const/index";
import { SearchParameter, ForecastRequestData } from "../types/index";

const getApiKey = (): string => {
  const apiKey = PropertiesService.getScriptProperties().getProperty(
    appScriptProperties.WEATHER_API_KEY,
  );

  if (!apiKey) {
    throw new Error("Weather API key is not set");
  }

  return apiKey;
};

// URLSearchParams is not supported in Apps Script environment
export const getSearchUrl = (params: SearchParameter[]) => {
  const searchParams = params.reduce((acc, { key, value }, index) => {
    if (!key || !value) {
      return acc;
    }

    acc += `${index > 0 ? "&" : "?"}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

    return acc;
  }, "");

  return searchParams;
};

export const searchCities = (query: string) => {
  const apiKey = getApiKey();

  const searchUrl = getSearchUrl([
    { key: "key", value: apiKey },
    { key: "q", value: query },
  ]);

  const response = UrlFetchApp.fetch(
    `${baseUrls.WEATHER_API_BASE}/search.json${searchUrl}`,
    {
      muteHttpExceptions: true,
    },
  );

  if (response.getResponseCode() !== 200) {
    throw new Error("WeatherAPI search failed");
  }

  return JSON.parse(response.getContentText());
};

export const getForecast = (requestData: ForecastRequestData) => {
  const apiKey = getApiKey();

  const searchUrl = getSearchUrl([
    { key: "key", value: apiKey },
    { key: "q", value: requestData.city },
    { key: "dt", value: requestData.startDate },
    { key: "days", value: requestData.daysCount.toString() },
  ]);

  const response = UrlFetchApp.fetch(
    `${baseUrls.WEATHER_API_BASE}/forecast.json${searchUrl}`,
    {
      muteHttpExceptions: true,
    },
  );

  if (response.getResponseCode() !== 200) {
    throw new Error("WeatherAPI forecast failed");
  }

  return JSON.parse(response.getContentText());
};
