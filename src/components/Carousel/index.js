import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import banner1 from '../../assets/image/banner1.webp';
import banner2 from '../../assets/image/banner2.webp';
import banner3 from '../../assets/image/banner3.webp';
import './carousel.scss';
export default function App() {
    return (
        <MDBCarousel showControls showIndicators className="h-100">
            <MDBCarouselItem className="w-100 h-100 d-block item-carousel" itemId={1} src={banner1} alt="...">
                {/* <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </MDBCarouselItem>
            <MDBCarouselItem className="w-100 h-100 d-block item-carousel" itemId={2} src={banner2} alt="...">
                {/* <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
            </MDBCarouselItem>
            <MDBCarouselItem className="w-100 h-100 d-block item-carousel" itemId={3} src={banner3} alt="...">
                {/* <h5>Third slide label</h5>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
            </MDBCarouselItem>
        </MDBCarousel>
    );
}
