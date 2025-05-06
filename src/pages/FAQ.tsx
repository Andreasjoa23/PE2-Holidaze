import React, { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How do I book a stay?",
    answer:
      "Just refine your search on the Venues page, pick dates, guests, and click “Search”. Select your favorite stay and click “Book Now” to complete your reservation.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes—visit your Profile > Bookings, choose the upcoming stay, and follow the prompts to modify or cancel (subject to the venue’s cancellation policy).",
  },
  {
    question: "Do hosts provide extra cleaning services?",
    answer:
      "Many hosts offer optional cleaning add-ons. Check the venue’s Amenities section when booking, or contact the host directly via the message center.",
  },
];

const mailtoLink = `mailto:support@holidaze.com?subject=FAQ%20Question&body=Hi%20Holidaze%2C%0A%0AI%20have%20a%20question%20regarding...`;

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto py-20 px-4 bg-white">
      <h1 className="text-4xl font-extrabold text-[#0E1E34] text-center mb-12">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="w-full p-4 text-left flex justify-between items-center"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              <span className="text-2xl text-gray-400">
                {openIndex === idx ? "−" : "+"}
              </span>
            </button>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                openIndex === idx
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="px-4 overflow-hidden text-gray-700"
            >
              <p className="pb-4">{faq.answer}</p>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="mb-4 text-gray-600">
          Didn’t find what you’re looking for?
        </p>
        <a
          href={mailtoLink}
          className="inline-block bg-[#0E1E34] text-white px-6 py-3 rounded-full font-medium hover:bg-[#182944] transition"
        >
          Contact Support
        </a>
      </div>
    </section>
  );
};

export default FAQ;
