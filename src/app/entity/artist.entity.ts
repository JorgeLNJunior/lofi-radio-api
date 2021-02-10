import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  uuid: number;

  @Column()
  name: string;

  @Column({ name: 'spotify_url' })
  spotifyUrl: string;

  @Column({ name: 'youtube_url' })
  youtubeUrl: string;

  @Column({ name: 'soundcloud_url' })
  soundcloudUrl: string;

  @Column({ name: 'photo_url' })
  photoUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
