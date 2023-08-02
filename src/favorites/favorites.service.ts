import { Inject, Injectable } from '@nestjs/common';
import { Database } from 'src/db/db';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class FavoritesService {
  @Inject(ArtistsService)
  private artistsService: ArtistsService;
  @Inject(AlbumsService)
  private albumsService: AlbumsService;
  @Inject(TracksService)
  private tracksService: TracksService;

  findAll() {
    const artists = Database.favorites.artists.map((artist) =>
      this.artistsService.findOne(artist),
    );

    const albums = Database.favorites.albums.map((album) =>
      this.albumsService.findOne(album),
    );

    const tracks = Database.favorites.tracks.map((track) =>
      this.tracksService.findOne(track),
    );
    return { artists, albums, tracks };
  }

  addArtist(id: string) {
    const artist = this.artistsService.findOne(id);
    if (artist) {
      Database.favorites.artists.push(id);
      return artist.id;
    }
  }

  removeArtist(id: string) {
    Database.favorites.artists = Database.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
    return 'Artist removed from favorites';
  }

  addAlbum(id: string) {
    const album = this.albumsService.findOne(id);
    if (album) {
      Database.favorites.albums.push(id);
      return album.id;
    }
  }

  removeAlbum(id: string) {
    Database.favorites.albums = Database.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
    return 'Album removed from favorites';
  }

  addTrack(id: string) {
    const track = this.tracksService.findOne(id);
    if (track) {
      Database.favorites.tracks.push(id);
      return track.id;
    }
  }

  removeTrack(id: string) {
    Database.favorites.tracks = Database.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
    return 'Track removed from favorites';
  }
}
