import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { DogType } from "../types";
import toast from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

type CreateDogPropsType = {
  createDog: (dog: Omit<DogType, "id">) => Promise<void>;
  isLoading: boolean;
};

type CreateDogStateType = {
  name: string;
  description: string;
  image: string;
};

export class ClassCreateDogForm extends Component<
  CreateDogPropsType,
  CreateDogStateType
> {
  state: CreateDogStateType = {
    name: "",
    description: "",
    image: defaultSelectedImage,
  };

  clearForm = () => {
    this.setState({ name: "" });
    this.setState({ description: "" });
    this.setState({ image: defaultSelectedImage });
  };

  render() {
    const { isLoading, createDog } = this.props;
    const { name, description, image } = this.state;

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          createDog({
            name,
            description,
            image,
            isFavorite: false,
          }).then(() => {
            toast.success("Created dog!");
            this.clearForm();
          });
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          value={this.state.description}
          onChange={(e) => {
            this.setState({ description: e.target.value });
          }}
          disabled={isLoading}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          value={this.state.image}
          onChange={(e) => {
            this.setState({ image: e.target.value });
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
