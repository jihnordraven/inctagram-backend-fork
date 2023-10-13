/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/auth-microservice/prisma/prisma.module.ts":
/*!********************************************************!*\
  !*** ./apps/auth-microservice/prisma/prisma.module.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./apps/auth-microservice/prisma/prisma.service.ts");
let PrismaModule = class PrismaModule {
};
PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService]
    })
], PrismaModule);
exports.PrismaModule = PrismaModule;


/***/ }),

/***/ "./apps/auth-microservice/prisma/prisma.service.ts":
/*!*********************************************************!*\
  !*** ./apps/auth-microservice/prisma/prisma.service.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);
exports.PrismaService = PrismaService;


/***/ }),

/***/ "./apps/auth-microservice/src/app.controller.ts":
/*!******************************************************!*\
  !*** ./apps/auth-microservice/src/app.controller.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/auth-microservice/src/app.service.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const templates_1 = __webpack_require__(/*! ../static/templates */ "./apps/auth-microservice/static/templates/index.ts");
const config_1 = __webpack_require__(/*! ../../../libs/common/src/config */ "./libs/common/src/config/index.ts");
const decorators_1 = __webpack_require__(/*! ../utils/decorators */ "./apps/auth-microservice/utils/decorators/index.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    test() {
        return (0, templates_1.HelloPageHTML)({ HOST: config_1.CONFIG.HOST });
    }
    async seedDB() {
        return this.appService.seedDB();
    }
    async truncateDB(table) {
        await this.appService.truncateDB(table);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "test", null);
