import { Injectable } from '@nestjs/common';
import { GetPokemonResponse } from './dto/get-pokemon.dto';
import { Pokemon, Ability } from './entities';

@Injectable()
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  private request<T>(path: string, init?: RequestInit) {
    return fetch(`${this.baseUrl}/${path}`, init).then((response) =>
      response.json(),
    ) as Promise<T>;
  }

  async findOne(id: string): Promise<GetPokemonResponse> {
    const result = await this.request<Pokemon>(`pokemon/${id}`);

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
      return this.request<Ability>(`move/${abilityId}`);
    });
    return Promise.all(promises);
  }
}
