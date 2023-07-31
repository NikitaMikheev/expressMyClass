import express from 'express';
import CrudController from '../controllers/crud.ts';
import JoiCrud from './schemes/joi';
import { createValidator } from 'express-joi-validation';
import bodyParser from 'body-parser';

const router = express.Router();
const jsonParser = bodyParser.json(); // парсим body

const validator = createValidator();

router.get('/', validator.query(JoiCrud.querySchemaGet), CrudController.get);

router.post('/lessons', jsonParser, validator.body(JoiCrud.querySchemaCreate), CrudController.create);

export default router;