__decorate([
    (0, common_1.Post)('db/seed'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: `Created a mock user (email: "email-[i]@mock.com",login: "login-[i]", password: "Password123%")`
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AppController.prototype, "seedDB", null);
__decorate([
    (0, common_1.Post)('db/truncate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'truncate table or tables' }),
    (0, swagger_1.ApiParam)({
        name: 'Table name in query params',
        type: String,
        examples: {
            'truncate users table': { value: 'user' },
            'truncate sessions table': { value: 'session' },
            'truncate email_codes table': { value: 'emailCode' },
            'truncate google_profiles table': { value: 'googleProfile' },
            'truncate github_profile table': { value: 'githubProfile' }
        }
    }),
    __param(0, (0, common_1.Query)('table')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AppController.prototype, "truncateDB", null);
AppController = __decorate([
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiTags)('Basic endpoints (not available in production mode)'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/auth-microservice/src/app.module.ts":
/*!**************************************************!*\
  !*** ./apps/auth-microservice/src/app.module.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/auth-microservice/src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/auth-microservice/src/app.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const auth_module_1 = __webpack_require__(/*! ./entities/auth/auth.module */ "./apps/auth-microservice/src/entities/auth/auth.module.ts");
const auth_service_1 = __webpack_require__(/*! ./entities/auth/auth.service */ "./apps/auth-microservice/src/entities/auth/auth.service.ts");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const schedule_1 = __webpack_require__(/*! @nestjs/schedule */ "@nestjs/schedule");
const auth_repository_1 = __webpack_require__(/*! ./entities/auth/repositories/auth.repository */ "./apps/auth-microservice/src/entities/auth/repositories/auth.repository.ts");
const auth_query_repository_1 = __webpack_require__(/*! ./entities/auth/repositories/auth-query.repository */ "./apps/auth-microservice/src/entities/auth/repositories/auth-query.repository.ts");
const strategies_1 = __webpack_require__(/*! ./entities/auth/guards-handlers/strategies */ "./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/index.ts");
const guards_1 = __webpack_require__(/*! ./entities/auth/guards-handlers/guards */ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/index.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const modules_1 = __webpack_require__(/*! ./modules */ "./apps/auth-microservice/src/modules/index.ts");
const sessions_module_1 = __webpack_require__(/*! ./entities/sessions/sessions.module */ "./apps/auth-microservice/src/entities/sessions/sessions.module.ts");
const users_service_1 = __webpack_require__(/*! ./entities/users/users.service */ "./apps/auth-microservice/src/entities/users/users.service.ts");
const prisma_module_1 = __webpack_require__(/*! ../prisma/prisma.module */ "./apps/auth-microservice/prisma/prisma.module.ts");
const users_reposiroty_1 = __webpack_require__(/*! ./entities/users/users.reposiroty */ "./apps/auth-microservice/src/entities/users/users.reposiroty.ts");
const sessions_repository_1 = __webpack_require__(/*! ./entities/sessions/sessions.repository */ "./apps/auth-microservice/src/entities/sessions/sessions.repository.ts");
const handlers_1 = __webpack_require__(/*! ./entities/auth/application/commands/handlers */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/index.ts");
const adapters_1 = __webpack_require__(/*! ./entities/auth/adapters */ "./apps/auth-microservice/src/entities/auth/adapters/index.ts");
const modules = [auth_module_1.AuthModule, prisma_module_1.PrismaModule, sessions_module_1.SessionsModule, jwt_1.JwtModule];
const services = [app_service_1.AppService, auth_service_1.AuthService, users_service_1.UsersService];
const repositories = [
    users_reposiroty_1.UsersRepository,
    auth_repository_1.AuthRepository,
    auth_query_repository_1.AuthQueryRepository,
    sessions_repository_1.SessionsRepository
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            ...modules_1.MODULE_PROVIDERS,
            ...modules
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            ...services,
            ...repositories,
            ...handlers_1.AUTH_COMMANDS_HANDLERS,
            ...adapters_1.AUTH_ADAPTERS,
            ...strategies_1.STRATEGIES,
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.JwtAccessGuard
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard
            }
        ]
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/auth-microservice/src/app.service.ts":
/*!***************************************************!*\
  !*** ./apps/auth-microservice/src/app.service.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ../prisma/prisma.service */ "./apps/auth-microservice/prisma/prisma.service.ts");
const config_1 = __webpack_require__(/*! ../../../libs/common/src/config */ "./libs/common/src/config/index.ts");
const enums_1 = __webpack_require__(/*! ../utils/enums */ "./apps/auth-microservice/utils/enums/index.ts");
let AppService = class AppService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async seedDB() {
        if (config_1.CONFIG.MODE !== enums_1.StatusEnum.PRODUCTION) {
            let isEmailTaken;
            let isLoginTaken;
            let uniqueEmail;
            let uniqueLogin;
            let emailSuffix = 1;
            let loginSuffix = 1;
            do {
                isEmailTaken = Boolean(await this.prisma.user.findUnique({ where: { email: uniqueEmail } }));
                if (isEmailTaken) {
                    uniqueEmail = `email-${emailSuffix}@mock.com`;
                    emailSuffix++;
                }
                isLoginTaken = Boolean(await this.prisma.user.findUnique({ where: { login: uniqueLogin } }));
                if (isLoginTaken) {
                    uniqueLogin = `login-${loginSuffix}`;
                }
            } while (isLoginTaken && isLoginTaken);
            return this.prisma.user.create({
                data: {
                    email: uniqueEmail,
                    login: uniqueLogin,
                    hashPassword: 'Password123%'
                }
            });
        }
        else {
            throw new common_1.ForbiddenException('This endpoint is only available in development or staging mode');
        }
    }
    async truncateDB(table) {
        const isProduction = Boolean(config_1.CONFIG.MODE === enums_1.StatusEnum.PRODUCTION);
        if (table.trim() && !isProduction) {
            await this.prisma[table].deleteMany();
            return;
        }
        else if (!isProduction) {
            await this.prisma.user.deleteMany();
            await this.prisma.session.deleteMany();
            await this.prisma.emailCode.deleteMany();
            await this.prisma.googleProfile.deleteMany();
            await this.prisma.githubProfile.deleteMany();
        }
        else {
            throw new common_1.ForbiddenException('This endpoint is only available in development or staging mode');
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/adapters/argon2.adapter.ts":
/*!*****************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/adapters/argon2.adapter.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Argon2Adapter = void 0;
const argon2_1 = __webpack_require__(/*! argon2 */ "argon2");
class Argon2Adapter {
    async hash(data) {
        return (0, argon2_1.hash)(data.password);
    }
    async verify(data) {
        return (0, argon2_1.verify)(data.hashPassword, data.password);
    }
}
exports.Argon2Adapter = Argon2Adapter;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/adapters/index.ts":
/*!********************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/adapters/index.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AUTH_ADAPTERS = void 0;
const argon2_adapter_1 = __webpack_require__(/*! ./argon2.adapter */ "./apps/auth-microservice/src/entities/auth/adapters/argon2.adapter.ts");
const mailer_adapter_1 = __webpack_require__(/*! ./mailer.adapter */ "./apps/auth-microservice/src/entities/auth/adapters/mailer.adapter.ts");
__exportStar(__webpack_require__(/*! ./mailer.adapter */ "./apps/auth-microservice/src/entities/auth/adapters/mailer.adapter.ts"), exports);
__exportStar(__webpack_require__(/*! ./argon2.adapter */ "./apps/auth-microservice/src/entities/auth/adapters/argon2.adapter.ts"), exports);
exports.AUTH_ADAPTERS = [mailer_adapter_1.MailerAdapter, argon2_adapter_1.Argon2Adapter];


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/adapters/mailer.adapter.ts":
/*!*****************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/adapters/mailer.adapter.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailerAdapter = void 0;
const config_1 = __webpack_require__(/*! ../../../../../../libs/common/src/config */ "./libs/common/src/config/index.ts");
const templates_1 = __webpack_require__(/*! ../../../../static/templates */ "./apps/auth-microservice/static/templates/index.ts");
const nodemailer_1 = __webpack_require__(/*! nodemailer */ "nodemailer");
class MailerAdapter {
    async options(options) {
        const transporter = (0, nodemailer_1.createTransport)({
            service: config_1.CONFIG.NODEMAILER_SERVICE,
            auth: {
                user: config_1.CONFIG.NODEMAILER_USER,
                pass: config_1.CONFIG.NODEMAILER_PASS
            }
        });
        await transporter.sendMail(options);
    }
    async sendEmailCode(data) {
        await this.options({
            to: data.email,
            from: config_1.CONFIG.NODEMAILER_USER,
            subject: 'Email confirmation',
            html: (0, templates_1.emailConfirmHTML)({ HOST: config_1.CONFIG.HOST, code: data.code })
        });
    }
    async sendPasswordCode(data) {
        await this.options({
            to: data.email,
            from: config_1.CONFIG.NODEMAILER_USER,
            subject: 'Password recovery',
            html: (0, templates_1.passwordRecoveryHTML)({ HOST: config_1.CONFIG.HOST, code: data.code })
        });
    }
}
exports.MailerAdapter = MailerAdapter;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/confirm-email.handler.ts":
/*!*********************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/handlers/confirm-email.handler.ts ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfirmEmailHandler = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const impl_1 = __webpack_require__(/*! ../impl */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/index.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const auth_repository_1 = __webpack_require__(/*! ../../../repositories/auth.repository */ "./apps/auth-microservice/src/entities/auth/repositories/auth.repository.ts");
const users_service_1 = __webpack_require__(/*! ../../../../users/users.service */ "./apps/auth-microservice/src/entities/users/users.service.ts");
const users_reposiroty_1 = __webpack_require__(/*! ../../../../users/users.reposiroty */ "./apps/auth-microservice/src/entities/users/users.reposiroty.ts");
let ConfirmEmailHandler = class ConfirmEmailHandler {
    constructor(authRepository, usersRepository, usersService, config) {
        this.authRepository = authRepository;
        this.usersRepository = usersRepository;
        this.usersService = usersService;
        this.config = config;
        this.FRONTEND_HOST = this.config.get('FRONTEND_HOST');
    }
    async execute({ dto: { code, res } }) {
        const isCode = await this.authRepository.findEmailCodeByCode({
            code
        });
        if (!isCode)
            res.redirect(`${this.FRONTEND_HOST}/auth`);
        if (isCode.isUsed)
            res.redirect(`${this.FRONTEND_HOST}`);
        await this.authRepository.deactivateEmailCodeByCode({ code });
        const isCodeExpired = Boolean(new Date(isCode.expiresIn) < new Date());
        if (isCodeExpired) {
            res.redirect(`${this.FRONTEND_HOST}/auth/expired?code=${code}`);
        }
        await this.usersRepository.confirmUser({ userID: isCode.userID });
        await this.usersService.cancelScheduledDeletion({ userID: isCode.userID });
        const user = await this.usersRepository.findUserById({
            userID: isCode.userID
        });
        await this.usersRepository.createProfile({
            username: user.login,
            userID: user.id
        });
        res.redirect(`${this.FRONTEND_HOST}/auth/confirmed`);
    }
};
ConfirmEmailHandler = __decorate([
    (0, cqrs_1.CommandHandler)(impl_1.ConfirmEmailCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _a : Object, typeof (_b = typeof users_reposiroty_1.UsersRepository !== "undefined" && users_reposiroty_1.UsersRepository) === "function" ? _b : Object, typeof (_c = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _c : Object, typeof (_d = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _d : Object])
], ConfirmEmailHandler);
exports.ConfirmEmailHandler = ConfirmEmailHandler;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/generate-tokens.handler.ts":
/*!***********************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/handlers/generate-tokens.handler.ts ***!
  \***********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenerateTokensHandler = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const impl_1 = __webpack_require__(/*! ../impl */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/index.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const sessions_repository_1 = __webpack_require__(/*! ../../../../sessions/sessions.repository */ "./apps/auth-microservice/src/entities/sessions/sessions.repository.ts");
const config_2 = __webpack_require__(/*! libs/common/src/config */ "./libs/common/src/config/index.ts");
let GenerateTokensHandler = class GenerateTokensHandler {
    constructor(jwtService, config, sessionsRepository) {
        this.jwtService = jwtService;
        this.config = config;
        this.sessionsRepository = sessionsRepository;
    }
    async execute({ dto }) {
        const session = await this.sessionsRepository.createSession(dto);
        const accessToken = 'Bearer ' +
            this.jwtService.sign({ userID: dto.userID }, {
                secret: config_2.CONFIG.JWT_ACCESS_SECRET,
                expiresIn: Number(config_2.CONFIG.JWT_ACCESS_EXPIRES)
            });
        const refreshToken = this.jwtService.sign({
            userID: dto.userID,
            sessionID: session.id
        }, {
            secret: config_2.CONFIG.JWT_REFRESH_SECRET,
            expiresIn: Number(config_2.CONFIG.JWT_REFRESH_EXPIRES)
        });
        return { accessToken, refreshToken };
    }
};
GenerateTokensHandler = __decorate([
    (0, cqrs_1.CommandHandler)(impl_1.GenerateTokensCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof sessions_repository_1.SessionsRepository !== "undefined" && sessions_repository_1.SessionsRepository) === "function" ? _c : Object])
], GenerateTokensHandler);
exports.GenerateTokensHandler = GenerateTokensHandler;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/github-register.handler.ts":
/*!***********************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/handlers/github-register.handler.ts ***!
  \***********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GithubRegisterHandler = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const impl_1 = __webpack_require__(/*! ../impl */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/index.ts");
const auth_service_1 = __webpack_require__(/*! ../../../auth.service */ "./apps/auth-microservice/src/entities/auth/auth.service.ts");
const auth_repository_1 = __webpack_require__(/*! ../../../repositories/auth.repository */ "./apps/auth-microservice/src/entities/auth/repositories/auth.repository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_reposiroty_1 = __webpack_require__(/*! ../../../../users/users.reposiroty */ "./apps/auth-microservice/src/entities/users/users.reposiroty.ts");
const config_1 = __webpack_require__(/*! ../../../../../../../../libs/common/src/config */ "./libs/common/src/config/index.ts");
let GithubRegisterHandler = class GithubRegisterHandler {
    constructor(authRepository, usersRepository, authService) {
        this.authRepository = authRepository;
        this.usersRepository = usersRepository;
        this.authService = authService;
    }
    async execute({ dto, res }) {
        if (!dto.email) {
            res.redirect(`${config_1.CONFIG.FRONTEND_HOST}/auth`);
            throw new common_1.BadRequestException("Your github account doesn't share email");
        }
        const isGithubProfile = await this.authRepository.findGithubProfileByProviderID({
            providerID: dto.node_id
        });
        if (isGithubProfile)
            return isGithubProfile;
        const isUser = await this.usersRepository.findUserByEmail({
            email: dto.email
        });
        if (isUser) {
            const isGithubProfile = await this.authRepository.findGithubProfileByUserID({ userID: isUser.id });
            if (isGithubProfile) {
                return isGithubProfile;
            }
            else {
                return this.authRepository.createGithubProfile(dto, { userID: isUser.id });
            }
        }
        else {
            const uniqueUsername = await this.authService.genUniqueUsername({
                prefix: 'github'
            });
            const newUser = await this.usersRepository.createUser({
                email: dto.email,
                login: uniqueUsername
            });
            return this.authRepository.createGithubProfile(dto, { userID: newUser.id });
        }
    }
};
GithubRegisterHandler = __decorate([
    (0, cqrs_1.CommandHandler)(impl_1.GithubRegisterCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _a : Object, typeof (_b = typeof users_reposiroty_1.UsersRepository !== "undefined" && users_reposiroty_1.UsersRepository) === "function" ? _b : Object, typeof (_c = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _c : Object])
], GithubRegisterHandler);
exports.GithubRegisterHandler = GithubRegisterHandler;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/google-register.handler.ts":
/*!***********************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/handlers/google-register.handler.ts ***!
  \***********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleRegisterHandler = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const impl_1 = __webpack_require__(/*! ../impl */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/index.ts");
const auth_service_1 = __webpack_require__(/*! ../../../auth.service */ "./apps/auth-microservice/src/entities/auth/auth.service.ts");
const auth_repository_1 = __webpack_require__(/*! ../../../repositories/auth.repository */ "./apps/auth-microservice/src/entities/auth/repositories/auth.repository.ts");
const users_reposiroty_1 = __webpack_require__(/*! ../../../../users/users.reposiroty */ "./apps/auth-microservice/src/entities/users/users.reposiroty.ts");
let GoogleRegisterHandler = class GoogleRegisterHandler {
    constructor(authRepository, usersRepository, authService) {
        this.authRepository = authRepository;
        this.usersRepository = usersRepository;
        this.authService = authService;
    }
    async execute({ dto }) {
        const isGoogleProfile = await this.authRepository.findGoogleProfileByProviderID({
            providerID: dto.sub
        });
        if (isGoogleProfile)
            return isGoogleProfile;
        const isUser = await this.usersRepository.findUserByEmail({
            email: dto.email
        });
        if (isUser) {
            const googleProfile = await this.authRepository.findGoogleProfileByUserID({ userID: isUser.id });
            if (googleProfile)
                return googleProfile;
            return this.authRepository.createGoogleProfile(dto, { userID: isUser.id });
        }
        else {
            const uniqueUsername = await this.authService.genUniqueUsername({
                prefix: 'google'
            });
            const newUser = await this.usersRepository.createUser({
                email: dto.email,
                login: uniqueUsername,
                isConfirmed: true
            });
            return this.authRepository.createGoogleProfile(dto, { userID: newUser.id });
        }
    }
};
GoogleRegisterHandler = __decorate([
    (0, cqrs_1.CommandHandler)(impl_1.GoogleRegisterCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _a : Object, typeof (_b = typeof users_reposiroty_1.UsersRepository !== "undefined" && users_reposiroty_1.UsersRepository) === "function" ? _b : Object, typeof (_c = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _c : Object])
], GoogleRegisterHandler);
exports.GoogleRegisterHandler = GoogleRegisterHandler;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/index.ts":
/*!*****************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/handlers/index.ts ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AUTH_COMMANDS_HANDLERS = void 0;
const confirm_email_handler_1 = __webpack_require__(/*! ./confirm-email.handler */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/confirm-email.handler.ts");
const generate_tokens_handler_1 = __webpack_require__(/*! ./generate-tokens.handler */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/generate-tokens.handler.ts");
const github_register_handler_1 = __webpack_require__(/*! ./github-register.handler */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/github-register.handler.ts");
const google_register_handler_1 = __webpack_require__(/*! ./google-register.handler */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/google-register.handler.ts");
const local_register_handler_1 = __webpack_require__(/*! ./local-register.handler */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/local-register.handler.ts");
const logout_handler_1 = __webpack_require__(/*! ./logout.handler */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/logout.handler.ts");
const new_password_handler_1 = __webpack_require__(/*! ./new-password.handler */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/new-password.handler.ts");
const password_recovery_handler_1 = __webpack_require__(/*! ./password-recovery.handler */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/password-recovery.handler.ts");
const resend_code_handler_1 = __webpack_require__(/*! ./resend-code.handler */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/resend-code.handler.ts");
__exportStar(__webpack_require__(/*! ./local-register.handler */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/local-register.handler.ts"), exports);
__exportStar(__webpack_require__(/*! ./confirm-email.handler */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/confirm-email.handler.ts"), exports);
__exportStar(__webpack_require__(/*! ./resend-code.handler */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/resend-code.handler.ts"), exports);
__exportStar(__webpack_require__(/*! ./password-recovery.handler */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/password-recovery.handler.ts"), exports);
__exportStar(__webpack_require__(/*! ./new-password.handler */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/new-password.handler.ts"), exports);
__exportStar(__webpack_require__(/*! ./generate-tokens.handler */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/generate-tokens.handler.ts"), exports);
__exportStar(__webpack_require__(/*! ./logout.handler */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/logout.handler.ts"), exports);
__exportStar(__webpack_require__(/*! ./google-register.handler */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/google-register.handler.ts"), exports);
__exportStar(__webpack_require__(/*! ./github-register.handler */ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/github-register.handler.ts"), exports);
exports.AUTH_COMMANDS_HANDLERS = [
    local_register_handler_1.LocalRegisterHandler,
    confirm_email_handler_1.ConfirmEmailHandler,
    resend_code_handler_1.ResendCodeHandler,
    password_recovery_handler_1.PasswordRecoveryHandler,
    new_password_handler_1.NewPasswordHandler,
    generate_tokens_handler_1.GenerateTokensHandler,
    logout_handler_1.LogoutHandler,
    google_register_handler_1.GoogleRegisterHandler,
    github_register_handler_1.GithubRegisterHandler
];


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/local-register.handler.ts":
/*!**********************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/handlers/local-register.handler.ts ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalRegisterHandler = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const adapters_1 = __webpack_require__(/*! ../../../adapters */ "./apps/auth-microservice/src/entities/auth/adapters/index.ts");
const auth_repository_1 = __webpack_require__(/*! ../../../repositories/auth.repository */ "./apps/auth-microservice/src/entities/auth/repositories/auth.repository.ts");
const impl_1 = __webpack_require__(/*! ../impl */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/index.ts");
const users_reposiroty_1 = __webpack_require__(/*! ../../../../users/users.reposiroty */ "./apps/auth-microservice/src/entities/users/users.reposiroty.ts");
const users_service_1 = __webpack_require__(/*! ../../../../users/users.service */ "./apps/auth-microservice/src/entities/users/users.service.ts");
let LocalRegisterHandler = class LocalRegisterHandler {
    constructor(usersRepository, authRepository, argon2Adapter, mailerAdapter, usersService) {
        this.usersRepository = usersRepository;
        this.authRepository = authRepository;
        this.argon2Adapter = argon2Adapter;
        this.mailerAdapter = mailerAdapter;
        this.usersService = usersService;
    }
    async execute({ dto }) {
        const isUser = await this.usersRepository.findUserByEmail({
            email: dto.email
        });
        if (isUser && !isUser.isConfirmed) {
            const code = await this.authRepository.createEmailCode({
                userID: isUser.id
            });
            await this.authRepository.deactivateAllEmailCodesByUserID({
                userID: isUser.id
            });
            await this.mailerAdapter.sendEmailCode({ email: isUser.email, code });
            return;
        }
        if (isUser)
            throw new common_1.ConflictException({
                message: 'User with this email is already registered',
                field: 'email',
                context: 'email-conflict',
                statusCode: 409
            });
        const isLoginTaken = await this.usersRepository.findUserByLogin({
            login: dto.login
        });
        if (isLoginTaken)
            throw new common_1.ConflictException({
                message: 'User with this username is already registered',
                field: 'login',
                context: 'login-conflict',
                statusCode: 409
            });
        const hashPassword = await this.argon2Adapter.hash({
            password: dto.password
        });
        const user = await this.usersRepository.createUser({
            email: dto.email,
            login: dto.login,
            hashPassword
        });
        const code = await this.authRepository.createEmailCode({
            userID: user.id
        });
        await this.mailerAdapter.sendEmailCode({ email: dto.email, code });
        this.usersService.createScheduledDeletion({ userID: user.id });
    }
};
LocalRegisterHandler = __decorate([
    (0, cqrs_1.CommandHandler)(impl_1.LocalRegisterCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof users_reposiroty_1.UsersRepository !== "undefined" && users_reposiroty_1.UsersRepository) === "function" ? _a : Object, typeof (_b = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _b : Object, typeof (_c = typeof adapters_1.Argon2Adapter !== "undefined" && adapters_1.Argon2Adapter) === "function" ? _c : Object, typeof (_d = typeof adapters_1.MailerAdapter !== "undefined" && adapters_1.MailerAdapter) === "function" ? _d : Object, typeof (_e = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _e : Object])
], LocalRegisterHandler);
exports.LocalRegisterHandler = LocalRegisterHandler;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/logout.handler.ts":
/*!**************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/handlers/logout.handler.ts ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogoutHandler = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const impl_1 = __webpack_require__(/*! ../impl */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/index.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sessions_repository_1 = __webpack_require__(/*! ../../../../sessions/sessions.repository */ "./apps/auth-microservice/src/entities/sessions/sessions.repository.ts");
let LogoutHandler = class LogoutHandler {
    constructor(sessionsRepository) {
        this.sessionsRepository = sessionsRepository;
    }
    async execute({ dto }) {
        const session = await this.sessionsRepository.findSessionByID({
            sessionID: dto.sessionID
        });
        if (!session)
            throw new common_1.NotFoundException('Session not found');
        if (dto.userID !== session.userID)
            throw new common_1.ForbiddenException();
        await this.sessionsRepository.deleteSessionByID({ sessionID: dto.sessionID });
    }
};
LogoutHandler = __decorate([
    (0, cqrs_1.CommandHandler)(impl_1.LogoutCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof sessions_repository_1.SessionsRepository !== "undefined" && sessions_repository_1.SessionsRepository) === "function" ? _a : Object])
], LogoutHandler);
exports.LogoutHandler = LogoutHandler;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/new-password.handler.ts":
/*!********************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/handlers/new-password.handler.ts ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewPasswordHandler = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const impl_1 = __webpack_require__(/*! ../impl */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/index.ts");
const users_reposiroty_1 = __webpack_require__(/*! ../../../../users/users.reposiroty */ "./apps/auth-microservice/src/entities/users/users.reposiroty.ts");
const auth_repository_1 = __webpack_require__(/*! ../../../repositories/auth.repository */ "./apps/auth-microservice/src/entities/auth/repositories/auth.repository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const adapters_1 = __webpack_require__(/*! ../../../adapters */ "./apps/auth-microservice/src/entities/auth/adapters/index.ts");
let NewPasswordHandler = class NewPasswordHandler {
    constructor(authRepository, usersRepository, config, argon2Adapter) {
        this.authRepository = authRepository;
        this.usersRepository = usersRepository;
        this.config = config;
        this.argon2Adapter = argon2Adapter;
        this.FRONTEND_HOST = this.config.get('FRONTEND_HOST');
    }
    async execute({ dto }) {
        const isCode = await this.authRepository.findEmailCodeByCode({
            code: dto.code
        });
        if (!isCode)
            throw new common_1.UnauthorizedException('Invalid token');
        if (isCode.isUsed)
            throw new common_1.ForbiddenException('Token has already been used');
        await this.authRepository.deactivateEmailCodeByCode({ code: isCode.code });
        const isCodeExpired = Boolean(new Date(isCode.expiresIn) < new Date());
        if (isCodeExpired)
            dto.res.redirect(`${this.FRONTEND_HOST}/auth/expired?code=${isCode.code}`);
        const newHashPassword = await this.argon2Adapter.hash({
            password: dto.newPassword
        });
        await this.usersRepository.newPassword({ userID: isCode.userID, newHashPassword });
    }
};
NewPasswordHandler = __decorate([
    (0, cqrs_1.CommandHandler)(impl_1.NewPasswordCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _a : Object, typeof (_b = typeof users_reposiroty_1.UsersRepository !== "undefined" && users_reposiroty_1.UsersRepository) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object, typeof (_d = typeof adapters_1.Argon2Adapter !== "undefined" && adapters_1.Argon2Adapter) === "function" ? _d : Object])
], NewPasswordHandler);
exports.NewPasswordHandler = NewPasswordHandler;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/password-recovery.handler.ts":
/*!*************************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/handlers/password-recovery.handler.ts ***!
  \*************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordRecoveryHandler = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const impl_1 = __webpack_require__(/*! ../impl */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/index.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_repository_1 = __webpack_require__(/*! ../../../repositories/auth.repository */ "./apps/auth-microservice/src/entities/auth/repositories/auth.repository.ts");
const adapters_1 = __webpack_require__(/*! ../../../adapters */ "./apps/auth-microservice/src/entities/auth/adapters/index.ts");
const users_reposiroty_1 = __webpack_require__(/*! ../../../../users/users.reposiroty */ "./apps/auth-microservice/src/entities/users/users.reposiroty.ts");
let PasswordRecoveryHandler = class PasswordRecoveryHandler {
    constructor(usersRepository, authRepository, mailerAdapter) {
        this.usersRepository = usersRepository;
        this.authRepository = authRepository;
        this.mailerAdapter = mailerAdapter;
    }
    async execute({ dto: { email } }) {
        const user = await this.usersRepository.findUserByEmail({ email });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const code = await this.authRepository.createEmailCode({
            userID: user.id
        });
        await this.mailerAdapter.sendEmailCode({ email: user.email, code });
    }
};
PasswordRecoveryHandler = __decorate([
    (0, cqrs_1.CommandHandler)(impl_1.PasswordRecoveryCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof users_reposiroty_1.UsersRepository !== "undefined" && users_reposiroty_1.UsersRepository) === "function" ? _a : Object, typeof (_b = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _b : Object, typeof (_c = typeof adapters_1.MailerAdapter !== "undefined" && adapters_1.MailerAdapter) === "function" ? _c : Object])
], PasswordRecoveryHandler);
exports.PasswordRecoveryHandler = PasswordRecoveryHandler;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/handlers/resend-code.handler.ts":
/*!*******************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/handlers/resend-code.handler.ts ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResendCodeHandler = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const impl_1 = __webpack_require__(/*! ../impl */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/index.ts");
const auth_repository_1 = __webpack_require__(/*! ../../../repositories/auth.repository */ "./apps/auth-microservice/src/entities/auth/repositories/auth.repository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const adapters_1 = __webpack_require__(/*! ../../../adapters */ "./apps/auth-microservice/src/entities/auth/adapters/index.ts");
const users_reposiroty_1 = __webpack_require__(/*! ../../../../users/users.reposiroty */ "./apps/auth-microservice/src/entities/users/users.reposiroty.ts");
let ResendCodeHandler = class ResendCodeHandler {
    constructor(authRepository, userRepository, mailerAdapter) {
        this.authRepository = authRepository;
        this.userRepository = userRepository;
        this.mailerAdapter = mailerAdapter;
    }
    async execute({ dto: { code } }) {
        const isCode = await this.authRepository.findEmailCodeByCode({
            code
        });
        if (!isCode)
            throw new common_1.NotFoundException('Invalid code');
        const user = await this.userRepository.findUserById({
            userID: isCode.userID
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await this.authRepository.deactivateEmailCodeByCode({ code });
        const newEmailCode = await this.authRepository.createEmailCode({
            userID: user.id
        });
        await this.mailerAdapter.sendEmailCode({ email: user.email, code: newEmailCode });
    }
};
ResendCodeHandler = __decorate([
    (0, cqrs_1.CommandHandler)(impl_1.ResendCodeCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _a : Object, typeof (_b = typeof users_reposiroty_1.UsersRepository !== "undefined" && users_reposiroty_1.UsersRepository) === "function" ? _b : Object, typeof (_c = typeof adapters_1.MailerAdapter !== "undefined" && adapters_1.MailerAdapter) === "function" ? _c : Object])
], ResendCodeHandler);
exports.ResendCodeHandler = ResendCodeHandler;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/impl/confirm-email.command.ts":
/*!*****************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/impl/confirm-email.command.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfirmEmailCommand = void 0;
class ConfirmEmailCommand {
    constructor(dto) {
        this.dto = dto;
    }
}
exports.ConfirmEmailCommand = ConfirmEmailCommand;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/impl/generate-tokens.command.ts":
/*!*******************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/impl/generate-tokens.command.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenerateTokensCommand = void 0;
class GenerateTokensCommand {
    constructor(dto) {
        this.dto = dto;
    }
}
exports.GenerateTokensCommand = GenerateTokensCommand;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/impl/github-register.command.ts":
/*!*******************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/impl/github-register.command.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GithubRegisterCommand = void 0;
class GithubRegisterCommand {
    constructor(dto, res) {
        this.dto = dto;
        this.res = res;
    }
}
exports.GithubRegisterCommand = GithubRegisterCommand;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/impl/google-register.command.ts":
/*!*******************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/impl/google-register.command.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleRegisterCommand = void 0;
class GoogleRegisterCommand {
    constructor(dto) {
        this.dto = dto;
    }
}
exports.GoogleRegisterCommand = GoogleRegisterCommand;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/impl/index.ts":
/*!*************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/impl/index.ts ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AUTH_COMMAND_IMPLS = void 0;
const confirm_email_command_1 = __webpack_require__(/*! ./confirm-email.command */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/confirm-email.command.ts");
const generate_tokens_command_1 = __webpack_require__(/*! ./generate-tokens.command */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/generate-tokens.command.ts");
const github_register_command_1 = __webpack_require__(/*! ./github-register.command */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/github-register.command.ts");
const google_register_command_1 = __webpack_require__(/*! ./google-register.command */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/google-register.command.ts");
const local_register_command_1 = __webpack_require__(/*! ./local-register.command */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/local-register.command.ts");
const logout_command_1 = __webpack_require__(/*! ./logout.command */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/logout.command.ts");
const new_password_command_1 = __webpack_require__(/*! ./new-password.command */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/new-password.command.ts");
const password_recovery_command_1 = __webpack_require__(/*! ./password-recovery.command */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/password-recovery.command.ts");
const resend_code_command_1 = __webpack_require__(/*! ./resend-code.command */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/resend-code.command.ts");
__exportStar(__webpack_require__(/*! ./local-register.command */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/local-register.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./confirm-email.command */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/confirm-email.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./resend-code.command */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/resend-code.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./password-recovery.command */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/password-recovery.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./new-password.command */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/new-password.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./generate-tokens.command */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/generate-tokens.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./logout.command */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/logout.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./google-register.command */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/google-register.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./github-register.command */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/github-register.command.ts"), exports);
exports.AUTH_COMMAND_IMPLS = {
    LocalRegisterCommand: local_register_command_1.LocalRegisterCommand,
    ConfirmEmailCommand: confirm_email_command_1.ConfirmEmailCommand,
    ResendCodeCommand: resend_code_command_1.ResendCodeCommand,
    PasswordRecoveryCommand: password_recovery_command_1.PasswordRecoveryCommand,
    NewPasswordCommand: new_password_command_1.NewPasswordCommand,
    GenerateTokensCommand: generate_tokens_command_1.GenerateTokensCommand,
    LogoutCommand: logout_command_1.LogoutCommand,
    GoogleRegisterCommand: google_register_command_1.GoogleRegisterCommand,
    GithubRegisterCommand: github_register_command_1.GithubRegisterCommand
};


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/impl/local-register.command.ts":
/*!******************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/impl/local-register.command.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalRegisterCommand = void 0;
class LocalRegisterCommand {
    constructor(dto) {
        this.dto = dto;
    }
}
exports.LocalRegisterCommand = LocalRegisterCommand;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/impl/logout.command.ts":
/*!**********************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/impl/logout.command.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogoutCommand = void 0;
class LogoutCommand {
    constructor(dto) {
        this.dto = dto;
    }
}
exports.LogoutCommand = LogoutCommand;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/impl/new-password.command.ts":
/*!****************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/impl/new-password.command.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewPasswordCommand = void 0;
class NewPasswordCommand {
    constructor(dto) {
        this.dto = dto;
    }
}
exports.NewPasswordCommand = NewPasswordCommand;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/impl/password-recovery.command.ts":
/*!*********************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/impl/password-recovery.command.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordRecoveryCommand = void 0;
class PasswordRecoveryCommand {
    constructor(dto) {
        this.dto = dto;
    }
}
exports.PasswordRecoveryCommand = PasswordRecoveryCommand;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/application/commands/impl/resend-code.command.ts":
/*!***************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/application/commands/impl/resend-code.command.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResendCodeCommand = void 0;
class ResendCodeCommand {
    constructor(dto) {
        this.dto = dto;
    }
}
exports.ResendCodeCommand = ResendCodeCommand;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/auth.module.ts":
/*!*****************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/auth.module.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/auth-microservice/src/entities/auth/auth.service.ts");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_repository_1 = __webpack_require__(/*! ./repositories/auth.repository */ "./apps/auth-microservice/src/entities/auth/repositories/auth.repository.ts");
const auth_query_repository_1 = __webpack_require__(/*! ./repositories/auth-query.repository */ "./apps/auth-microservice/src/entities/auth/repositories/auth-query.repository.ts");
const controllers_1 = __webpack_require__(/*! ./controllers */ "./apps/auth-microservice/src/entities/auth/controllers/index.ts");
const users_module_1 = __webpack_require__(/*! ../users/users.module */ "./apps/auth-microservice/src/entities/users/users.module.ts");
const sessions_module_1 = __webpack_require__(/*! ../sessions/sessions.module */ "./apps/auth-microservice/src/entities/sessions/sessions.module.ts");
const adapters_1 = __webpack_require__(/*! ./adapters */ "./apps/auth-microservice/src/entities/auth/adapters/index.ts");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, users_module_1.UsersModule, sessions_module_1.SessionsModule],
        providers: [auth_service_1.AuthService, auth_repository_1.AuthRepository, auth_query_repository_1.AuthQueryRepository, ...adapters_1.AUTH_ADAPTERS],
        controllers: [...controllers_1.AUTH_CONTROLLERS],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/auth.service.ts":
/*!******************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/auth.service.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const index_1 = __webpack_require__(/*! ./application/commands/impl/index */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/index.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const adapters_1 = __webpack_require__(/*! ./adapters */ "./apps/auth-microservice/src/entities/auth/adapters/index.ts");
const users_reposiroty_1 = __webpack_require__(/*! ../users/users.reposiroty */ "./apps/auth-microservice/src/entities/users/users.reposiroty.ts");
let AuthService = class AuthService {
    constructor(usersRepository, argon2Adapter, commandBus) {
        this.usersRepository = usersRepository;
        this.argon2Adapter = argon2Adapter;
        this.commandBus = commandBus;
    }
    async validateUser(data) {
        const user = await this.usersRepository.findUserByEmail({
            email: data.email
        });
        if (!user)
            return null;
        if (!user.hashPassword)
            throw new common_1.UnauthorizedException("User doesn't have password, redirect to special frontend for choose any of provider's account or set password?");
        const isValidPassword = await this.argon2Adapter.verify({
            hashPassword: user.hashPassword,
            password: data.password
        });
        if (!isValidPassword)
            return null;
        if (!user.isConfirmed)
            throw new common_1.ForbiddenException('You have to confirm your email');
        if (user.isBlocked)
            throw new common_1.ForbiddenException('Your account has been blocked');
        return user;
    }
    async newTokens(payload, { userIP, userAgent }) {
        await this.commandBus.execute(new index_1.AUTH_COMMAND_IMPLS.LogoutCommand({
            userID: payload.userID,
            sessionID: payload.sessionID
        }));
        return this.commandBus.execute(new index_1.AUTH_COMMAND_IMPLS.GenerateTokensCommand({
            userID: payload.userID,
            userIP,
            userAgent
        }));
    }
    async googleRegister(dto, info) {
        const googleProfile = await this.commandBus.execute(new index_1.AUTH_COMMAND_IMPLS.GoogleRegisterCommand(dto));
        return this.commandBus.execute(new index_1.AUTH_COMMAND_IMPLS.GenerateTokensCommand({
            userID: googleProfile.userID,
            userIP: info.userIP,
            userAgent: info.userAgent
        }));
    }
    async githubRegister(dto, info, res) {
        const githubProfile = await this.commandBus.execute(new index_1.AUTH_COMMAND_IMPLS.GithubRegisterCommand(dto, res));
        return this.commandBus.execute(new index_1.AUTH_COMMAND_IMPLS.GenerateTokensCommand({
            userID: githubProfile.userID,
            userIP: info.userIP,
            userAgent: info.userAgent
        }));
    }
    async genUniqueUsername({ prefix }) {
        let isUsernameTaken;
        let uniqueUsername = '';
        let suffix = 1;
        do {
            isUsernameTaken = await this.usersRepository.findUserByLogin({
                login: uniqueUsername
            });
            if (isUsernameTaken) {
                uniqueUsername = `${prefix}-${suffix}`;
                suffix++;
            }
        } while (isUsernameTaken);
        return uniqueUsername;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_reposiroty_1.UsersRepository !== "undefined" && users_reposiroty_1.UsersRepository) === "function" ? _a : Object, typeof (_b = typeof adapters_1.Argon2Adapter !== "undefined" && adapters_1.Argon2Adapter) === "function" ? _b : Object, typeof (_c = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _c : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/controllers/auth-github.controller.ts":
/*!****************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/controllers/auth-github.controller.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGithubController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const express_1 = __webpack_require__(/*! express */ "express");
const auth_service_1 = __webpack_require__(/*! ../auth.service */ "./apps/auth-microservice/src/entities/auth/auth.service.ts");
const github2_guard_1 = __webpack_require__(/*! ../guards-handlers/guards/github2.guard */ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/github2.guard.ts");
const dtos_1 = __webpack_require__(/*! ../core/dtos */ "./apps/auth-microservice/src/entities/auth/core/dtos/index.ts");
const decorators_1 = __webpack_require__(/*! ../../../../utils/decorators */ "./apps/auth-microservice/utils/decorators/index.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const config_1 = __webpack_require__(/*! ../../../../../../libs/common/src/config */ "./libs/common/src/config/index.ts");
const enums_1 = __webpack_require__(/*! ../../../../utils/enums */ "./apps/auth-microservice/utils/enums/index.ts");
let AuthGithubController = class AuthGithubController {
    constructor(authService) {
        this.authService = authService;
    }
    github() { }
    githubCallback(req, res) {
        const accessToken = req.user.accessToken;
        res.redirect(`${config_1.CONFIG.FRONTEND_HOST}/auth/callback/github?accessToken=${accessToken}`);
    }
    async githubRegister(dto, userAgent, userIP, res) {
        const tokens = await this.authService.githubRegister(dto, { userIP, userAgent }, res);
        return this.setTokensToResponse(tokens, res);
    }
    async setTokensToResponse(tokens, res) {
        res.cookie(enums_1.TokensEnum.REFRESH_TOKEN, tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            expires: new Date(Number(config_1.CONFIG.JWT_REFRESH_EXPIRES))
        });
        res.json({ accessToken: tokens.accessToken });
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(github2_guard_1.Github2Guard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthGithubController.prototype, "github", null);
__decorate([
    (0, common_1.Get)('callback'),
    (0, common_1.UseGuards)(github2_guard_1.Github2Guard),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], AuthGithubController.prototype, "githubCallback", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.UserAgent)()),
    __param(2, (0, common_1.Ip)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dtos_1.GithubRegisterDTO !== "undefined" && dtos_1.GithubRegisterDTO) === "function" ? _d : Object, String, String, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthGithubController.prototype, "githubRegister", null);
AuthGithubController = __decorate([
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiTags)('Github oAuth'),
    (0, common_1.Controller)('auth/github'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthGithubController);
exports.AuthGithubController = AuthGithubController;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/controllers/auth-google.controller.ts":
/*!****************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/controllers/auth-google.controller.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGoogleController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const guards_1 = __webpack_require__(/*! ../guards-handlers/guards */ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/index.ts");
const express_1 = __webpack_require__(/*! express */ "express");
const google_register_dto_1 = __webpack_require__(/*! ../core/dtos/google-register.dto */ "./apps/auth-microservice/src/entities/auth/core/dtos/google-register.dto.ts");
const auth_service_1 = __webpack_require__(/*! ../auth.service */ "./apps/auth-microservice/src/entities/auth/auth.service.ts");
const decorators_1 = __webpack_require__(/*! ../../../../utils/decorators */ "./apps/auth-microservice/utils/decorators/index.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const config_1 = __webpack_require__(/*! ../../../../../../libs/common/src/config */ "./libs/common/src/config/index.ts");
const enums_1 = __webpack_require__(/*! ../../../../utils/enums */ "./apps/auth-microservice/utils/enums/index.ts");
const auth_1 = __webpack_require__(/*! ../../../../static/swagger/types/auth */ "./apps/auth-microservice/static/swagger/types/auth/index.ts");
let AuthGoogleController = class AuthGoogleController {
    constructor(authService) {
        this.authService = authService;
    }
    google() { }
    googleCallback(req, res) {
        const accessToken = req.user.accessToken;
        console.log(accessToken);
        res.redirect(`${config_1.CONFIG.FRONTEND_HOST}/auth/callback/google?accessToken=${accessToken}`);
    }
    async googleRegister(dto, userAgent, userIP, res) {
        const tokens = await this.authService.googleRegister(dto, {
            userIP,
            userAgent
        });
        return this.setTokensToResponse(tokens, res);
    }
    async setTokensToResponse(tokens, res) {
        res.cookie(enums_1.TokensEnum.REFRESH_TOKEN, tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            expires: new Date(Number(config_1.CONFIG.JWT_REFRESH_EXPIRES))
        });
        res.json({ accessToken: tokens.accessToken });
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, auth_1.SwaggerGoogleType)(),
    (0, common_1.UseGuards)(guards_1.GoogleGurad),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthGoogleController.prototype, "google", null);
__decorate([
    (0, common_1.Get)('callback'),
    (0, common_1.UseGuards)(guards_1.GoogleGurad),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], AuthGoogleController.prototype, "googleCallback", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_1.SwaggerGoogleRegisterType)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.UserAgent)()),
    __param(2, (0, common_1.Ip)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof google_register_dto_1.GoogleRegisterDTO !== "undefined" && google_register_dto_1.GoogleRegisterDTO) === "function" ? _d : Object, String, String, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthGoogleController.prototype, "googleRegister", null);
AuthGoogleController = __decorate([
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiTags)('Google oAuth'),
    (0, common_1.Controller)('auth/google'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthGoogleController);
exports.AuthGoogleController = AuthGoogleController;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/controllers/auth.controller.ts":
/*!*********************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/controllers/auth.controller.ts ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const date_fns_1 = __webpack_require__(/*! date-fns */ "date-fns");
const express_1 = __webpack_require__(/*! express */ "express");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const decorators_1 = __webpack_require__(/*! ../../../../utils/decorators */ "./apps/auth-microservice/utils/decorators/index.ts");
const enums_1 = __webpack_require__(/*! ../../../../utils/enums */ "./apps/auth-microservice/utils/enums/index.ts");
const impl_1 = __webpack_require__(/*! ../application/commands/impl */ "./apps/auth-microservice/src/entities/auth/application/commands/impl/index.ts");
const auth_1 = __webpack_require__(/*! ../../../../static/swagger/types/auth */ "./apps/auth-microservice/static/swagger/types/auth/index.ts");
const guards_1 = __webpack_require__(/*! ../guards-handlers/guards */ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/index.ts");
const jwt_refresh_guard_1 = __webpack_require__(/*! ../guards-handlers/guards/jwt-refresh.guard */ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/jwt-refresh.guard.ts");
const strategies_1 = __webpack_require__(/*! ../guards-handlers/strategies */ "./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/index.ts");
const auth_service_1 = __webpack_require__(/*! ../auth.service */ "./apps/auth-microservice/src/entities/auth/auth.service.ts");
const auth_query_repository_1 = __webpack_require__(/*! ../repositories/auth-query.repository */ "./apps/auth-microservice/src/entities/auth/repositories/auth-query.repository.ts");
const registration_dto_1 = __webpack_require__(/*! ../core/dtos/registration.dto */ "./apps/auth-microservice/src/entities/auth/core/dtos/registration.dto.ts");
const dtos_1 = __webpack_require__(/*! ../core/dtos */ "./apps/auth-microservice/src/entities/auth/core/dtos/index.ts");
let AuthController = class AuthController {
    constructor(config, commandBus, authService, authQueryRepository) {
        this.config = config;
        this.commandBus = commandBus;
        this.authService = authService;
        this.authQueryRepository = authQueryRepository;
    }
    async registration(dto) {
        await this.commandBus.execute(new impl_1.AUTH_COMMAND_IMPLS.LocalRegisterCommand(dto));
    }
    async registrationEmailResending(code) {
        await this.commandBus.execute(new impl_1.AUTH_COMMAND_IMPLS.ResendCodeCommand({ code }));
    }
    async registrationConfirmation(res, code) {
        await this.commandBus.execute(new impl_1.AUTH_COMMAND_IMPLS.ConfirmEmailCommand({ res, code }));
    }
    async passwordRecovery(dto) {
        await this.commandBus.execute(new impl_1.AUTH_COMMAND_IMPLS.PasswordRecoveryCommand(dto));
    }
    async newPassword(code, dto, res) {
        await this.commandBus.execute(new impl_1.AUTH_COMMAND_IMPLS.NewPasswordCommand({
            res,
            code,
            newPassword: dto.newPassword
        }));
    }
    async login(userID, userIP, userAgent, res) {
        const tokens = await this.commandBus.execute(new impl_1.AUTH_COMMAND_IMPLS.GenerateTokensCommand({ userID, userAgent, userIP }));
        await this.setTokensToResponse(tokens, res);
    }
    async newTokens(payload, userAgent, userIP, res) {
        const tokens = await this.authService.newTokens(payload, {
            userIP,
            userAgent
        });
        return this.setTokensToResponse(tokens, res);
    }
    async logout(payload, res) {
        await this.commandBus.execute(new impl_1.AUTH_COMMAND_IMPLS.LogoutCommand(payload));
        res.clearCookie(enums_1.TokensEnum.REFRESH_TOKEN);
        res.send();
    }
    async getMe({ userID }) {
        return this.authQueryRepository.getMe({ userID });
    }
    async setTokensToResponse(tokens, res) {
        res.cookie(enums_1.TokensEnum.REFRESH_TOKEN, tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: (0, date_fns_1.add)(new Date(), {
                seconds: this.config.get('JWT_REFRESH_EXPIRES')
            })
        });
        res.json({ accessToken: tokens.accessToken });
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('registration'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    auth_1.AUTH_SWAGGER.SwaggerLocalRegisterType(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof registration_dto_1.RegistrationDTO !== "undefined" && registration_dto_1.RegistrationDTO) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthController.prototype, "registration", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('resend-code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    auth_1.AUTH_SWAGGER.SwaggerEmailResendType(),
    __param(0, (0, common_1.Query)('code', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AuthController.prototype, "registrationEmailResending", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('registration-confirmation'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    auth_1.AUTH_SWAGGER.SwaggerEmailConfirmType(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('code', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object, String]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], AuthController.prototype, "registrationConfirmation", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('password-recovery'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    auth_1.AUTH_SWAGGER.SwaggerPasswordRecoveryType(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof dtos_1.PasswordRecoveryDTO !== "undefined" && dtos_1.PasswordRecoveryDTO) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], AuthController.prototype, "passwordRecovery", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('new-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    auth_1.AUTH_SWAGGER.SwaggerNewPasswordType(),
    __param(0, (0, common_1.Query)('code', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_m = typeof dtos_1.NewPasswordDTO !== "undefined" && dtos_1.NewPasswordDTO) === "function" ? _m : Object, typeof (_o = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], AuthController.prototype, "newPassword", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(guards_1.LocalAuthGuard),
    auth_1.AUTH_SWAGGER.SwaggerLoginType(),
    __param(0, (0, decorators_1.LocalAuthPayload)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Ip)()),
    __param(2, (0, decorators_1.UserAgent)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, typeof (_q = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _q : Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], AuthController.prototype, "login", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('new-tokens'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard),
    auth_1.AUTH_SWAGGER.SwaggerNewTokensType(),
    __param(0, (0, decorators_1.JwtRefreshPayloadDecorator)()),
    __param(1, (0, decorators_1.UserAgent)()),
    __param(2, (0, common_1.Ip)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_s = typeof strategies_1.JwtRefreshPayload !== "undefined" && strategies_1.JwtRefreshPayload) === "function" ? _s : Object, String, String, typeof (_t = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _t : Object]),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], AuthController.prototype, "newTokens", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard),
    auth_1.AUTH_SWAGGER.SwaggerLogoutType(),
    __param(0, (0, decorators_1.JwtRefreshPayloadDecorator)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_v = typeof strategies_1.JwtRefreshPayload !== "undefined" && strategies_1.JwtRefreshPayload) === "function" ? _v : Object, typeof (_w = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _w : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    auth_1.AUTH_SWAGGER.SwaggerMeType(),
    __param(0, (0, decorators_1.JwtAccessPayloadDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_x = typeof strategies_1.JwtAccessPayload !== "undefined" && strategies_1.JwtAccessPayload) === "function" ? _x : Object]),
    __metadata("design:returntype", typeof (_y = typeof Promise !== "undefined" && Promise) === "function" ? _y : Object)
], AuthController.prototype, "getMe", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth endpoints'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _b : Object, typeof (_c = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _c : Object, typeof (_d = typeof auth_query_repository_1.AuthQueryRepository !== "undefined" && auth_query_repository_1.AuthQueryRepository) === "function" ? _d : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/controllers/index.ts":
/*!***********************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/controllers/index.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AUTH_CONTROLLERS = void 0;
const auth_github_controller_1 = __webpack_require__(/*! ./auth-github.controller */ "./apps/auth-microservice/src/entities/auth/controllers/auth-github.controller.ts");
const auth_google_controller_1 = __webpack_require__(/*! ./auth-google.controller */ "./apps/auth-microservice/src/entities/auth/controllers/auth-google.controller.ts");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./apps/auth-microservice/src/entities/auth/controllers/auth.controller.ts");
exports.AUTH_CONTROLLERS = [
    auth_controller_1.AuthController,
    auth_google_controller_1.AuthGoogleController,
    auth_github_controller_1.AuthGithubController
];


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/core/dtos/github-register.dto.ts":
/*!***********************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/core/dtos/github-register.dto.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GithubRegisterDTO = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const patterns_1 = __webpack_require__(/*! ../../../../../utils/patterns */ "./apps/auth-microservice/utils/patterns/index.ts");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class GithubRegisterDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GithubRegisterDTO.prototype, "login", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GithubRegisterDTO.prototype, "node_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GithubRegisterDTO.prototype, "avatar_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GithubRegisterDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)((0, patterns_1.EmailPattern)()),
    __metadata("design:type", String)
], GithubRegisterDTO.prototype, "email", void 0);
exports.GithubRegisterDTO = GithubRegisterDTO;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/core/dtos/google-register.dto.ts":
/*!***********************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/core/dtos/google-register.dto.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleRegisterDTO = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const patterns_1 = __webpack_require__(/*! ../../../../../utils/patterns */ "./apps/auth-microservice/utils/patterns/index.ts");
class GoogleRegisterDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GoogleRegisterDTO.prototype, "sub", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GoogleRegisterDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GoogleRegisterDTO.prototype, "given_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GoogleRegisterDTO.prototype, "family_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GoogleRegisterDTO.prototype, "picture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)((0, patterns_1.EmailPattern)()),
    __metadata("design:type", String)
], GoogleRegisterDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], GoogleRegisterDTO.prototype, "email_verified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GoogleRegisterDTO.prototype, "locale", void 0);
exports.GoogleRegisterDTO = GoogleRegisterDTO;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/core/dtos/index.ts":
/*!*********************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/core/dtos/index.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./registration.dto */ "./apps/auth-microservice/src/entities/auth/core/dtos/registration.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./password-recovery.dto */ "./apps/auth-microservice/src/entities/auth/core/dtos/password-recovery.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./new-password.dto */ "./apps/auth-microservice/src/entities/auth/core/dtos/new-password.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./google-register.dto */ "./apps/auth-microservice/src/entities/auth/core/dtos/google-register.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./github-register.dto */ "./apps/auth-microservice/src/entities/auth/core/dtos/github-register.dto.ts"), exports);


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/core/dtos/new-password.dto.ts":
/*!********************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/core/dtos/new-password.dto.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewPasswordDTO = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const patterns_1 = __webpack_require__(/*! ../../../../../utils/patterns */ "./apps/auth-microservice/utils/patterns/index.ts");
class NewPasswordDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)((0, patterns_1.PasswordPattern)()),
    (0, class_validator_1.Length)(6, 20),
    __metadata("design:type", String)
], NewPasswordDTO.prototype, "newPassword", void 0);
exports.NewPasswordDTO = NewPasswordDTO;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/core/dtos/password-recovery.dto.ts":
/*!*************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/core/dtos/password-recovery.dto.ts ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordRecoveryDTO = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const patterns_1 = __webpack_require__(/*! ../../../../../utils/patterns */ "./apps/auth-microservice/utils/patterns/index.ts");
const validations_1 = __webpack_require__(/*! ../../../../../utils/validations */ "./apps/auth-microservice/utils/validations/index.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class PasswordRecoveryDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)((0, patterns_1.EmailPattern)()),
    (0, validations_1.TrimValidate)(),
    __metadata("design:type", String)
], PasswordRecoveryDTO.prototype, "email", void 0);
exports.PasswordRecoveryDTO = PasswordRecoveryDTO;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/core/dtos/registration.dto.ts":
/*!********************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/core/dtos/registration.dto.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegistrationDTO = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const validations_1 = __webpack_require__(/*! ../../../../../utils/validations */ "./apps/auth-microservice/utils/validations/index.ts");
const patterns_1 = __webpack_require__(/*! ../../../../../utils/patterns */ "./apps/auth-microservice/utils/patterns/index.ts");
class RegistrationDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'User email',
        example: 'example@gmail.com',
        pattern: String((0, patterns_1.EmailPattern)()),
        nullable: false
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)((0, patterns_1.EmailPattern)()),
    (0, validations_1.TrimValidate)(),
    __metadata("design:type", String)
], RegistrationDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'User login',
        example: 'login123',
        pattern: String((0, patterns_1.LoginPattern)()),
        nullable: false
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)((0, patterns_1.LoginPattern)()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 10),
    (0, validations_1.TrimValidate)(),
    __metadata("design:type", String)
], RegistrationDTO.prototype, "login", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'User password',
        example: 'password123%',
        pattern: String((0, patterns_1.PasswordPattern)()),
        nullable: false
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)((0, patterns_1.PasswordPattern)()),
    (0, class_validator_1.Length)(6, 20),
    (0, validations_1.TrimValidate)(),
    __metadata("design:type", String)
], RegistrationDTO.prototype, "password", void 0);
exports.RegistrationDTO = RegistrationDTO;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/github2.guard.ts":
/*!******************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/guards-handlers/guards/github2.guard.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Github2Guard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let Github2Guard = class Github2Guard extends (0, passport_1.AuthGuard)('github') {
};
Github2Guard = __decorate([
    (0, common_1.Injectable)()
], Github2Guard);
exports.Github2Guard = Github2Guard;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/google.guard.ts":
/*!*****************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/guards-handlers/guards/google.guard.ts ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleGurad = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let GoogleGurad = class GoogleGurad extends (0, passport_1.AuthGuard)('google') {
};
GoogleGurad = __decorate([
    (0, common_1.Injectable)()
], GoogleGurad);
exports.GoogleGurad = GoogleGurad;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/index.ts":
/*!**********************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/guards-handlers/guards/index.ts ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GUARDS = void 0;
const github2_guard_1 = __webpack_require__(/*! ./github2.guard */ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/github2.guard.ts");
const google_guard_1 = __webpack_require__(/*! ./google.guard */ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/google.guard.ts");
const jwt_access_guard_1 = __webpack_require__(/*! ./jwt-access.guard */ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/jwt-access.guard.ts");
const jwt_refresh_guard_1 = __webpack_require__(/*! ./jwt-refresh.guard */ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/jwt-refresh.guard.ts");
const local_guard_1 = __webpack_require__(/*! ./local.guard */ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/local.guard.ts");
__exportStar(__webpack_require__(/*! ./local.guard */ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/local.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./jwt-access.guard */ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/jwt-access.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./jwt-refresh.guard */ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/jwt-refresh.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./google.guard */ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/google.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./github2.guard */ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/github2.guard.ts"), exports);
exports.GUARDS = [
    local_guard_1.LocalAuthGuard,
    jwt_access_guard_1.JwtAccessGuard,
    jwt_refresh_guard_1.JwtRefreshGuard,
    google_guard_1.GoogleGurad,
    github2_guard_1.Github2Guard
];


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/jwt-access.guard.ts":
/*!*********************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/guards-handlers/guards/jwt-access.guard.ts ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAccessGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const decorators_1 = __webpack_require__(/*! ../../../../../utils/decorators */ "./apps/auth-microservice/utils/decorators/index.ts");
let JwtAccessGuard = class JwtAccessGuard extends (0, passport_1.AuthGuard)('jwt-access') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(decorators_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if (isPublic)
            return true;
        return super.canActivate(context);
    }
};
JwtAccessGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], JwtAccessGuard);
exports.JwtAccessGuard = JwtAccessGuard;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/jwt-refresh.guard.ts":
/*!**********************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/guards-handlers/guards/jwt-refresh.guard.ts ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtRefreshGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let JwtRefreshGuard = class JwtRefreshGuard extends (0, passport_1.AuthGuard)('jwt-refresh') {
};
JwtRefreshGuard = __decorate([
    (0, common_1.Injectable)()
], JwtRefreshGuard);
exports.JwtRefreshGuard = JwtRefreshGuard;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/guards-handlers/guards/local.guard.ts":
/*!****************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/guards-handlers/guards/local.guard.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
};
LocalAuthGuard = __decorate([
    (0, common_1.Injectable)()
], LocalAuthGuard);
exports.LocalAuthGuard = LocalAuthGuard;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/github2.strategy.ts":
/*!*************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/github2.strategy.ts ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Github2Strategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const config_1 = __webpack_require__(/*! libs/common/src/config */ "./libs/common/src/config/index.ts");
const passport_github2_1 = __webpack_require__(/*! passport-github2 */ "passport-github2");
let Github2Strategy = class Github2Strategy extends (0, passport_1.PassportStrategy)(passport_github2_1.Strategy) {
    constructor() {
        super({
            clientID: config_1.CONFIG.GITHUB_CLIENT_ID,
            clientSecret: config_1.CONFIG.GITHUB_CLIENT_SECRET,
            callbackURL: `${config_1.CONFIG.HOST}/api/auth/github/callback`,
            scopes: ['public_profile']
        });
    }
    validate(accessToken) {
        return { accessToken: accessToken };
    }
};
Github2Strategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], Github2Strategy);
exports.Github2Strategy = Github2Strategy;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/google.strategy.ts":
/*!************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/google.strategy.ts ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const config_1 = __webpack_require__(/*! ../../../../../../../libs/common/src/config */ "./libs/common/src/config/index.ts");
const passport_google_oauth20_1 = __webpack_require__(/*! passport-google-oauth20 */ "passport-google-oauth20");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy) {
    constructor() {
        super({
            clientID: config_1.CONFIG.GOOGLE_CLIENT_ID,
            clientSecret: config_1.CONFIG.GOOGLE_CLIENT_SECRET,
            callbackURL: `${config_1.CONFIG.HOST}/api/auth/google/callback`,
            scope: ['profile', 'email']
        });
    }
    validate(accessToken) {
        return { accessToken: accessToken };
    }
};
GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GoogleStrategy);
exports.GoogleStrategy = GoogleStrategy;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/index.ts":
/*!**************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/index.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STRATEGIES = void 0;
const github2_strategy_1 = __webpack_require__(/*! ./github2.strategy */ "./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/github2.strategy.ts");
const google_strategy_1 = __webpack_require__(/*! ./google.strategy */ "./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/google.strategy.ts");
const jwt_access_strategy_1 = __webpack_require__(/*! ./jwt-access.strategy */ "./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/jwt-access.strategy.ts");
const jwt_refresh_strategy_1 = __webpack_require__(/*! ./jwt-refresh.strategy */ "./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/jwt-refresh.strategy.ts");
const local_strategy_1 = __webpack_require__(/*! ./local.strategy */ "./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/local.strategy.ts");
__exportStar(__webpack_require__(/*! ./local.strategy */ "./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/local.strategy.ts"), exports);
__exportStar(__webpack_require__(/*! ./jwt-access.strategy */ "./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/jwt-access.strategy.ts"), exports);
__exportStar(__webpack_require__(/*! ./jwt-refresh.strategy */ "./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/jwt-refresh.strategy.ts"), exports);
__exportStar(__webpack_require__(/*! ./google.strategy */ "./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/google.strategy.ts"), exports);
__exportStar(__webpack_require__(/*! ./github2.strategy */ "./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/github2.strategy.ts"), exports);
exports.STRATEGIES = [
    local_strategy_1.LocalAuthStrategy,
    jwt_access_strategy_1.JwtAccessStrategy,
    jwt_refresh_strategy_1.JwtRefreshStrategy,
    google_strategy_1.GoogleStrategy,
    github2_strategy_1.Github2Strategy
];


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/jwt-access.strategy.ts":
/*!****************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/jwt-access.strategy.ts ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAccessStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const config_1 = __webpack_require__(/*! libs/common/src/config */ "./libs/common/src/config/index.ts");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
let JwtAccessStrategy = class JwtAccessStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-access') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config_1.CONFIG.JWT_ACCESS_SECRET,
            ignoreExpiration: false
        });
    }
    async validate(payload) {
        return { userID: payload.userID };
    }
};
JwtAccessStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JwtAccessStrategy);
exports.JwtAccessStrategy = JwtAccessStrategy;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/jwt-refresh.strategy.ts":
/*!*****************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/jwt-refresh.strategy.ts ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtRefreshStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const sessions_service_1 = __webpack_require__(/*! ../../../sessions/sessions.service */ "./apps/auth-microservice/src/entities/sessions/sessions.service.ts");
const config_1 = __webpack_require__(/*! libs/common/src/config */ "./libs/common/src/config/index.ts");
const enums_1 = __webpack_require__(/*! apps/auth-microservice/utils/enums */ "./apps/auth-microservice/utils/enums/index.ts");
const RefreshCookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies[enums_1.TokensEnum.REFRESH_TOKEN];
    }
    return token;
};
let JwtRefreshStrategy = class JwtRefreshStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
    constructor(sessionService) {
        super({
            jwtFromRequest: RefreshCookieExtractor,
            secretOrKey: config_1.CONFIG.JWT_REFRESH_SECRET,
            ignoreExpiration: false
        });
        this.sessionService = sessionService;
    }
    async validate(payload) {
        const session = await this.sessionService.validateSession({
            sessionID: payload.sessionID,
            expiresIn: payload.iat
        });
        if (!session)
            throw new common_1.UnauthorizedException();
        return { userID: payload.userID, sessionID: payload.sessionID };
    }
};
JwtRefreshStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof sessions_service_1.SessionsService !== "undefined" && sessions_service_1.SessionsService) === "function" ? _a : Object])
], JwtRefreshStrategy);
exports.JwtRefreshStrategy = JwtRefreshStrategy;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/local.strategy.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/guards-handlers/strategies/local.strategy.ts ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_local_1 = __webpack_require__(/*! passport-local */ "passport-local");
const auth_service_1 = __webpack_require__(/*! ../../auth.service */ "./apps/auth-microservice/src/entities/auth/auth.service.ts");
let LocalAuthStrategy = class LocalAuthStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super({
            usernameField: 'email'
        });
        this.authService = authService;
    }
    async validate(email, password) {
        return this.authService.validateUser({ email, password });
    }
};
LocalAuthStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalAuthStrategy);
exports.LocalAuthStrategy = LocalAuthStrategy;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/repositories/auth-query.repository.ts":
/*!****************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/repositories/auth-query.repository.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthQueryRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! apps/auth-microservice/prisma/prisma.service */ "./apps/auth-microservice/prisma/prisma.service.ts");
let AuthQueryRepository = class AuthQueryRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMe(payload) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.userID }
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return {
            userID: user.id,
            email: user.email,
            login: user.login,
            createdAt: user.createdAt
        };
    }
};
AuthQueryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], AuthQueryRepository);
exports.AuthQueryRepository = AuthQueryRepository;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/auth/repositories/auth.repository.ts":
/*!**********************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/auth/repositories/auth.repository.ts ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const colorette_1 = __webpack_require__(/*! colorette */ "colorette");
const date_fns_1 = __webpack_require__(/*! date-fns */ "date-fns");
const prisma_service_1 = __webpack_require__(/*! apps/auth-microservice/prisma/prisma.service */ "./apps/auth-microservice/prisma/prisma.service.ts");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const cache_manager_2 = __webpack_require__(/*! cache-manager */ "cache-manager");
let AuthRepository = class AuthRepository {
    constructor(prisma, cache) {
        this.prisma = prisma;
        this.cache = cache;
        this.logger = new common_1.Logger();
    }
    async createEmailCode(data) {
        const emailCode = await this.prisma.emailCode
            .create({
            data: {
                code: (0, uuid_1.v4)(),
                expiresIn: (0, date_fns_1.add)(new Date(), { minutes: 10 }),
                userID: data.userID
            }
        })
            .catch((err) => this.logger.error((0, colorette_1.red)(err)));
        if (!emailCode)
            throw new common_1.InternalServerErrorException('Unable to create new email code');
        await this.cache.set(`email_code-code-${emailCode.code}`, emailCode, 900);
        return emailCode.code;
    }
    async findEmailCodeByCode({ code }) {
        console.log(code);
        const emailCode = await this.cache.get(`email_code-code-${code}`);
        if (!emailCode) {
            const emailCode = await this.prisma.emailCode.findUnique({
                where: { code }
            });
            if (!emailCode)
                return null;
            await this.cache.set(`email_code-code-${emailCode.code}`, code, 900);
            return emailCode;
        }
        return emailCode;
    }
    async deactivateEmailCodeByCode({ code }) {
        await this.prisma.emailCode.update({ where: { code }, data: { isUsed: true } });
        await this.cache.del(`email_code-code-${code}`);
    }
    async deactivateAllEmailCodesByUserID({ userID }) {
        await this.prisma.emailCode.updateMany({
            where: { userID },
            data: { isUsed: true }
        });
    }
    async findGoogleProfileByProviderID({ providerID }) {
        return this.prisma.googleProfile.findUnique({ where: { providerID } });
    }
    async findGoogleProfileByUserID({ userID }) {
        return this.prisma.googleProfile.findUnique({ where: { userID } });
    }
    async createGoogleProfile(dto, { userID }) {
        const googleProfile = await this.prisma.googleProfile
            .create({
            data: {
                providerID: dto.sub,
                email: dto.email,
                userID
            }
        })
            .catch((err) => this.logger.error((0, colorette_1.red)(err)));
        if (!googleProfile)
            throw new common_1.InternalServerErrorException('Unable to create new google profile');
        return googleProfile;
    }
    async findGithubProfileByProviderID({ providerID }) {
        return this.prisma.githubProfile.findUnique({ where: { providerID } });
    }
    async findGithubProfileByUserID({ userID }) {
        return this.prisma.githubProfile.findUnique({ where: { userID } });
    }
    async createGithubProfile(dto, { userID }) {
        const githubProfile = await this.prisma.githubProfile
            .create({
            data: {
                providerID: dto.node_id,
                email: dto.email,
                userID
            }
        })
            .catch((err) => this.logger.error((0, colorette_1.red)(err)));
        if (!githubProfile)
            throw new common_1.InternalServerErrorException('Unable to create new github profile');
        return githubProfile;
    }
};
AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof cache_manager_2.Cache !== "undefined" && cache_manager_2.Cache) === "function" ? _b : Object])
], AuthRepository);
exports.AuthRepository = AuthRepository;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/sessions/session.controller.ts":
/*!****************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/sessions/session.controller.ts ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
let SessionController = class SessionController {
};
SessionController = __decorate([
    (0, swagger_1.ApiTags)('Sessions endpoints'),
    (0, common_1.Controller)('sessions')
], SessionController);
exports.SessionController = SessionController;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/sessions/sessions.module.ts":
/*!*************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/sessions/sessions.module.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const session_controller_1 = __webpack_require__(/*! ./session.controller */ "./apps/auth-microservice/src/entities/sessions/session.controller.ts");
const sessions_service_1 = __webpack_require__(/*! ./sessions.service */ "./apps/auth-microservice/src/entities/sessions/sessions.service.ts");
const sessions_repository_1 = __webpack_require__(/*! ./sessions.repository */ "./apps/auth-microservice/src/entities/sessions/sessions.repository.ts");
let SessionsModule = class SessionsModule {
};
SessionsModule = __decorate([
    (0, common_1.Module)({
        controllers: [session_controller_1.SessionController],
        providers: [sessions_service_1.SessionsService, sessions_repository_1.SessionsRepository],
        exports: [sessions_service_1.SessionsService, sessions_repository_1.SessionsRepository]
    })
], SessionsModule);
exports.SessionsModule = SessionsModule;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/sessions/sessions.repository.ts":
/*!*****************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/sessions/sessions.repository.ts ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SessionsRepository_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionsRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const colorette_1 = __webpack_require__(/*! colorette */ "colorette");
const date_fns_1 = __webpack_require__(/*! date-fns */ "date-fns");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const cache_manager_2 = __webpack_require__(/*! cache-manager */ "cache-manager");
const prisma_service_1 = __webpack_require__(/*! ../../../prisma/prisma.service */ "./apps/auth-microservice/prisma/prisma.service.ts");
const config_1 = __webpack_require__(/*! libs/common/src/config */ "./libs/common/src/config/index.ts");
let SessionsRepository = SessionsRepository_1 = class SessionsRepository {
    constructor(prisma, cache) {
        this.prisma = prisma;
        this.cache = cache;
        this.logger = new common_1.Logger(SessionsRepository_1.name);
    }
    async deleteAllData() {
        await this.prisma.session.deleteMany();
    }
    async createSession(data) {
        const session = await this.prisma.session
            .create({
            data: {
                userID: data.userID,
                userIP: data.userIP,
                userAgent: data.userAgent,
                expiresIn: (0, date_fns_1.add)(new Date(), {
                    seconds: Number(config_1.CONFIG.JWT_REFRESH_EXPIRES)
                })
            }
        })
            .catch((err) => this.logger.error((0, colorette_1.red)(err)));
        if (!session)
            throw new common_1.InternalServerErrorException('Unable to create new session');
        await this.cache.set(`session-id-${session.id}`, session, 600);
        return session;
    }
    async findSessionByID({ sessionID }) {
        const session = await this.cache.get(`session-id-${sessionID}`);
        if (!session) {
            const session = await this.prisma.session.findUnique({
                where: { id: sessionID }
            });
            if (!session)
                return null;
            await this.cache.set(`session-id-${session.id}`, session, 600);
            return session;
        }
        return session;
    }
    async deleteSessionByID({ sessionID }) {
        const isSession = await this.findSessionByID({ sessionID });
        if (!isSession)
            throw new common_1.NotFoundException('Session not found');
        const session = await this.prisma.session.delete({
            where: Object.assign({}, isSession)
        });
        await this.cache.del(`session-id-${session.id}`);
    }
};
SessionsRepository = SessionsRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof cache_manager_2.Cache !== "undefined" && cache_manager_2.Cache) === "function" ? _b : Object])
], SessionsRepository);
exports.SessionsRepository = SessionsRepository;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/sessions/sessions.service.ts":
/*!**************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/sessions/sessions.service.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sessions_repository_1 = __webpack_require__(/*! ./sessions.repository */ "./apps/auth-microservice/src/entities/sessions/sessions.repository.ts");
let SessionsService = class SessionsService {
    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository;
    }
    async validateSession({ sessionID, expiresIn }) {
        if (!sessionID)
            return null;
        const session = await this.sessionRepository.findSessionByID({
            sessionID
        });
        if (!session)
            return null;
        const currentTime = new Date();
        const sessionExpiresIn = new Date(session.expiresIn);
        if (currentTime >= sessionExpiresIn)
            return null;
        const sessionCreatedAt = new Date(session.createdAt);
        const expirationTimeInSeconds = expiresIn * 1000;
        if (currentTime.getTime() - sessionCreatedAt.getTime() > expirationTimeInSeconds)
            return null;
        return true;
    }
};
SessionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof sessions_repository_1.SessionsRepository !== "undefined" && sessions_repository_1.SessionsRepository) === "function" ? _a : Object])
], SessionsService);
exports.SessionsService = SessionsService;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/users/application/commands/handlers/edit-avatar.handler.ts":
/*!********************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/users/application/commands/handlers/edit-avatar.handler.ts ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EditAvatarHandler = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const impl_1 = __webpack_require__(/*! ../impl */ "./apps/auth-microservice/src/entities/users/application/commands/impl/index.ts");
const users_reposiroty_1 = __webpack_require__(/*! ../../../users.reposiroty */ "./apps/auth-microservice/src/entities/users/users.reposiroty.ts");
const constants_1 = __webpack_require__(/*! ../../../../../../../../libs/common/src/aws/constants */ "./libs/common/src/aws/constants/index.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let EditAvatarHandler = class EditAvatarHandler {
    constructor(usersRepository, filesClient) {
        this.usersRepository = usersRepository;
        this.filesClient = filesClient;
    }
    async execute({ dto }) {
        const user = await this.usersRepository.findUserById({
            userID: dto.userID
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const filename = (0, uuid_1.v4)();
        this.filesClient.emit('upload-avatar', {
            filename,
            buffer: dto.file.buffer
        });
        const avatarUrl = `${constants_1.aws_base_url}/${filename}`;
        await this.usersRepository.editAvatar({ avatarUrl, userID: user.id });
    }
};
EditAvatarHandler = __decorate([
    (0, cqrs_1.CommandHandler)(impl_1.EditAvatarCommand),
    __param(1, (0, common_1.Inject)('MAIN')),
    __metadata("design:paramtypes", [typeof (_a = typeof users_reposiroty_1.UsersRepository !== "undefined" && users_reposiroty_1.UsersRepository) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object])
], EditAvatarHandler);
exports.EditAvatarHandler = EditAvatarHandler;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/users/application/commands/handlers/edit-profile.handler.ts":
/*!*********************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/users/application/commands/handlers/edit-profile.handler.ts ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EditProfileHandler = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const edit_profile_command_1 = __webpack_require__(/*! ../impl/edit-profile.command */ "./apps/auth-microservice/src/entities/users/application/commands/impl/edit-profile.command.ts");
const users_reposiroty_1 = __webpack_require__(/*! ../../../users.reposiroty */ "./apps/auth-microservice/src/entities/users/users.reposiroty.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let EditProfileHandler = class EditProfileHandler {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ dto, userID }) {
        const user = await this.usersRepository.findUserById({ userID });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const isSuccess = await this.usersRepository.editProfile(dto, user.id);
        if (!isSuccess)
            throw new common_1.BadRequestException('Unable to edit profle');
        return;
    }
};
EditProfileHandler = __decorate([
    (0, cqrs_1.CommandHandler)(edit_profile_command_1.EditProfileCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof users_reposiroty_1.UsersRepository !== "undefined" && users_reposiroty_1.UsersRepository) === "function" ? _a : Object])
], EditProfileHandler);
exports.EditProfileHandler = EditProfileHandler;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/users/application/commands/handlers/index.ts":
/*!******************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/users/application/commands/handlers/index.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.USERS_COMMANDS_HANDLERS = void 0;
const edit_avatar_handler_1 = __webpack_require__(/*! ./edit-avatar.handler */ "./apps/auth-microservice/src/entities/users/application/commands/handlers/edit-avatar.handler.ts");
const edit_profile_handler_1 = __webpack_require__(/*! ./edit-profile.handler */ "./apps/auth-microservice/src/entities/users/application/commands/handlers/edit-profile.handler.ts");
__exportStar(__webpack_require__(/*! ./edit-profile.handler */ "./apps/auth-microservice/src/entities/users/application/commands/handlers/edit-profile.handler.ts"), exports);
__exportStar(__webpack_require__(/*! ./edit-avatar.handler */ "./apps/auth-microservice/src/entities/users/application/commands/handlers/edit-avatar.handler.ts"), exports);
exports.USERS_COMMANDS_HANDLERS = [edit_profile_handler_1.EditProfileHandler, edit_avatar_handler_1.EditAvatarHandler];


