<h1 align="center">Web app lessons schedule</h1>
<p align="center">
  <img src="./readme_assets/Screenshot_322.png" width="25%">
  <img src="./readme_assets/Screenshot_323.png" width="25%">
  <img src="./readme_assets/Screenshot_324.png" width="25%">
</p>

# Technologies
<p>
  <strong>Backend:</strong> Nest, Prisma ORM, MYSQL.<br/>
  <strong>Frontend:</strong> React, Redux Toolkit, Typescript, MUI, React-hook-form
</p>
<h2 align="center"><a  href="https://t.me/pi123schedule_bot">Live Version</a></h2>

# Description
Lessons schedule bot created with Telegram web apps. Schedules are often sent as a photo, that's very uncomfortable and takes time to find your lessons for today. <br>
Using this app you can easily browse, add, change lessons for all days.


# Project setup

### Backend:
```
$ git clone https://github.com/MrJeleika/web-app-nest.git
```
Create `.env` file with following variables:
```
DATABASE_URL="Url of your mysql database"
TOKEN="Token of your telegram bot"
```

### Frontend:
```
$ https://github.com/MrJeleika/web-app-telegram-react-mysql.git
```
Replace `baseUrl` in src/redux/api/appApi.ts to url where backend running
