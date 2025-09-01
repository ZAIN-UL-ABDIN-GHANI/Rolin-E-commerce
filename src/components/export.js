import prop1 from "../assets/images/prop1.webp";
import prop2 from "../assets/images/prop2.webp";
import prop3 from "../assets/images/prop3.webp";
import prop4 from "../assets/images/prop4.webp";
import prop5 from "../assets/images/prop5.webp";
import prop6 from "../assets/images/prop6.webp";
import client1 from "../assets/images/client1.png";
import client2 from "../assets/images/client2.png";
import client3 from "../assets/images/client3.png";
import client4 from "../assets/images/client4.png";
import client5 from "../assets/images/client5.png";
import client6 from "../assets/images/client6.png";
import { MdNoteAlt } from "react-icons/md";
import {
  FaHome,
  FaSearch,
  FaNotesMedical,
  FaCameraRetro,
} from "react-icons/fa";
import { GoLaw } from "react-icons/go";

export const  property = [
  {
    id: 1,
    image: prop1,
    title: "Modern Sandal Koh View",
    price: "1400.18",
    address: "Hilltop Breeze Islamabad",
    description:
      "Beautiful, updated, ground level Co-op apartment in the desirable Bay Terrace neighborhood",
    beds: 6,
    baths: 4,
    area: 450,
    agent: "Abdul Ghani",
  },
   {
    id: 2,
    image: prop2,
    title: "Modern Swat Pearl Villas",
    price: "1052.18",
    address: "River View Swat,KPK",
    description:
      "Beautiful, updated, ground level Co-op apartment in the desirable Bay Terrace neighborhood",
    beds: 5,
    baths: 3,
    area: 409,
    agent: "CH Maryam",
  },

  {
    id: 3,
    image: prop3,
    title: "Ziarat Bay Heights",
    price: "909.99",
    address: "	Hilltop Lane Balochistan",
    description: "Beautiful, updated, ground level Co-op apartment in the desirable Bay Terrace neighborhood",
    beds: 4,
    baths: 2,
    area: 350,
    agent: "Nadia Khan",
  },
  {
    id: 4,
    image: prop4,
    title: "Ravi Coast Residency",
    price: "850.50",
    address: "	Lakefront Road Lahore",
    description: "Peaceful cottage with mountain view and large patio",
    beds: 4,
    baths: 1,
    area: 245,
    agent: "Zeeshan Tariq",
  },
  {
    id: 5,
    image: prop5,
    title: "Makran Horizon Estate",
    price: "600.00",
    address: "Sunset Cliff Gwadar",
    description: "Commercial office space in the heart of business district",
    beds: 2,
    baths: 1,
    area: 200,
    agent: "Office RentX",
  },
    {
    id: 6,
    image: prop6,
    title: "Mehran Seher Retreat",
    price: "400.00",
    address: "	Clifton Marine Karachi",
    description: "Commercial office space in the heart of business district",
    beds: 2,
    baths: 1,
    area: 180,
    agent: "Malik Ali",
  },
];


export const service = [
  {
    icon: MdNoteAlt,
    title: "Sell your home",
    desc: "We sell your home at the best market price",
  },
  {
    icon: FaHome,
    title: "Home loans",
    desc: "We offer you free consultancy to get a loan",
  },
  {
    icon: GoLaw,
    title: "Legal services",
    desc: "Expert legal help for all related property items",
  },
  {
    icon: FaSearch,
    title: "Home inspection",
    desc: "We make sure you get what you were promised",
  },
  {
    icon: FaNotesMedical,
    title: "Evaluation",
    desc: "We offer you free evaluation to get a mortgage loan",
  },
  {
    icon: FaCameraRetro,
    title: "Photoshoot",
    desc: "We prepare your home visual presentation",
  },
];

export const client = [
  {
    image: client1,
    name: "Fatima Khan",
    text: "Very trustworthy",
    feedback:
      "Their expert advice and personalized service made my property purchase smooth and stress-free.",
  },
  {
    image: client2,
    name: "Sana Iqbal",
    text: "Great experience",
    feedback:
      "Their professionalism and attention to detail helped me find the perfect investment property easily.",
  },
  {
    image: client3,
    name: "Ahmed Raza",
    text: "Highly professional!",
    feedback:
      "The team guided me flawlessly through buying my dream home with great dedication and honesty.",
  },
  {
    image: client4,
    name: "Usman Malik",
    text: "Exceptional support",
    feedback:
      "I highly recommend them for anyone seeking reliable real estate guidance and transparent dealings.",
  },
  {
    image: client5,
    name: "Ali Abbas",
    text: "Trusted advisors",
    feedback:
      "Thanks to their dedicated team, I secured a great property at a fair price without hassle.",
  },
  {
    image: client6,
    name: "Hassan Sheikh",
    text: "Outstanding service",
    feedback:
      "They made the entire process transparent and simple, exceeding all my expectations.",
  },
];

