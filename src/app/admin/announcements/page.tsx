'use client';

import { useState, useEffect } from 'react';
import { IconPlus, IconTrash, IconEdit } from '@tabler/icons-react';
import { toast } from 'react-hot-toast';

interface Announcement {
  id: number;
  title: string;
  content: string;
  type: 'dashboard' | 'notification';
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'dashboard' | 'notification'>('dashboard');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('/api/admin/announcements');
      const data = await response.json();
      if (response.ok) {
        setAnnouncements(data);
      } else {
        toast.error(data.message || 'Duyurular yüklenirken bir hata oluştu');
      }
    } catch (error) {
      toast.error('Duyurular yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId 
        ? `/api/admin/announcements/${editingId}`
        : '/api/admin/announcements';
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, type }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success(editingId ? 'Duyuru güncellendi' : 'Duyuru oluşturuldu');
        setTitle('');
        setContent('');
        setType('dashboard');
        setEditingId(null);
        fetchAnnouncements();
      } else {
        toast.error(data.message || 'Bir hata oluştu');
      }
    } catch (error) {
      toast.error('Bir hata oluştu');
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setTitle(announcement.title);
    setContent(announcement.content);
    setType(announcement.type);
    setEditingId(announcement.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu duyuruyu silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/admin/announcements/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Duyuru silindi');
        fetchAnnouncements();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Duyuru silinirken bir hata oluştu');
      }
    } catch (error) {
      toast.error('Duyuru silinirken bir hata oluştu');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Yükleniyor...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Duyuru Yönetimi</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 max-w-2xl">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Başlık
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            İçerik
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            rows={4}
            required
          />
        </div>
        
        <div>
          <label htmlFor="type" className="block text-sm font-medium mb-1">
            Tür
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as 'dashboard' | 'notification')}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="dashboard">Dashboard Duyurusu</option>
            <option value="notification">Bildirim</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center gap-2"
        >
          <IconPlus size={20} />
          {editingId ? 'Güncelle' : 'Oluştur'}
        </button>
      </form>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="p-4 border rounded-lg bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{announcement.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(announcement.createdAt).toLocaleDateString('tr-TR')}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(announcement)}
                  className="p-1 text-gray-600 hover:text-gray-900"
                >
                  <IconEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(announcement.id)}
                  className="p-1 text-red-600 hover:text-red-900"
                >
                  <IconTrash size={20} />
                </button>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{announcement.content}</p>
            <div className="mt-2">
              <span className={`text-xs px-2 py-1 rounded ${
                announcement.type === 'dashboard' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
              }`}>
                {announcement.type === 'dashboard' ? 'Dashboard' : 'Bildirim'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 