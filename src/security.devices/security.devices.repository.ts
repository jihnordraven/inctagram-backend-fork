import { Injectable, Session } from "@nestjs/common";
import { InjectModel, Prop } from "@nestjs/mongoose";

import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import {DataSource, Not, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {isUUID} from "class-validator";
import { APISession } from "../working.classess/api.session.class";
import { PrismaClient } from "@prisma/client";
import firebase from "firebase/compat";
import { User } from "../working.classess/user.class";

@Injectable()
export class SecurityDevicesRepository {
    constructor(protected prisma : PrismaClient

                ) {

    }


  async createNewSession(user: any, ip: string, title: string,deviceId : string,  refreshToken : string) {

      const newSession = APISession.create({user, ip, title,deviceId, refreshToken})
      const newSessionData = {...newSession, user : { connect : {id : user.id}}}
      return this.prisma.api_session.create({data : {...newSessionData}})

  }

  async updateSessionByDeviceId(deviceId: string, lastActiveDate: string, newRefreshToken: string) {
    /*const updatedSession = await this.dataSource.query(`
    DELETE FROM public."UserTable"
    WHERE 1 = 1;
    `)*/

       await this.prisma.api_session
          .update({where : {id: deviceId}, data:
              {
                  lastActiveDate: lastActiveDate,
                  refreshToken: newRefreshToken
              }
          })
      return true
  }

  async deleteDeviceById(deviceId: string) {
      const deletedSession = await this.prisma.api_session
          .delete({
              where : {id : deviceId}
          })
      return true
  }

  async getAllDevicesForCurrentUser(userId: string) {
      /*return await this.dataSource.query(`
    DELETE FROM public."UserTable"
    WHERE 1 = 1;
    `)*/

      return this.prisma.api_session
        .findMany({
          where: {
            user: {
              id: userId
            }
          },
          include : {
            user : true
    }


        });
  }

  async gedDeviceByDeviceId(deviceId: string) {
      /*return await this.dataSource.query(`
    DELETE FROM public."UserTable"
    WHERE 1 = 1;
    `)*/

      return this.prisma.api_session
          .findFirst({
            where: {
              id: deviceId
            }
          })

  }

  async deleteAllDevicesExcludeCurrentDB(userIdFromRefreshToken: string, deviceIdFromRefreshToken: string) {
      /*return await this.dataSource.query(`
    DELETE FROM public."UserTable"
    WHERE 1 = 1;
    `)*/

      const deletedSessions = await this.prisma.api_session
          .deleteMany({
            where: {
              NOT: {
                id: deviceIdFromRefreshToken
              },
              user: {
                id: userIdFromRefreshToken
              }
            }
          })
      return true

  }

  async findDeviceById(deviceId: string) {
    /*return await this.dataSource.query(`
    DELETE FROM public."UserTable"
    WHERE 1 = 1;
    `)*/

      if(!isUUID(deviceId)){
          return null
      }
      return this.prisma.api_session
          .findUnique({
            where : {
              id: deviceId
            }
          })
  }

  async deleteAllData() {
      await this.prisma.api_session.deleteMany({})
  }



    async findDeviceByIdWithUser(deviceId: string) {
        if(!isUUID(deviceId)){
            return null
        }
        return this.prisma.api_session
            .findUnique({
                where : {id : deviceId},
                include : {user : true}
            })
    }
}