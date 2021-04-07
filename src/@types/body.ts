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

export type SongUpdateBody = {
  title?: string;
};

export type PlaylistBody = {
  title?: string;
  originalUrl?: string;
  songsUuids?: string[];
};

export type PlaylistUpdateBody = {
  title?: string;
  originalUrl?: string;
};
