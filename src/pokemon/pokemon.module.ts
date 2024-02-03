import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { HttpRequest } from '../utils';

@Module({
  controllers: [PokemonController],
  providers: [
    PokemonService,
    {
      provide: HttpRequest,
      useValue: new HttpRequest('https://pokeapi.co/api/v2'),
    },
  ],
})
export class PokemonModule {}