/***/ }),

/***/ "./apps/auth-microservice/src/entities/users/application/commands/impl/edit-avatar.command.ts":
/*!****************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/users/application/commands/impl/edit-avatar.command.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EditAvatarCommand = void 0;
class EditAvatarCommand {
    constructor(dto) {
        this.dto = dto;
    }
}
exports.EditAvatarCommand = EditAvatarCommand;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/users/application/commands/impl/edit-profile.command.ts":
/*!*****************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/users/application/commands/impl/edit-profile.command.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EditProfileCommand = void 0;
class EditProfileCommand {
    constructor(dto, userID) {
        this.dto = dto;
        this.userID = userID;
    }
}
exports.EditProfileCommand = EditProfileCommand;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/users/application/commands/impl/index.ts":
/*!**************************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/users/application/commands/impl/index.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.USERS_COMMANDS_IMPLS = void 0;
const edit_profile_command_1 = __webpack_require__(/*! ./edit-profile.command */ "./apps/auth-microservice/src/entities/users/application/commands/impl/edit-profile.command.ts");
const edit_avatar_command_1 = __webpack_require__(/*! ./edit-avatar.command */ "./apps/auth-microservice/src/entities/users/application/commands/impl/edit-avatar.command.ts");
__exportStar(__webpack_require__(/*! ./edit-profile.command */ "./apps/auth-microservice/src/entities/users/application/commands/impl/edit-profile.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./edit-avatar.command */ "./apps/auth-microservice/src/entities/users/application/commands/impl/edit-avatar.command.ts"), exports);
exports.USERS_COMMANDS_IMPLS = { EditProfileCommand: edit_profile_command_1.EditProfileCommand, EditAvatarCommand: edit_avatar_command_1.EditAvatarCommand };


/***/ }),

