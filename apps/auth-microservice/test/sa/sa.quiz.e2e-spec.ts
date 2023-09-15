import request from 'supertest'
import cookieParser from 'cookie-parser'
// import { getAppAndCleanDB } from '../test-utils'
import { INestApplication } from '@nestjs/common'

const auth = 'Authorization'
const basic = 'Basic YWRtaW46cXdlcnR5'

//TESTING ROUTE
describe('start creating quiz question', () => {
	let app: INestApplication
	let server: any
	beforeAll(async () => {
		// app = await getAppAndCleanDB()
		app.use(cookieParser())
		await app.init()
		server = app.getHttpServer()
	})
	afterAll(async () => {
		app.close()
	})
	it('delete All Data, create question and get them all', async () => {
		await request(server).delete('/testing/all-data').set(auth, basic).expect(204)

		const createQuestionDTO: any = {
			body: 'question body01',
			correctAnswers: ['correct1']
		}

		const createQuestion2DTO: any = {
			body: 'question body 104061',
			correctAnswers: ['correct answer 1, correct answer 2']
		}

		const updateQuestion2DTO: any = {
			body: 'question body2281337',
			correctAnswers: ['correct answer 13332, correct answer 2']
		}

		const createdQuestion = await request(server)
			.post('/sa/quiz/questions')
			.set(auth, basic)
			.send(createQuestionDTO)
			.expect(201)

		expect(createdQuestion.body).toEqual({
			body: 'question body01',
			correctAnswers: ['correct1'],
			createdAt: expect.any(String),
			id: expect.any(String),
			published: false,
			updatedAt: null
		})

		const createdQuestion2 = await request(server)
			.post('/sa/quiz/questions')
			.set(auth, basic)
			.send(createQuestion2DTO)
			.expect(201)

		expect(createdQuestion2.body).toEqual({
			body: 'question body 104061',
			correctAnswers: ['correct answer 1, correct answer 2'],
			createdAt: expect.any(String),
			id: expect.any(String),
			published: false,
			updatedAt: null
		})

		const getAllQuestions = await request(server)
			.get('/sa/quiz/questions')
			.set(auth, basic)
			.expect(200)

		expect(getAllQuestions.body).toEqual({
			items: [
				{
					body: 'question body 104061',
					correctAnswers: ['correct answer 1, correct answer 2'],
					createdAt: expect.any(String),
					id: expect.any(String),
					published: false,
					updatedAt: null
				},
				{
					body: 'question body01',
					correctAnswers: ['correct1'],
					createdAt: expect.any(String),
					id: expect.any(String),
					published: false,
					updatedAt: null
				}
			],
			page: 1,
			pageSize: 10,
			pagesCount: 1,
			totalCount: 2
		})

		const questonToUpdate = getAllQuestions.body.items[0]

		await request(server)
			.put(`/sa/quiz/questions/io234634212hiadoipqhwe`)
			.set(auth, basic)
			.expect(404)

		const updateQuestion = await request(server)
			.put(`/sa/quiz/questions/${questonToUpdate.id}`)
			.set(auth, basic)
			.send(updateQuestion2DTO)
			.expect(204)

		/*const getQuestionById = await request(server)
            .get(`/sa/quiz/questions/${questonToUpdate.id}`)
            .set(auth, basic)
            .expect(200)

        expect(getQuestionById.body.body).toEqual(updateQuestion2DTO.body)
        expect(getQuestionById.body.correctAnswers).toEqual(updateQuestion2DTO.correctAnswers)*/

		await request(server)
			.delete(`/sa/quiz/questions/${questonToUpdate.id}`)
			.set(auth, basic)
			.expect(204)
	})

	it('testing od deleting all data // incorrect authorization // wrong Authorization field value', () => {
		request(server)
			.delete('/testing/all-data')
			.set(auth, 'ksdjfl;skdfjlkds')
			.expect(401)
	})

	it('testing od deleting all data // incorrect authorization // no Authorization field in header', () => {
		request(server)
			.delete('/testing/all-data')
			.set('lkdhjflksdfhkldsjhf', basic)
			.expect(401)
	})
})
