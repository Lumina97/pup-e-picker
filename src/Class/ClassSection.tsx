// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { DogType, TActiveTab } from "../types";

type SectionPropsType = {
  activeTab: TActiveTab;
  setNewStateData: (
    key: "isLoadingData" | "allDogs" | "activeTab",
    value: boolean | DogType[] | TActiveTab
  ) => void;
  favoriteDogsCount: number;
  unFavoriteDogsCount: number;
  children: ReactNode;
};

export class ClassSection extends Component<SectionPropsType> {
  setActiveStates = (currentState: TActiveTab): void => {
    const { activeTab, setNewStateData } = this.props;
    const valueToSet = currentState === activeTab ? "all" : currentState;
    setNewStateData("activeTab", valueToSet);
  };

  render() {
    const {
      favoriteDogsCount: favoritedDogsCount,
      unFavoriteDogsCount,
      activeTab,
      children,
    } = this.props;

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            <div
              className={`selector ${activeTab === "favorite" && "active"} `}
              onClick={() => this.setActiveStates("favorite")}
            >
              favorited ( {favoritedDogsCount} )
            </div>

            <div
              className={`selector ${activeTab === "unFavorite" && "active"}`}
              onClick={() => this.setActiveStates("unFavorite")}
            >
              unfavorited ( {unFavoriteDogsCount} )
            </div>
            <div
              className={`selector ${activeTab === "createDog" && "active"}`}
              onClick={() => this.setActiveStates("createDog")}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
