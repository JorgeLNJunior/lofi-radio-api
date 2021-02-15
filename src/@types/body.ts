export type ArtistBody = {
  name?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  soundcloudUrl?: string;
};

export type SongBody = {
  title?: string;
  artistsUuids?: string[];
};
