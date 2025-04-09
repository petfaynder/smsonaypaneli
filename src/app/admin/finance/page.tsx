'use client';

import { useState } from 'react';
import {
  IconSearch,
  IconFilter,
  IconDownload,
  IconPlus,
  IconCreditCard,
  IconWallet,
  IconCheck,
  IconX,
  IconClock
} from '@tabler/icons-react';

// Örnek işlem verileri
const transactions = [
  {
    id: 1,
    user: 'Ahmet Yılmaz',
    type: 'deposit',
    amount: '₺1,000',
    status: 'completed',
    date: '2024-04-06 15:30',
    method: 'Kredi Kartı',
  },
  {
    id: 2,
    user: 'Mehmet Demir',
    type: 'withdrawal',
    amount: '₺500',
    status: 'pending',
    date: '2024-04-06 14:45',
    method: 'Banka Transferi',
  },
  {
    id: 3,
    user: 'Ayşe Kaya',
    type: 'deposit',
    amount: '₺750',
    status: 'failed',
    date: '2024-04-06 13:15',
    method: 'Kredi Kartı',
  },
];

// Örnek ödeme yöntemleri
const paymentMethods = [
  {
    id: 1,
    name: 'Kredi Kartı',
    provider: 'iyzico',
    status: 'active',
    totalTransactions: '1,234',
    totalAmount: '₺45,678',
  },
  {
    id: 2,
    name: 'Banka Transferi',
    provider: 'Manual',
    status: 'active',
    totalTransactions: '567',
    totalAmount: '₺23,456',
  },
  {
    id: 3,
    name: 'Havale/EFT',
    provider: 'Manual',
    status: 'inactive',
    totalTransactions: '89',
    totalAmount: '₺12,345',
  },
];

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState('transactions');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(transaction =>
    transaction.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Finansal İşlemler</h1>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          <IconPlus className="w-4 h-4 mr-2" />
          Yeni İşlem
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'transactions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('transactions')}
          >
            İşlemler
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'payment-methods'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('payment-methods')}
          >
            Ödeme Yöntemleri
          </button>
        </nav>
      </div>

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <>
          {/* Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="İşlem ara..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50">
                <IconFilter className="w-4 h-4 mr-2" />
                Filtrele
              </button>
              <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50">
                <IconDownload className="w-4 h-4 mr-2" />
                Dışa Aktar
              </button>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kullanıcı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tutar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Yöntem
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{transaction.user}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.type === 'deposit'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.type === 'deposit' ? 'Yatırım' : 'Çekim'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{transaction.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.status === 'completed' ? (
                          <IconCheck className="w-3 h-3 mr-1" />
                        ) : transaction.status === 'pending' ? (
                          <IconClock className="w-3 h-3 mr-1" />
                        ) : (
                          <IconX className="w-3 h-3 mr-1" />
                        )}
                        {transaction.status === 'completed'
                          ? 'Tamamlandı'
                          : transaction.status === 'pending'
                          ? 'Beklemede'
                          : 'Başarısız'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {transaction.method === 'Kredi Kartı' ? (
                          <IconCreditCard className="w-4 h-4 mr-2 text-gray-400" />
                        ) : (
                          <IconWallet className="w-4 h-4 mr-2 text-gray-400" />
                        )}
                        <span className="text-sm text-gray-500">
                          {transaction.method}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'payment-methods' && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="bg-white rounded-lg shadow-sm p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{method.name}</h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    method.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {method.status === 'active' ? (
                    <IconCheck className="w-3 h-3 mr-1" />
                  ) : (
                    <IconX className="w-3 h-3 mr-1" />
                  )}
                  {method.status === 'active' ? 'Aktif' : 'Pasif'}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sağlayıcı</span>
                  <span className="font-medium">{method.provider}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Toplam İşlem</span>
                  <span className="font-medium">{method.totalTransactions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Toplam Tutar</span>
                  <span className="font-medium">{method.totalAmount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 