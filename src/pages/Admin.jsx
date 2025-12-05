import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Loader2, Lock, Github } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';

const GITHUB_OWNER = 'gilez';
const GITHUB_REPO = 'trueai';
const FILE_PATH = 'public/data/news.json';

const Admin = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [token, setToken] = useState('');
    const [showTokenModal, setShowTokenModal] = useState(false);
    const [pendingAction, setPendingAction] = useState(null); // { type: 'save' | 'delete', data: ... }
    const [statusMsg, setStatusMsg] = useState('');

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await fetch(`${import.meta.env.BASE_URL}data/news.json?t=${new Date().getTime()}`);
            if (!response.ok) throw new Error('Failed to fetch news');
            const data = await response.json();
            setNews(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
        } catch (error) {
            console.error('Error fetching news:', error);
            setStatusMsg('Failed to load news data.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddNew = () => {
        setEditingItem({
            id: Date.now(), // Temporary ID
            title: '',
            date: new Date().toISOString().split('T')[0],
            category: 'notice',
            summary: '',
            content: '',
            image: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem({ ...item });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        setPendingAction({ type: 'delete', data: id });
        setShowTokenModal(true);
    };

    const handleSaveClick = (e) => {
        e.preventDefault();
        setPendingAction({ type: 'save', data: editingItem });
        setShowTokenModal(true);
    };

    const executeGitHubAction = async () => {
        setStatusMsg('Processing...');
        try {
            // 1. Get current file SHA
            const getResponse = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!getResponse.ok) throw new Error('Invalid Token or File Not Found');
            const fileData = await getResponse.json();
            const currentSha = fileData.sha;

            // 2. Prepare new content
            let newNewsList = [...news];
            if (pendingAction.type === 'save') {
                const index = newNewsList.findIndex(item => item.id === pendingAction.data.id);
                if (index > -1) {
                    newNewsList[index] = pendingAction.data;
                } else {
                    newNewsList.unshift(pendingAction.data);
                }
            } else if (pendingAction.type === 'delete') {
                newNewsList = newNewsList.filter(item => item.id !== pendingAction.data);
            }

            // Encode content to Base64 (handling UTF-8)
            const content = btoa(unescape(encodeURIComponent(JSON.stringify(newNewsList, null, 4))));

            // 3. Commit update
            const putResponse = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `Update news via CMS: ${pendingAction.type === 'save' ? pendingAction.data.title : 'Delete item'}`,
                    content: content,
                    sha: currentSha
                })
            });

            if (!putResponse.ok) throw new Error('Failed to update GitHub');

            setStatusMsg('Success! Changes will appear in a few minutes.');
            setNews(newNewsList);
            setIsModalOpen(false);
            setShowTokenModal(false);
            setToken(''); // Clear token for security
            setPendingAction(null);

        } catch (error) {
            console.error(error);
            setStatusMsg(`Error: ${error.message}`);
        }
    };

    return (
        <Section className="py-20 min-h-screen">
            <div className="container-custom">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">News Management</h1>
                    <button onClick={handleAddNew} className="btn-primary flex items-center gap-2">
                        <Plus size={20} /> Add News
                    </button>
                </div>

                {statusMsg && (
                    <div className={`p-4 mb-6 rounded-lg ${statusMsg.includes('Error') ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                        {statusMsg}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
                ) : (
                    <div className="grid gap-4">
                        {news.map(item => (
                            <Card key={item.id} className="p-4 flex justify-between items-center group hover:border-primary/50 transition-colors">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className={`text-xs px-2 py-0.5 rounded-full border ${item.category === 'notice' ? 'border-blue-500 text-blue-500' : 'border-primary text-primary'}`}>
                                            {item.category}
                                        </span>
                                        <span className="text-xs text-muted-foreground">{item.date}</span>
                                    </div>
                                    <h3 className="font-bold">{item.title}</h3>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(item)} className="p-2 hover:bg-muted rounded-full text-blue-500"><Edit size={18} /></button>
                                    <button onClick={() => handleDeleteClick(item.id)} className="p-2 hover:bg-muted rounded-full text-red-500"><Trash2 size={18} /></button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-background border border-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                            <div className="p-6 border-b border-border flex justify-between items-center sticky top-0 bg-background z-10">
                                <h2 className="text-xl font-bold">{editingItem.id ? 'Edit News' : 'New News'}</h2>
                                <button onClick={() => setIsModalOpen(false)}><X /></button>
                            </div>
                            <form onSubmit={handleSaveClick} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-muted/50 border border-border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                                        value={editingItem.title}
                                        onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Date</label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full bg-muted/50 border border-border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                                            value={editingItem.date}
                                            onChange={e => setEditingItem({ ...editingItem, date: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Category</label>
                                        <select
                                            className="w-full bg-muted/50 border border-border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                                            value={editingItem.category}
                                            onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                                        >
                                            <option value="notice">Notice</option>
                                            <option value="seminar">Seminar</option>
                                            <option value="achievement">Achievement</option>
                                            <option value="event">Event</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Image URL (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="/assets/news/..."
                                        className="w-full bg-muted/50 border border-border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                                        value={editingItem.image || ''}
                                        onChange={e => setEditingItem({ ...editingItem, image: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Summary</label>
                                    <textarea
                                        rows="2"
                                        className="w-full bg-muted/50 border border-border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                                        value={editingItem.summary}
                                        onChange={e => setEditingItem({ ...editingItem, summary: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Content</label>
                                    <textarea
                                        rows="6"
                                        className="w-full bg-muted/50 border border-border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                                        value={editingItem.content}
                                        onChange={e => setEditingItem({ ...editingItem, content: e.target.value })}
                                    />
                                </div>
                                <div className="pt-4 flex justify-end gap-3">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg hover:bg-muted transition-colors">Cancel</button>
                                    <button type="submit" className="btn-primary">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Token Modal */}
                {showTokenModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <div className="bg-background border border-border rounded-xl w-full max-w-md shadow-2xl p-6">
                            <div className="flex items-center gap-3 mb-4 text-primary">
                                <Lock size={24} />
                                <h3 className="text-xl font-bold">Security Check</h3>
                            </div>
                            <p className="text-muted-foreground mb-6">
                                To {pendingAction?.type} this item, please enter your GitHub Personal Access Token. This acts as your password.
                            </p>
                            <input
                                type="password"
                                placeholder="ghp_..."
                                className="w-full bg-muted/50 border border-border rounded-lg p-3 mb-6 focus:ring-2 focus:ring-primary outline-none font-mono"
                                value={token}
                                onChange={e => setToken(e.target.value)}
                            />
                            <div className="flex justify-end gap-3">
                                <button onClick={() => { setShowTokenModal(false); setToken(''); }} className="px-4 py-2 rounded-lg hover:bg-muted transition-colors">Cancel</button>
                                <button
                                    onClick={executeGitHubAction}
                                    disabled={!token}
                                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Confirm & {pendingAction?.type === 'save' ? 'Save' : 'Delete'}
                                </button>
                            </div>
                            <div className="mt-4 text-xs text-center text-muted-foreground">
                                <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1 hover:text-primary">
                                    <Github size={12} /> Get a token from GitHub Settings
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Section>
    );
};

export default Admin;
