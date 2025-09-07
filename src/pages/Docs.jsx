import React, {useState} from 'react'
import { documentationData } from "../constants/index.jsx";

function Docs() {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedEndpoint, setSelectedEndpoint] = useState(0);
    const data = documentationData[selectedCategory].endpoints[selectedEndpoint];

    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-100 border-r border-slate-300 dark:border-slate-700 p-4 overflow-y-auto">
          {documentationData.map((platform, catIndex) => (
            <div key={catIndex} className="mb-6">
              <h3 className="text-lg font-bold mb-3 border-b border-gray-500">{platform.category}</h3>
              <ul className="space-y-2">
                {platform.endpoints.map((ep, epIndex) => (
                  <li
                    key={epIndex}
                    onClick={() => {
                      setSelectedCategory(catIndex);
                      setSelectedEndpoint(epIndex);
                    }}
                    className={`cursor-pointer px-3 py-2 rounded-md text-sm ${
                      selectedCategory === catIndex && selectedEndpoint === epIndex
                        ? "bg-blue-600 text-white"
                        : "hover:bg-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    {ep.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Main Body */}
        <main className="flex-1 p-8 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-4">{data.title}</h2>

          {/* Description */}
          <div className="space-y-2 mb-6">
            {data.description.map((desc, i) => (
              <p key={i} className="text-gray-700 dark:text-gray-300">
                {desc}
              </p>
            ))}
          </div>

          {/* Request Info */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-md bg-${data.request.color}/20 text-${data.request.color}`}
            >
              {data.request.type}
            </span>
            <span className="font-mono text-sm bg-slate-200 dark:bg-slate-800 px-3 py-2 rounded">
              {data.request.url}
            </span>
          </div>

          {/* Parameters */}
          {data.parameters && data.parameters.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Parameters</h3>
              <table className="w-full border border-slate-300 dark:border-slate-700 rounded-md">
                <thead className="bg-slate-200 dark:bg-slate-800">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Example</th>
                    <th className="px-4 py-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {data.parameters.map((param, idx) => (
                    <tr key={idx} className="border-t border-slate-300 dark:border-slate-700">
                      <td className="px-4 py-2 font-mono">{param.name}</td>
                      <td className="px-4 py-2">{param.type}</td>
                      <td className="px-4 py-2">{param.example}</td>
                      <td className="px-4 py-2">{param.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Example Request */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Example</h3>
            <div className="flex items-center gap-3 mb-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700">
                Run
              </button>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-md bg-${data.request.color}/20 text-${data.request.color}`}
              >
                {data.request.type}
              </span>
              <input
                type="text"
                defaultValue={data.example.request}
                className="flex-1 px-3 py-2 font-mono border rounded-md bg-slate-100 dark:bg-slate-800 dark:text-gray-200"
              />
            </div>
            <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
              {JSON.stringify(data.example.response, null, 2)}
            </pre>
          </div>

          {/* Quotas */}
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            {data.quotasInfo}
          </div>
        </main>
      </div>
  );
}

export default Docs
