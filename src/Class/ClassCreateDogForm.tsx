import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { DogType } from "../types";

const defaultSelectedImage = dogPictures.BlueHeeler;

type CreateDogPropsType = {
  getAllDogs: () => void;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
};

type CreateDogStateType = {
  nameInput: string;
  descriptionInput: string;
  imageInput: string;
};

export class ClassCreateDogForm extends Component<CreateDogPropsType, CreateDogStateType> {
  state: CreateDogStateType = {
    nameInput: "",
    descriptionInput: "",
    imageInput: "",
  };

  createDog = () => {
    this.props.setIsLoading(true);

    this.state.imageInput === null && this.setState({ imageInput: defaultSelectedImage });

    const dog: Omit<DogType, "id"> = {
      name: this.state.nameInput,
      description: this.state.descriptionInput,
      image: this.state.imageInput,
      isFavorite: false,
    };
    this.setState({ nameInput: " ", descriptionInput: " ", imageInput: defaultSelectedImage });
    Requests.postDog(dog).then(this.props.getAllDogs);
  };

  render() {
    const { isLoading } = this.props;
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          this.createDog();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input type="text" value={this.state.nameInput} onChange={(e) => this.setState({ nameInput: e.target.value })} disabled={isLoading} />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          value={this.state.descriptionInput}
          onChange={(e) => {
            this.setState({ descriptionInput: e.target.value });
          }}
          disabled={isLoading}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          value={this.state.imageInput}
          onChange={(e) => {
            this.setState({ imageInput: e.target.value });
          }}
          disabled={isLoading}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  }
}
