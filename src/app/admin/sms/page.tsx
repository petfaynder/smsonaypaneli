'use client';

import { useState } from 'react';
import {
  IconSettings,
  IconRefresh,
  IconCheck,
  IconX,
  IconPlus
} from '@tabler/icons-react';

// Örnek servis verileri
const services = [
  {
    id: 1,
    name: 'WhatsApp',
    provider: 'SMS Activate',
    price: '₺2.50',
    status: 'active',
    successRate: '98%',
    totalOrders: '1,234',
  },
  {
    id: 2,
    name: 'Telegram',
    provider: '5sim',
    price: '₺1.75',
    status: 'active',
    successRate: '95%',
    totalOrders: '856',
  },
  {
    id: 3,
    name: 'Instagram',
    provider: 'Grizzly SMS',
    price: '₺3.00',
    status: 'inactive',
    successRate: '92%',
    totalOrders: '432',
  },
];

// Örnek sağlayıcı verileri
const providers = [
  {
    id: 1,
    name: 'SMS Activate',
    apiKey: '••••••••••••••••',
    balance: '₺5,000',
    status: 'active',
  },
  {
    id: 2,
    name: '5sim',
    apiKey: '••••••••••••••••',
    balance: '₺3,500',
    status: 'active',
  },
  {
    id: 3,
    name: 'Grizzly SMS',
    apiKey: '••••••••••••••••',
    balance: '₺2,800',
    status: 'inactive',
  },
];

export default function SMSServicesPage() {
  const [activeTab, setActiveTab] = useState('services');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">SMS Servisleri</h1>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          <IconPlus className="w-4 h-4 mr-2" />
          Yeni Servis
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'services'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('services')}
          >
            Servisler
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'providers'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('providers')}
          >
            Sağlayıcılar
          </button>
        </nav>
      </div>

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-sm p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{service.name}</h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    service.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {service.status === 'active' ? 'Aktif' : 'Pasif'}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sağlayıcı</span>
                  <span className="font-medium">{service.provider}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Fiyat</span>
                  <span className="font-medium">{service.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Başarı Oranı</span>
                  <span className="font-medium">{service.successRate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Toplam Sipariş</span>
                  <span className="font-medium">{service.totalOrders}</span>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-2 pt-4 border-t">
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <IconSettings className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <IconRefresh className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Providers Tab */}
      {activeTab === 'providers' && (
        <div className="bg-white rounded-lg shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sağlayıcı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  API Anahtarı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bakiye
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {providers.map((provider) => (
                <tr key={provider.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{provider.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{provider.apiKey}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{provider.balance}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        provider.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {provider.status === 'active' ? (
                        <IconCheck className="w-3 h-3 mr-1" />
                      ) : (
                        <IconX className="w-3 h-3 mr-1" />
                      )}
                      {provider.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      <IconSettings className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 