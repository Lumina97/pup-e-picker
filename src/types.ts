// Add your own custom types in here
export type DogType = {
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
  id: number;
};

export type TActiveTab = "all" | "favorite" | "unFavorite" | "createDog";
