import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Artist } from './artist.entity';

@Entity()
export class Song {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  title: string;

  @Column({ name: 'song_url', nullable: true })
  songUrl: string;

  @Column({ name: 'cover_url', nullable: true })
  coverurl: string;

  @ManyToMany(() => Artist, (artist) => artist.songs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  artists: Artist[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
