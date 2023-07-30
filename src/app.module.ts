import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [UsersModule, ArtistsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
