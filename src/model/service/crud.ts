import { AppDataSource } from "../../data-source";
import { ILesson } from "../../types";
import { Lessons } from "../entity/Lessons";
import DateHelper from "./helpers/dateHelper";
import createObjectLesson from "./helpers/createObjectLesson";

class ServiceCrud {
    async get(params) {
        try {
            const result = await createObjectLesson.getLessons(params);
            return result;
        } catch (error) {
            return error;
        }
    }

    async create(body: ILesson) {
        try {
            const lastDate = new Date(body.firstDate);
            
            const array: Lessons[] = [];
            const upDate = async (date, count, lastDate) => { // рекурсивная функция на создание занятий по первой и последней дате и по дням недели
                         
                if (body.lastDate !== undefined && date <= body.lastDate) {
                    
                    if (body.days.includes(date.getDay())) { // если день даты совпадает с днем, в который необходимо создать занятие => создаем занятие
                        const newLesson = await createObjectLesson.createObject(body, date); // формируем объект для сохранения в сущность
                        array.push(structuredClone(newLesson));
                    }
                    date = DateHelper.dateIncriment(date); // инкремент даты
                    
                     
                    if (count<=300) { // лимит в 300 занятий
                        await upDate(date, ++count, lastDate); // повторно вызываем функцию
                    }
                }
                
                else if (body.lessonsCount !== undefined && date <= lastDate) { // если указан lessonCount
                    if (body.days.includes(date.getDay()) && count <= body.lessonsCount) { 
                        const newLesson = await createObjectLesson.createObject(body, date); 
                        array.push(structuredClone(newLesson));
                        ++count;
                    }
                    date = DateHelper.dateIncriment(date);
                    await upDate(date, count, lastDate);
                }
            };
            await upDate(body.firstDate, 1, lastDate.setFullYear(lastDate.getFullYear() +1));
        
            await AppDataSource.manager.save(Lessons, array);

            const idArray = (await array).map(elem => elem.id); // получаем id сохраненных занятий
            
            return idArray; // возвращаем массив
        } catch (error) {
            return error;
        }
    }
}

export default new ServiceCrud();