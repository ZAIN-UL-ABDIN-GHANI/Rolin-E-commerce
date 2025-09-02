import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const feedbacks = [
    {
    "userId": 1,
    "name": "Ayesha Khan",
    "location": "Lahore, Pakistan",
    "designation": "Verified Buyer",
    "avatar": "https://randomuser.me/api/portraits/women/44.jpg",
    "message": "Amazing quality! The shoes I ordered were exactly as shown and delivered in just 3 days.",
    "rating": 5
  },
  {
    "userId": 2,
    "name": "David Smith",
    "location": "London, UK",
    "designation": "Verified Buyer",
    "avatar": "https://randomuser.me/api/portraits/men/12.jpg",
    "message": "Fast delivery and the packaging was excellent. Definitely shopping again.",
    "rating": 4
  },
  {
    "userId": 3,
    "name": "Maria Gonzalez",
    "location": "Madrid, Spain",
    "designation": "Repeat Customer",
    "avatar": "https://randomuser.me/api/portraits/women/36.jpg",
    "message": "I bought a handbag and it looks premium. Great value for money!",
    "rating": 5
  },
  {
    "userId": 4,
    "name": "Ali Raza",
    "location": "Karachi, Pakistan",
    "designation": "Verified Buyer",
    "avatar": "https://randomuser.me/api/portraits/men/28.jpg",
    "message": "The customer support team was very helpful when I had to change my delivery address.",
    "rating": 4
  }
  ];

  return (
    <div className="px-4 py-10 bg-gray-50 overflow-hidden">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
        What Our Customers Say
      </h1>
         <Slider {...settings}>
        {feedbacks.map((t) => (
          <div key={t.userId} className="px-4">
            <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center transition-transform hover:scale-90">
              {/* Avatar */}
              <img
                src={t.avatar}
                alt={t.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 mb-4 shadow-md"
              />

              {/* Name */}
              <h2 className="text-lg font-semibold">{t.name}</h2>

              {/* Designation */}
              <p className="text-sm text-gray-500 mb-3">{t.designation}</p>

              {/* Message */}
              <p className="text-gray-700 italic mb-4 leading-relaxed">
                "{t.message}"
              </p>

              {/* Rating */}
              <div className="flex text-yellow-500">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
                {Array.from({ length: 5 - t.rating }).map((_, i) => (
                  <span key={i}>☆</span>
                ))}
              </div>
            </div>
          </div> 
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
