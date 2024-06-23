import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as path from 'path';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	//comments

	it('/comments (GET)', () => {
		return request(app.getHttpServer()).get('/comments').expect(200).expect([]);
	});

	it('/comments (POST)', () => {
		return request(app.getHttpServer())
			.post('/comments')
			.send({
				text: 'Новвый коммент',
				changet_at: '2005-05-05 12:11:34',
			})
			.expect(201)
			.expect((res) => {
				expect(res.body).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						text: expect.any(String),
						changet_at: '2005-05-05 12:11:34',
					}),
				);
			});
	});

	it('/comments/:id === 1 (PATCH)', () => {
		return request(app.getHttpServer())
			.patch('/comments/1')
			.send({
				text: 'Новвый',
				changet_at: '2005-05-05 12:11:34',
			})
			.expect(200)
			.expect((res) => {
				expect(res.body).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						text: 'Новвый',
						changet_at: '2005-05-05 12:11:34',
					}),
				);
			});
	});

	it('/comments (GET)', () => {
		return request(app.getHttpServer())
			.get('/comments')
			.expect(200)
			.expect([
				{
					id: 1,
					text: 'Новвый',
					changet_at: '2005-05-05T08:11:34.000Z',
				},
			]);
	});

	it('/comments/:id === 1 (GET)', () => {
		return request(app.getHttpServer()).get('/comments/1').expect(200).expect({
			id: 1,
			text: 'Новвый',
			changet_at: '2005-05-05T08:11:34.000Z',
		});
	});

	it('/comments/:id === 1 (DELETE)', () => {
		return request(app.getHttpServer()).delete('/comments/1').expect(200);
	});

	it('/comments (GET)', () => {
		return request(app.getHttpServer()).get('/comments').expect(200).expect([]);
	});

	// tasks

	it('/tasks (GET)', () => {
		return request(app.getHttpServer()).get('/tasks').expect(200).expect([]);
	});

	it('/tasks (POST)', () => {
		return request(app.getHttpServer())
			.post('/tasks')
			.send({
				text_task: 'Новвый tasks',
				changet_at: '2005-05-05 12:11:34',
			})
			.expect(201)
			.expect((res) => {
				expect(res.body).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						text_task: expect.any(String),
						changet_at: '2005-05-05 12:11:34',
					}),
				);
			});
	});

	it('/tasks (GET)', () => {
		return request(app.getHttpServer())
			.get('/tasks')
			.expect(200)
			.expect([
				{
					id: 1,
					text_task: 'Новвый tasks',
					changet_at: '2005-05-05T08:11:34.000Z',
				},
			]);
	});

	it('/tasks/:id === 1 (GET)', () => {
		return request(app.getHttpServer()).get('/tasks/1').expect(200).expect({
			id: 1,
			text_task: 'Новвый tasks',
			changet_at: '2005-05-05T08:11:34.000Z',
		});
	});

	it('/tasks/:id === 1 (DELETE)', () => {
		return request(app.getHttpServer()).delete('/tasks/1').expect(200);
	});

	it('/tasks (GET)', () => {
		return request(app.getHttpServer()).get('/tasks').expect(200).expect([]);
	});

	//users

	it('/auth/register (POST)', () => {
		return request(app.getHttpServer())
			.post('/auth/register')
			.send({
				changet_at: '2005-05-05 12:11:34',
				firstName: 'oleg2',
				lastName: 'oleg2',
				email: '122337@mail.ru',
				password: '1234567',
			})
			.expect(201)
			.expect((res) => {
				expect(res.body).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						changet_at: '2005-05-05 12:11:34',
						firstName: 'oleg2',
						lastName: 'oleg2',
						email: '122337@mail.ru',
						password: expect.any(String),
					}),
				);
			});
	});

	it('/auth/login (POST)', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({
				email: '122337@mail.ru',
				password: '1234567',
			})
			.expect(201)
			.expect((res) => {
				expect(res.body).toEqual(
					expect.objectContaining({
						access_token: expect.any(String),
					}),
				);
			});
	});

	it('/users/:id === 1 (PATCH)', () => {
		return request(app.getHttpServer())
			.patch('/users/1')
			.send({ first_name: 'Oleg33' })
			.expect(200)
			.expect((res) => {
				expect(res.body).toEqual(
					expect.objectContaining({
						id: 1,
						first_name: 'Oleg33',
					}),
				);
			});
	});

	it('/users/:id === 1 (DELETE)', () => {
		return request(app.getHttpServer()).delete('/users/1').expect(200);
	});

	//file

	it('/file/upload (POST)', () => {
		return request(app.getHttpServer())
			.post('/file/upload')
			.attach('file', path.join(__dirname, 'file.txt'))
			.expect(201)
			.expect((res) => {
				expect(res.body).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						filename: expect.any(String),
						mimetype: expect.any(String),
						data: expect.objectContaining({
							type: 'Buffer',
							data: expect.any(Array),
						}),
					}),
				);
			});
	});

	afterAll((done) => {
		app.close();
		done();
	});
});
