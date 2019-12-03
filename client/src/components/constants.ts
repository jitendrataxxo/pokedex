export const query = `query allPokemons($name: String) {
    allPokemons(first: 100, name_Icontains: $name) {
      edges{
        node{
          id,
          name,
          weakness,
          threatType,
          abilities,
          ThumbnailImage,
          ThumbnailAltText,
          isChecked
        }
      }
    }
  }`;

export const CATEGORY_QUERY = `query allCategories($name: String) {
    allCategories(first: 100, name_Icontains: $name) {
      edges{
        node{
          id,
          name
        }
      }
    }
  }`;

export const CATEGORY = `query category($id: ID!) {
  category(id: $id) {
  id
  name
  pokemones{
    edges {
      node{
        id,
        name,
        weakness,
        threatType,
        abilities,
        ThumbnailImage,
        ThumbnailAltText,
        isChecked
      }
    }
  }
}
}`;

export interface Category {
	isNewCAtegory: boolean;
	value: string;
}

export const CATEGORY_DATA: Category = {
	isNewCAtegory: true,
	value: '',
};

export interface TabList {
	key: string | number;
	tab: string;
}