/***/ "./apps/auth-microservice/src/entities/users/core/dtos/edit-profile.dto.ts":
/*!*********************************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/users/core/dtos/edit-profile.dto.ts ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EditProfileDTO = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const patterns_1 = __webpack_require__(/*! ../../../../../utils/patterns */ "./apps/auth-microservice/utils/patterns/index.ts");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class EditProfileDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)((0, patterns_1.LoginPattern)()),
    __metadata("design:type", String)
], EditProfileDTO.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)((0, patterns_1.NamePattern)()),
    __metadata("design:type", String)
], EditProfileDTO.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)((0, patterns_1.NamePattern)()),
    __metadata("design:type", String)
], EditProfileDTO.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EditProfileDTO.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EditProfileDTO.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(200),
    (0, class_validator_1.Matches)(/^[0-9A-Za-zА-Яа-я\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/),
    __metadata("design:type", String)
], EditProfileDTO.prototype, "aboutMe", void 0);
exports.EditProfileDTO = EditProfileDTO;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/users/core/dtos/index.ts":
/*!**********************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/users/core/dtos/index.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./edit-profile.dto */ "./apps/auth-microservice/src/entities/users/core/dtos/edit-profile.dto.ts"), exports);


/***/ }),

/***/ "./apps/auth-microservice/src/entities/users/users.controller.ts":
/*!***********************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/users/users.controller.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const dtos_1 = __webpack_require__(/*! ./core/dtos */ "./apps/auth-microservice/src/entities/users/core/dtos/index.ts");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const impl_1 = __webpack_require__(/*! ./application/commands/impl */ "./apps/auth-microservice/src/entities/users/application/commands/impl/index.ts");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const decorators_1 = __webpack_require__(/*! apps/auth-microservice/utils/decorators */ "./apps/auth-microservice/utils/decorators/index.ts");
const AvatarValidationPipe = new common_1.ParseFilePipe({
    validators: [
        new common_1.MaxFileSizeValidator({ maxSize: 10000000 }),
        new common_1.FileTypeValidator({ fileType: 'image/*' })
    ]
});
let UsersController = class UsersController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async EditAvatar(file, userID) {
        await this.commandBus.execute(new impl_1.USERS_COMMANDS_IMPLS.EditAvatarCommand({ file, userID }));
    }
    async EditProfile(dto, userID) {
        await this.commandBus.execute(new impl_1.USERS_COMMANDS_IMPLS.EditProfileCommand(dto, userID));
    }
};
__decorate([
    (0, common_1.Patch)('edit-avatar'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    __param(0, (0, common_1.UploadedFile)(AvatarValidationPipe)),
    __param(1, (0, decorators_1.JwtAccessPayloadDecorator)('userID', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof Express !== "undefined" && (_b = Express.Multer) !== void 0 && _b.File) === "function" ? _c : Object, String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UsersController.prototype, "EditAvatar", null);
__decorate([
    (0, common_1.Patch)('edit-profile'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.JwtAccessPayloadDecorator)('userID', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof dtos_1.EditProfileDTO !== "undefined" && dtos_1.EditProfileDTO) === "function" ? _e : Object, String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UsersController.prototype, "EditProfile", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users endpoints'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _a : Object])
], UsersController);
exports.UsersController = UsersController;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/users/users.module.ts":
/*!*******************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/users/users.module.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./apps/auth-microservice/src/entities/users/users.service.ts");
const users_reposiroty_1 = __webpack_require__(/*! ./users.reposiroty */ "./apps/auth-microservice/src/entities/users/users.reposiroty.ts");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const handlers_1 = __webpack_require__(/*! ./application/commands/handlers */ "./apps/auth-microservice/src/entities/users/application/commands/handlers/index.ts");
const users_controller_1 = __webpack_require__(/*! ./users.controller */ "./apps/auth-microservice/src/entities/users/users.controller.ts");
const rmq_module_1 = __webpack_require__(/*! ../../../../../libs/common/src/rmq/rmq.module */ "./libs/common/src/rmq/rmq.module.ts");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, rmq_module_1.RmqModule.register({ name: 'MAIN' })],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, users_reposiroty_1.UsersRepository, ...handlers_1.USERS_COMMANDS_HANDLERS],
        exports: [users_service_1.UsersService, users_reposiroty_1.UsersRepository]
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/users/users.reposiroty.ts":
/*!***********************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/users/users.reposiroty.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UsersRepository_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
const colorette_1 = __webpack_require__(/*! colorette */ "colorette");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const cache_manager_2 = __webpack_require__(/*! cache-manager */ "cache-manager");
const prisma_service_1 = __webpack_require__(/*! ../../../prisma/prisma.service */ "./apps/auth-microservice/prisma/prisma.service.ts");
let UsersRepository = UsersRepository_1 = class UsersRepository {
    constructor(prisma, cache) {
        this.prisma = prisma;
        this.cache = cache;
        this.logger = new common_1.Logger(UsersRepository_1.name);
    }
    async deleteAllData() {
        await this.prisma.user.deleteMany();
    }
    async findUserByEmail({ email }) {
        const user = await this.cache.get(`user-email-${email}`);
        if (!user) {
            const user = await this.prisma.user.findUnique({
                where: { email }
            });
            if (!user)
                return null;
            await this.cache.set(`user-email-${user.email}`, user, 1800);
            return user;
        }
        return user;
    }
    async findUserByLogin({ login }) {
        console.log(login);
        const user = await this.cache.get(`user-login-${login}`);
        if (!user) {
            const user = await this.prisma.user.findUnique({
                where: { login }
            });
            if (!user)
                return null;
            await this.cache.set(`user-login-${login}`, user, 1800);
            return user;
        }
        return user;
    }
    async findUserById({ userID }) {
        const user = await this.cache.get(`user-id-${userID}`);
        if (!user) {
            const user = await this.prisma.user.findUnique({
                where: { id: userID }
            });
            if (!user)
                return null;
            await this.cache.set(`user-id-${userID}`, user, 1800);
            return user;
        }
        return user;
    }
    async createUser(data) {
        var _a;
        const user = await this.prisma.user
            .create({
            data: {
                email: data.email,
                login: data.login,
                hashPassword: data.hashPassword,
                isConfirmed: (_a = data.isConfirmed) !== null && _a !== void 0 ? _a : false
            }
        })
            .catch((err) => this.logger.error((0, colorette_1.red)(err)));
        if (!user)
            throw new common_1.InternalServerErrorException('Unable to create user');
        await this.cache.set(`user-email-${user.email}`, user, 1800);
        return user;
    }
    async confirmUser({ userID }) {
        const user = await this.prisma.user.update({
            where: { id: userID },
            data: { isConfirmed: true }
        });
        const cacheKeys = await this.getCacheKeys({
            email: user.email,
            login: user.login,
            id: user.id
        });
        for (const key of cacheKeys) {
            await this.cache.del(key);
        }
    }
    async createProfile({ username, userID }) {
        await this.prisma.profile.create({
            data: {
                username,
                userID,
                firstName: '',
                lastName: ''
            }
        });
    }
    async newPassword({ userID, newHashPassword }) {
        const user = await this.prisma.user.update({
            where: { id: userID },
            data: { hashPassword: newHashPassword }
        });
        const cacheKeys = await this.getCacheKeys({
            email: user.email,
            login: user.login,
            id: user.id
        });
        for (const key of cacheKeys) {
            await this.cache.del(key);
        }
    }
    async deleteUser({ userID }) {
        const user = await this.findUserById({ userID });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const cacheKeys = await this.getCacheKeys({
            email: user.email,
            login: user.login,
            id: user.id
        });
        for (const key of cacheKeys) {
            await this.cache.del(key);
        }
    }
    async getCacheKeys({ email, login, id }) {
        return [`user-email-${email}`, `user-login-${login}`, `user-id-${id}`];
    }
    async editProfile(dto, userID) {
        const profile = await this.prisma.profile
            .update({
            where: { userID },
            data: dto
        })
            .catch((err) => this.logger.error(err));
        if (!profile)
            throw new common_1.InternalServerErrorException('Unable to edit profile');
        return profile;
    }
    async editAvatar(data) {
        await this.prisma.profile.update({
            where: { userID: data.userID },
            data: { avatarUrl: data.avatarUrl }
        });
    }
};
UsersRepository = UsersRepository_1 = __decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof cache_manager_2.Cache !== "undefined" && cache_manager_2.Cache) === "function" ? _b : Object])
], UsersRepository);
exports.UsersRepository = UsersRepository;


