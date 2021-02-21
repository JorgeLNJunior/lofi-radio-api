export type ArtistQuery = {
  limit: number | undefined;
  name: string | undefined;
  uuid: string | undefined;
};

export type SongQuery = {
  limit: number | undefined;
  title: string | undefined;
  uuid: string | undefined;
};

export type PlaylistQuery = {
  limit: number | undefined;
  title: string | undefined;
  uuid: string | undefined;
};
