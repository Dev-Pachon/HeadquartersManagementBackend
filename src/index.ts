import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import connect from  './utils/connect'

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors())

app.get('/', (req : Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

routes(app);
connect();

app.listen(port, () => {
  console.log("Application running");
  console.log(`Server is running at http://localhost:${port}`);
});
