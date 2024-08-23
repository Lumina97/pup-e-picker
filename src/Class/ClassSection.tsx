// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";

type SectionPropsType = {
  setIsFavoriteShowing: (value: boolean) => void;
  setIsNonFavoriteShowing: (value: boolean) => void;
  setIsCreateDogShowing: (value: boolean) => void;
  isCreateDogShowing: boolean;
  showFavorites: boolean;
  showNonFavorites: boolean;
  favoritedDogs: number;
  unFavoritedDogs: number;
  children: ReactNode;
};

type sectionStateType = {
  favoriteActiveClass: string;
  unfavoriteActiveClass: string;
  createDogActiveClass: string;
};

export class ClassSection extends Component<SectionPropsType, sectionStateType> {
  state: sectionStateType = {
    favoriteActiveClass: "",
    unfavoriteActiveClass: "",
    createDogActiveClass: "",
  };

  setActiveStates: (fav: boolean, unFav: boolean, createDog: boolean) => void = (fav, unFav, createDog) => {
    const { setIsFavoriteShowing, setIsNonFavoriteShowing, setIsCreateDogShowing } = this.props;

    fav ? this.setState({ favoriteActiveClass: "active" }) : this.setState({ favoriteActiveClass: "" });
    unFav ? this.setState({ unfavoriteActiveClass: "active" }) : this.setState({ unfavoriteActiveClass: "" });
    createDog ? this.setState({ createDogActiveClass: "active" }) : this.setState({ createDogActiveClass: "" });

    setIsFavoriteShowing(fav);
    setIsNonFavoriteShowing(unFav);
    setIsCreateDogShowing(createDog);
  };

  render() {
    const { favoritedDogs, unFavoritedDogs, children, showFavorites, showNonFavorites, isCreateDogShowing } = this.props;

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            <div className={`selector ${this.state.favoriteActiveClass} `} onClick={() => this.setActiveStates(!showFavorites, false, false)}>
              favorited ( {favoritedDogs} )
            </div>

            <div className={`selector ${this.state.unfavoriteActiveClass}`} onClick={() => this.setActiveStates(false, !showNonFavorites, false)}>
              unfavorited ( {unFavoritedDogs} )
            </div>
            <div className={`selector ${this.state.createDogActiveClass}`} onClick={() => this.setActiveStates(false, false, !isCreateDogShowing)}>
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
