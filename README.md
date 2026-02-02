**How to run it**

1. Switch your node version to 22.x and make sure that you use NPM
2. Run **npm run install:all** in root directory(node_modules for client and server will be installed)
3. Check if you see node_modules in root directory and in client as well
4. Run **npm run build** in root directory, client and server will be built(dist directory in root directory)
5. Make sure that you have CLASP globally installed
6. Run **clasp login** to login :)
7. Run **clasp push**(please make sure that you already have dist directory)
8. Open your **apps script**, addon should be already here
9. Open settings of the addon and add WEATHER_API_KEY variable with your weather api key
10. After that you should see this addon in assigned table

**!!!IMPORTANT NOTE!!!**
Weather Api doesn't give possibility to use `days` parameter for custom date(not today). If you select another start date, `max days for forecast` slider will be blocked. Not so sure if it's bug of Weather Api or limitation
