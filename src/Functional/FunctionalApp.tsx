import { useEffect, useState } from "react";
import { Requests } from "../api";
import { FunctionalSection } from "./FunctionalSection";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { DogType, TActiveTab } from "../types";

export function FunctionalApp() {
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [allDogs, setAllDogs] = useState<DogType[]>([]);
  const [activeTab, setActiveTab] = useState<TActiveTab>("all");
  const isCreateDogShowing = activeTab === "createDog";

  const favoriteDogs = allDogs.filter((dog) => dog.isFavorite);
  const unFavoriteDogs = allDogs.filter((dog) => !dog.isFavorite);

  const dogsList: Record<TActiveTab, DogType[]> = {
    all: allDogs,
    favorite: favoriteDogs,
    unFavorite: unFavoriteDogs,
    createDog: [],
  };

  const deleteDog = (id: number): Promise<void | DogType[]> => {
    setIsLoadingData(true);
    return Requests.deleteDog(id)
      .then(getAllDogs)
      .catch((error) => {
        console.log(error);
      });
  };

  const heartClicked = (
    wasEmpty: boolean,
    id: number
  ): Promise<void | DogType[]> => {
    setIsLoadingData(true);
    return Requests.updateDog(id, { isFavorite: wasEmpty })
      .then(getAllDogs)
      .catch((error) => {
        console.log(error);
      });
  };

  const createDog = (
    name: string,
    description: string,
    image: string
  ): Promise<void | DogType[]> => {
    setIsLoadingData(true);
    const dog: Omit<DogType, "id"> = {
      name: name,
      description: description,
      image: image,
      isFavorite: false,
    };

    return Requests.postDog(dog)
      .then(() => getAllDogs())
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllDogs = (): Promise<void | DogType[]> => {
    setIsLoadingData(true);
    return Requests.getAllDogs()
      .then((dogs) => {
        setAllDogs(dogs);
        setIsLoadingData(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //due to react running twice on page load during development
  //this will trigger twice.
  //meaning if you delete, fav or crate a dog while "getAllDogs" is still waiting for a response
  //it will 'flicker' the disable key
  //work around?
  useEffect(() => {
    getAllDogs();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritedDogsCount={favoriteDogs.length}
        unFavoritedDogsCount={unFavoriteDogs.length}
      >
        {!isCreateDogShowing && (
          <FunctionalDogs
            isLoading={isLoadingData}
            dogsToShow={dogsList[activeTab]}
            deleteDog={deleteDog}
            heartClicked={heartClicked}
          />
        )}
        {isCreateDogShowing && (
          <FunctionalCreateDogForm
            createDog={createDog}
            isLoading={isLoadingData}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
