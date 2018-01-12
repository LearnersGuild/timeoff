# Timeoff
An app for coaches to report their time-off.

## Setting up Development Environment

- Clone the repository
- Install your dependencies: `npm install`
- Create your database: `npm run db:create`
- Create your migration and give it an environment: `npm run db:migrate`
- Create a `.env` file and copy and paste the content of the `.env.example` file and insert your own environment variables.

## Technical Stack

### Back End
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/) ([Documentation](https://expressjs.com/en/4x/api.html))

### Database
* [PostgreSQL](https://www.postgresql.org/)
  * [pg-promise](https://github.com/vitaly-t/pg-promise)
