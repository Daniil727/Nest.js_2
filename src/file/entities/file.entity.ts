import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	filename: string;

	@Column()
	mimetype: string;

	@Column('mediumblob')
	data: Buffer;
}
