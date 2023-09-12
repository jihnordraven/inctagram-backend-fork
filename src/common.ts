import { ObjectId } from 'mongodb';
import { Mongoose } from 'mongoose';


import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import {v4 as uuidv4} from "uuid";
import { Prop } from "@nestjs/mongoose";




@Injectable()
export class Common {
  mongoObjectId = function() {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  }


  tryConvertToObjectId = (id: string): Types.ObjectId | null => {
    try {
      const convertedId = new Types.ObjectId(id);

      return convertedId;
    } catch (e) {
      return null;
    }
  }

  delayTest = async (milliseconds: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, milliseconds)
    })
  }


  createEmailSendCode() {
    return uuidv4()
  }
}