import ImageItem from "./ImageItem";

export default function Gallery({ images }) {
  return (
    <div className="gallery">
      {images.map((img) => (
        <ImageItem key={img.id} img={img} />
      ))}
    </div>
  );
}
