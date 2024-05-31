"use server"

import { CreateEventParams, GetAllEventsParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabse } from "../database"
import User from "../database/models/user.model"
import Event from "../database/models/event.model"
import Category from "../database/models/category.model"

const populateEvent = async(query:any) =>{
    return query
        .populate({path:'organizer' ,model:User,select:'_id firstName lastName'})
        .populate({path:'category' ,model:Category,select:'_id name'})
}

export const createEvent = async ({ event, userId, path } : CreateEventParams)=>{
    try {
        await connectToDatabse();

        const organizer = await User.findById(userId);

        if(!organizer){
            throw new Error("Oragnizer not found");
        }
        const newEvent = await Event.create({ ...event,category:event.categoryId,organizer:userId});

        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
        handleError(error)
    }
}

export const getEventbyId =async (eventId: string)=>{
    try {
        await connectToDatabse();
        
        const event = await populateEvent(Event.findById(eventId));
        // console.log("action event details ");
        // console.log(event);
        
        
        if(!event){
            throw new Error("event  not found");
        }
        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        handleError(error);
    }
}

export const getAllEvents =async ({ query, limit=6 ,page,category }:GetAllEventsParams)=>{
    try {
        await connectToDatabse();
        
        const conditions ={

        }
        const eventsQuery = Event.find(conditions)
            .sort({createdAt :'desc'})
            .skip(0)
            .limit(limit);

        const events = await populateEvent(eventsQuery);
        const eventsCount =await Event.countDocuments(conditions)
        return {
            data:JSON.parse(JSON.stringify(events)),
            totalPages:Math.ceil(eventsCount/limit)
        }
    } catch (error) {
        handleError(error);
    }
}