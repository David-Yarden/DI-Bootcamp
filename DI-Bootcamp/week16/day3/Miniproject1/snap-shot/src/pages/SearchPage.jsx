import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Gallery from "../components/Gallery";
import { fetchImages } from "../api";

export default function SearchPage() {
  const { term } = useParams();
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages(term).then(setImages);
  }, [term]);

  return (
    <div>
      <h2 className="title">Results for "{term}"</h2>
      <Gallery images={images} />
    </div>
  );
}
