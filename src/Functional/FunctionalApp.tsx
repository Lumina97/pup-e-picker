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

  const deleteDog = (id: number) => {
    setIsLoadingData(true);
    return Requests.deleteDog(id)
      .then(getAllDogs)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  };

  const heartClicked = (wasEmpty: boolean, id: number) => {
    setIsLoadingData(true);
    return Requests.updateDog(id, { isFavorite: wasEmpty })
      .then(getAllDogs)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  };

  const createDog = (dog: Omit<DogType, "id">) => {
    setIsLoadingData(true);

    return Requests.postDog(dog)
      .then(() => getAllDogs())
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  };

  const getAllDogs = () => {
    setIsLoadingData(true);
    return Requests.getAllDogs()
      .then((dogs) => {
        setAllDogs(dogs);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  };

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
        favoriteDogsCount={favoriteDogs.length}
        unFavoriteDogsCount={unFavoriteDogs.length}
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
