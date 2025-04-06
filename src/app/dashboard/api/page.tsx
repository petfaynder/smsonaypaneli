'use client'

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ApiConfig, SmsApiProvider } from '@/types/smsApi'
import { useTheme } from '@/context/ThemeContext'

// API anahtar örneği
const mockApiKey = {
  key: 'sk_live_51JhUXFLhJyCBnXfDL2DcxqLnJZKBxufZnrdLxRTYoIRCMO7iH3zzwsw',
  created: new Date('2023-06-10'),
  lastUsed: new Date(Date.now() - 3600000 * 24), // 1 gün önce
}

// API dokümantasyonu örnekleri
const apiEndpoints = [
  {
    id: 'get-balance',
    name: 'Bakiye Sorgulama',
    endpoint: '/api/v1/balance',
    method: 'GET',
    description: 'Mevcut bakiyenizi sorgular.',
    parameters: [],
    responseExample: `{
  "success": true,
  "balance": 125.50,
  "currency": "TRY"
}`,
    requestExample: `curl -X GET "https://api.smsonay.com/v1/balance" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
  {
    id: 'get-number',
    name: 'Numara Alma',
    endpoint: '/api/v1/numbers',
    method: 'POST',
    description: 'Belirtilen servis ve ülke için numara alır.',
    parameters: [
      { name: 'service', type: 'string', description: 'Servis adı (whatsapp, telegram, vb.)', required: true },
      { name: 'country', type: 'string', description: 'Ülke kodu (TR, US, vb.)', required: true },
    ],
    responseExample: `{
  "success": true,
  "order": {
    "id": 12345,
    "number": "+905551234567",
    "service": "whatsapp",
    "country": "TR",
    "expires_at": "2023-08-15T14:30:45Z",
    "status": "active"
  }
}`,
    requestExample: `curl -X POST "https://api.smsonay.com/v1/numbers" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "service": "whatsapp",
    "country": "TR"
  }'`,
  },
  {
    id: 'check-sms',
    name: 'SMS Kontrol',
    endpoint: '/api/v1/sms/:orderId',
    method: 'GET',
    description: 'Belirli bir sipariş için SMS durumunu kontrol eder.',
    parameters: [
      { name: 'orderId', type: 'integer', description: 'Sipariş ID', required: true },
    ],
    responseExample: `{
  "success": true,
  "order": {
    "id": 12345,
    "number": "+905551234567",
    "service": "whatsapp",
    "country": "TR",
    "status": "received",
    "sms": "Your WhatsApp code is 123-456.",
    "received_at": "2023-08-15T14:25:30Z"
  }
}`,
    requestExample: `curl -X GET "https://api.smsonay.com/v1/sms/12345" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
  {
    id: 'cancel-order',
    name: 'Sipariş İptal',
    endpoint: '/api/v1/orders/:orderId/cancel',
    method: 'POST',
    description: 'Aktif bir siparişi iptal eder.',
    parameters: [
      { name: 'orderId', type: 'integer', description: 'Sipariş ID', required: true },
    ],
    responseExample: `{
  "success": true,
  "order": {
    "id": 12345,
    "status": "cancelled",
    "cancelled_at": "2023-08-15T14:28:10Z"
  }
}`,
    requestExample: `curl -X POST "https://api.smsonay.com/v1/orders/12345/cancel" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
  {
    id: 'get-services',
    name: 'Servis Listesi',
    endpoint: '/api/v1/services',
    method: 'GET',
    description: 'Mevcut servisleri ve fiyatlarını listeler.',
    parameters: [
      { name: 'country', type: 'string', description: 'Ülke kodu (TR, US, vb.)', required: false },
    ],
    responseExample: `{
  "success": true,
  "services": [
    {
      "id": "whatsapp",
      "name": "WhatsApp",
      "price": 2.50,
      "currency": "TRY",
      "available_countries": ["TR", "US", "UK", "DE", "RU"]
    },
    {
      "id": "telegram",
      "name": "Telegram",
      "price": 3.00,
      "currency": "TRY",
      "available_countries": ["TR", "US", "UK", "DE", "RU"]
    }
  ]
}`,
    requestExample: `curl -X GET "https://api.smsonay.com/v1/services?country=TR" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
]

// Kod örnekleri için diller
const codeExamples = {
  'node.js': {
    'get-balance': `const axios = require('axios');

const API_KEY = 'YOUR_API_KEY';

async function getBalance() {
  try {
    const response = await axios.get('https://api.smsonay.com/v1/balance', {
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`
      }
    });
    
    console.log('Bakiye:', response.data.balance);
    return response.data;
  } catch (error) {
    console.error('Hata:', error.response ? error.response.data : error.message);
    throw error;
  }
}

getBalance();`,
    'get-number': `const axios = require('axios');

const API_KEY = 'YOUR_API_KEY';

async function getNumber(service, country) {
  try {
    const response = await axios.post('https://api.smsonay.com/v1/numbers', {
      service,
      country
    }, {
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Numara:', response.data.order.number);
    return response.data.order;
  } catch (error) {
    console.error('Hata:', error.response ? error.response.data : error.message);
    throw error;
  }
}

getNumber('whatsapp', 'TR');`,
    'check-sms': `const axios = require('axios');

const API_KEY = 'YOUR_API_KEY';

async function checkSMS(orderId) {
  try {
    const response = await axios.get(\`https://api.smsonay.com/v1/sms/\${orderId}\`, {
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`
      }
    });
    
    if (response.data.order.status === 'received') {
      console.log('SMS Alındı:', response.data.order.sms);
    } else {
      console.log('SMS henüz alınmadı. Durum:', response.data.order.status);
    }
    
    return response.data.order;
  } catch (error) {
    console.error('Hata:', error.response ? error.response.data : error.message);
    throw error;
  }
}

checkSMS(12345);`,
  },
  'php': {
    'get-balance': `<?php
$apiKey = 'YOUR_API_KEY';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.smsonay.com/v1/balance');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $apiKey
]);

