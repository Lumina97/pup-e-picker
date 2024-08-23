import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";
import { DogType } from "../types";

type classStateType = {
  isLoadingData: boolean;
  allDogs: DogType[];
  favoriteDogs: DogType[];
  nonFavoriteDogs: DogType[];
  isFavoriteShowing: boolean;
  isNonFavoriteShowing: boolean;
  isCreateDogShowing: boolean;
};

export class ClassApp extends Component<Record<string, never>, classStateType> {
  state: classStateType = {
    isLoadingData: false,
    allDogs: [],
    favoriteDogs: [],
    nonFavoriteDogs: [],
    isFavoriteShowing: false,
    isNonFavoriteShowing: false,
    isCreateDogShowing: false,
  };

  componentDidMount() {
    this.getAllDogs();
  }

  sortDogsToLists = (dogs: DogType[]) => {
    const favs: DogType[] = [];
    const nonfavs: DogType[] = [];

    dogs.map((dog) => {
      dog.isFavorite ? favs.push(dog) : nonfavs.push(dog);
    });

    this.setFavoriteDogs(favs);
    this.setNonFavoriteDogs(nonfavs);
  };

  getAllDogs = async () => {
    this.setIsLoadingData(true);

    Requests.getAllDogs().then((dogs) => {
      this.setAllDogs(dogs);
      this.sortDogsToLists(dogs);
      this.setIsLoadingData(false);
    });
  };

  setIsLoadingData = (value: boolean) => {
    this.setState({ isLoadingData: value });
  };
  setAllDogs = (dogs: DogType[]) => {
    this.setState({ allDogs: dogs });
  };
  setFavoriteDogs = (favDogs: DogType[]) => {
    this.setState({ favoriteDogs: favDogs });
  };
  setNonFavoriteDogs = (nonFavDogs: DogType[]) => {
    this.setState({ nonFavoriteDogs: nonFavDogs });
  };
  setIsFavoriteShowing = (value: boolean) => {
    this.setState({ isFavoriteShowing: value });
  };
  setIsNonFavoriteShowing = (value: boolean) => {
    this.setState({ isNonFavoriteShowing: value });
  };
  setIsCreateDogShowing = (value: boolean) => {
    this.setState({ isCreateDogShowing: value });
  };

  render() {
    const dogsToDisplay = this.state.isFavoriteShowing
      ? this.state.favoriteDogs
      : this.state.isNonFavoriteShowing
      ? this.state.nonFavoriteDogs
      : this.state.allDogs;
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          setIsFavoriteShowing={this.setIsFavoriteShowing}
          setIsNonFavoriteShowing={this.setIsNonFavoriteShowing}
          setIsCreateDogShowing={this.setIsCreateDogShowing}
          isCreateDogShowing={this.state.isCreateDogShowing}
          showFavorites={this.state.isFavoriteShowing}
          showNonFavorites={this.state.isNonFavoriteShowing}
          favoritedDogs={this.state.favoriteDogs.length}
          unFavoritedDogs={this.state.nonFavoriteDogs.length}
        >
          {this.state.isCreateDogShowing ? (
            <ClassCreateDogForm getAllDogs={this.getAllDogs} setIsLoading={this.setIsLoadingData} isLoading={this.state.isLoadingData} />
          ) : (
            <ClassDogs
              setIsLoading={this.setIsLoadingData}
              isLoading={this.state.isLoadingData}
              dogsToShow={dogsToDisplay}
              getAllDogs={this.getAllDogs}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
