import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from 'src/users/entities/user.entity';

export interface IDatabase {
  users: User[];
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  favorites: IFavorites;
}

export interface IFavorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}
