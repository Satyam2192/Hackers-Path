"use client"
import React from "react";
import Link from "next/link";
import meeting from "../../assets/meeting.jpg";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Image from "next/image";

const ContactUs: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="relative flex flex-col py-16 lg:pt-0 lg:flex-col lg:pb-0">
        <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
          <svg
            className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
            viewBox="0 0 100 100"
            fill="currentColor"
            preserveAspectRatio="none slice"
          >
            <path d="M50 0H100L50 100H0L50 0Z" />
          </svg>
          <Image
            width={500}
            height={300}
            className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
            src={meeting.src}
            alt="Contact Us"
          />

        </div>
        <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
          <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
            <p className="inline-block px-3 py-2 mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-100">
              CONTACT
            </p>
            <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl sm:leading-none">
              Get in Touch{" "}
            </h2>
            <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
              Schedule a call with us by filling out the details below and
              choose a meeting time that suits you.
            </p>
            <div className="flex items-center">
              <Link href="/" passHref>
                <div className="text-xl inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-400 hover:bg-pink-500 focus:shadow-outline focus:outline-none">
                  Back to Home
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <iframe
          src="https://koalendar.com/e/meet-with-satyam-kumar"
          title="Schedule a Call"
          className="w-full h-[100vh]"
          frameBorder="0"
        ></iframe>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
