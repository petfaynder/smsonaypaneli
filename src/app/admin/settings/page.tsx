import { 
  IconBrandGithub,
  IconMail,
  IconBrandTwitter,
  IconBrandDiscord,
  IconDeviceFloppy
} from '@tabler/icons-react';

const settings = {
  site: {
    name: 'SMS Onay Paneli',
    title: 'SMS Onay - En Uygun Fiyatlarla SMS Onay Hizmeti',
    description: 'Tüm popüler servisler için en uygun fiyatlarla SMS onay hizmeti.',
    domain: 'smsonay.com',
    logo: '/logo.png',
    favicon: '/favicon.ico'
  },
  contact: {
    email: 'info@smsonay.com',
    phone: '+90 555 123 4567',
    address: 'İstanbul, Türkiye',
    social: {
      twitter: 'https://twitter.com/smsonay',
      discord: 'https://discord.gg/smsonay',
      github: 'https://github.com/smsonay'
    }
  },
  api: {
    rateLimit: 100,
    timeout: 30
  },
  mail: {
    host: 'smtp.gmail.com',
    port: 587,
    user: 'info@smsonay.com',
    password: '********',
    from: 'SMS Onay <info@smsonay.com>'
  }
};

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Site Ayarları</h1>
        <p className="mt-2 text-sm text-gray-600">
          Sistem ayarlarını ve yapılandırmayı yönetin
        </p>
      </div>

      <div className="space-y-6">
        {/* Site Bilgileri */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Site Bilgileri</h2>
          <p className="mt-1 text-sm text-gray-500">
            Temel site bilgilerini ve meta verilerini güncelleyin
          </p>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="site-name" className="block text-sm font-medium text-gray-700">
                Site Adı
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="site-name"
                  id="site-name"
                  defaultValue={settings.site.name}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
                Domain
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="domain"
                  id="domain"
                  defaultValue={settings.site.domain}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Site Başlığı
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={settings.site.title}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Açıklama
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  defaultValue={settings.site.description}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* İletişim Bilgileri */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">İletişim Bilgileri</h2>
          <p className="mt-1 text-sm text-gray-500">
            İletişim bilgilerini ve sosyal medya hesaplarını güncelleyin
          </p>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-posta
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  <IconMail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={settings.contact.email}
                  className="block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Telefon
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  defaultValue={settings.contact.phone}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Adres
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="address"
                  id="address"
                  defaultValue={settings.contact.address}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                Twitter
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  <IconBrandTwitter className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  name="twitter"
                  id="twitter"
                  defaultValue={settings.contact.social.twitter}
                  className="block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="discord" className="block text-sm font-medium text-gray-700">
                Discord
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  <IconBrandDiscord className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  name="discord"
                  id="discord"
                  defaultValue={settings.contact.social.discord}
                  className="block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                GitHub
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  <IconBrandGithub className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  name="github"
                  id="github"
                  defaultValue={settings.contact.social.github}
                  className="block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* E-posta Ayarları */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">E-posta Ayarları</h2>
          <p className="mt-1 text-sm text-gray-500">
            E-posta gönderimi için SMTP sunucu ayarlarını yapılandırın
          </p>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="smtp-host" className="block text-sm font-medium text-gray-700">
                SMTP Sunucu
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="smtp-host"
                  id="smtp-host"
                  defaultValue={settings.mail.host}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="smtp-port" className="block text-sm font-medium text-gray-700">
                SMTP Port
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="smtp-port"
                  id="smtp-port"
                  defaultValue={settings.mail.port}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="smtp-user" className="block text-sm font-medium text-gray-700">
                SMTP Kullanıcı
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="smtp-user"
                  id="smtp-user"
                  defaultValue={settings.mail.user}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="smtp-password" className="block text-sm font-medium text-gray-700">
                SMTP Şifre
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="smtp-password"
                  id="smtp-password"
                  defaultValue={settings.mail.password}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="smtp-from" className="block text-sm font-medium text-gray-700">
                Gönderen Adı
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="smtp-from"
                  id="smtp-from"
                  defaultValue={settings.mail.from}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* API Ayarları */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">API Ayarları</h2>
          <p className="mt-1 text-sm text-gray-500">
            API istek limitleri ve zaman aşımı ayarlarını yapılandırın
          </p>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="rate-limit" className="block text-sm font-medium text-gray-700">
                İstek Limiti (dakika)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="rate-limit"
                  id="rate-limit"
                  defaultValue={settings.api.rateLimit}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="timeout" className="block text-sm font-medium text-gray-700">
                Zaman Aşımı (saniye)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="timeout"
                  id="timeout"
                  defaultValue={settings.api.timeout}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Kaydet Butonu */}
        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <IconDeviceFloppy className="mr-2 h-5 w-5" />
            Değişiklikleri Kaydet
          </button>
        </div>
      </div>
    </div>
  );
} 