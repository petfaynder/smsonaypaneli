'use client';

import { useState, useEffect } from 'react';
import {
  IconCalendar,
  IconChartBar,
  IconChartPie,
  IconDownload,
  IconFilter,
  IconRefresh,
} from '@tabler/icons-react';
import * as XLSX from 'xlsx';

// Veri tipleri
interface ServiceStat {
  id: string;
  name: string;
  totalOrders: number;
  successRate: number;
  revenue: string;
  profit: string;
  profitMargin: number;
}

interface DailyStat {
  date: string;
  orders: number;
  revenue: string;
  profit: string;
}

interface ReportData {
  summary: {
    totalOrders: number;
    totalRevenue: string;
    totalProfit: string;
    profitMargin: string;
  };
  serviceStats: ServiceStat[];
  dailyStats: DailyStat[];
}

// Tarih aralığı seçenekleri
const dateRangeOptions = [
  { label: 'Bugün', value: 'today' },
  { label: 'Dün', value: 'yesterday' },
  { label: 'Son 1 Hafta', value: 'last7days' },
  { label: 'Son 1 Ay', value: 'last30days' },
  { label: 'Son 3 Ay', value: 'last90days' },
  { label: 'Son 6 Ay', value: 'last180days' },
  { label: 'Son 1 Yıl', value: 'last365days' },
];

