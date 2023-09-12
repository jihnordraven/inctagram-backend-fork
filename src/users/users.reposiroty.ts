import { Injectable } from "@nestjs/common";
import { Common } from "../common";
import { addMinutes } from "date-fns";
import { SkipThrottle } from "@nestjs/throttler";
import { User } from "../working.classess/user.class";
import { PrismaClient } from "@prisma/client";

@SkipThrottle()
@Injectable()
export class UsersRepository {
  constructor(protected prisma: PrismaClient,
              protected readonly common: Common
  ) {

  };

  async deleteAllData() {
    await this.prisma.user.deleteMany();
  }

  /*async getAllUsers(paginationCriteria: paginationCriteriaType) {

    const searchLoginTerm = paginationCriteria.searchLoginTerm
    const searchEmailTerm = paginationCriteria.searchEmailTerm
    let searchParams: any[] = []
    if (searchEmailTerm) searchParams.push({email: {$regex: searchEmailTerm, $options: "i"}})
    if (searchLoginTerm) searchParams.push({login: {$regex: searchLoginTerm, $options: "i"}})

    let filter: { $or?: any[] } = {$or: searchParams}
    if (searchParams.length === 0) filter = {}


    const pageSize = paginationCriteria.pageSize;
    // row SQL query to count docs
    const totalCount = await this.dataSource.query(`
    SELECT COUNT(*) FROM public."UserTable"
    WHERE "email" LIKE $1 OR "login" LIKE $2;
    `, [searchEmailTerm, searchLoginTerm])

    const pagesCount = Math.ceil(totalCount / pageSize);
    const page = paginationCriteria.pageNumber;
    const sortBy = paginationCriteria.sortBy;
    const sortDirection: 'asc' | 'desc' = paginationCriteria.sortDirection;
    const ToSkip = paginationCriteria.pageSize * (paginationCriteria.pageNumber - 1);


    const result = await this.dataSource.query(`
    SELECT * FROM public."UserTable"
    WHERE "email" LIKE $1 OR "login" LIKE $2
    ORDER BY $3 $4 
    LIMIT $6 OFFSET $5;
    `, [searchEmailTerm, searchLoginTerm, sortBy, sortDirection, ToSkip, pageSize])

    console.log(result)
    const items = result.map((item) => {
      return item
    })


    console.log(
        {
          pageSize: pageSize,
          totalCount: totalCount,
          pagesCount: pagesCount,
          page: page,
          items: items,
        },
        'its fucking result',
    );
    return {
      pageSize: pageSize,
      totalCount: totalCount,
      pagesCount: pagesCount,
      page: page,
      items: items,
    };
  }*/

  async createUser(DTO: any) {

    const userToCreate = User.createAsAdmin(DTO);

    const result = await this.prisma.user.create({ data: userToCreate });

    return {
      id: result.id,
      login: userToCreate.login,
      email: userToCreate.email,
      createdAt: userToCreate.createdAt
    };
  }


  /*async deleteUserById(id: string) {

    const foundUserQuery = await this.usersTypeORMRepository
        .findOneBy({
          id
        })

    if(!foundUserQuery){
      return null
    }

    const deletedUser = await this.usersTypeORMRepository
        .delete({
          id
        })
    return true

  }*/

  async findUserByLoginOrEmail(loginOrEmail: string, pass: string) {

    console.log(loginOrEmail, " loginOrEmail");
    /*const result = await this.dataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("login = :loginOrEmail", { loginOrEmail: loginOrEmail })
        .orWhere('email = :loginOrEmail', { loginOrEmail: loginOrEmail })
        .getOne()*/
    const result = await this.prisma.user.findFirst({
      where: {
        OR: [
          { login: loginOrEmail },
          { email: loginOrEmail }
        ]
      }
    });


    console.log(result, " result in findUserByLoginOrEmail");
    if (!result) {
      return null;
    }
    return result;
  }

  async createUnconfirmedUser(login: string, password: string, email: string) {

    const code = this.common.createEmailSendCode();
    const newUnconfirmedUser = User.createUnconfirmedUser(login, password, email, code);

    const newlyCreatedUserQuery = await this.prisma.user.create({data : newUnconfirmedUser});
    return newlyCreatedUserQuery;

  }

  async findUserByEmail(email: string) {
    /*const filter = { email: email }
    return  this.dataSource.query(`
    DELETE FROM public."UserTable"
    WHERE 1 = 1;
    `)*/

    console.log(email, "email in findUserByEmail");
    if (!email) {
      return null;
    }
    return this.prisma.user.findFirst({ where : {email} });
  }

  async changeUsersConfirmationCode(id: string, confirmationCode: string) {
    const newCodeDateOfExpiary = addMinutes(new Date(), 30).toISOString();
    console.log(newCodeDateOfExpiary, "-><-");
    console.log(new Date().toISOString(), "-><-");
    console.log(addMinutes(new Date(), 30), "-><-");

    await this.prisma.user
      .update({
        where: { id },
        data:
          {
            code: confirmationCode,
            codeDateOfExpiary: newCodeDateOfExpiary
          }
      });
  }

  async findUserByRegistrationCode(code: string) {
    console.log(code, " code in findUserByRegistrationCode");
    if (!code) {
      return null;
    }
    const foundUser = await this.prisma.user.findFirst({
      where : {
        code
      }
    })

    return foundUser;
  }

  async findUserCodeFreshness(foundUser: User) {
    return new Date().toISOString() < foundUser.codeDateOfExpiary!;
  }

  async makeUserConfirmed(foundUser: User) {
    await this.prisma.user.update({
      where: { id: foundUser.id }, data:
        {
          code: null,
          codeDateOfExpiary: null,
          isConfirmed: true
        }
    });
  }

  async findUserByLogin(login: string) {
    console.log(login, "login in findUserById");
    if (!login) {
      return null;
    }


    const result = await this.prisma.user.findFirst({
      where: {
        login
      }
    });
    return result;
  }

  async findUserById(userId: string) {

    /*const [result] = await this.dataSource.query(`
    SELECT *  FROM public."UserTable"
    WHERE "id" = $1
    `, [userId] )*/

    const user: User = await this.prisma.user.findUnique({
      where: {
        id: userId
      }, include : {
        api_session : false
      }
    });
    return user
  }

  async getAllUsersFromDBWithoutPagination() {
    return this.prisma.user.findMany();
  }
}
