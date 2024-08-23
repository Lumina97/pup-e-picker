// you can use this type for react children if you so choose
import { ReactNode, useState } from "react";
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

export const FunctionalSection = ({
  setIsFavoriteShowing,
  setIsNonFavoriteShowing,
  setIsCreateDogShowing,
  isCreateDogShowing,
  showFavorites,
  showNonFavorites,
  favoritedDogs,
  unFavoritedDogs,
  children,
}: SectionPropsType) => {
  const [favoriteActiveClass, setFavoriteActiveClass] = useState<string>("");
  const [unfavoriteActiveClass, setUnfavoriteActiveClass] = useState<string>("");
  const [createDogActiveClass, setCreateDogActiveClass] = useState<string>("");

  const setActiveStates: (fav: boolean, unFav: boolean, createDog: boolean) => void = (fav, unFav, createDog) => {
    fav ? setFavoriteActiveClass("active") : setFavoriteActiveClass("");
    unFav ? setUnfavoriteActiveClass("active") : setUnfavoriteActiveClass("");
    createDog ? setCreateDogActiveClass("active") : setCreateDogActiveClass("");

    setIsFavoriteShowing(fav);
    setIsNonFavoriteShowing(unFav);
    setIsCreateDogShowing(createDog);
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          <div className={`selector ${favoriteActiveClass}`} onClick={() => setActiveStates(!showFavorites, false, false)}>
            favorited ({favoritedDogs})
          </div>

          <div className={`selector ${unfavoriteActiveClass}`} onClick={() => setActiveStates(false, !showNonFavorites, false)}>
            unfavorited ({unFavoritedDogs})
          </div>
          <div className={`selector ${createDogActiveClass}`} onClick={() => setActiveStates(false, false, !isCreateDogShowing)}>
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
