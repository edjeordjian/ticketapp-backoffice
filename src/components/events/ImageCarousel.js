import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageCarousel = (props) => {
    return (
        <Carousel showThumbs={false}
                  showStatus={false}
                  style={{height: "200px !important"}}>
            {props.images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`Slide ${index + 1}`} />
                </div>
            ))}
        </Carousel>
    );
};

export {
    ImageCarousel
};