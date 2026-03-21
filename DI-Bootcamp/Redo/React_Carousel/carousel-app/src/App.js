import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './App.css';

const slides = [
  {
    url: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/jrfyzvgzvhs1iylduuhj.jpg',
    label: 'Hong Kong',
  },
  {
    url: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/c1cklkyp6ms02tougufx.webp',
    label: 'Macao',
  },
  {
    url: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp',
    label: 'Japan',
  },
  {
    url: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/liw377az16sxmp9a6ylg.webp',
    label: 'Las Vegas',
  },
];

function App() {
  return (
    <div className="App">
      <div className="container py-5">
        <h1 className="text-center mb-4">React Carousel</h1>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Carousel
              showArrows={true}
              showThumbs={false}
              infiniteLoop={true}
              autoPlay={true}
              interval={3000}
            >
              {slides.map((slide, index) => (
                <div key={index}>
                  <img src={slide.url} alt={slide.label} />
                  <p className="legend">{slide.label}</p>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
