import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { DogType } from "../types";
import toast from "react-hot-toast";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

type InputPropsType = {
  createDog: (dog: Omit<DogType, "id">) => Promise<void>;
  isLoading: boolean;
};

export const FunctionalCreateDogForm = ({
  createDog,
  isLoading,
}: InputPropsType) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>(defaultSelectedImage);

  const clearForm = () => {
    setName("");
    setDescription("");
    setImage(defaultSelectedImage);
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        createDog({ name, description, image, isFavorite: false }).then(() => {
          toast.success("Created dog!");
          clearForm();
        });
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        disabled={isLoading}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        disabled={isLoading}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        disabled={isLoading}
        value={image}
        onChange={(e) => setImage(e.target.value)}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input disabled={isLoading} type="submit" />
    </form>
  );
};
