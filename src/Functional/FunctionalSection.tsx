// you can use this type for react children if you so choose
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { TActiveTab } from "../types";

type SectionPropsType = {
  activeTab: TActiveTab;
  setActiveTab: Dispatch<SetStateAction<TActiveTab>>;
  favoriteDogsCount: number;
  unFavoriteDogsCount: number;
  children: ReactNode;
};

export const FunctionalSection = ({
  activeTab,
  setActiveTab,
  favoriteDogsCount: favoriteDogsCount,
  unFavoriteDogsCount: unFavoriteDogsCount,
  children,
}: SectionPropsType) => {
  const setNewActiveState = (currentState: TActiveTab) => {
    const valueToSet = currentState === activeTab ? "all" : currentState;
    setActiveTab(valueToSet);
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          <div
            className={`selector ${activeTab === "favorite" && "active"}`}
            onClick={() => setNewActiveState("favorite")}
          >
            favorited ({favoriteDogsCount})
          </div>

          <div
            className={`selector ${activeTab === "unFavorite" && "active"}`}
            onClick={() => setNewActiveState("unFavorite")}
          >
            unfavorited ({unFavoriteDogsCount})
          </div>
          <div
            className={`selector ${activeTab === "createDog" && "active"}`}
            onClick={() => setNewActiveState("createDog")}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
