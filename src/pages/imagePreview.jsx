import { buildImageUrl } from "../services/image.helper";

export default function ImagePreview({ image }) {
  if (!image) return null;

  return (
    <img
      src={buildImageUrl(image)}
      width={100}
      height={100}
      className="d-block mb-2 border rounded object-fit-cover"
      alt="preview"
    />
  );
}
