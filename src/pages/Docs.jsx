import React, {useEffect, useRef, useState} from 'react'
import {documentationData} from "../constants/index.jsx";
import {themeColors} from '../constants/classes.js';
import {useTheme} from "../context/themeContext.jsx"
import {useAuth} from "../context/authContext.jsx"
import {Play, Copy, RefreshCcw} from "lucide-react";
import axios from 'axios';
import toast from 'react-hot-toast';

function Docs() {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedEndpoint, setSelectedEndpoint] = useState(0);
    const [sampleApiRequest, setSampleApiRequest] = useState("");
    const [sampleApiResponse, setSampleApiResponse] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const apiRef = useRef(null); 
    const data = documentationData[selectedCategory].endpoints[selectedEndpoint];
    const {theme} = useTheme();
    const {user} = useAuth();

    useEffect(()=>{

      const sampleRequest = data.example.request;
      const sampleResponse = data.example.response;
      setSampleApiResponse(JSON.stringify(sampleResponse, null, 2));
      setSampleApiRequest(sampleRequest);
    }, [selectedCategory, selectedEndpoint]);

    const runSampleAPI = async () => {
      setIsRunning(true);

      axios
      .get(apiRef.current.value)
      .then((res)=>{
        if (res.status < 400){
          const data = res.data
          setSampleApiResponse(JSON.stringify(data, null, 2));
        } else {
          toast.error("Something Went Wrong!");
        }
      })
      .catch((error)=>{
        toast.error("Something went Wrong!");
      })
      .finally(()=>{
        setIsRunning(false);
      })
    }

    const attachApiKey = () => {
      const regex = /apiKey=[a-zA-Z0-9-]*/g;
      const match = sampleApiRequest.match(regex);
      
      if (match){
        const newSampleRequest = sampleApiRequest.replaceAll(regex, "&apiKey=" + user.apiKey);
        setSampleApiRequest(newSampleRequest);
      } else {
        const newSampleRequest = sampleApiRequest + "&apiKey=" + user.apiKey;
        setSampleApiRequest(newSampleRequest);
      }
    }

    const refreshSampleApiRequest = ()=>{
      setSampleApiRequest(data.example.request);
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
                    className={`cursor-pointer px-3 py-2 rounded-md text-sm ${
                      selectedCategory === catIndex && selectedEndpoint === epIndex
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
              className={`px-3 py-1 text-sm font-semibold rounded-md bg-${data.request.color}/20 text-${data.request.color}`}
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
                {isRunning ? <img src='/Images/run_button_active.gif' className='w-5 h-5 rounded-full'/> : <Play className='h-5 w-5' onClick={runSampleAPI}/>}
              </button>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-md text-${data.request.color}`}
              >
                {data.request.type}
              </span>
              <input
                type="text"
                onChange={(e)=>setSampleApiRequest(e.target.value)}
                value={sampleApiRequest}
                ref={apiRef}
                className="flex-1 px-3 py-2 font-mono border rounded-md"
              />
              <Copy size={18} onClick={handleCopy}/>
              <RefreshCcw size={18} onClick={refreshSampleApiRequest}/>
            </div>
            {user && <div className='flex w-full justify-end'>
              <button className='justify-self-end-safe px-2 py-1 rounded-lg bg-green-500' onClick={attachApiKey}>Attach API Key</button>
            </div>}
            <pre className={`${theme=="dark" ? 'text-green-400' : 'text-green-600'} mt-5 p-4 rounded-lg overflow-x-auto text-sm max-h-100 overflow-auto ${themeColors["bg-secondary"]}`}>
              {sampleApiResponse}
            </pre>
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
