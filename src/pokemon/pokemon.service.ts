import { Injectable } from '@nestjs/common';
import { GetPokemonResponse } from './dto/get-pokemon.dto';
import { Pokemon, Ability } from './entities';
import { HttpRequest } from '../utils';

@Injectable()
export class PokemonService {
  constructor(private readonly httpRequest: HttpRequest) {}

  async findOne(id: string): Promise<GetPokemonResponse> {
    const result = await this.httpRequest.request<Pokemon>(`pokemon/${id}`);

    const abilities = await this.getAbilities(result.moves);

    return {
      name: result.name,
      image: result.sprites.front_default,
      abilities: abilities.map((ability) => ({
        name: ability.name,
        power: ability.power,
      })),
      types: result.types.map(({ type }) => ({
        name: type.name,
      })),
    };
  }

  private async getAbilities(abilities: Pokemon['moves']): Promise<Ability[]> {
    const promises = abilities.map((ability) => {
      const regex = /move\/(\d+)/;
      const abilityId = ability.move.url.match(regex)?.[1];
      return this.httpRequest.request<Ability>(`move/${abilityId}`);
    });
    return Promise.all(promises);
  }
}
