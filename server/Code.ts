export * from "./shared/index";

export const onOpen = () => {
  SpreadsheetApp.getUi()
    .createMenu("Weather")
    .addItem("Open Sidebar", "openSidebar")
    .addToUi();
};

export const openSidebar = () => {
  const html =
    HtmlService.createHtmlOutputFromFile("index").setTitle("Weather Forecast");
  SpreadsheetApp.getUi().showSidebar(html);
};

export const writeForecastToSheet = (forecastDays: Array<any>) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Clear previous data if needed
  sheet.clearContents();

  // Column headers with widths
  const columns = [
    { title: "Date", width: 80, key: "date" },
    { title: "Max Temperature (°C)", width: 180, key: "day.maxtemp_c" },
    { title: "Min Temperature (°C)", width: 180, key: "day.mintemp_c" },
    { title: "Average Temperature (°C)", width: 200, key: "day.avgtemp_c" },
    { title: "Wind Speed (km/h)", width: 180, key: "day.maxwind_kph" },
    { title: "Avg Humidity (%)", width: 180, key: "day.avghumidity" },
    { title: "Weather Conditions", width: 180, key: "day.condition.text" },
  ];

  const headers = columns.map((col) => col.title);
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Make headers bold
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");

  // Set column widths (in pixels)
  columns.forEach((col, i) => {
    sheet.setColumnWidth(i + 1, col.width);
  });

  // Prepare an array of data to write (each element is an array of values per row)
  const rows = forecastDays.map((day) => {
    return columns.map((col) => {
      // Support nested keys like "day.maxtemp_c"
      const keys = col.key.split(".");
      let value = day;

      for (const key of keys) {
        value = value[key];
      }

      return value;
    });
  });

  // Write data to the sheet starting from the second row
  sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
};
