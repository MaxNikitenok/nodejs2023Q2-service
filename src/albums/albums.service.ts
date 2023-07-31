import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuid4 } from 'uuid';
import { Database } from 'src/db/db';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  create(albumDto: CreateAlbumDto): Album {
    const newAlbum = {
      ...albumDto,
      id: uuid4(),
    };

    Database.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return Database.albums;
  }

  findOne(id: string) {
    const album = Database.albums.find((album) => album.id === id);

    return album;
  }

  update(id: string, albumDto: UpdateAlbumDto) {
    const album = Database.albums.find((album) => album.id === id);

    album.name = albumDto.name;
    album.year = albumDto.year;
    album.artistId = albumDto.artistId;

    return album;
  }

  delete(id: string) {
    Database.albums = Database.albums.filter((album) => album.id !== id);
    Database.tracks = Database.tracks.map((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
      return track;
    });
  }
}
