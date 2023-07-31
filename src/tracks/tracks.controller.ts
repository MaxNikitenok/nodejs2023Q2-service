import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { TracksService } from './tracks.service';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate } from 'uuid';
import { isNumber, isString } from 'class-validator';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() trackDto: CreateTrackDto) {
    console.log(trackDto);
    if (!trackDto || !trackDto.name || !trackDto.duration) {
      throw new BadRequestException('Invalid dto');
    }
    return this.tracksService.create(trackDto);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid trackId');
    }
    const track = this.tracksService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() trackDto: UpdateTrackDto) {
    if (!trackDto || !isString(trackDto.name) || !isNumber(trackDto.duration)) {
      throw new BadRequestException('Invalid dto');
    }
    if (!validate(id)) {
      throw new BadRequestException('Invalid trackId');
    }
    const track = this.tracksService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return this.tracksService.update(id, trackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid trackId');
    }
    const track = this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return this.tracksService.delete(id);
  }
}
