import { Link, useSearchParams } from "react-router";

const products = [
  { id: 123, name: "iPhone15" },
  { id: 234, name: "iPad16" },
];

export default function Shop() {
    const [query] = useSearchParams()
    console.log(query.get('a'), query.get('b'));
  return (
    <div>
      <h2>Shop</h2>
      {products &&
        products.map((item) => {
          return (
            <div key={item.id}>
              <h2>{item.name}</h2>
              <Link to={`/product/${item.id}`}>Buy Now</Link>
            </div>
          );
        })}
    </div>
  );
}