/***/ }),

/***/ "./apps/auth-microservice/src/entities/users/users.service.ts":
/*!********************************************************************!*\
  !*** ./apps/auth-microservice/src/entities/users/users.service.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_reposiroty_1 = __webpack_require__(/*! ./users.reposiroty */ "./apps/auth-microservice/src/entities/users/users.reposiroty.ts");
const schedule = __importStar(__webpack_require__(/*! node-schedule */ "node-schedule"));
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
        this.scheduledJobs = {};
    }
    async createScheduledDeletion({ userID }) {
        const user = await this.usersRepository.findUserById({ userID });
        if (user.isConfirmed) {
            return null;
        }
        else {
            const delay = 15 * 60 * 1000;
            const scheduledJob = schedule.scheduleJob(new Date(Date.now() + delay), async () => {
                await this.usersRepository.deleteUser({ userID });
            });
            this.scheduledJobs[userID] = scheduledJob;
        }
    }
    async cancelScheduledDeletion({ userID }) {
        const scheduledJob = this.scheduledJobs[userID];
        if (scheduledJob) {
            scheduledJob.cancel();
            delete this.scheduledJobs[userID];
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_reposiroty_1.UsersRepository !== "undefined" && users_reposiroty_1.UsersRepository) === "function" ? _a : Object])
], UsersService);
exports.UsersService = UsersService;


