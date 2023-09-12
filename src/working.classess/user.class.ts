import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {UserDTO} from "../input.classes";
import add from "date-fns/add";
import {randomUUID} from "crypto";
import { APISession } from "./api.session.class";

export class User {
    id: string;
    login: string;
    email: string;
    password: string
    createdAt: string
    isConfirmed: boolean;
    code: string ;
    codeDateOfExpiary: string | null;

    session? : APISession[]
    static createAsAdmin(DTO: UserDTO) {
        const newUser = new User()

        newUser.id = randomUUID()
        newUser.login = DTO.login
        newUser.password = DTO.password
        newUser.email = DTO.email
        newUser.createdAt = new Date().toISOString()
        newUser.isConfirmed = true
        newUser.code = null
        newUser.codeDateOfExpiary = null
        return newUser
    }

    static createUnconfirmedUser(login: string, password: string, email: string, code : string) {
        const newUser = new User()

        const dateOfCreation = new Date()

        newUser.id = randomUUID()
        newUser.login = login
        newUser.password = password
        newUser.email = email
        newUser.createdAt = dateOfCreation.toISOString()
        newUser.isConfirmed = false
        newUser.code = code
        newUser.codeDateOfExpiary = add(dateOfCreation, {minutes: 10}).toISOString()
        return newUser
    }

}