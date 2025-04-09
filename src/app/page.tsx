import Link from 'next/link'
import { IconBrandWhatsapp, IconBrandTelegram, IconBrandDiscord, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube, IconArrowRight, IconCheck, IconStar, IconUsers, IconDeviceMobile, IconShieldCheck, IconClock, IconCurrencyDollar, IconHeadset, IconRocket, IconChartBar, IconDeviceLaptop, IconDeviceGamepad2, IconBrandTiktok, IconBrandFacebook, IconBrandLinkedin } from '@tabler/icons-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                SMS Onay Paneli
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Ana Sayfa
                </Link>
                <Link href="/services" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Hizmetler
                </Link>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Fiyatlandırma
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  İletişim
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Giriş Yap
              </Link>
              <Link href="/auth/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Kayıt Ol
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              SMS Onay Hizmetleri ile Güvenli ve Hızlı Doğrulama
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              7/24 aktif sistemimiz ile tüm platformlar için SMS onay hizmeti sağlıyoruz. 
              Hızlı, güvenli ve uygun fiyatlı çözümler için hemen başlayın.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                Hemen Başla
                <IconArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/services" className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Hizmetleri İncele
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl mb-4">
                <IconUsers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">10,000+</h3>
              <p className="text-gray-600 dark:text-gray-300">Aktif Kullanıcı</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl mb-4">
                <IconDeviceMobile className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">50+</h3>
              <p className="text-gray-600 dark:text-gray-300">Platform Desteği</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl mb-4">
                <IconShieldCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">%99.9</h3>
              <p className="text-gray-600 dark:text-gray-300">Başarı Oranı</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl mb-4">
                <IconClock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">7/24</h3>
              <p className="text-gray-600 dark:text-gray-300">Destek Hizmeti</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popüler Hizmetlerimiz
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              En çok tercih edilen platformlar için SMS onay hizmetlerimiz
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl mb-6">
                <IconBrandWhatsapp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">WhatsApp</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                WhatsApp hesabınızı güvenle oluşturun ve doğrulayın. Hızlı ve güvenilir SMS onay hizmeti.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">₺2.50</span>
                <Link href="/services/whatsapp" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Detaylı Bilgi
                </Link>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl mb-6">
                <IconBrandTelegram className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Telegram</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Telegram hesabınızı anında oluşturun. Güvenli ve hızlı SMS doğrulama hizmeti.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">₺2.00</span>
                <Link href="/services/telegram" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Detaylı Bilgi
                </Link>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl mb-6">
                <IconBrandDiscord className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Discord</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Discord hesabınızı hemen oluşturun. Kesintisiz ve güvenilir SMS onay hizmeti.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">₺1.50</span>
                <Link href="/services/discord" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Detaylı Bilgi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Size en iyi hizmeti sunmak için çalışıyoruz
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4">
                <IconRocket className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Hızlı Teslimat</h3>
              <p className="text-gray-600 dark:text-gray-300">SMS kodları anında teslim edilir</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mb-4">
                <IconShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Güvenli Ödeme</h3>
              <p className="text-gray-600 dark:text-gray-300">256-bit SSL ile güvenli ödeme</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-4">
                <IconHeadset className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">7/24 Destek</h3>
              <p className="text-gray-600 dark:text-gray-300">Kesintisiz teknik destek hizmeti</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mb-4">
                <IconCurrencyDollar className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Uygun Fiyat</h3>
              <p className="text-gray-600 dark:text-gray-300">Rekabetçi fiyatlar ve indirimler</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-blue-600 rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Hemen Başlayın
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              SMS onay hizmetlerimizden yararlanmak için hemen üye olun. 
              İlk üyeliğinize özel %10 indirim fırsatını kaçırmayın!
            </p>
            <Link href="/auth/register" className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center">
              Ücretsiz Üye Ol
              <IconArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Hakkımızda</h3>
              <p className="text-gray-400">
                SMS onay hizmetlerinde güvenilir çözüm ortağınız. 
                7/24 aktif sistemimiz ile kesintisiz hizmet sunuyoruz.
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Hızlı Linkler</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                    Hizmetler
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                    Fiyatlandırma
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">İletişim</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">
                  Email: info@smsonaypaneli.com
                </li>
                <li className="text-gray-400">
                  Telefon: +90 (555) 123 45 67
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Sosyal Medya</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <IconBrandWhatsapp className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <IconBrandTelegram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <IconBrandDiscord className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <IconBrandInstagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <IconBrandTwitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <IconBrandYoutube className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <IconBrandTiktok className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <IconBrandFacebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <IconBrandLinkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 SMS Onay Paneli. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 