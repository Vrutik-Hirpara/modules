import { useState } from "react";

export default function useViewEditImage() {
  const [currentImage, setCurrentImage] = useState(null);

  const setFromRecord = (record) => {
    setCurrentImage(record?.image || null);
  };

  const clearImage = () => {
    setCurrentImage(null);
  };

  return {
    currentImage,
    setFromRecord,
    clearImage
  };
}
