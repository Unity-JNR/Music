import express from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import songRoute from './routes/songs.js'
import userRoute from './routes/users.js'
import loginRoute from './routes/login.js'
import {auth,authenticate} from './middleware/authentication.js'


config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());
app.use(express.static('static'))

app.use(cookieParser());

app.use('/songs', songRoute); 
app.use('/users', userRoute);
app.use('/login',auth, loginRoute);
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
