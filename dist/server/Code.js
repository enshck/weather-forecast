const onOpen = () => {
  SpreadsheetApp.getUi()
    .createMenu("Weather")
    .addItem("Open Sidebar", "openSidebar")
    .addToUi();
};

const openSidebar = () => {
  const html =
    HtmlService.createHtmlOutputFromFile("index").setTitle("Weather Forecast");
  SpreadsheetApp.getUi().showSidebar(html);
};
