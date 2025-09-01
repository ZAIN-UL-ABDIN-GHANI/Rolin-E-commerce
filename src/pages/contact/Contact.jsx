import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDarkMode } from "../../components/DarkModeContext";

function Contact() {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 700,
      easing: "ease-in-sine",
      delay: 90,
    });
    AOS.refresh();
  }, []);

  const { darkMode } = useDarkMode();

  const newLocal = "Type Your Massage Here ......";
  return (
    <div
      id="contact"
      className={`${darkMode ? "bg-black" : " light bg-transparent"} pb-20`}
    >
      <section
        className={`${darkMode ? "bg-gray-800" : " light bg-gray-100"}
        } lg:w-[95%] w-full h-fit m-auto rounded-xl grid lg:grid-cols-2 grid-cols-1  justify-center items-start lg:px-36 px-6 py-20 gap-10`}
      >
        <div
          data-aos="zoom-in"
          className="bg-white dark:bg-black p-10 flex flex-col  justify-center items-start gap-4 rounded-xl"
        >
          <h1 className="text-black  font-semibold dark:text-white">
            Send a Massage today
          </h1>
          <input
            type="text"
            placeholder="Enter Your Name Here"
            className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl"
          />
          <input
            type="email"
            placeholder="Enter Your Valid Email "
            className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl"
          />
          <input
            type="tel"
            placeholder="Enter Your Valid Phone Number "
            className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl"
          />
          <textarea
            id="massage"
            cols="30"
            row="6"
            placeholder={newLocal}
            className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl"
          ></textarea>

          <button className="bg-gray-600 w-full text-md px-8 py-3  text-white  font-semibold rounded-xl hover:bg-black dark:bg-gray-700 cursor-pointer">
            SEND EMAIL
          </button>
        </div>
        <div className="flex flex-col justify-center items-start gap-8 lg:p-10 p-2 ">
          <h1
            data-aos="zoom in "
            data-aos-delay="200"
            className="text-gray-500 dark:text-white"
          >
            REACH US
          </h1>
          <h1
            data-aos="zoom in "
            data-aos-delay="400"
            className="text-black text-[40px] font-samibold leading-10 dark:text-white"
          >
            We are ready to help — contact us today!
          </h1>
          <p
            data-aos="zoom-in"
            data-aos-delay="500"
            className="text-xl text-gray-600 text-justify dark:text-white"
          >
            Our dedicated team listens, understands, and delivers personalized
            guidance—making your Shoping journey smooth, transparent, and
            truly rewarding. Contact us now to turn your products dreams into
            reality.
          </p>
          <button className="bg-gray-600 text-md px-8 py-3  text-white  font-semibold rounded-xl hover:bg-black dark:hover:bg-white dark:hover:text-black cursor-pointer">
            READ MORE
          </button>
        </div>
      </section>
    </div>
  );
}

export default Contact;
