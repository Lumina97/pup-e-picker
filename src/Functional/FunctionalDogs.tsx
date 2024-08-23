import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import { DogType } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  setIsLoading,
  isLoading,
  dogsToShow,
  getAllDogs,
}: {
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
  dogsToShow: DogType[];
  getAllDogs: () => void;
}) => {
  const deleteDog = (dog: DogType) => {
    setIsLoading(true);
    Requests.deleteDog(dog.id).then(getAllDogs);
  };

  const heartClicked = (wasEmpty: boolean, dog: DogType): void => {
    setIsLoading(true);
    dog.isFavorite = wasEmpty;
    Requests.updateDog(dog).then(getAllDogs);
  };

  return (
    <>
      {dogsToShow.length > 0 &&
        dogsToShow.map((dog) => {
          return (
            <DogCard
              dog={{
                id: dog.id,
                image: dog.image,
                description: dog.description,
                isFavorite: dog.isFavorite,
                name: dog.name,
              }}
              key={dog.id}
              onTrashIconClick={() => {
                deleteDog(dog);
              }}
              onHeartClick={() => {
                heartClicked(false, { ...dog });
              }}
              onEmptyHeartClick={() => {
                heartClicked(true, { ...dog });
              }}
              isLoading={isLoading}
            />
          );
        })}
    </>
  );
};
