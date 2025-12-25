import { faqs } from "../constants/index.jsx";
import {FaqCard} from "../components/export.js"

function FAQ() {

  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-bold text-center my-5">Frequently Asked Questions</h2>
      {faqs.map((faq, idx) => (
        <FaqCard key={idx} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}

export default FAQ;