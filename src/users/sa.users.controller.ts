import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode, HttpStatus,
  NotFoundException,
  Param,
  Post, Put,
  Query, Req, Res,
  UseGuards
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { paginationCriteriaType } from "../appTypes";
import { Common } from "../common";
import { BasicAuthGuard } from "../auth/auth.guard";
import { UserDTO } from "../input.classes";
import { SkipThrottle } from "@nestjs/throttler";
import { Response } from "express";
import { CommandBus } from "@nestjs/cqrs";




@SkipThrottle()
@UseGuards(BasicAuthGuard)
@Controller('/sa/users')
export class SAUsersController{
  constructor(protected readonly usersService : UsersService,
              protected readonly commandBus : CommandBus,
              protected readonly common : Common) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() DTO : UserDTO){
    return await this.usersService.createUser(DTO)
  }

  /*@Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param("id") id){
    const result = await this.usersService.deleteUserById(id)
    if (!result){
      throw new NotFoundException("not found")
    }
    return
  }*/
}