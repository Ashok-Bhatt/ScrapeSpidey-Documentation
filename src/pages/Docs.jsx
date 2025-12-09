import React, { useEffect, useRef, useState } from 'react'
import { documentationData } from "../constants/index.jsx";
import { themeColors } from '../constants/classes.js';
import { useTheme } from "../context/themeContext.jsx"
import { useAuth } from "../context/authContext.jsx"
import { Play, LoaderCircle, Copy, RefreshCcw } from "lucide-react";
import { Loader } from "../components/export.js";
import axios from 'axios';
import toast from 'react-hot-toast';

function Docs() {
  const apiRef = useRef(null);
  const apiKeyRef = useRef(null);
  const { theme } = useTheme();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [sampleApiRequest, setSampleApiRequest] = useState("");
  const [sampleApiResponse, setSampleApiResponse] = useState("");
  const [paramValues, setParamValues] = useState({});
  const [sampleApiResponseColor, setSampleApiResponseColor] = useState(theme == "dark" ? "text-green-400" : "text-green-600");
  const [isRunning, setIsRunning] = useState(false);
  const [loaderAngle, setLoaderAngle] = useState(0);
  const data = documentationData[selectedCategory].endpoints[selectedEndpoint];


  // When user chooses option from sidebar
  useEffect(() => {
    const sampleRequest = data.example.request;
    const sampleResponse = data.example.response;
    setSampleApiResponse(JSON.stringify(sampleResponse, null, 2));
    setSampleApiRequest(sampleRequest);

    const initialParams = {};
    if (data.parameters) {
      data.parameters.forEach(param => {
        initialParams[param.name] = "";
      });
    }
    setParamValues(initialParams);
  }, [selectedCategory, selectedEndpoint]);

  // Setting the parameters value
  const handleParamChange = (name, value) => {
    setParamValues(prev => ({
      ...prev,
      [name]: value,
    }));

    const url = new URL(sampleApiRequest);
    const params = new URLSearchParams(url.search);

    params.set(name, value);
    url.search = params.toString();

    setSampleApiRequest(url.toString());
  };

  // Setting the parameters value to the default ones
  const handleSetDefault = (param) => {
    handleParamChange(param.name, param.example);
  };

  const runSampleAPI = async () => {
    setIsRunning(true);

    const timer = setInterval(() => {
      setLoaderAngle((prev) => (prev + 5) % 360);
    }, 20);

    axios
      .get(apiRef.current.value)
      .then((res) => {
        setSampleApiResponseColor(theme == "dark" ? "text-green-400" : "text-green-600");
        const data = res.data
        setSampleApiResponse(JSON.stringify(data, null, 2));
      })
      .catch((error) => {
        setSampleApiResponseColor(theme == "dark" ? "text-red-400" : "text-red-600");
        toast.error(error?.response?.data?.message || "Something Went Wrong");
        setSampleApiResponse(error.response.data.message);
      })
      .finally(() => {
        setIsRunning(false);
        setLoaderAngle(0);
        clearInterval(timer);
      })
  }

  const refreshSampleApiRequest = () => {
    setSampleApiRequest(data.example.request);
    const initialParams = {};
    if (data.parameters) {
      data.parameters.forEach(param => {
        initialParams[param.name] = "";
      });
    }
    setParamValues(initialParams);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleApiRequest);
    toast.success("API Endpoint Copied!");
  };

  return (
    <div className="flex h-full w-full">
      {/* Sidebar */}
      <aside className="w-64 p-4 overflow-y-auto">
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
                  className={`cursor-pointer px-3 py-2 rounded-md text-sm ${selectedCategory === catIndex && selectedEndpoint === epIndex
                      ? "bg-blue-600 text-white"
                      : `${themeColors["bg-secondary"]}`
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
      <main className="flex-1 p-8 overflow-y-auto no-scrollbar">
        <h2 className="text-3xl font-bold mb-4">{data.title}</h2>

        {/* Description */}
        <div className="space-y-2 mb-6">
          {data.description.map((desc, i) => (
            <p key={i}>
              {desc}
            </p>
          ))}
        </div>

        {/* Request Info */}
        <div className={`flex items-center gap-3 mb-6`}>
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-md ${data.request.colorClass.text} ${data.request.colorClass.bg}`}
          >
            {data.request.type}
          </span>
          <span className={`font-mono text-sm px-3 py-2 rounded ${themeColors["bg-secondary"]}`}>
            {data.request.url}
          </span>
        </div>

        {/* Parameters */}
        {data.parameters && data.parameters.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Parameters</h3>
            <table className="w-full border border-slate-300 dark:border-slate-700 rounded-md">
              <thead className={`${themeColors["bg-secondary"]}`}>
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Example</th>
                  <th className="px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {data.parameters.map((param, idx) => (
                  <tr key={idx} className="border-t">
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
        <div className="mb-8 w-full">
          <h3 className="text-xl font-semibold mb-3">Example</h3>
          <div className="flex items-center gap-3 mb-3">
            <button className={`px-2 py-2 rounded-full shadow ${themeColors["bg-secondary"]} border-1 border-gray-500`}>
              {isRunning ? <LoaderCircle className='h-5 w-5' style={{ rotate: `${loaderAngle}deg` }} /> : <Play className='h-5 w-5' onClick={runSampleAPI} />}
            </button>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-md ${data.request.colorClass.text} ${data.request.colorClass.bg}`}
            >
              {data.request.type}
            </span>
            <input
              type="text"
              onChange={(e) => setSampleApiRequest(e.target.value)}
              value={sampleApiRequest}
              ref={apiRef}
              className="flex-1 px-3 py-2 font-mono border rounded-md"
            />
            <Copy size={18} onClick={handleCopy} />
            <RefreshCcw size={18} onClick={refreshSampleApiRequest} />
          </div>
          {/* Parameter Inputs Below Example */}
          {data.parameters && data.parameters.length > 0 && (
            <div className="mb-4 flex flex-col flex-wrap gap-4">
              {data.parameters.map((param, idx) => (
                <div key={idx} className="flex flex-col min-w-[180px]">
                  <label className="text-xs font-medium mb-1">{param.name}</label>
                  <div className="flex gap-2 items-center w-full">
                    {param.name == "apiKey" ? (
                      <>
                        <input
                          type="text"
                          ref={apiKeyRef}
                          value={paramValues[param.name] || ""}
                          onChange={(e) => handleParamChange(param.name, e.target.value)}
                          className="border px-2 py-1 rounded flex-1 min-w-0"
                          placeholder={param.example}
                        />
                        {user ? (
                          <button
                            className="px-2 py-1 rounded-lg bg-green-500 text-white text-md whitespace-nowrap"
                            style={{ minWidth: 90 }}
                            onClick={() => handleSetDefault({ ...param, ["example"]: user.apiKey })}
                          >
                            Attach API Key
                          </button>
                        ) : <button
                          className="px-2 py-1 rounded-lg bg-blue-400 text-white text-md whitespace-nowrap"
                          style={{ minWidth: 90 }}
                          type="button"
                          onClick={() => handleSetDefault(param)}
                        >
                          Set Default
                        </button>}
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={paramValues[param.name] || ""}
                          onChange={(e) => handleParamChange(param.name, e.target.value)}
                          className="border px-2 py-1 rounded flex-1 min-w-0"
                          placeholder={param.example}
                        />
                        <button
                          className="px-2 py-1 rounded-lg bg-blue-400 text-white text-md whitespace-nowrap"
                          style={{ minWidth: 90 }}
                          type="button"
                          onClick={() => handleSetDefault(param)}
                        >
                          Set Default
                        </button>
                      </>
                    )}
                  </div>
                  {param.name == "apiKey" && !user && (<p className='text-sm pt-1'><span className='text-red-500 font-bold'>NOTE: </span>This is just a sample API Key. This is not a valid one but you cab get a valid API Key by logging in on this website</p>)}
                </div>
              ))}
            </div>
          )}
          {!isRunning && <pre className={`${sampleApiResponseColor} mt-5 p-4 rounded-lg overflow-x-auto text-sm max-h-100 overflow-auto ${themeColors["bg-secondary"]}`}>
            {sampleApiResponse}
          </pre>}
          {isRunning && <Loader />}
        </div>

        {/* Quotas */}
        <div className="mt-6 text-sm">
          <h3 className="text-xl font-semibold mb-3">Quotas</h3>
          {data.quotasInfo}
        </div>
      </main>
    </div>
  );
}

export default Docs
