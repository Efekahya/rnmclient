import { ReactElement } from "react";

export interface ICharacter {
  name: string;
  id: number;
  gender: string;
  species: string;
  origin: { name: string; __typename: string };
  type: string;
  dimension: string;
  residents: [ICharacter];
  created: string;
}

export interface ICharacterListProps {
  characters: ICharacter[]; //TODO Characterler objesi gelince character tipi ile değiştirilecek
  count: number;
}

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: [ICharacter];
  created: string;
}

export interface IEpisodeCardProps {
  id: number;
  episode: string;
  date: string;
  title: string;
  description: string;
  favorited: boolean;
  handleSetFavorited: () => void;
}

export interface IAddFavoritesProps {
  themeClass: string;
  favorited: boolean;
  toggleFavorite: (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
  ) => void;
}

export interface ICharacterDetailCardProps {
  title: string;
  content: string;
}

export type FilterCharacter = {
  name: string;
};

export interface INavbarProps {
  Logo: ReactElement;
}

export interface ISearchBarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  classValue: string;
  onFocus: (focus: boolean) => void;
}

interface IDropdownItem {
  label: string;
  value: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface IDropdownProps {
  items: IDropdownItem[];
  selected: string;
}
