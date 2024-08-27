import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";
import { DogType, TActiveTab } from "../types";

type classStateType = {
  isLoadingData: boolean;
  allDogs: DogType[];
  activeTab: TActiveTab;
};

export class ClassApp extends Component<Record<string, never>, classStateType> {
  state: classStateType = {
    isLoadingData: false,
    allDogs: [],
    activeTab: "all",
  };

  setIsLoadingData = (value: boolean): void => {
    this.setState({ isLoadingData: value });
  };
  setAllDogs = (dogs: DogType[]): void => {
    this.setState({ allDogs: dogs });
  };
  setActiveTab = (value: TActiveTab): void => {
    this.setState({ activeTab: value });
  };

  deleteDog = (id: number): Promise<void | DogType[]> => {
    this.setIsLoadingData(true);
    return Requests.deleteDog(id)
      .then(() => {
        this.getAllDogs();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  heartClicked = (wasEmpty: boolean, id: number): Promise<void | DogType[]> => {
    this.setIsLoadingData(true);
    return Requests.updateDog(id, { isFavorite: wasEmpty })
      .then(() => {
        this.getAllDogs();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  createDog = (
    name: string,
    description: string,
    image: string
  ): Promise<void | DogType[]> => {
    this.setIsLoadingData(true);

    const dog: Omit<DogType, "id"> = {
      name: name,
      description: description,
      image: image,
      isFavorite: false,
    };

    return Requests.postDog(dog)
      .then(() => {
        this.getAllDogs();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getAllDogs = (): Promise<void | DogType[]> => {
    this.setIsLoadingData(true);

    return Requests.getAllDogs()
      .then((dogs) => {
        this.setAllDogs(dogs);
        this.setIsLoadingData(false);
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
  componentDidMount() {
    this.getAllDogs();
  }

  render() {
    const isCreateDogShowing = this.state.activeTab === "createDog";
    const favoriteDogs: DogType[] = this.state.allDogs.filter(
      (dog) => dog.isFavorite
    );
    const unFavoriteDogs: DogType[] = this.state.allDogs.filter(
      (dog) => !dog.isFavorite
    );

    const dogsList: Record<TActiveTab, DogType[]> = {
      all: this.state.allDogs,
      favorite: favoriteDogs,
      unFavorite: unFavoriteDogs,
      createDog: [],
    };

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          activeTab={this.state.activeTab}
          setActiveTab={this.setActiveTab}
          favoriteDogsCount={favoriteDogs.length}
          unFavoriteDogsCount={unFavoriteDogs.length}
        >
          {isCreateDogShowing ? (
            <ClassCreateDogForm
              createDog={this.createDog}
              isLoading={this.state.isLoadingData}
            />
          ) : (
            <ClassDogs
              deleteDog={this.deleteDog}
              heartClicked={this.heartClicked}
              isLoading={this.state.isLoadingData}
              dogsToShow={dogsList[this.state.activeTab]}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