$response = curl_exec($ch);
$err = curl_error($ch);
curl_close($ch);

if ($err) {
    echo "cURL Error: " . $err;
} else {
    $result = json_decode($response, true);
    echo "Bakiye: " . $result['balance'];
}
?>`,
    'get-number': `<?php
$apiKey = 'YOUR_API_KEY';
$service = 'whatsapp';
$country = 'TR';

$data = [
    'service' => $service,
    'country' => $country
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.smsonay.com/v1/numbers');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$err = curl_error($ch);
curl_close($ch);

if ($err) {
    echo "cURL Error: " . $err;
} else {
    $result = json_decode($response, true);
    echo "Numara: " . $result['order']['number'];
}
?>`,
    'check-sms': `<?php
$apiKey = 'YOUR_API_KEY';
$orderId = 12345;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.smsonay.com/v1/sms/{$orderId}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $apiKey
]);

$response = curl_exec($ch);
$err = curl_error($ch);
curl_close($ch);

if ($err) {
    echo "cURL Error: " . $err;
} else {
    $result = json_decode($response, true);
    
    if ($result['order']['status'] === 'received') {
        echo "SMS Alındı: " . $result['order']['sms'];
    } else {
        echo "SMS henüz alınmadı. Durum: " . $result['order']['status'];
    }
}
?>`,
  },
  'python': {
    'get-balance': `import requests

API_KEY = 'YOUR_API_KEY'

