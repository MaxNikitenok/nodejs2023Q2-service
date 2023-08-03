import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
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
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { Track } from './entities/track.entity';

@ApiTags('Track')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Add new track',
    description: 'Add new track information',
  })
  @ApiCreatedResponse({
    description: 'Created track successfully',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() trackDto: CreateTrackDto) {
    if (!trackDto || !trackDto.name || !trackDto.duration) {
      throw new BadRequestException('Invalid dto');
    }
    return this.tracksService.create(trackDto);
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Get tracks list',
    description: 'Gets all library tracks list',
  })
  @ApiOkResponse({
    description: 'The tracks were returned successfully',
    type: [Track],
  })
  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Get single track by id',
    description: 'Gets single track by id',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({
    description: 'The track was returned successfully',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, track "id" is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Track was not found',
  })
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

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Update track information',
    description: 'Update library track information by UUID',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({
    description: 'The track has been updated',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, track "id" is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found' })
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

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Delete track',
    description: 'Delete track from library',
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
