import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../users/users.reposiroty";
import { SecurityDevicesRepository } from "../security.devices/security.devices.repository";



@Injectable()
export class TestingService {
  constructor(
              private readonly usersRepository: UsersRepository,
              private readonly apiSessionRepository: SecurityDevicesRepository,

              ) {
  }
  async  deleteAllData(){

    await  this.usersRepository.deleteAllData()
    await  this.apiSessionRepository.deleteAllData()
  }
}