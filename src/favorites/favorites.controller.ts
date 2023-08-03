import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { validate } from 'uuid';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiParam,
  ApiUnprocessableEntityResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Favorites } from './entities/favorite.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Album } from 'src/albums/entities/album.entity';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorites artists, tracks and albums',
  })
  @ApiOkResponse({
    description: 'The favorites were returned successfully',
    type: Favorites,
  })
  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Header('Accept', 'string')
  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Add artist to the favorites',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiCreatedResponse({
    description: 'Added artist "id" to the favorites',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, artist "id" is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: "Artist with id doesn't exist",
  })
  @Post('artist/:id')
  addArtist(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid artistId');
    }
    const artist = this.favoritesService.addArtist(id);
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    return artist;
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Deleted artist successfully',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, artist "id" is invalid (not uuid)',
  })
  @Delete('artist/:id')
  removeArtist(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid artistId');
    }
    return this.favoritesService.removeArtist(id);
  }

  @Header('Accept', 'string')
  @ApiOperation({
    summary: 'Add track to the favorites',
    description: 'Add track to the favorites',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiCreatedResponse({
    description: 'Added track "id" to the favorites',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, track "id" is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: "Track with id doesn't exist",
  })
  @Post('track/:id')
  addTrack(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid trackId');
    }
    const track = this.favoritesService.addTrack(id);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    return track;
  }

  @Header('Accept', 'string')
  @ApiOperation({
    summary: 'Delete track from favorites',
    description: ' Delete track from favorites',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Deleted track successfully',
  })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, track "id" is invalid (not uuid)',
  })
  @Delete('track/:id')
  removeTrack(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid trackId');
    }
    return this.favoritesService.removeTrack(id);
  }

  @Header('Accept', 'string')
  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Add album to the favorites',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiCreatedResponse({
    description: 'Added album "id" to the favorites',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, album "id" is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: "Album with id doesn't exist",
  })
  @Post('album/:id')
  addAlbum(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid albumId');
    }
    const album = this.favoritesService.addAlbum(id);
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }
    return album;
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Deleted album successfully',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, album "id" is invalid (not uuid)',
  })
  @Delete('album/:id')
  removeAlbum(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid albumId');
    }
    return this.favoritesService.removeAlbum(id);
  }
}
