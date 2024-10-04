"use client"
import React, { useState, FC } from "react";
import Image from 'next/image';
import Dropdown from "../component/Dropdown";
import Navbar from "@/app/component/Navbar/Navbar";
import Footer from "@/app/component/Footer";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Hackers Path?",
    answer: "Hackers Path is an online platform that provides aspiring cybersecurity professionals with a modular curriculum, hands-on labs, and a community of learners. It helps users gain real-world experience in defending against cyber threats."
  },
  {
    question: "What topics does the curriculum cover?",
    answer: "Our curriculum spans key areas of cybersecurity, including ethical hacking, network defense, incident response, malware analysis, and phishing detection. The learning path is designed for both beginners and advanced learners."
  },
  {
    question: "How does Hackers Path help with real-world cybersecurity scenarios?",
    answer: "We offer interactive labs that simulate real-world attacks, allowing users to practice defending against threats in a controlled environment. These exercises help develop practical skills that are essential in the field."
  },
  {
    question: "How can I get started with Hackers Path?",
    answer: "You can start your journey by signing up on our website. Once you're in, you can explore our courses and join the community of learners. We recommend starting with our \"Introduction to Cybersecurity\" module if you're new to the field."
  },
  {
    question: "What kind of support is available to learners?",
    answer: "Hackers Path provides access to a vibrant community of learners and experts. We also offer 1-on-1 coaching sessions, peer discussions, and regular updates on the latest cybersecurity trends and practices."
  },
  {
    question: "Can Hackers Path help me with cybersecurity certifications?",
    answer: "Yes, our curriculum is aligned with major cybersecurity certifications, such as CompTIA Security+, CEH, and CISSP. We provide resources and practice exams to help you prepare and succeed in these certification exams."
  }
];




interface IconProps {
  id: number;
  open: number;
}

const Icon: FC<IconProps> = ({ id, open }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={`${
      id === open ? "rotate-180" : ""
    } h-5 w-5 transition-transform`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const About: FC = () => {
  const [open, setOpen] = useState<number>(0);

  return (
    <>
    <Navbar />
    <div className="container mx-auto p-8 md:p-16 text-white">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-16">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            About Hackers Path
          </h1>
          <p className="text-lg md:text-xl leading-relaxed mb-6">
            Hackers Path is the go-to platform for aspiring and experienced
            cybersecurity professionals. Our mission is to empower individuals
            to master the art of cybersecurity through a blend of theory,
            practice, and community support.
          </p>
          <p className="text-lg md:text-xl leading-relaxed">
            Whether you are new to the field or looking to advance your skills,
            we provide a well-structured curriculum that covers everything from
            the basics of ethical hacking to advanced threat analysis. Join us to
            gain hands-on experience and develop the skills needed to secure the
            digital world.
          </p>
        </div>
        <div className="md:w-1/2">
          <Image
            width={500}
            height={300}
            src="https://i.ibb.co/r4ybD56/computer-screen-with-keychain-top-it-951778-111286.jpg" 
            alt="Cybersecurity"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Key Features Section */}
      <div className="p-8 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Key Features
        </h2>
        <ul className="list-disc list-inside text-lg md:text-xl space-y-2">
          <li>Comprehensive cybersecurity curriculum for all skill levels</li>
          <li>Interactive labs with real-world scenarios</li>
          <li>Vibrant community of learners and experts</li>
          <li>1-on-1 coaching and personalized learning paths</li>
          <li>Alignment with top cybersecurity certifications</li>
        </ul>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Frequently Asked Questions
        </h2>
        <Dropdown faqs={faqData} />
      </div>
    </div>
    <Footer />
    </>
  );
};

export default About;
