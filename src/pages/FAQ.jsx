import { faqs } from "../constants/index.jsx";
import {FaqCard} from "../components/export.js"

function FAQ() {

  return (
    <div className="grid gap-4">
      {faqs.map((faq, idx) => (
        <FaqCard key={idx} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}

export default FAQ;