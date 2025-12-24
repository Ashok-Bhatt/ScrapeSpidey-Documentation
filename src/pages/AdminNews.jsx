import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { conf } from '../utils/config';
import { useAuth } from '../context/authContext';
import toast from 'react-hot-toast';
import { ConfirmationModal } from '../components/export.js';
import { themeColors } from '../constants/classes.js';

function AdminNews() {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    // Form State
    const [isEditing, setIsEditing] = useState(false);
    const [currentNewsId, setCurrentNewsId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        newsImage: null
    });
    const [showForm, setShowForm] = useState(false);

    // Confirmation Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newsToDelete, setNewsToDelete] = useState(null);

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

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "newsImage") {
            setFormData(prev => ({ ...prev, newsImage: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        if (formData.date) data.append("date", formData.date);
        if (formData.newsImage) data.append("newsImage", formData.newsImage);
        if (isEditing && currentNewsId) data.append("id", currentNewsId);

        try {
            const url = `${conf.serverBaseUrl}/api/v1/news`;
            const config = { headers: { Authorization: `Bearer ${token}` } };

            let res;
            if (isEditing) {
                res = await axios.patch(url, data, config);
                toast.success("News updated");
            } else {
                res = await axios.post(url, data, config);
                toast.success("News created");
            }

            fetchNews();
            resetForm();
        } catch (error) {
            console.error("Error saving news:", error);
            toast.error(error?.response?.data?.message || "Something Went Wrong");
        }
    };

    const handleEdit = (news) => {
        setFormData({
            title: news.title,
            description: news.description,
            date: news.date ? new Date(news.date).toISOString().split('T')[0] : "",
            newsImage: null // Requires re-upload to change
        });
        setCurrentNewsId(news._id);
        setIsEditing(true);
        setShowForm(true);
    };

    const onDeleteClick = (newsId) => {
        setNewsToDelete(newsId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!newsToDelete) return;
        try {
            await axios.delete(`${conf.serverBaseUrl}/api/v1/news?id=${newsToDelete}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("News deleted");
            fetchNews();
        } catch (error) {
            console.error("Error deleting news:", error);
            toast.error(error?.response?.data?.message || "Something Went Wrong");
        } finally {
            setShowDeleteModal(false);
            setNewsToDelete(null);
        }
    };

    const resetForm = () => {
        setFormData({ title: "", description: "", date: "", newsImage: null });
        setIsEditing(false);
        setCurrentNewsId(null);
        setShowForm(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className={`text-2xl font-bold ${themeColors.text}`}>News Management</h1>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Create News
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
                    <div className={`${themeColors.bg} border ${themeColors.border} p-6 rounded-lg w-full max-w-lg overflow-y-auto max-h-[90vh] shadow-xl`}>
                        <h2 className={`text-xl font-bold mb-4 ${themeColors.text}`}>{isEditing ? "Update News" : "Create News"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${themeColors.text}`}>Title</label>
                                <input
                                    type="text" name="title" required
                                    value={formData.title} onChange={handleInputChange}
                                    className={`w-full ${themeColors["bg-secondary"]} ${themeColors.text} border ${themeColors.border} rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-colors`}
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${themeColors.text}`}>Description</label>
                                <textarea
                                    name="description" required rows="4"
                                    value={formData.description} onChange={handleInputChange}
                                    className={`w-full ${themeColors["bg-secondary"]} ${themeColors.text} border ${themeColors.border} rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-colors resize-none`}
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${themeColors.text}`}>Date</label>
                                <input
                                    type="date" name="date"
                                    value={formData.date} onChange={handleInputChange}
                                    className={`w-full ${themeColors["bg-secondary"]} ${themeColors.text} border ${themeColors.border} rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-colors`}
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${themeColors.text}`}>Image {isEditing && "(Leave empty to keep existing)"}</label>
                                <input
                                    type="file" name="newsImage" accept="image/*"
                                    onChange={handleInputChange}
                                    className={`w-full ${themeColors["bg-secondary"]} ${themeColors.text} border ${themeColors.border} rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-colors`}
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button type="button" onClick={resetForm} className={`px-4 py-2 rounded ${themeColors["bg-secondary"]} border ${themeColors.border} ${themeColors.text} hover:opacity-80 transition-colors`}>Cancel</button>
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors shadow-sm">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {loading ? <p>Loading news...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsList.map(news => (
                        <div key={news._id} className={`border rounded shadow overflow-hidden flex flex-col md:col-span-2 lg:col-span-3 ${themeColors.bg} ${themeColors.border}`}>
                            <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className={`text-lg font-bold mb-2 ${themeColors.text}`}>{news.title}</h3>
                                <p className={`text-sm ${themeColors.secondary} mb-2`}>{new Date(news.date).toDateString()}</p>
                                <p className={`${themeColors.text} opacity-80 flex-1 line-clamp-3`}>{news.description}</p>
                                <div className="mt-4 flex gap-2 justify-end">
                                    <button onClick={() => handleEdit(news)} className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                                    <button onClick={() => onDeleteClick(news._id)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ConfirmationModal
                isOpen={showDeleteModal}
                title="Delete News"
                message="Are you sure you want to delete this news item? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                isDanger={true}
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
            />
        </div>
    );
}

export default AdminNews;