/***/ }),

/***/ "./apps/auth-microservice/src/main.ts":
/*!********************************************!*\
  !*** ./apps/auth-microservice/src/main.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/auth-microservice/src/app.module.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const cookie_parser_1 = __importDefault(__webpack_require__(/*! cookie-parser */ "cookie-parser"));
const colorette_1 = __webpack_require__(/*! colorette */ "colorette");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const swagger_setup_1 = __webpack_require__(/*! ../static/swagger/swagger-setup */ "./apps/auth-microservice/static/swagger/swagger-setup.ts");
const enums_1 = __webpack_require__(/*! ../utils/enums */ "./apps/auth-microservice/utils/enums/index.ts");
const error_handlers_1 = __webpack_require__(/*! ../utils/error-handlers */ "./apps/auth-microservice/utils/error-handlers/index.ts");
const appSettings = async (logger) => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api', {
        exclude: [{ path: '', method: common_1.RequestMethod.GET }]
    });
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'https://flying-merch-front.vercel.app',
            'https://freedomindz.site'
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'HEAD']
    });
    app.use((0, cookie_parser_1.default)());
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new common_1.ValidationPipe(error_handlers_1.validatePipeOptions));
    const config = app.get(config_1.ConfigService);
    const PORT = config.get('PORT');
    const HOST = config.get('HOST');
    const MODE = config.get('MODE');
    if (MODE !== enums_1.StatusEnum.PRODUCTION)
        (0, swagger_setup_1.swaggerSetup)(app);
    await app.listen(4200);
    logger.log((0, colorette_1.blue)(`Server is running on ${HOST} in ${MODE} mode`));
};
const bootstrap = async () => {
    const logger = new common_1.Logger(bootstrap.name);
    try {
        await appSettings(logger);
    }
    catch (err) {
        logger.log((0, colorette_1.red)(`Something went wrong... Learn more at: ${err}`));
    }
};
bootstrap();


/***/ }),

/***/ "./apps/auth-microservice/src/modules/cache.module.provider.ts":
/*!*********************************************************************!*\
  !*** ./apps/auth-microservice/src/modules/cache.module.provider.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheModuleProvider = void 0;
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cache_manager_2 = __webpack_require__(/*! cache-manager */ "cache-manager");
let CacheModuleProvider = class CacheModuleProvider {
};
CacheModuleProvider = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.registerAsync({
                isGlobal: true,
                useFactory: async () => ({
                    store: cache_manager_2.memoryStore
                })
            })
        ]
    })
], CacheModuleProvider);
exports.CacheModuleProvider = CacheModuleProvider;


