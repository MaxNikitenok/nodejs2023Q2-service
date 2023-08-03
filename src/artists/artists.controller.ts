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
  Header,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validate } from 'uuid';
import { isBoolean, isString } from 'class-validator';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';

@ApiTags('Artist')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Add new artist',
    description: 'Add new artist information',
  })
  @ApiCreatedResponse({
    description: 'Created artist successfully',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
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

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Get all artists',
    description: 'Gets all artists',
  })
  @ApiOkResponse({
    description: 'The artists were returned successfully',
    type: [Artist],
  })
  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Get single artist by id',
    description: 'Get single artist by id',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({
    description: 'The artist was returned successfully',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, artist "id" is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Artist was not found',
    status: HttpStatus.NOT_FOUND,
  })
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

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Update artist information',
    description: 'Update artist information by UUID',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({
    description: 'The artist has been updated',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, artist "id" is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
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

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Delete artist',
    description: 'Delete artist from library',
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
