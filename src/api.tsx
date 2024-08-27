import { DogType } from "./types";
export const baseUrl = "http://localhost:3000";

export const Requests = {
  getAllDogs: (): Promise<DogType[]> =>
    fetch(baseUrl + "/dogs")
      .then((response) => {
        if (!response.ok)
          throw new Error(`Request failed: ${response.statusText}`);

        return response.json();
      })
      .catch((error) => {
        throw new Error(`Request failed: ${error}`);
      }),

  postDog: (dog: Omit<DogType, "id">): Promise<DogType[]> =>
    fetch(`${baseUrl}/dogs`, {
      body: JSON.stringify(dog),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`Request failed: ${response.statusText}`);
        return response.json();
      })
      .catch((error) => {
        throw new Error(`Request failed: ${error}`);
      }),

  deleteDog: (id: number): Promise<void> =>
    fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`Request failed: ${response.statusText}`);
        return response.json();
      })
      .catch((error) => {
        throw new Error(`Request failed: ${error}`);
      }),

  updateDog: (id: number, part: { isFavorite: boolean }): Promise<DogType[]> =>
    fetch(`${baseUrl}/dogs/${id}`, {
      body: JSON.stringify(part),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`Request failed: ${response.statusText}`);
        return response.json();
      })
      .catch((error) => {
        throw new Error(`Request failed: ${error}`);
      }),
};
