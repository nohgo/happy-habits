import { ObjectId } from "mongodb";

export default class Habit {
    constructor(public address: Object, public borough: string, public cuisine: string, public grades: Array<Object>, public name: string, public restaurant_id: string, public id?: ObjectId) {};
}