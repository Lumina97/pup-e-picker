import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { DogType } from "../types";
import { Requests } from "../api";

type ClassDogPropType = {
  dogsToShow: DogType[];
  isLoading: boolean;
  getAllDogs: () => void;
  setIsLoading: (value: boolean) => void;
};

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<ClassDogPropType> {
  deleteDog = (dog: DogType) => {
    this.props.setIsLoading(true);
    Requests.deleteDog(dog.id).then(this.props.getAllDogs);
  };

  heartClicked = (wasEmpty: boolean, dog: DogType): void => {
    this.props.setIsLoading(true);
    dog.isFavorite = wasEmpty;
    Requests.updateDog(dog).then(this.props.getAllDogs);
  };

  render() {
    const { dogsToShow, isLoading } = this.props;
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
                  this.deleteDog(dog);
                }}
                onHeartClick={() => {
                  this.heartClicked(false, { ...dog });
                }}
                onEmptyHeartClick={() => {
                  this.heartClicked(true, { ...dog });
                }}
                isLoading={isLoading}
              />
            );
          })}
      </>
    );
  }
}
