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

@Entity({ name: 'artist' })
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column({ name: 'spotify_url', nullable: true })
  spotifyUrl: string;

  @Column({ name: 'youtube_url', nullable: true })
  youtubeUrl: string;

  @Column({ name: 'soundcloud_url', nullable: true })
  soundcloudUrl: string;

  @Column({ name: 'photo_url', nullable: true })
  photoUrl: string;

  @ManyToMany(() => Song, (song) => song.artists, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'artist_songs',
    joinColumn: { name: 'artist_uuid', referencedColumnName: 'uuid' },
    inverseJoinColumn: { name: 'song_uuid', referencedColumnName: 'uuid' },
  })
  songs: Song[];

  @Column({ name: 'is_hidden', default: true })
  isHidden: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
