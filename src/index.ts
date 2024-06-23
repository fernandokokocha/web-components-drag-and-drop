import express, { Express } from "express";

const app: Express = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  app.use(express.static('public'))
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
