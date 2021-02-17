import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Song } from './song.entity';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: false })
  title: string;

  @Column({ name: 'original_url', nullable: true })
  originalUrl: string;

  @ManyToMany(() => Song, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinTable({
    name: 'playlist_songs',
    joinColumn: { name: 'playlist_uuid', referencedColumnName: 'uuid' },
    inverseJoinColumn: { name: 'song_uuid', referencedColumnName: 'uuid' },
  })
  songs: Song[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
