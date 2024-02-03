export class Pokemon {
  moves: {
    move: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  name: string;
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };
  types: {
    type: {
      name: string;
      url: string;
    };
  }[];
}
