import { useEffect, useState } from "react";
import { Requests } from "../api";
import { FunctionalSection } from "./FunctionalSection";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { DogType } from "../types";

export function FunctionalApp() {
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [allDogs, setAllDogs] = useState<DogType[]>([]);
  const [favoriteDogs, setFavoriteDogs] = useState<DogType[]>([]);
  const [nonFavoriteDogs, setNonFavoriteDogs] = useState<DogType[]>([]);
  const [isFavoriteShowing, setIsFavoriteShowing] = useState<boolean>(false);
  const [isNonFavoriteShowing, setIsNonFavoriteShowing] = useState<boolean>(false);
  const [isCreateDogShowing, setIsCreateDogShowing] = useState<boolean>(false);

  const sortDogsToLists = (dogs: DogType[]) => {
    const favs: DogType[] = [];
    const nonfavs: DogType[] = [];

    dogs.map((dog) => {
      dog.isFavorite ? favs.push(dog) : nonfavs.push(dog);
    });

    setFavoriteDogs(favs);
    setNonFavoriteDogs(nonfavs);
  };

  const getAllDogs = async () => {
    setIsLoadingData(true);

    Requests.getAllDogs().then((dogs) => {
      setAllDogs(dogs);
      sortDogsToLists(dogs);
      setIsLoadingData(false);
    });
  };

  useEffect(() => {
    getAllDogs();
  }, []);

  const dogsToDisplay = isFavoriteShowing ? favoriteDogs : isNonFavoriteShowing ? nonFavoriteDogs : allDogs;

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        setIsFavoriteShowing={setIsFavoriteShowing}
        setIsNonFavoriteShowing={setIsNonFavoriteShowing}
        setIsCreateDogShowing={setIsCreateDogShowing}
        isCreateDogShowing={isCreateDogShowing}
        showFavorites={isFavoriteShowing}
        showNonFavorites={isNonFavoriteShowing}
        favoritedDogs={favoriteDogs.length}
        unFavoritedDogs={nonFavoriteDogs.length}
      >
        {!isCreateDogShowing && (
          <FunctionalDogs setIsLoading={setIsLoadingData} isLoading={isLoadingData} dogsToShow={dogsToDisplay} getAllDogs={getAllDogs} />
        )}
        {isCreateDogShowing && <FunctionalCreateDogForm getAllDogs={getAllDogs} isLoading={isLoadingData} setIsLoading={setIsLoadingData} />}
      </FunctionalSection>
    </div>
  );
}
