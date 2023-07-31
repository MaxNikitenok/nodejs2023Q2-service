import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuid4 } from 'uuid';
import { Artist } from './entities/artist.entity';
import { Database } from 'src/db/db';

@Injectable()
export class ArtistsService {
  create(artistDto: CreateArtistDto): Artist {
    const newArtist = {
      ...artistDto,
      id: uuid4(),
    };
    Database.artists.push(newArtist);
    return newArtist;
  }

  findAll(): Artist[] {
    return Database.artists;
  }

  findOne(id: string): Artist | undefined {
    return Database.artists.find((artist) => artist.id === id);
  }

  update(id: string, artistDto: UpdateArtistDto): Artist {
    Database.artists = Database.artists.map((artist) => {
      if (artist.id === id) {
        if (artistDto.name) {
          artist.name = artistDto.name;
        }
        if (typeof artistDto.grammy === 'boolean') {
          artist.grammy = artistDto.grammy;
        }
      }
      return artist;
    });
    return Database.artists.find((user) => user.id === id);
  }

  delete(id: string) {
    Database.artists = Database.artists.filter((artist) => artist.id !== id);
    Database.tracks = Database.tracks.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track;
    });
    Database.albums = Database.albums.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track;
    });
  }
}
