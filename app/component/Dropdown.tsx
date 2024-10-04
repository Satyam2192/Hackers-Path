import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface DropdownProps {
  faqs: FAQItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-green-500 rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
          <button
            className="w-full px-6 py-4 text-left text-white flex justify-between items-center hover:bg-green-500/10 transition-colors duration-200"
            onClick={() => toggleDropdown(index)}
          >
            <p className="text-xl text-green-500 font-semibold">{faq.question}</p>
            <ChevronDown
              className={`text-green-500 transform transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`px-6 py-4 bg-black/20 transition-all duration-300 ease-in-out ${
              openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-white text-lg font-medium">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dropdown;