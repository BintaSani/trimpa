import React from "react";
import Testimonial from "./testimonial";

type Props = {};

const Testimonials = (props: Props) => {
  return (
    <div className="w-full mb-40">
      <div className="max-w-[1440px] px-6 py-16 lg:px-16 mx-auto">
        <h3 className="mb-5 text-2xl font-semibold text-gray-600 text-center">
          What <span className="text-[var(--color-purple-blue)] ">Tripma</span>{" "}
          users are saying
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <Testimonial
            name="Yifei Chen"
            location="Seoul, South Korea"
            date="April 2019"
            rating={5}
            review="What a great experience using Tripma! 
                    I booked all of my flights for my gap year through 
                    Tripma and never had any issues. When I had to cancel 
                    a flight because of an emergency, Tripma support helped me"
            imageSrc="/images/avatar1.png"
          />
          <Testimonial
            name="Kaori Yamaguchi"
            location="Honolulu, Hawaii"
            date="February 2017"
            rating={4}
            review="My family and I visit Hawaii every year, 
                    and we usually book our flights using other services. 
                    Tripma was recommened to us by a long time friend, 
                    and I'm so glad we tried it out! The process was easy and"
            imageSrc="/images/avatar2.png"
          />
          <Testimonial
            name="Anthony Lewis"
            location="Berlin, Germany"
            date="April 2019"
            rating={5}
            review="When I was looking to book my 
                    flight to Berlin from LAX, 
                    Tripma had the best browsing experiece 
                    so I figured I'd give it a try. 
                    It was my first time using Tripma, 
                    but I'd definitely recommend it to a friend and use it for"
            imageSrc="/images/avatar3.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
