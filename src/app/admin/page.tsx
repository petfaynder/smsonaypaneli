'use client';

import {
  IconUsers,
  IconMessage,
  IconCash,
  IconArrowUpRight,
  IconArrowDownRight
} from '@tabler/icons-react';

const stats = [
  {
    title: 'Toplam Kullanıcı',
    value: '1,234',
    change: '+12%',
    trend: 'up',
    icon: IconUsers,
    color: 'bg-blue-500'
  },
  {
    title: 'Aktif Numaralar',
    value: '456',
    change: '+5%',
    trend: 'up',
    icon: IconMessage,
    color: 'bg-green-500'
  },
  {
    title: 'Günlük Gelir',
    value: '₺12,345',
    change: '-2%',
    trend: 'down',
    icon: IconCash,
    color: 'bg-purple-500'
  }
];

const recentActivity = [
  {
    user: 'Ahmet Yılmaz',
    action: 'yeni numara satın aldı',
    time: '5 dakika önce',
    amount: '₺50'
  },
  {
    user: 'Mehmet Demir',
    action: 'bakiye yükledi',
    time: '15 dakika önce',
    amount: '₺100'
  },
  {
    user: 'Ayşe Kaya',
    action: 'yeni hesap oluşturdu',
    time: '1 saat önce',
    amount: '-'
  }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Genel Bakış</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="p-6 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                  <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {stat.trend === 'up' ? (
                  <IconArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <IconArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={`ml-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="ml-1 text-sm text-gray-600">geçen aya göre</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Son Aktiviteler</h2>
        </div>
        <div className="divide-y">
          {recentActivity.map((activity, index) => (
            <div key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{activity.amount}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 