// import { Role } from '@common/role';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
export enum Gender {
    unknown,
    mam,
    woman,
}
/**
 * 用户表
 */
@Entity()
export class UserEntity {
    /**
     * id
     */
    @PrimaryGeneratedColumn()
    id: number;
    /**
     * 用户名
     */
    @Index({ unique: true })
    @Column({ unique: true })
    username: string;
    /**
     * 密码
     */
    @Column()
    password: string;
    /**
     * 手机号
     */

    @Column({ default: '' })
    phone: string;
    /**
     * 头像
     */
    @Column({ default: '' })
    avatar: string;
    /**
     * 昵称
     */
    @Column({ default: '' })
    nickname: string;
    /**
     * 签名
     */
    @Column({ default: '' })
    desc: string;
    /**
     * 创建时间
     */
    @CreateDateColumn()
    createdAt: Date;
    /**
     * 修改时间
     */
    @UpdateDateColumn()
    updatedAt: Date;
    /**
     * 性别
     */
    @Column({
        default: Gender.unknown,
    })
    gender: Gender;
    // /**
    //  * 角色
    //  */
    // @Column('int', {
    //     default: [Role.User],
    //     array: true,
    // })
    // roles: Role[];
}