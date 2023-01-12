import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum RevieweeType {
  PRODUCT = 'product',
  USER = 'user',
}

@Entity()
class Feedback {
  @ObjectIdColumn()
  public id: number;

  @Column()
  public review: string;

  @Column()
  public rating: string;

  @Column({
    type: 'enum',
    enum: RevieweeType,
  })
  reviewOf: RevieweeType;

  @Column()
  public reviewOfId: string;

  @Column()
  public revieweeId: string;

  @CreateDateColumn({ nullable: true })
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  public updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
export default Feedback;