/***/ }),

/***/ "./apps/auth-microservice/src/modules/index.ts":
/*!*****************************************************!*\
  !*** ./apps/auth-microservice/src/modules/index.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MODULE_PROVIDERS = void 0;
const cache_module_provider_1 = __webpack_require__(/*! ./cache.module.provider */ "./apps/auth-microservice/src/modules/cache.module.provider.ts");
const throttel_module_provider_1 = __webpack_require__(/*! ./throttel.module.provider */ "./apps/auth-microservice/src/modules/throttel.module.provider.ts");
exports.MODULE_PROVIDERS = [cache_module_provider_1.CacheModuleProvider, throttel_module_provider_1.ThrottelModuleProvider];


/***/ }),

/***/ "./apps/auth-microservice/src/modules/throttel.module.provider.ts":
/*!************************************************************************!*\
  !*** ./apps/auth-microservice/src/modules/throttel.module.provider.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThrottelModuleProvider = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
let ThrottelModuleProvider = class ThrottelModuleProvider {
};
ThrottelModuleProvider = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot({
                ttl: 10,
                limit: 500
            })
        ]
    })
], ThrottelModuleProvider);
exports.ThrottelModuleProvider = ThrottelModuleProvider;


/***/ }),

/***/ "./apps/auth-microservice/static/swagger/swagger-config.ts":
/*!*****************************************************************!*\
  !*** ./apps/auth-microservice/static/swagger/swagger-config.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.swaggerConfig = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
exports.swaggerConfig = {
    development: new swagger_1.DocumentBuilder()
        .setTitle('Flying Merch. Auth API')
        .setDescription('Descriptions of auth endpoints')
        .setVersion('1.0')
        .build()
};


/***/ }),

/***/ "./apps/auth-microservice/static/swagger/swagger-setup.ts":
/*!****************************************************************!*\
  !*** ./apps/auth-microservice/static/swagger/swagger-setup.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.swaggerSetup = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const swagger_config_1 = __webpack_require__(/*! ./swagger-config */ "./apps/auth-microservice/static/swagger/swagger-config.ts");
const swaggerSetup = (app) => {
    const options = swagger_config_1.swaggerConfig.development;
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api/swagger/auth', app, document, {
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
        ]
    });
};
exports.swaggerSetup = swaggerSetup;


/***/ }),

/***/ "./apps/auth-microservice/static/swagger/types/auth/index.ts":
/*!*******************************************************************!*\
  !*** ./apps/auth-microservice/static/swagger/types/auth/index.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AUTH_SWAGGER = void 0;
const swagger_me_type_1 = __webpack_require__(/*! ./swagger-me-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-me-type.ts");
const swagger_email_confirm_type_1 = __webpack_require__(/*! ./swagger-email-confirm-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-email-confirm-type.ts");
const swagger_email_resend_type_1 = __webpack_require__(/*! ./swagger-email-resend-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-email-resend-type.ts");
const swagger_local_register_type_1 = __webpack_require__(/*! ./swagger-local-register-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-local-register-type.ts");
const swagger_login_type_1 = __webpack_require__(/*! ./swagger-login-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-login-type.ts");
const swagger_new_password_type_1 = __webpack_require__(/*! ./swagger-new-password-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-new-password-type.ts");
const swagger_new_tokens_type_1 = __webpack_require__(/*! ./swagger-new-tokens-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-new-tokens-type.ts");
const swagger_password_recovery_type_1 = __webpack_require__(/*! ./swagger-password-recovery-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-password-recovery-type.ts");
const swagger_logout_type_1 = __webpack_require__(/*! ./swagger-logout-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-logout-type.ts");
__exportStar(__webpack_require__(/*! ./swagger-local-register-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-local-register-type.ts"), exports);
__exportStar(__webpack_require__(/*! ./swagger-email-resend-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-email-resend-type.ts"), exports);
__exportStar(__webpack_require__(/*! ./swagger-login-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-login-type.ts"), exports);
__exportStar(__webpack_require__(/*! ./swagger-new-password-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-new-password-type.ts"), exports);
__exportStar(__webpack_require__(/*! ./swagger-password-recovery-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-password-recovery-type.ts"), exports);
__exportStar(__webpack_require__(/*! ./swagger-new-tokens-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-new-tokens-type.ts"), exports);
__exportStar(__webpack_require__(/*! ./swagger-email-confirm-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-email-confirm-type.ts"), exports);
__exportStar(__webpack_require__(/*! ./swagger-logout-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-logout-type.ts"), exports);
__exportStar(__webpack_require__(/*! ./swagger-me-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-me-type.ts"), exports);
__exportStar(__webpack_require__(/*! ./swagger-google-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-google-type.ts"), exports);
__exportStar(__webpack_require__(/*! ./swagger-google-register-type */ "./apps/auth-microservice/static/swagger/types/auth/swagger-google-register-type.ts"), exports);
exports.AUTH_SWAGGER = {
    SwaggerLocalRegisterType: swagger_local_register_type_1.SwaggerLocalRegisterType,
    SwaggerEmailResendType: swagger_email_resend_type_1.SwaggerEmailResendType,
    SwaggerLoginType: swagger_login_type_1.SwaggerLoginType,
    SwaggerNewPasswordType: swagger_new_password_type_1.SwaggerNewPasswordType,
    SwaggerPasswordRecoveryType: swagger_password_recovery_type_1.SwaggerPasswordRecoveryType,
    SwaggerNewTokensType: swagger_new_tokens_type_1.SwaggerNewTokensType,
    SwaggerEmailConfirmType: swagger_email_confirm_type_1.SwaggerEmailConfirmType,
    SwaggerLogoutType: swagger_logout_type_1.SwaggerLogoutType,
    SwaggerMeType: swagger_me_type_1.SwaggerMeType
};


/***/ }),

/***/ "./apps/auth-microservice/static/swagger/types/auth/swagger-email-confirm-type.ts":
/*!****************************************************************************************!*\
  !*** ./apps/auth-microservice/static/swagger/types/auth/swagger-email-confirm-type.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerEmailConfirmType = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const SwaggerEmailConfirmType = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'Confirm user accout' }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'User account confirmed successfully'
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Code is not valid to UUID'
    }));
};
exports.SwaggerEmailConfirmType = SwaggerEmailConfirmType;


/***/ }),

/***/ "./apps/auth-microservice/static/swagger/types/auth/swagger-email-resend-type.ts":
/*!***************************************************************************************!*\
  !*** ./apps/auth-microservice/static/swagger/types/auth/swagger-email-resend-type.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerEmailResendType = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const SwaggerEmailResendType = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'Resend confirmation code' }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: "Operation gone OK, emailed a confirmation link to user's email"
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Code is not valid to UUID'
    }));
};
exports.SwaggerEmailResendType = SwaggerEmailResendType;


/***/ }),

/***/ "./apps/auth-microservice/static/swagger/types/auth/swagger-google-register-type.ts":
/*!******************************************************************************************!*\
  !*** ./apps/auth-microservice/static/swagger/types/auth/swagger-google-register-type.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerGoogleRegisterType = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const SwaggerGoogleRegisterType = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'Get or create google profile' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST }));
};
exports.SwaggerGoogleRegisterType = SwaggerGoogleRegisterType;


/***/ }),

/***/ "./apps/auth-microservice/static/swagger/types/auth/swagger-google-type.ts":
/*!*********************************************************************************!*\
  !*** ./apps/auth-microservice/static/swagger/types/auth/swagger-google-type.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerGoogleType = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const SwaggerGoogleType = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'Open google authentication page' }));
};
exports.SwaggerGoogleType = SwaggerGoogleType;


/***/ }),

/***/ "./apps/auth-microservice/static/swagger/types/auth/swagger-local-register-type.ts":
/*!*****************************************************************************************!*\
  !*** ./apps/auth-microservice/static/swagger/types/auth/swagger-local-register-type.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerLocalRegisterType = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const SwaggerLocalRegisterType = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'User registration' }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: "User created successfully, sent an confirmation code to user's email"
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'Email or login is already existing'
    }));
};
exports.SwaggerLocalRegisterType = SwaggerLocalRegisterType;


/***/ }),

/***/ "./apps/auth-microservice/static/swagger/types/auth/swagger-login-type.ts":
/*!********************************************************************************!*\
  !*** ./apps/auth-microservice/static/swagger/types/auth/swagger-login-type.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerLoginType = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const patterns_1 = __webpack_require__(/*! ../../../../utils/patterns */ "./apps/auth-microservice/utils/patterns/index.ts");
class LoginDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User email',
        example: 'example@gmail.com',
        type: String,
        pattern: String((0, patterns_1.EmailPattern)()),
        nullable: false
    }),
    __metadata("design:type", String)
], LoginDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User password',
        example: 'Password123%',
        type: String,
        minLength: 6,
        maxLength: 20,
        pattern: String((0, patterns_1.PasswordPattern)()),
        nullable: false
    }),
    __metadata("design:type", String)
], LoginDTO.prototype, "password", void 0);
class LoginResType {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Access tokens' }),
    __metadata("design:type", String)
], LoginResType.prototype, "accessToken", void 0);
const SwaggerLoginType = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'Login command' }), (0, swagger_1.ApiBody)({ type: LoginDTO }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'User logged in successfully, returns an accessToken in body and refreshToken in cookies',
        type: LoginResType
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid login or email'
    }));
};
exports.SwaggerLoginType = SwaggerLoginType;


/***/ }),

/***/ "./apps/auth-microservice/static/swagger/types/auth/swagger-logout-type.ts":
/*!*********************************************************************************!*\
  !*** ./apps/auth-microservice/static/swagger/types/auth/swagger-logout-type.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerLogoutType = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const SwaggerLogoutType = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'Logout command' }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'User session was deleted, refreshToken deleted from cookies'
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Refresh token is not valid, expired or missing'
    }));
};
exports.SwaggerLogoutType = SwaggerLogoutType;


/***/ }),

/***/ "./apps/auth-microservice/static/swagger/types/auth/swagger-me-type.ts":
/*!*****************************************************************************!*\
  !*** ./apps/auth-microservice/static/swagger/types/auth/swagger-me-type.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerMeType = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const SwaggerMeType = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'Get short info about current user' }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Returns info about current user'
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is not valid, expired or missing'
    }));
};
exports.SwaggerMeType = SwaggerMeType;


/***/ }),

/***/ "./apps/auth-microservice/static/swagger/types/auth/swagger-new-password-type.ts":
/*!***************************************************************************************!*\
  !*** ./apps/auth-microservice/static/swagger/types/auth/swagger-new-password-type.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerNewPasswordType = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const SwaggerNewPasswordType = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'Create new password' }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: "User's password changed successfully"
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input data'
    }));
};
exports.SwaggerNewPasswordType = SwaggerNewPasswordType;


/***/ }),

/***/ "./apps/auth-microservice/static/swagger/types/auth/swagger-new-tokens-type.ts":
/*!*************************************************************************************!*\
  !*** ./apps/auth-microservice/static/swagger/types/auth/swagger-new-tokens-type.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerNewTokensType = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const SwaggerNewTokensType = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'Get new tokens by refresh' }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Operation gone successfully. Returns accessToken in body and refreshToken in cookies'
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'JWT Refresh tokens is not valid, expired or missing'
    }));
};
exports.SwaggerNewTokensType = SwaggerNewTokensType;


/***/ }),

/***/ "./apps/auth-microservice/static/swagger/types/auth/swagger-password-recovery-type.ts":
/*!********************************************************************************************!*\
  !*** ./apps/auth-microservice/static/swagger/types/auth/swagger-password-recovery-type.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerPasswordRecoveryType = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const SwaggerPasswordRecoveryType = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'Password recovery command' }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: "Operation gone successfully. Sent an confirmation link to user's email"
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input data'
    }));
};
exports.SwaggerPasswordRecoveryType = SwaggerPasswordRecoveryType;


/***/ }),

/***/ "./apps/auth-microservice/static/templates/email-confirm-html.template.ts":
/*!********************************************************************************!*\
  !*** ./apps/auth-microservice/static/templates/email-confirm-html.template.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.emailConfirmHTML = void 0;
const emailConfirmHTML = ({ HOST, code }) => `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 20px;">

    <table align="center" bgcolor="#ffffff" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <h1 style="color: #333; font-size: 24px;">Email Confirmation</h1>
                <p style="color: #666; font-size: 16px; margin-top: 20px;">Thank you for signing up! Please click the button below to confirm your email address:</p>
                <a href="${HOST}/api/auth/registration-confirmation?code=${code}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px; font-size: 18px; margin-top: 20px;">Confirm Email</a>
                <p>For further assistance, please contact our support team at <a href="mailto:jihnordraven@gmail.com">jihnordraven@gmail.com</a></p>
            </td>
        </tr>
    </table>

</body>
</html>
`;
exports.emailConfirmHTML = emailConfirmHTML;


/***/ }),

