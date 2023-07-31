import ServiceCrud from '../../model/service/crud';
import { IQueryFilter } from '../../types';

class CrudController {
    async get (req, res) { // метод на получение
        try {
            const queryFilter: IQueryFilter = {
                date: [],
                teachersIds: [],
                studentsCount: []
            };

            req.query.status ? queryFilter.status = true : queryFilter.status = false;
            queryFilter.lessonsPerPage = req.query.lessonsPerPage;

            

            if (req.query.page) {
                queryFilter.page = req.query.page;
            }
            
            if (req.query.teacherIds) {
                const teachersSplit = req.query.teacherIds.split(',');
                teachersSplit.map(elem => {
                    const newEl = Number(elem);
                    if (!(isNaN(newEl))) {
                        queryFilter.teachersIds.push(newEl);
                    }
    
                    else {
                       throw new Error('Некорректный формат ID учителя!');
                    }
                });
            }
            
            if (req.query.date) {
                const dateArray = req.query.date.split(',');
                const date_regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
                if (dateArray.length >2) {
                    throw new Error('Некорректный формат даты!');
                }
    
                for (const date of dateArray) {
                    if (!(date_regex.test(date))) {
                        throw new Error('Некорректный формат даты!');
                    }
                    const newDate = new Date(date);
                    queryFilter.date.push(newDate);  
                }
            }

            if (req.query.studentsCount) {
                const dateArray = req.query.studentsCount.split(',');
                
                if (dateArray.length>2) {
                    throw new Error('Некорректный формат количества студентов! Введите 2 числа!');
                }
                dateArray.map(elem => {
                    const newEl = Number(elem);
                    if (!(isNaN(newEl))) {
                        queryFilter.studentsCount.push(newEl);
                    }
    
                    else {
                       throw new Error('Некорректный формат количества студентов!');
                    }
                });
            }
            
            const result = await ServiceCrud.get(queryFilter);
            console.log(req.query.lessonsPerPage);
            console.log(queryFilter);
            
            res.send(result);
        } catch (error) {
            res.send(error.message);
        }
    }

    async create (req, res) { // метод на добавление
        try {
            const result = await ServiceCrud.create(req.body);
            console.log(result);
            
            res.send(result);
        } catch (error) {
            res.send(error);
        }
    }
}

export default new CrudController();