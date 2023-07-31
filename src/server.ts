import express from 'express';
import { connectBD } from './connectBD';
import router from './routes';

const server = express(); // новый экземпляр сервера
const port = Number(process.env.PORT); // порт из переменных окружения
connectBD(); // подключаемся к базе данных

server.use('/', router); // монтируем маршруты

server.listen(port, () => {
  console.log(`Server on port ${port}`);
});
