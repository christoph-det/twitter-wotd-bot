# Twitter Bot Word of The Day

<img align="right" img src="logo.png" />

This is a NodeJS implementation of a Twitter bot.
It is scraping the current trending hashtags on Twitter every day, saving them in a MongoDB database. At the end of every day the most popular hashtag is determined and posted to a Twitter account.

Find the Twitter Account here: https://twitter.com/wotd_austria

## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Development

```
npm run dev
```

## Production

```
npm run build
npm run start
```

## API Server utilities:

- [morgan](https://www.npmjs.com/package/morgan)
  - HTTP request logger middleware for node.js
- [helmet](https://www.npmjs.com/package/helmet)
  - Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
- [dotenv](https://www.npmjs.com/package/dotenv)
  - Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`

Development utilities:

- [nodemon](https://www.npmjs.com/package/nodemon)
  - nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [eslint](https://www.npmjs.com/package/eslint)
  - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