/***/ "./apps/auth-microservice/static/templates/hello-page-html.template.ts":
/*!*****************************************************************************!*\
  !*** ./apps/auth-microservice/static/templates/hello-page-html.template.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HelloPageHTML = void 0;
const HelloPageHTML = ({ HOST }) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Instagram Project</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f0f0f0;
                display: flex;
                flex-direction: column;
                min-height: 100vh; /* Это для футера */
            }
    
            header {
                background-color: #3897f0;
                color: white;
                padding: 10px 10px;
                text-align: center;
                height: 50px;
            }
    
            .header-content {
                align-items: center;
                display: flex;
                justify-content: space-between;
                width: 80%;
                margin: 0 auto;
            }
    
            main {
                display: flex;
                justify-content: center;
                margin-top: 20px;
                flex-grow: 1; /* Это для растяжения контента */
            }
    
            .main-content {
                display: flex;
                justify-content: space-between;
                width: 80%;
            }
    
            .left-section {
                flex-basis: 65%; /* Уменьшаем ширину */
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
    
            .right-section {
                flex-basis: 30%; /* Уменьшаем ширину */
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
    
            .card {
                background-color: white;
                padding: 10px; /* Уменьшаем внутренний отступ */
                margin-bottom: 10px; /* Уменьшаем расстояние между карточками */
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                height: 150px; /* Устанавливаем высоту карточек */
                display: flex;
                flex-direction: column;
                gap: 10px;
                position: relative; /* Для скелетон-анимации */
            }

            .card-header {
                display: flex;
                justify-content: space-between;
            }

            .card-description {
                color: gray;
            }
    
            .card.empty {
                background-color: #eee; /* Серый цвет для пустых карточек */
            }
    
            .card h2 {
                margin-bottom: 5px; /* Уменьшаем отступ */
            }
    
            .card button {
                background-color: green;
                color: white;
                font-size: 18px;
                border: none;
                padding: 10px 10px; /* Уменьшаем внутренний отступ */
                cursor: pointer;
                height: max-content;
                border-radius: 5px;
                transition: 0.1s;
            }

            .card button:hover {
                background-color: #41A421;
            }

            /* Скелетон-анимация для пустых карточек */
            .card.empty::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: shimmer 2s infinite; /* Увеличиваем продолжительность до 2 секунд */
            }

            @keyframes shimmer {
                0% {
                    background-position: -200% 0;
                }
                100% {
                    background-position: 200% 0;
                }
            }

            .developer-card {
                background-color: white;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                padding: 10px;
                border-radius: 5px;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
    
            .developer-card h3 {
                margin: 0;
            }
    
            .developer-card p {
                margin: 0;
                color: gray;
            }

            .swagger-link {
                text-decoration: none;
                color: white;
            }
    
            footer {
                background-color: #333; /* Темно-серый цвет */
                color: white;
                text-align: center;
                height: 45px;
            }
        </style>
    </head>
    <body>
        <header>
            <div class="header-content">
                <div class="logo">
                    <h1>Instagram</h1>
                </div>
                <p>Server works with status 200</p>
            </div>
        </header>
        <main>
            <div class="main-content">
                <div class="left-section">
                    <div class="card">
                        <div class="card-header">
                            <h2>Auth-microservice</h2>
                            <button>
                                <a class="swagger-link" href="${HOST}/api/swagger/auth">Swagger API</a>
                            </button>
                        </div>
                        <p class="card-description">RESTful API for Authentication / User handling / Session handling</p>
                    </div>
                    <div class="card empty"></div>
                    <div class="card empty"></div>
                    <div class="card empty"></div>
                </div>
                <div class="right-section">
                <div class="developer-card">
                    <h3>Anton Deulia</h3>
                    <p>Email: jihnordraven@gmail.com</p>
                </div>
                <div class="developer-card">
                    <h3>Semen Laphonov</h3>
                    <p>Email: semen@gmail.com</p>
                </div>
            </div>
            </div>
        </main>
        <footer>
            <p>&copy; 2023 Instagram Project</p>
        </footer>
    </body>
    </html>
    `;
};
exports.HelloPageHTML = HelloPageHTML;


/***/ }),

/***/ "./apps/auth-microservice/static/templates/index.ts":
/*!**********************************************************!*\
  !*** ./apps/auth-microservice/static/templates/index.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./email-confirm-html.template */ "./apps/auth-microservice/static/templates/email-confirm-html.template.ts"), exports);
__exportStar(__webpack_require__(/*! ./password-recovery-html.template */ "./apps/auth-microservice/static/templates/password-recovery-html.template.ts"), exports);
__exportStar(__webpack_require__(/*! ./hello-page-html.template */ "./apps/auth-microservice/static/templates/hello-page-html.template.ts"), exports);


/***/ }),

/***/ "./apps/auth-microservice/static/templates/password-recovery-html.template.ts":
/*!************************************************************************************!*\
  !*** ./apps/auth-microservice/static/templates/password-recovery-html.template.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.passwordRecoveryHTML = void 0;
const passwordRecoveryHTML = ({ HOST, code }) => `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password recovery</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 20px;">

    <table align="center" bgcolor="#ffffff" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <h1 style="color: #333; font-size: 24px;">Password recovery</h1>
                <p style="color: #666; font-size: 16px; margin-top: 20px;">Please click the button below to recovery your password:</p>
                <a href="${HOST}/api/auth/password-recovery?code=${code}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px; font-size: 18px; margin-top: 20px;">Recovery password</a>
                <p>For further assistance, please contact our support team at <a href="mailto:jihnordraven@gmail.com">jihnordraven@gmail.com</a></p>
            </td>
        </tr>
    </table>

</body>
</html>
`;
exports.passwordRecoveryHTML = passwordRecoveryHTML;


/***/ }),

/***/ "./apps/auth-microservice/utils/decorators/cookie.decorator.ts":
/*!*********************************************************************!*\
  !*** ./apps/auth-microservice/utils/decorators/cookie.decorator.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cookie = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.Cookie = (0, common_1.createParamDecorator)((key, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return key ? req.cookies[key] : req.cookies;
});


/***/ }),

/***/ "./apps/auth-microservice/utils/decorators/index.ts":
/*!**********************************************************!*\
  !*** ./apps/auth-microservice/utils/decorators/index.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./local-auth-payload.decorator */ "./apps/auth-microservice/utils/decorators/local-auth-payload.decorator.ts"), exports);
__exportStar(__webpack_require__(/*! ./user-agent.decorator */ "./apps/auth-microservice/utils/decorators/user-agent.decorator.ts"), exports);
__exportStar(__webpack_require__(/*! ./jwt-access-payload.decorator */ "./apps/auth-microservice/utils/decorators/jwt-access-payload.decorator.ts"), exports);
__exportStar(__webpack_require__(/*! ./jwt-refresh-payload.decorator */ "./apps/auth-microservice/utils/decorators/jwt-refresh-payload.decorator.ts"), exports);
__exportStar(__webpack_require__(/*! ./cookie.decorator */ "./apps/auth-microservice/utils/decorators/cookie.decorator.ts"), exports);
__exportStar(__webpack_require__(/*! ./public.decorator */ "./apps/auth-microservice/utils/decorators/public.decorator.ts"), exports);


/***/ }),

/***/ "./apps/auth-microservice/utils/decorators/jwt-access-payload.decorator.ts":
/*!*********************************************************************************!*\
  !*** ./apps/auth-microservice/utils/decorators/jwt-access-payload.decorator.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAccessPayloadDecorator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.JwtAccessPayloadDecorator = (0, common_1.createParamDecorator)((key, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return key ? req.user[key] : req.user;
});


/***/ }),

/***/ "./apps/auth-microservice/utils/decorators/jwt-refresh-payload.decorator.ts":
/*!**********************************************************************************!*\
  !*** ./apps/auth-microservice/utils/decorators/jwt-refresh-payload.decorator.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtRefreshPayloadDecorator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.JwtRefreshPayloadDecorator = (0, common_1.createParamDecorator)((key, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return key ? req.user[key] : req.user;
});


/***/ }),

/***/ "./apps/auth-microservice/utils/decorators/local-auth-payload.decorator.ts":
/*!*********************************************************************************!*\
  !*** ./apps/auth-microservice/utils/decorators/local-auth-payload.decorator.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthPayload = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.LocalAuthPayload = (0, common_1.createParamDecorator)((key, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return key ? req.user[key] : req.user;
});


/***/ }),

/***/ "./apps/auth-microservice/utils/decorators/public.decorator.ts":
/*!*********************************************************************!*\
  !*** ./apps/auth-microservice/utils/decorators/public.decorator.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),

/***/ "./apps/auth-microservice/utils/decorators/user-agent.decorator.ts":
/*!*************************************************************************!*\
  !*** ./apps/auth-microservice/utils/decorators/user-agent.decorator.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserAgent = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.UserAgent = (0, common_1.createParamDecorator)((_, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return req.headers['user-agent'];
});


/***/ }),

/***/ "./apps/auth-microservice/utils/enums/index.ts":
/*!*****************************************************!*\
  !*** ./apps/auth-microservice/utils/enums/index.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./node.enums */ "./apps/auth-microservice/utils/enums/node.enums.ts"), exports);
__exportStar(__webpack_require__(/*! ./jwt.enums */ "./apps/auth-microservice/utils/enums/jwt.enums.ts"), exports);


/***/ }),

/***/ "./apps/auth-microservice/utils/enums/jwt.enums.ts":
/*!*********************************************************!*\
  !*** ./apps/auth-microservice/utils/enums/jwt.enums.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokensEnum = void 0;
var TokensEnum;
(function (TokensEnum) {
    TokensEnum["ACCESS_TOKEN"] = "accessToken";
    TokensEnum["REFRESH_TOKEN"] = "refreshToken";
})(TokensEnum = exports.TokensEnum || (exports.TokensEnum = {}));


/***/ }),

/***/ "./apps/auth-microservice/utils/enums/node.enums.ts":
/*!**********************************************************!*\
  !*** ./apps/auth-microservice/utils/enums/node.enums.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatusEnum = void 0;
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["DEVELOPMENT"] = "development";
    StatusEnum["STAGING"] = "staging";
    StatusEnum["PRODUCTION"] = "production";
})(StatusEnum = exports.StatusEnum || (exports.StatusEnum = {}));


/***/ }),

/***/ "./apps/auth-microservice/utils/error-handlers/http-exception.filter.ts":
/*!******************************************************************************!*\
  !*** ./apps/auth-microservice/utils/error-handlers/http-exception.filter.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        if (status === 400) {
            let errorResponses = {
                errorsMessages: []
            };
            const responseBody = exception.getResponse();
            responseBody.message.forEach((item) => errorResponses.errorsMessages.push(item));
            return response.status(status).json(errorResponses);
        }
        else {
            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url
            });
        }
    }
};
HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;


/***/ }),

/***/ "./apps/auth-microservice/utils/error-handlers/index.ts":
/*!**************************************************************!*\
  !*** ./apps/auth-microservice/utils/error-handlers/index.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./validate-pipe.options */ "./apps/auth-microservice/utils/error-handlers/validate-pipe.options.ts"), exports);
__exportStar(__webpack_require__(/*! ./http-exception.filter */ "./apps/auth-microservice/utils/error-handlers/http-exception.filter.ts"), exports);


/***/ }),

/***/ "./apps/auth-microservice/utils/error-handlers/validate-pipe.options.ts":
/*!******************************************************************************!*\
  !*** ./apps/auth-microservice/utils/error-handlers/validate-pipe.options.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validatePipeOptions = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.validatePipeOptions = {
    transform: true,
    stopAtFirstError: true,
    exceptionFactory: (errors) => {
        const errorsForResponse = [];
        errors.forEach((err) => {
            const constrainedKeys = Object.keys(err.constraints);
            constrainedKeys.forEach((ckey) => {
                errorsForResponse.push({
                    message: err.constraints[ckey],
                    field: err.property
                });
            });
        });
        throw new common_1.BadRequestException(errorsForResponse);
    }
};


/***/ }),

/***/ "./apps/auth-microservice/utils/patterns/index.ts":
/*!********************************************************!*\
  !*** ./apps/auth-microservice/utils/patterns/index.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./validation.patterns */ "./apps/auth-microservice/utils/patterns/validation.patterns.ts"), exports);


/***/ }),

/***/ "./apps/auth-microservice/utils/patterns/validation.patterns.ts":
/*!**********************************************************************!*\
  !*** ./apps/auth-microservice/utils/patterns/validation.patterns.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NamePattern = exports.LoginPattern = exports.EmailPattern = exports.PasswordPattern = void 0;
const PasswordPattern = () => /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\\/])[A-Za-z0-9!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\\/]+$/;
exports.PasswordPattern = PasswordPattern;
const EmailPattern = () => /^[A-Za-z\d+_.-]+@([\w-]+.)+[A-Za-z]{2,}(?:[\w-]+)*$/;
exports.EmailPattern = EmailPattern;
const LoginPattern = () => /^[a-zA-Z0-9_-]*$/;
exports.LoginPattern = LoginPattern;
const NamePattern = () => /^[A-Za-zА-Яа-я]*$/;
exports.NamePattern = NamePattern;


/***/ }),

/***/ "./apps/auth-microservice/utils/validations/index.ts":
/*!***********************************************************!*\
  !*** ./apps/auth-microservice/utils/validations/index.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./trim.validate */ "./apps/auth-microservice/utils/validations/trim.validate.ts"), exports);


/***/ }),

/***/ "./apps/auth-microservice/utils/validations/trim.validate.ts":
/*!*******************************************************************!*\
  !*** ./apps/auth-microservice/utils/validations/trim.validate.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TrimValidate = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const TrimValidate = () => {
    return (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.trim() : value));
};
exports.TrimValidate = TrimValidate;


/***/ }),

/***/ "./libs/common/src/aws/constants/index.ts":
/*!************************************************!*\
  !*** ./libs/common/src/aws/constants/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.aws_base_url = void 0;
exports.aws_base_url = 'https://flying-merch-bucket.s3.eu-central-1.amazonaws.com';


/***/ }),

/***/ "./libs/common/src/config/index.ts":
/*!*****************************************!*\
  !*** ./libs/common/src/config/index.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CONFIG = void 0;
const process_1 = __importDefault(__webpack_require__(/*! process */ "process"));
exports.CONFIG = {
    PORT: process_1.default.env.PORT,
    HOST: process_1.default.env.HOST,
    MODE: process_1.default.env.MODE,
    FRONTEND_HOST: process_1.default.env.FRONTEND_HOST,
    NODEMAILER_SERVICE: process_1.default.env.NODEMAILER_SERVICE,
    NODEMAILER_USER: process_1.default.env.NODEMAILER_USER,
    NODEMAILER_PASS: process_1.default.env.NODEMAILER_PASS,
    JWT_ACCESS_SECRET: process_1.default.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES: process_1.default.env.JWT_ACCESS_EXPIRES,
    JWT_REFRESH_SECRET: process_1.default.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES: process_1.default.env.JWT_REFRESH_EXPIRES,
    GOOGLE_CLIENT_ID: process_1.default.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process_1.default.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_SECRET: process_1.default.env.GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process_1.default.env.GITHUB_CLIENT_ID,
    REDIS_PASSWORD: process_1.default.env.REDIS_PASSWORD,
    REDIS_HOST: process_1.default.env.REDIS_HOST,
    REDIS_PORT: process_1.default.env.REDIS_PORT,
    AWS_S3_REGION: process_1.default.env.AWS_S3_REGION,
    AWS_S3_BUCKET: process_1.default.env.AWS_S3_BUCKET,
    RMQ_HOST_URL: process_1.default.env.RMQ_HOST_URL
};


/***/ }),

/***/ "./libs/common/src/rmq/rmq.module.ts":
/*!*******************************************!*\
  !*** ./libs/common/src/rmq/rmq.module.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RmqModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rmq_service_1 = __webpack_require__(/*! ./rmq.service */ "./libs/common/src/rmq/rmq.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const config_1 = __webpack_require__(/*! ../config */ "./libs/common/src/config/index.ts");
let RmqModule = RmqModule_1 = class RmqModule {
    static register({ name }) {
        return {
            module: RmqModule_1,
            imports: [
                microservices_1.ClientsModule.registerAsync([
                    {
                        name,
                        useFactory: () => ({
                            transport: microservices_1.Transport.RMQ,
                            options: {
                                urls: [config_1.CONFIG.RMQ_HOST_URL],
                                queue: name
                            }
                        })
                    }
                ])
            ],
            exports: [microservices_1.ClientsModule]
        };
    }
};
RmqModule = RmqModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [rmq_service_1.RmqService],
        exports: [rmq_service_1.RmqService]
    })
], RmqModule);
exports.RmqModule = RmqModule;


/***/ }),

/***/ "./libs/common/src/rmq/rmq.service.ts":
/*!********************************************!*\
  !*** ./libs/common/src/rmq/rmq.service.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let RmqService = class RmqService {
    getOptions(data) {
        var _a;
        const url = process.env.RMQ_HOST_URL;
        return {
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [url],
                queue: data.queue,
                noAck: (_a = data.noAck) !== null && _a !== void 0 ? _a : false,
                persistent: true
            }
        };
    }
    ack(data) {
        const channel = data.context.getChannelRef();
        const originMessage = data.context.getMessage();
        channel.ack(originMessage);
    }
};
RmqService = __decorate([
    (0, common_1.Injectable)()
], RmqService);
exports.RmqService = RmqService;


/***/ }),

/***/ "@nestjs/cache-manager":
/*!****************************************!*\
  !*** external "@nestjs/cache-manager" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/cache-manager");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/cqrs":
/*!*******************************!*\
  !*** external "@nestjs/cqrs" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/cqrs");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/platform-express":
/*!*******************************************!*\
  !*** external "@nestjs/platform-express" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "@nestjs/schedule":
/*!***********************************!*\
  !*** external "@nestjs/schedule" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/throttler":
/*!************************************!*\
  !*** external "@nestjs/throttler" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "argon2":
/*!*************************!*\
  !*** external "argon2" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("argon2");

/***/ }),

/***/ "cache-manager":
/*!********************************!*\
  !*** external "cache-manager" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cache-manager");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "colorette":
/*!****************************!*\
  !*** external "colorette" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("colorette");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "date-fns":
/*!***************************!*\
  !*** external "date-fns" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("date-fns");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "node-schedule":
/*!********************************!*\
  !*** external "node-schedule" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("node-schedule");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ "passport-github2":
/*!***********************************!*\
  !*** external "passport-github2" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("passport-github2");

/***/ }),

/***/ "passport-google-oauth20":
/*!******************************************!*\
  !*** external "passport-google-oauth20" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("passport-google-oauth20");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("process");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/auth-microservice/src/main.ts");
/******/ 	
/******/ })()
;