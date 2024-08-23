import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { DogType } from "../types";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

type InputPropsType = {
  getAllDogs: () => void;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
};

export const FunctionalCreateDogForm = ({ getAllDogs, setIsLoading, isLoading }: InputPropsType) => {
  const [nameInput, setNameInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [imageInput, setImageInput] = useState<string>(defaultSelectedImage);

  const createDog = () => {
    setIsLoading(true);
    imageInput === null && setImageInput(defaultSelectedImage);

    const dog: Omit<DogType, "id"> = {
      name: nameInput,
      description: descriptionInput,
      image: imageInput,
      isFavorite: false,
    };

    Requests.postDog(dog).then(getAllDogs);
    setNameInput("");
    setDescriptionInput("");
    setImageInput(defaultSelectedImage);
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        createDog();
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
        }}
        disabled={isLoading}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        value={descriptionInput}
        onChange={(e) => {
          setDescriptionInput(e.target.value);
        }}
        disabled={isLoading}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select id="" disabled={isLoading} value={imageInput} onChange={(e) => setImageInput(e.target.value)}>
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
