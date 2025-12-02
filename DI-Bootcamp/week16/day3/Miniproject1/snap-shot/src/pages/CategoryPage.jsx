import { useEffect, useState } from "react";
import Gallery from "../components/Gallery";
import { fetchImages } from "../api";

export default function CategoryPage({ category }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages(category).then(setImages);
  }, [category]);

  return (
    <div>
      <h2 className="title">{category.toUpperCase()}</h2>
      <Gallery images={images} />
    </div>
  );
}