def get_balance():
    url = 'https://api.smsonay.com/v1/balance'
    headers = {
        'Authorization': f'Bearer {API_KEY}'
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        print(f"Bakiye: {data['balance']}")
        return data
    except requests.exceptions.RequestException as e:
        print(f"Hata: {e}")
        return None

get_balance()`,
    'get-number': `import requests

API_KEY = 'YOUR_API_KEY'

def get_number(service, country):
    url = 'https://api.smsonay.com/v1/numbers'
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    payload = {
        'service': service,
        'country': country
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()
        print(f"Numara: {data['order']['number']}")
        return data['order']
    except requests.exceptions.RequestException as e:
        print(f"Hata: {e}")
        return None

get_number('whatsapp', 'TR')`,
    'check-sms': `import requests

API_KEY = 'YOUR_API_KEY'

def check_sms(order_id):
    url = f'https://api.smsonay.com/v1/sms/{order_id}'
    headers = {
        'Authorization': f'Bearer {API_KEY}'
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        if data['order']['status'] == 'received':
            print(f"SMS Alındı: {data['order']['sms']}")
        else:
            print(f"SMS henüz alınmadı. Durum: {data['order']['status']}")
            
        return data['order']
    except requests.exceptions.RequestException as e:
        print(f"Hata: {e}")
        return None

check_sms(12345)`,
  }
}

export default function ApiManagement() {
  const { theme } = useTheme();
  const [apiConfigs, setApiConfigs] = useState<ApiConfig[]>([]);
  const [balances, setBalances] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');

  // API konfigürasyonlarını yükle
  useEffect(() => {
    const fetchApiConfigs = async () => {
      try {
        // Gerçek uygulamada burada /api/admin/config endpoint'i kullanılmalı
        // Şimdilik localStorage veya hardcoded değerlerden simüle ediyoruz
        const storedConfigs = localStorage.getItem('apiConfigs');
        let configs: ApiConfig[] = [];
        
        if (storedConfigs) {
          configs = JSON.parse(storedConfigs);
        } else {
          // Varsayılan konfigürasyonlar
          configs = [
            {
              provider: SmsApiProvider.SMS_ACTIVATE,
              apiKey: process.env.NEXT_PUBLIC_SMS_ACTIVATE_API_KEY || '',
              baseUrl: 'https://api.sms-activate.org/stubs/handler_api.php',
              active: true,
              priority: 1
            },
            {
              provider: SmsApiProvider.SMSPVA,
              apiKey: '',
              baseUrl: 'https://smspva.com/priemnik.php',
              active: false,
              priority: 2
            },
            {
              provider: SmsApiProvider.SMSREG,
              apiKey: '',
              baseUrl: 'https://api.sms-reg.com',
              active: false,
              priority: 3
            },
          ];
        }
        
        setApiConfigs(configs);
        await fetchBalances();
      } catch (error) {
        console.error('API konfigürasyonları yüklenirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApiConfigs();
  }, []);
  
  // Bakiye bilgilerini yükle
  const fetchBalances = async () => {
    try {
      // Gerçek API'den bakiye bilgilerini al
      const response = await fetch('/api/sms?endpoint=balance');
      
      if (response.ok) {
        const data = await response.json();
        setBalances(data.balances || {});
      }
    } catch (error) {
      console.error('Bakiye bilgileri alınamadı:', error);
    }
  };

  // API konfigürasyonunu güncelle
  const updateConfig = (index: number, field: keyof ApiConfig, value: any) => {
    const updatedConfigs = [...apiConfigs];
    updatedConfigs[index] = { ...updatedConfigs[index], [field]: value };
    setApiConfigs(updatedConfigs);
  };

  // Değişiklikleri kaydet
  const saveChanges = async () => {
    try {
      setSaveStatus('Kaydediliyor...');
      
      // Gerçek uygulamada burada API çağrısı yapılmalı
      // Şimdilik localStorage'a kaydediyoruz
      localStorage.setItem('apiConfigs', JSON.stringify(apiConfigs));
      
      // Başarılı mesajı göster
      setSaveStatus('Değişiklikler kaydedildi!');
      setTimeout(() => setSaveStatus(''), 3000);
      
      // Bakiye bilgilerini güncelle
      await fetchBalances();
    } catch (error) {
      console.error('Değişiklikler kaydedilirken hata oluştu:', error);
      setSaveStatus('Hata: Değişiklikler kaydedilemedi.');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  // Sağlayıcı adını formatla
  const formatProviderName = (provider: SmsApiProvider): string => {
    switch (provider) {
      case SmsApiProvider.SMS_ACTIVATE:
        return 'SMS-Activate.org';
      case SmsApiProvider.SMSPVA:
        return 'SMSPVA.com';
      case SmsApiProvider.SMSREG:
        return 'SMS-Reg.com';
      case SmsApiProvider.CUSTOM:
        return 'Özel Sağlayıcı';
      default:
        return provider;
    }
  };

  // Bakiye durumunu görüntüle
  const renderBalance = (provider: SmsApiProvider) => {
    const balance = balances[provider];
    
    if (balance === undefined) return 'Kontrol edilmedi';
    if (balance === -1) return 'Bağlantı hatası';
    
    return `${balance.toFixed(2)} ₺`;
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">API Yönetimi</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">SMS API Konfigürasyonları</h2>
        
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          <p>Bu sayfadan SMS onay hizmetlerini sağlayan API entegrasyonlarını yönetebilirsiniz. Birden fazla API sağlayıcı ekleyerek sistemin öncelik sırasına göre numara almasını sağlayabilirsiniz.</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="py-3 px-4 border-b dark:border-gray-600">Sağlayıcı</th>
                <th className="py-3 px-4 border-b dark:border-gray-600">API Anahtarı</th>
                <th className="py-3 px-4 border-b dark:border-gray-600">Bakiye</th>
                <th className="py-3 px-4 border-b dark:border-gray-600">Öncelik</th>
                <th className="py-3 px-4 border-b dark:border-gray-600">Durum</th>
              </tr>
            </thead>
            <tbody>
              {apiConfigs.map((config, index) => (
                <tr key={config.provider} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4">
                    <div className="font-medium">{formatProviderName(config.provider)}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{config.baseUrl}</div>
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={config.apiKey}
                      onChange={(e) => updateConfig(index, 'apiKey', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="API anahtarınızı girin"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{renderBalance(config.provider)}</div>
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min="1"
                      value={config.priority}
                      onChange={(e) => updateConfig(index, 'priority', parseInt(e.target.value))}
                      className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.active}
                          onChange={(e) => updateConfig(index, 'active', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                          {config.active ? 'Aktif' : 'Pasif'}
                        </span>
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <span className={`text-sm ${saveStatus.includes('Hata') ? 'text-red-500' : 'text-green-500'}`}>
            {saveStatus}
          </span>
          <button
            onClick={saveChanges}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Değişiklikleri Kaydet
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">API Dokümantasyonu</h2>
        
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            SMS Onay Paneli, harici servislerle entegrasyon için REST API sunmaktadır. 
            API'yi kullanarak kendi uygulamanızdan SMS onay işlemlerini gerçekleştirebilirsiniz.
          </p>
          
          <h3>Kimlik Doğrulama</h3>
          <p>
            Tüm API istekleri için API anahtarınızı <code>Authorization</code> başlığında göndermeniz gerekmektedir:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded">
            Authorization: Bearer API_ANAHTARINIZ
          </pre>
          
          <h3>Endpointler</h3>
          <ul>
            <li>
              <strong>GET /api/sms?endpoint=countries</strong> - Desteklenen ülkelerin listesini döndürür
            </li>
            <li>
              <strong>GET /api/sms?endpoint=services</strong> - Desteklenen servislerin listesini döndürür
            </li>
            <li>
              <strong>GET /api/sms?endpoint=balance</strong> - Hesap bakiyenizi döndürür
            </li>
            <li>
              <strong>POST /api/sms?action=request-number</strong> - Numara talebi oluşturur
            </li>
            <li>
              <strong>POST /api/sms?action=check-status</strong> - Numara durumunu ve SMS kodunu kontrol eder
            </li>
            <li>
              <strong>POST /api/sms?action=cancel-number</strong> - Numara siparişini iptal eder
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 