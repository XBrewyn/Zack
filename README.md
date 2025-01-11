
<p align="center">
  <img width="300" src="https://github.com/user-attachments/assets/eedaa923-7ea9-4305-9b88-d68691129bfb" />
</p>
<p align="center">
 <img width="150" src="https://img.shields.io/badge/npm%20package->=v21.6.2-green" />
</p>

## Description 
Zack is an application that allows you to create schedules and send emails based on a specified date and time. With this service, you can easily manage schedules and automate email notifications at the right moment.

## Tecnologies
- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/en/guide/routing.html)
- [Typescript](https://www.typescriptlang.org/)
- [Vercel](https://vercel.com/)

## Installation Guide for Developers

#### Download and Install Git:

1. Ensure Git is installed on your machine. You can download it from Git's [official website](https://git-scm.com/downloads).

#### Download and Install Node.js:

1. Make sure Node.js is installed on your machine. You can download it from Node.js [official website](https://nodejs.org/en).

#### Clone the Repository:
1. Open the `terminal`, and execute the next command: 
```bash 
 git clone https://github.com/dreamcityteam/Zack.git

 cd Zack
```

#### Setup Environment Variables:
1. Contact the developers to obtain the [.env](https://drive.google.com/file/d/1ejFJcT6XYlKt-960YFzlRwTZA_K3ZSdb/view?usp=drive_link) file.
2. Add the `.env` file in the root directory of the project.

#### Run the Application in mode development:
1. Open the terminal at the root of the project and execute the following command:
```npm i && npm run start:dev ```

## API Endpoints
### GET /api/v1/schedules
Retrieve all the schedules added to the system.
#### URL:
```bash 
https://zack-ivory.vercel.app/api/v1/schedules?token=XXXX
```
#### Parameters:
token (required): Authentication token for the request.
#### Response:
`Success`: 
```bash 
{
  "data": {
    "12/26/2024": {
      "12:50": {
        "xbrewyn@gmail.com": true
      }
    },
   "01/08/2025": {
      "08:29": {
        "xbrewyn@gmail.com": true,
        "bespinal@dreamcityteam.com": true
      }
    },
  },
  "message": "Successfuly",
  "status": 200
}
```
### POST /api/v1/schedules
Add a new schedule to the system. This endpoint will also trigger an email to be sent based on the schedule.
#### URL:
```bash 
https://zack-ivory.vercel.app/api/v1/schedules?token=XXXX
```
#### Parameters:
token (required): Authentication token for the request.
#### Payload (JSON):
```bash 
{
  "schedule": "12:50",   // The time when the email should be sent
  "date": "12/26/2024",  // The date of the schedule
  "email": "example@domain.com"  // Recipient email address
}
```
#### Response:
`Success`: 
```bash 
{
  "data": {
    "12/26/2024": {
      "12:50": {
        "example@domain.com": true
      }
    },
  },
  "message": "Successfuly",
  "status": 200
}
```
`Error`:
```bash 
{
  "data": null,
  "message": "The date is in the past.",
  "status": 400
}
```

### License:
This project is licensed under the MIT License.

### Contact:
For any questions, feel free to reach out to the development: <br /> <br />
`Email:` xbrewyn@gmail.com <br />
`WhatsApp:` +1 (829) 683-2226
