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
  Header,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate } from 'uuid';
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
import { Album } from './entities/album.entity';

@ApiTags('Album')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
  })
  @ApiCreatedResponse({
    description: 'Album is created',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() albumDto: CreateAlbumDto) {
    if (!albumDto || !albumDto.name || !albumDto.year) {
      throw new BadRequestException('Invalid dto');
    }
    return this.albumsService.create(albumDto);
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Get albums list',
    description: 'Gets all library albums list',
  })
  @ApiOkResponse({
    description: 'The resources were returned successfully',
    type: [Album],
  })
  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Gets single album by id',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({
    description: 'The album was returned successfully',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, album "id" is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Album was not found',
    status: HttpStatus.NOT_FOUND,
  })
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

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({
    description: 'The album has been updated',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, album "id" is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
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

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album from library',
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
