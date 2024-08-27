import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { DogType } from "../types";
import toast from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

type CreateDogPropsType = {
  createDog: (
    name: string,
    description: string,
    image: string
  ) => Promise<void | DogType[]>;
  isLoading: boolean;
};

type CreateDogStateType = {
  nameInput: string;
  descriptionInput: string;
  imageInput: string;
};

export class ClassCreateDogForm extends Component<
  CreateDogPropsType,
  CreateDogStateType
> {
  state: CreateDogStateType = {
    nameInput: "",
    descriptionInput: "",
    imageInput: defaultSelectedImage,
  };

  clearForm = () => {
    this.setState({ nameInput: "" });
    this.setState({ descriptionInput: "" });
    this.setState({ imageInput: defaultSelectedImage });
  };

  render() {
    const { isLoading, createDog } = this.props;
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          createDog(
            this.state.nameInput,
            this.state.descriptionInput,
            this.state.imageInput
          ).then(() => {
            toast.success("Created dog!");
            this.clearForm();
          });
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={this.state.nameInput}
          onChange={(e) => this.setState({ nameInput: e.target.value })}
          disabled={isLoading}
        />
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
