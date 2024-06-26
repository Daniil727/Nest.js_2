import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('Заголовок')
		.setDescription('Описание API ')
		.setVersion('1.0')
		.addBearerAuth()
		.addTag('')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}
bootstrap();
