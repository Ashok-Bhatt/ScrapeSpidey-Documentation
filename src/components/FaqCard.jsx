import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function FaqCard(props) {

  const [open, setOpen] = useState(false);
  const { question, answer } = props;

  return (
    <div className="p-4 rounded-lg shadow-md bg-[rgb(var(--bg))] border border-[rgb(var(--secondary))]" onClick={() => setOpen((prev) => !prev)}>
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-[rgb(var(--primary))]">{question}</h4>
        <div
          className="ml-2 text-[rgb(var(--primary))] text-lg focus:outline-none"
          aria-label={open ? "Close answer" : "Open answer"}
        >
          {open ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>
      {open && (
        <p className="mt-2 text-sm text-[rgb(var(--text))]">{answer}</p>
      )}
    </div>
  );
}

export default FaqCard;