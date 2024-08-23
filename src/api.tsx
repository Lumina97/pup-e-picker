export const baseUrl = "http://localhost:3000";
import { DogType } from "./types";

export const Requests = {
  getAllDogs: (): Promise<DogType[]> => fetch(baseUrl + "/dogs").then((response) => response.json()),

  postDog: (dog: Omit<DogType, "id">): Promise<DogType[]> =>
    fetch(`${baseUrl}/dogs`, {
      body: JSON.stringify(dog),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json()),

  deleteDog: (id: number) =>
    fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json()),

  updateDog: (dog: DogType): Promise<DogType[]> =>
    fetch(`${baseUrl}/dogs/${dog.id}`, {
      body: JSON.stringify(dog),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json()),
};
