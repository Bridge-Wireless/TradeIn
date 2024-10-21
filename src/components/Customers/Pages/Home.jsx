import { Link } from "react-router-dom";
import '../Layout/Home2.css';
import { Carousel, Container } from 'react-bootstrap';
const reviews = [
  {
    id: 1,
    name: "John Doe",
    text: "Great service! I am very satisfied with the product quality.",
    avatar: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Jane Smith",
    text: "Fast delivery and excellent support. Highly recommend!",
    avatar: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Alice Johnson",
    text: "The user experience is fantastic. Will purchase again!",
    avatar: "https://via.placeholder.com/100",
  },
];

const Home = () => {
    return (
        <>
        
            <section    className="bg-image p-5 text-center shadow-1-strong rounded mb-5 text-white"
       style={{
        backgroundImage: `url(/images/stayconnected.webp)`,  
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover', // Optional: Makes the background cover the entire section
        backgroundPosition: 'center', // Optional: Centers the background image
        height: '50vh',
        display: 'flex', // Enables Flexbox
        justifyContent: 'center', // Centers content horizontally
        alignItems: 'center', // Centers content vertically
    }}>
                <div className="container">
                    <h1>Stay Connected Everywhere You Go</h1>
                    <p className="lead">Discover the best deals on Certified Pre-Owned mobile phones</p>
                    <Link to="#" className="btn btn-light">Explore Now</Link>
                </div>
            </section>

            <section className="container my-5">
            <h2 className="text-center mb-4">ABOUT US</h2>
           

            <div className="row align-items-center mb-5">
                <div className="col-md-6">
                    <img
                        src={`/images/expertise.webp`}
                        alt="Our Expertise"
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-6 text-center text-md-start">
                    <h3>Our Expertise</h3>
                    <p>
                        At Evergreen Wireless, we have a team of experts who are knowledgeable
                        about the latest mobile and cellular phone technologies. We are committed to 
                        staying up-to-date with the latest trends and innovations in the industry, 
                        so we can offer our customers the best possible products and services.
                    </p>
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col-md-6 order-md-2">
                    <img
                        src={`/images/commitment.webp`}
                        alt="Our Expertise"
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-6 text-center text-md-start">
                    <h3>Our Commitment</h3>
                    <p>
                        Our commitment at Evergreen Wireless is to provide our customers with a 
                        hassle-free shopping experience. We want to make it easy for our customers 
                        to find the perfect device and offer a variety of payment and shipping options 
                        to make the process as seamless as possible.
                    </p>
                </div>
            </div>
            <div className="row align-items-center mb-5">
                <div className="col-md-6">
                    <img
                        src={`/images/community.webp`}
                        alt="Our Expertise"
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-6 text-center text-md-start">
                    <h3>Our Community</h3>
                    <p>
                    At Evergreen Wireless, we believe in giving back to our community. We are 
                    committed to supporting local charities and organizations, and strive to 
                    make a positive impact in the lives of those around us.
                    </p>
                </div>
            </div>

        </section>
      
            <section className=" bg-light text-center py-5">
            <div className="carousel-container">
              <Container className="mt-5">
                <h2 className="text-center mb-4">Our Customers Love Us</h2>
                <Carousel interval={3000}>
                  {reviews.map((review) => (
                    <Carousel.Item key={review.id}>
                      <div className="d-flex flex-column align-items-center">
                        {/* <img
                          src={review.avatar}
                          alt={review.name}
                          className="rounded-circle mb-3"
                          style={{ width: "100px", height: "100px" }}
                        /> */}
                        <blockquote className="blockquote text-center">
                          <p className="mb-0">"{review.text}"</p>
                          <footer className="blockquote-footer mt-2">
                            {review.name}
                          </footer>
                        </blockquote>
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
            </Container>
          </div>

            </section>

        </>
    );
};

export default Home;
