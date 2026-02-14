// ICONS
import { BsStars } from "react-icons/bs";

export default function Suggestions() {
  return (
    <div className="p-6 w-full">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Suggestions
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Complete suggested questions to help Lyro handle similar queries, 
          based on unanswered customer issues and past operator Q&A.
        </p>
      </div>

      {/* SUGGESTIONS INFO BANNER */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-6">
        <h2 className="text-base font-semibold text-gray-900">
          Boost the AI Agent knowledge
        </h2>

        <p className="text-sm text-gray-600 mt-2 leading-relaxed max-w-3xl">
          The AI Agent collects similar unanswered questions or questions previously 
          resolved by operators and suggests answers. Just review and add them –
          they’ll appear in <span className="font-medium text-gray-800">Knowledge {" > "} Data sources</span> 
          and help both the AI Agent and Copilot respond better.
        </p>

        <button className="flex items-center gap-2 text-sm mt-3 text-blue-600 font-medium hover:underline">
          <BsStars size={16} />
          Learn about Suggestions
        </button>
      </div>

      {/* EMPTY STATE CONTAINER */}
      <div className="bg-white mt-6 rounded-2xl border border-gray-200 shadow-sm min-h-[420px] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center px-6">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <BsStars size={22} />
          </div>

          <h3 className="text-lg font-semibold text-gray-700">
            No suggestions to review
          </h3>

          <p className="text-sm text-gray-500 max-w-[450px] leading-relaxed">
            The AI Agent will add its own unanswered customer questions or those 
            resolved by operators. Add these suggestions to Lyro knowledge to 
            improve resolution rates.
          </p>

          <button className="text-blue-600 text-sm font-medium hover:underline">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
}
