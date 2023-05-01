import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
import connect from './utils/connect'

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(cors())

routes(app);
connect();

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
