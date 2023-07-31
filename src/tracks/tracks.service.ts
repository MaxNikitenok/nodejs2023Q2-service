import { Injectable } from '@nestjs/common';
import { Track } from './entities/track.entity';
import { Database } from 'src/db/db';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuid4 } from 'uuid';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  findAll(): Track[] {
    return Database.tracks;
  }

  findOne(id: string): Track | undefined {
    return Database.tracks.find((track) => track.id === id);
  }

  create(trackDto: CreateTrackDto): Track {
    const newTrack = {
      ...trackDto,
      id: uuid4(),
    };
    Database.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, trackDto: UpdateTrackDto): Track {
    Database.tracks = Database.tracks.map((track) => {
      if (track.id === id) {
        track = Object.assign(track, trackDto);
      }
      return track;
    });
    return Database.tracks.find((track) => track.id === id);
  }

  delete(id: string) {
    Database.tracks = Database.tracks.filter((track) => track.id !== id);
    Database.favorites.tracks = Database.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }
}
