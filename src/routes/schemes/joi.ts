import Joi from 'joi';

class JoiCrud {
    querySchemaGet = Joi.object({
        date: Joi.string().description('Одна или две даты'),
        status: Joi.number().valid(0, 1).description('Статус занятия'),
        teacherIds: Joi.string().description('Учителя'),
        studentsCount: Joi.string().description('Количество учеников'),
        page: Joi.number().min(1).description('Номер страницы'),
        lessonsPerPage: Joi.number().min(1).default(5).description('Количество занятий на странице, по дефолту 5')
    });

    querySchemaCreate = Joi.object({
        teacherIds: Joi.array().items(Joi.number()).description('ID учителей, ведущих занятия').single().required(),
        title: Joi.string().required(),
        days: Joi.array().items(Joi.number().valid(0, 1, 2, 3, 4, 5, 6)).description('Дни недели').single().required(),
        firstDate: Joi.date().description('Первая дата').required(),
        lessonsCount: Joi.number().description('Количество занятий'),
        lastDate: Joi.date().description('Последняя дата')
    }).xor('lessonsCount', 'lastDate');
}

export default new JoiCrud();