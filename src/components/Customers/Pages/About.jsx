import React from 'react';
import '../Layout/About.css'; // Optional for any additional custom CSS

const About = () => {
    return (
        <section className="container my-5">
            <h2 className="text-center mb-4">About Evergreen Wireless</h2>
           

            <div className="row align-items-center mb-5">
                <div className="col-md-6">
                    <img
                        src={`${process.env.PUBLIC_URL}/images/expertise.webp`}
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
                        src={`${process.env.PUBLIC_URL}/images/commitment.webp`}
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
                        src={`${process.env.PUBLIC_URL}/images/community.webp`}
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
    );
};

export default About;
