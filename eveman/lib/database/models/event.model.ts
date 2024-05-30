import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document{
    // for each time we use know property of schema
    _id:string;  
    title: string;
    description?: string; // Optional property
    location?: string; // Optional property
    createdAt: string;
    imageUrl: string;
    startDate: Date;
    endDate: Date;
    price?: string; // Optional property
    isFree: boolean;
    url?: string; // Optional property
    category?: { _id:string , name:string };
    organizer?: { _id:string, firstname:string, lastname:string };
    

}
const EventSchema = new Schema({
    title:{ type:String ,  required:true },
    description: { type:String },
    location: { type:String },
    createdAt: { type:String , default:Date.now },
    imageUrl: { type:String , required:true },
    startDate: { type:Date , default:Date.now },
    endDate: { type:Date , default:Date.now },
    price: { type:String },
    isFree: { type:Boolean, default:false },
    url: { type:String },
    category: {type:Schema.Types.ObjectId, ref:'Category'},
    organizer: { type:Schema.Types.ObjectId, ref:'User'} ,
})

const Event = models.Event || model('Event', EventSchema);

export default Event;