export default function ReportsPage() {
  // Son 1 haftayı varsayılan tarih aralığı olarak ayarla
  const getDefaultDateRange = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 7); // 7 gün öncesi
    
    return {
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0],
    };
  };

  const [dateRange, setDateRange] = useState(getDefaultDateRange());
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeDateOption, setActiveDateOption] = useState('last7days'); // Varsayılan olarak son 1 hafta seçili

  // Verileri yükle
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // API URL'sini oluştur
      const url = new URL('/api/admin/reports', window.location.origin);
      if (dateRange.start) url.searchParams.append('startDate', dateRange.start);
      if (dateRange.end) url.searchParams.append('endDate', dateRange.end);

      // API'den verileri al
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error('Veriler alınırken bir hata oluştu');
      }

      const data = await response.json();
      setReportData(data);
    } catch (err) {
      console.error('Veri yükleme hatası:', err);
      setError('Veriler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  // Sayfa yüklendiğinde verileri getir
  useEffect(() => {
    fetchData();
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
    // Manuel tarih değişikliğinde aktif seçeneği temizle
    setActiveDateOption('');
  };

  // Hızlı tarih aralığı seçimi
  const handleQuickDateRangeSelect = (option: string) => {
    const end = new Date();
    const start = new Date();
    
    // Aktif seçeneği güncelle
    setActiveDateOption(option);
    
    switch (option) {
      case 'today':
        // Bugün
        setDateRange({
          start: end.toISOString().split('T')[0],
          end: end.toISOString().split('T')[0],
        });
        break;
      case 'yesterday':
        // Dün
        start.setDate(start.getDate() - 1);
        end.setDate(end.getDate() - 1);
        setDateRange({
          start: start.toISOString().split('T')[0],
          end: end.toISOString().split('T')[0],
        });
        break;
      case 'last7days':
        // Son 1 hafta
        start.setDate(start.getDate() - 7);
        setDateRange({
          start: start.toISOString().split('T')[0],
          end: end.toISOString().split('T')[0],
        });
        break;
      case 'last30days':
        // Son 1 ay
        start.setDate(start.getDate() - 30);
        setDateRange({
          start: start.toISOString().split('T')[0],
          end: end.toISOString().split('T')[0],
        });
        break;
      case 'last90days':
        // Son 3 ay
        start.setDate(start.getDate() - 90);
        setDateRange({
          start: start.toISOString().split('T')[0],
          end: end.toISOString().split('T')[0],
        });
        break;
      case 'last180days':
        // Son 6 ay
        start.setDate(start.getDate() - 180);
        setDateRange({
          start: start.toISOString().split('T')[0],
          end: end.toISOString().split('T')[0],
        });
        break;
      case 'last365days':
        // Son 1 yıl
        start.setDate(start.getDate() - 365);
        setDateRange({
          start: start.toISOString().split('T')[0],
          end: end.toISOString().split('T')[0],
        });
        break;
      default:
        break;
    }
  };

  const handleFilter = () => {
    fetchData();
  };

  // Excel'e dışa aktar
  const handleExport = () => {
    if (!reportData) return;

    // Excel için veri hazırla
    const workbook = XLSX.utils.book_new();

    // Özet sayfası
    const summaryData = [
      ['Rapor Özeti'],
      [''],
      ['Toplam Sipariş', reportData.summary.totalOrders],
      ['Toplam Gelir', reportData.summary.totalRevenue],
      ['Toplam Kar', reportData.summary.totalProfit],
      ['Kar Marjı', reportData.summary.profitMargin],
    ];
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Özet');

    // Servis istatistikleri
    const serviceHeaders = ['Servis', 'Toplam Sipariş', 'Başarı Oranı', 'Gelir', 'Kar', 'Kar Marjı'];
    const serviceData = reportData.serviceStats.map(service => [
      service.name,
      service.totalOrders,
      `%${service.successRate}`,
      service.revenue,
      service.profit,
      `%${service.profitMargin}`,
    ]);
    const serviceSheet = XLSX.utils.aoa_to_sheet([serviceHeaders, ...serviceData]);
    XLSX.utils.book_append_sheet(workbook, serviceSheet, 'Servis İstatistikleri');

    // Günlük istatistikler
    const dailyHeaders = ['Tarih', 'Sipariş Sayısı', 'Gelir', 'Kar'];
    const dailyData = reportData.dailyStats.map(stat => [
      stat.date,
      stat.orders,
      stat.revenue,
      stat.profit,
    ]);
    const dailySheet = XLSX.utils.aoa_to_sheet([dailyHeaders, ...dailyData]);
    XLSX.utils.book_append_sheet(workbook, dailySheet, 'Günlük İstatistikler');

    // Excel dosyasını indir
    const fileName = `rapor_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Raporlar</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleExport}
            disabled={!reportData || isLoading}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconDownload className="w-4 h-4 mr-2" />
            Excel'e Aktar
          </button>
        </div>
      </div>

      {/* Filtreler */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col space-y-4">
          {/* Hızlı tarih aralığı seçenekleri */}
          <div className="flex flex-wrap gap-2">
            {dateRangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  handleQuickDateRangeSelect(option.value);
                  // Seçim yapıldıktan sonra verileri otomatik olarak yükle
                  setTimeout(() => fetchData(), 0);
                }}
                className={`px-3 py-1 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  activeDateOption === option.value
                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Başlangıç Tarihi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IconCalendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="start"
                  value={dateRange.start}
                  onChange={handleDateChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bitiş Tarihi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IconCalendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="end"
                  value={dateRange.end}
                  onChange={handleDateChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleFilter}
                disabled={isLoading}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <IconRefresh className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <IconFilter className="w-4 h-4 mr-2" />
                )}
                {isLoading ? 'Yükleniyor...' : 'Filtrele'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hata mesajı */}
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {/* Özet İstatistikler */}
      {reportData && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <IconChartBar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Toplam Sipariş</p>
                <p className="text-lg font-semibold text-gray-900">
                  {reportData.summary.totalOrders.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <IconChartPie className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Toplam Gelir</p>
                <p className="text-lg font-semibold text-gray-900">
                  {reportData.summary.totalRevenue}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <IconChartBar className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Toplam Kar</p>
                <p className="text-lg font-semibold text-gray-900">
                  {reportData.summary.totalProfit}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <IconChartPie className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Kar Marjı</p>
                <p className="text-lg font-semibold text-gray-900">
                  {reportData.summary.profitMargin}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Servis Bazlı İstatistikler */}
      {reportData && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium">Servis Bazlı İstatistikler</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Servis
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Toplam Sipariş
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Başarı Oranı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gelir
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kar Marjı
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reportData.serviceStats.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{service.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {service.totalOrders.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        %{service.successRate}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{service.revenue}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{service.profit}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        %{service.profitMargin}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Günlük İstatistikler */}
      {reportData && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium">Günlük İstatistikler</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sipariş Sayısı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gelir
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kar
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reportData.dailyStats.map((stat) => (
                  <tr key={stat.date} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(stat.date).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{stat.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stat.revenue}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stat.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 