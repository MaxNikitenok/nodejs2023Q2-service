import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validate } from 'uuid';
import { isBoolean, isString } from 'class-validator';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() artistDto: CreateArtistDto) {
    if (
      !artistDto ||
      !isString(artistDto.name) ||
      !isBoolean(artistDto.grammy)
    ) {
      throw new BadRequestException('Invalid dto');
    }
    return this.artistsService.create(artistDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid artistId');
    }
    const artist = this.artistsService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() artistDto: UpdateArtistDto) {
    if (
      !artistDto ||
      !isString(artistDto.name) ||
      !isBoolean(artistDto.grammy)
    ) {
      throw new BadRequestException('Invalid dto');
    }
    if (!validate(id)) {
      throw new BadRequestException('Invalid artistId');
    }
    const artist = this.artistsService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return this.artistsService.update(id, artistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid artistId');
    }
    const artist = this.artistsService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    this.artistsService.delete(id);
  }
}
