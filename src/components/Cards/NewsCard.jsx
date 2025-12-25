import React from 'react';
import { AdminRenderer } from '../../layouts/export.js';

const NewsCard = ({ news, onEdit, onDelete, themeColors }) => {
    return (
        <div key={news._id} className={`border rounded shadow overflow-hidden flex flex-col md:col-span-2 lg:col-span-3 ${themeColors.bg} ${themeColors.border}`}>
            <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
            <div className="p-4 flex-1 flex flex-col">
                <h3 className={`text-lg font-bold mb-2 ${themeColors.text}`}>{news.title}</h3>
                <p className={`text-sm ${themeColors.secondary} mb-2`}>{new Date(news.date).toDateString()}</p>
                <p className={`${themeColors.text} opacity-80 flex-1 line-clamp-3`}>{news.description}</p>
                <AdminRenderer>
                    <div className="mt-4 flex gap-5 justify-end">
                        <button onClick={() => onEdit(news)} className="text-blue-600  hover:text-blue-800 font-medium cursor-pointer">Edit</button>
                        <button onClick={() => onDelete(news._id)} className="text-red-600 hover:text-red-800 font-medium cursor-pointer">Delete</button>
                    </div>
                </AdminRenderer>
            </div>
        </div>
    );
};

export default NewsCard;
