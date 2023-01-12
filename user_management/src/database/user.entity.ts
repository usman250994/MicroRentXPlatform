import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column({ nullable: true })
  public name: string;

  @Column()
  public number: number;

  @Column({ nullable: true })
  public picture: string;

  @Column({ nullable: true, default: '3' })
  public rating: string;

  @Column({ nullable: true })
  public address: string;

  @CreateDateColumn({ nullable: true })
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  public updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

export default User;
