import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate } from 'uuid';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() albumDto: CreateAlbumDto) {
    if (!albumDto || !albumDto.name || !albumDto.year) {
      throw new BadRequestException('Invalid dto');
    }
    return this.albumsService.create(albumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid albumId');
    }
    const album = this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() albumDto: UpdateAlbumDto) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid albumId');
    }

    if (!albumDto || !albumDto.name || !albumDto.year) {
      throw new BadRequestException('Invalid dto');
    }

    const album = this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    if (
      typeof albumDto.name !== 'string' ||
      typeof albumDto.year !== 'number' ||
      typeof albumDto.artistId !== 'string'
    ) {
      throw new BadRequestException('Invalid dto');
    }

    return this.albumsService.update(id, albumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid albumId');
    }
    const album = this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }
    this.albumsService.delete(id);
  }
}
