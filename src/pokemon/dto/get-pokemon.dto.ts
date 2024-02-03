export class GetPokemonResponse {
  abilities: {
    name: string;
    power: number;
  }[];
  name: string;
  image: string;
  types: {
    name: string;
  }[];
}
