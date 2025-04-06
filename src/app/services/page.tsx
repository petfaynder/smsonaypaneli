import Link from 'next/link'

// Servis verilerini simüle etmek için basit bir veri
const services = [
  {
    id: 1,
    name: 'WhatsApp',
    description: 'WhatsApp hesap doğrulama için SMS kodu alın.',
    price: 2.50,
    stock: 543,
    country: 'TR',
    eta: '1-3 dakika'
  },
  {
    id: 2,
    name: 'Telegram',
    description: 'Telegram hesap doğrulama için SMS kodu alın.',
    price: 3.00,
    stock: 321,
    country: 'TR',
    eta: '1-3 dakika'
  },
  {
    id: 3,
    name: 'Instagram',
    description: 'Instagram hesap doğrulama için SMS kodu alın.',
    price: 5.00,
    stock: 987,
    country: 'TR',
    eta: '1-5 dakika'
  },
  {
    id: 4,
    name: 'Facebook',
    description: 'Facebook hesap doğrulama için SMS kodu alın.',
    price: 4.50,
    stock: 654,
    country: 'TR',
    eta: '1-4 dakika'
  },
  {
    id: 5,
    name: 'Twitter',
    description: 'Twitter hesap doğrulama için SMS kodu alın.',
    price: 4.00,
    stock: 432,
    country: 'TR',
    eta: '1-3 dakika'
  },
  {
    id: 6,
    name: 'Gmail',
    description: 'Gmail hesap doğrulama için SMS kodu alın.',
    price: 6.00,
    stock: 763,
    country: 'TR',
    eta: '1-5 dakika'
  },
  {
    id: 7,
    name: 'Tinder',
    description: 'Tinder hesap doğrulama için SMS kodu alın.',
    price: 7.50,
    stock: 512,
    country: 'TR',
    eta: '1-5 dakika'
  },
  {
    id: 8,
    name: 'Steam',
    description: 'Steam hesap doğrulama için SMS kodu alın.',
    price: 8.00,
    stock: 345,
    country: 'TR',
    eta: '1-6 dakika'
  },
  {
    id: 9,
    name: 'Microsoft',
    description: 'Microsoft hesap doğrulama için SMS kodu alın.',
    price: 5.50,
    stock: 876,
    country: 'TR',
    eta: '1-4 dakika'
  }
]

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-blue-600">SMS Onay Paneli</Link>
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/auth/login" className="btn btn-primary mr-2">
                Giriş Yap
              </Link>
              <Link href="/auth/register" className="btn btn-secondary">
                Kayıt Ol
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              SMS Onay Servisleri
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Tüm popüler platformlar için uygun fiyatlı SMS onay hizmetlerimiz
            </p>
          </div>

          {/* Filtre / Arama */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="Servis ara..."
                  className="input w-full"
                />
              </div>
              <div className="flex gap-4">
                <select className="input">
                  <option value="">Tüm Ülkeler</option>
                  <option value="TR">Türkiye</option>
                  <option value="US">ABD</option>
                  <option value="UK">İngiltere</option>
                  <option value="RU">Rusya</option>
                </select>
                <select className="input">
                  <option value="price-asc">Fiyat (Artan)</option>
                  <option value="price-desc">Fiyat (Azalan)</option>
                  <option value="name-asc">İsim (A-Z)</option>
                  <option value="name-desc">İsim (Z-A)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Servis Listesi */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{service.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {service.stock} adet
                  </span>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{service.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Ülke:</span>
                    <span className="ml-1 font-medium">{service.country}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Süre:</span>
                    <span className="ml-1 font-medium">{service.eta}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-blue-600 font-bold">{service.price.toFixed(2)}₺</span>
                  <button className="btn btn-primary">Satın Al</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              {/* Social Links */}
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-500">
                &copy; 2025 SMS Onay Paneli. Tüm hakları saklıdır.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 