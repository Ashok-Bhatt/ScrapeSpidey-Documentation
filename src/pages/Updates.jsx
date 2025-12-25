import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { conf } from '../utils/config';
import { NewsCard } from '../components/export.js';
import { themeColors } from '../constants/classes.js';
import toast from 'react-hot-toast';

const Updates = () => {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${conf.serverBaseUrl}/api/v1/news`);
            setNewsList(res.data.news);
        } catch (error) {
            console.error("Error fetching news:", error);
            toast.error(error?.response?.data?.message || "Something Went Wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 lg:p-10">
            <h2 className={`text-3xl font-bold mb-8 text-center ${themeColors.text}`}>Updates</h2>

            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <p className={`text-lg ${themeColors.text}`}>Loading latest updates...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsList.length > 0 ? (
                        newsList.map(news => (
                            <NewsCard
                                key={news._id}
                                news={news}
                                themeColors={themeColors}
                                // Admin actions not needed here for general users
                                onEdit={() => { }}
                                onDelete={() => { }}
                            />
                        ))
                    ) : (
                        <p className={`text-lg ${themeColors.text}`}>No updates found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Updates;