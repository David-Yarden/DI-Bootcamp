export default function ImageItem({ img }) {
  return (
    <div className="image-card">
      <img src={img.src.medium} alt="img" />
    </div>
  );
}
