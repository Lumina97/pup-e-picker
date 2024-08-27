import { DogCard } from "../Shared/DogCard";
import { DogType } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  isLoading,
  dogsToShow,
  deleteDog,
  heartClicked,
}: {
  isLoading: boolean;
  dogsToShow: DogType[];
  deleteDog: (id: number) => Promise<void | DogType[]>;
  heartClicked: (wasEmpty: boolean, id: number) => Promise<void | DogType[]>;
}) => {
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
                deleteDog(dog.id);
              }}
              onHeartClick={() => {
                heartClicked(false, dog.id);
              }}
              onEmptyHeartClick={() => {
                heartClicked(true, dog.id);
              }}
              isLoading={isLoading}
            />
          );
        })}
    </>
  );
};
