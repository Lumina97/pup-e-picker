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

  setNewStateData = (
    key: "isLoadingData" | "allDogs" | "activeTab",
    value: boolean | DogType[] | TActiveTab
  ) => {
    this.setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  deleteDog = (id: number) => {
    this.setNewStateData("isLoadingData", true);
    return Requests.deleteDog(id)
      .then(() => {
        this.getAllDogs();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => this.setNewStateData("isLoadingData", false));
  };

  heartClicked = (wasEmpty: boolean, id: number) => {
    this.setNewStateData("isLoadingData", true);
    return Requests.updateDog(id, { isFavorite: wasEmpty })
      .then(() => {
        this.getAllDogs();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => this.setNewStateData("isLoadingData", false));
  };

  createDog = (dog: Omit<DogType, "id">) => {
    this.setNewStateData("isLoadingData", true);
    return Requests.postDog(dog)
      .then(() => {
        this.getAllDogs();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => this.setNewStateData("isLoadingData", false));
  };

  getAllDogs = () => {
    this.setNewStateData("isLoadingData", true);

    return Requests.getAllDogs()
      .then((dogs) => {
        this.setNewStateData("allDogs", dogs);
        this.setNewStateData("isLoadingData", false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => this.setNewStateData("isLoadingData", false));
  };

  componentDidMount() {
    this.getAllDogs();
  }

  render = () => {
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
          setNewStateData={this.setNewStateData}
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
  };
}
