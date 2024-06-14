import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  brand: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  model: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 1000,
  })
  description: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 500,
  })
  image: string;

  @Column({
    nullable: false,
    type: 'int',
  })
  price: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  capacity: number;

  @Column({ type: 'json' })
  colors: any;

  @Column({
    type: 'boolean',
    default: false,
  })
  quickShifter: boolean;

  @Column({ type: 'simple-array' })
  tires: string[];
}
