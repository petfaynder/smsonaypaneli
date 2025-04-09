import Link from 'next/link'
import { IconBrandWhatsapp, IconBrandTelegram, IconBrandInstagram, IconCheck, IconClock, IconUsers, IconHeadset, IconShield, IconBuildingBank } from '@tabler/icons-react'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Header */}
      <section className="bg-blue-500 text-white relative overflow-hidden">
        {/* Header */}
        <header className="w-full z-50 py-4 border-b border-blue-400 border-opacity-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                      <span className="text-blue-500 text-lg font-bold">SMS</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white">
                      SMS Onay Paneli
                    </h1>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:flex items-center space-x-1">
                <Link href="/" className="text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Ana Sayfa
                </Link>
                <Link href="/services" className="text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Servisler
                </Link>
                <Link href="/pricing" className="text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Fiyatlar
                </Link>
                <Link href="/about" className="text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Hakkımızda
                </Link>
                <Link href="/support" className="text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Destek
                </Link>
              </div>
              
              <div className="flex space-x-3">
                <Link href="/auth/login" className="inline-block bg-white text-blue-600 font-medium py-2 px-4 rounded hover:bg-blue-50 transition-colors">
                  Giriş Yap
                </Link>
                <Link href="/auth/register" className="inline-block bg-blue-600 text-white font-medium py-2 px-4 rounded border border-blue-400 hover:bg-blue-700 transition-colors">
                  Kayıt Ol
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Online hesap doğrulama için <span className="relative inline-block px-2">
                  <span className="relative z-10">SMS onay hizmeti</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-transparent rounded" style={{width: '50%'}}></span>
                </span>
              </h2>
              <p className="mt-6 text-lg text-blue-50 max-w-lg">
                Güvenli, hızlı ve ekonomik SMS onay hizmetimizle sosyal medya ve diğer platformlarda hesaplarınızı kolayca doğrulayın. 40+ ülke desteği, 200+ servis.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register" className="btn bg-white text-blue-600 hover:bg-blue-50 font-medium px-6 py-3 rounded inline-flex items-center justify-center">
                  <IconBuildingBank className="h-5 w-5 mr-2" />
                  Hesap Oluştur
                </Link>
                <Link href="/services" className="btn bg-blue-600 text-white hover:bg-blue-700 font-medium px-6 py-3 rounded inline-flex items-center justify-center border border-blue-400">
                  <IconCheck className="h-5 w-5 mr-2" />
                  Servislerimizi İncele
                </Link>
              </div>
              
              <div className="mt-10 grid grid-cols-3 gap-4">
                <div className="flex items-center">
                  <IconClock className="h-5 w-5 mr-2 text-blue-200" />
                  <span className="text-sm text-blue-100">Hızlı Teslimat</span>
                </div>
                <div className="flex items-center">
                  <IconShield className="h-5 w-5 mr-2 text-blue-200" />
                  <span className="text-sm text-blue-100">Güvenli Ödeme</span>
                </div>
                <div className="flex items-center">
                  <IconHeadset className="h-5 w-5 mr-2 text-blue-200" />
                  <span className="text-sm text-blue-100">7/24 Destek</span>
                </div>
              </div>
            </div>
            
            {/* Right side with phone illustration and floating elements */}
            <div className="relative hidden lg:block">
              <div className="bg-white p-1 rounded-xl shadow-xl">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex mb-4 items-center">
                    <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <div className="mx-auto text-sm text-blue-800 font-medium">SMS Onay Paneli</div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="mb-4 border-b pb-3 border-gray-100">
                      <div className="flex justify-between items-center">
                        <div className="text-blue-600 font-medium">WhatsApp</div>
                        <div className="text-green-600 font-bold">2.50₺</div>
                      </div>
                    </div>
                    
                    <div className="mb-4 border-b pb-3 border-gray-100">
                      <div className="flex justify-between items-center">
                        <div className="text-blue-600 font-medium">Telegram</div>
                        <div className="text-green-600 font-bold">3.00₺</div>
                      </div>
                    </div>
                    
                    <div className="mb-4 border-b pb-3 border-gray-100">
                      <div className="flex justify-between items-center">
                        <div className="text-blue-600 font-medium">Instagram</div>
                        <div className="text-green-600 font-bold">5.00₺</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-4">
                      <div className="bg-blue-500 text-white font-medium px-4 py-2 rounded text-center text-sm">
                        Numara Al
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-10 -left-10 bg-yellow-400 rounded-lg p-2 shadow-lg rotate-12 animate-pulse">
                <IconCheck className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-green-500 rounded-lg p-2 shadow-lg -rotate-12 animate-pulse delay-150">
                <IconBrandWhatsapp className="h-6 w-6 text-white" />
              </div>
              <div className="absolute top-1/3 -right-12 bg-blue-600 rounded-lg p-2 shadow-lg rotate-45 animate-pulse delay-300">
                <IconBrandTelegram className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          
          {/* Flag icons for countries */}
          <div className="mt-16 flex items-center justify-between max-w-lg mx-auto lg:mx-0 lg:max-w-none">
            <div className="flex items-center">
              <span className="mr-8 text-blue-100 text-sm md:text-base font-medium whitespace-nowrap">Desteklenen Platformlar:</span>
              <div className="grid grid-cols-5 gap-4">
                <IconBrandWhatsapp className="h-8 w-8 text-white" />
                <IconBrandTelegram className="h-8 w-8 text-white" />
                <IconBrandInstagram className="h-8 w-8 text-white" />
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-blue-500 font-bold text-sm">FB</div>
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-blue-500 font-bold text-sm">+</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="text-white">
            <path fill="currentColor" fillOpacity="1" d="M0,64L80,80C160,96,320,128,480,128C640,128,800,96,960,74.7C1120,53,1280,43,1360,37.3L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      <main className="flex-grow">
        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">100+</div>
                <div className="mt-2 text-sm text-gray-600">Ülke Desteği</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">50K+</div>
                <div className="mt-2 text-sm text-gray-600">Mutlu Müşteri</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">1M+</div>
                <div className="mt-2 text-sm text-gray-600">Başarılı SMS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">99%</div>
                <div className="mt-2 text-sm text-gray-600">Başarı Oranı</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Popüler SMS Onay Servislerimiz</span>
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                En çok tercih edilen SMS onay servisleri ile hesaplarınızı hemen doğrulayın
              </p>
            </div>

            <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* WhatsApp Card */}
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <IconBrandWhatsapp className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">WhatsApp</h3>
                      <p className="text-gray-500 text-sm">Anlık mesajlaşma platformu</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-gray-600">
                      WhatsApp hesabı oluşturmak için SMS onay kodları. Gerçek numaralarla hızlı ve güvenilir doğrulama.
                    </p>
                    <div className="mt-6 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-xl font-bold text-gray-900">2.50₺</span>
                        <span className="ml-1 text-xs text-gray-500">/ numara</span>
                      </div>
                      <Link href="/services/whatsapp" className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors">
                        Numara Al
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Telegram Card */}
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <IconBrandTelegram className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">Telegram</h3>
                      <p className="text-gray-500 text-sm">Güvenli mesajlaşma uygulaması</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-gray-600">
                      Telegram hesabı oluşturmak için SMS onay kodları. Anında teslimat, yüksek başarı oranı.
                    </p>
                    <div className="mt-6 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-xl font-bold text-gray-900">3.00₺</span>
                        <span className="ml-1 text-xs text-gray-500">/ numara</span>
                      </div>
                      <Link href="/services/telegram" className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors">
                        Numara Al
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instagram Card */}
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
                        <IconBrandInstagram className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">Instagram</h3>
                      <p className="text-gray-500 text-sm">Sosyal medya platformu</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-gray-600">
                      Instagram hesabı oluşturmak için SMS onay kodları. Güvenilir ve hızlı teslimat.
                    </p>
                    <div className="mt-6 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-xl font-bold text-gray-900">5.00₺</span>
                        <span className="ml-1 text-xs text-gray-500">/ numara</span>
                      </div>
                      <Link href="/services/instagram" className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors">
                        Numara Al
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/services" className="inline-flex items-center px-6 py-3 border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium rounded-md transition-colors">
                Tüm Servislerimizi Gör
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Nasıl Çalışır?
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                SMS onay hizmetimizi kullanmak çok kolay. Sadece 3 adımda tamamlayın.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">1</div>
                <div className="bg-gray-50 rounded-lg p-8 h-full">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Hesap Oluşturun</h3>
                  <p className="mt-4 text-gray-600">
                    Kolay ve hızlı bir şekilde hesap oluşturun ve bakiye yükleyin.
                  </p>
                </div>
              </div>

              <div className="text-center relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">2</div>
                <div className="bg-gray-50 rounded-lg p-8 h-full">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Servis Seçin</h3>
                  <p className="mt-4 text-gray-600">
                    İhtiyacınız olan servisi seçin ve sanal numara satın alın.
                  </p>
                </div>
              </div>

              <div className="text-center relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">3</div>
                <div className="bg-gray-50 rounded-lg p-8 h-full">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">SMS Kodu Alın</h3>
                  <p className="mt-4 text-gray-600">
                    SMS kodunu panelimizde görüntüleyin ve hesabınızı doğrulayın.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-blue-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Neden Bizi Tercih Etmelisiniz?
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-blue-100 mx-auto">
                Size en iyi hizmeti sunmak için özenle çalışıyoruz
              </p>
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-blue-600 bg-opacity-30 rounded-lg p-8 backdrop-blur">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white text-blue-500 mb-5">
                  <IconCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">En Uygun Fiyatlar</h3>
                <p className="mt-4 text-blue-100">
                  Piyasadaki en uygun fiyatlarla SMS onay hizmeti sunuyoruz. Toplu alımlarda ekstra indirimler.
                </p>
              </div>

              <div className="bg-blue-600 bg-opacity-30 rounded-lg p-8 backdrop-blur">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white text-blue-500 mb-5">
                  <IconClock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Hızlı Teslimat</h3>
                <p className="mt-4 text-blue-100">
                  SMS kodlarını genellikle 30 saniyeden kısa sürede alırsınız. Otomatik sistemimiz 7/24 çalışır.
                </p>
              </div>

              <div className="bg-blue-600 bg-opacity-30 rounded-lg p-8 backdrop-blur">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white text-blue-500 mb-5">
                  <IconUsers className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Geniş Hizmet Ağı</h3>
                <p className="mt-4 text-blue-100">
                  40+ ülke ve 200+ farklı servis desteği ile istediğiniz platformda hesap oluşturabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                  <span className="text-blue-500 text-lg font-bold">SMS</span>
                </div>
                <h3 className="text-xl font-bold text-white">SMS Onay Paneli</h3>
              </div>
              <p className="text-sm">
                Online platformlar için güvenilir ve hızlı SMS doğrulama hizmetleri sunan lisanslı bir şirketiz.
              </p>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Hızlı Linkler</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/services" className="hover:text-white">Servisler</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Fiyatlandırma</Link></li>
                <li><Link href="/faq" className="hover:text-white">Sık Sorulan Sorular</Link></li>
                <li><Link href="/contact" className="hover:text-white">İletişim</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Destek</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/support" className="hover:text-white">Destek Merkezi</Link></li>
                <li><Link href="/docs" className="hover:text-white">API Dokümantasyonu</Link></li>
                <li><Link href="/terms" className="hover:text-white">Kullanım Şartları</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Gizlilik Politikası</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">İletişim</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@smsonaypaneli.com
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +90 XXX XXX XX XX
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  7/24 Hizmet
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} SMS Onay Paneli. Tüm hakları saklıdır.
              </p>
              <div className="mt-4 md:mt-0">
                <div className="flex justify-center space-x-4">
                  <img src="https://www.paytr.com/wp-content/uploads/visa-logo.png" alt="Visa" className="h-8 w-auto" />
                  <img src="https://www.paytr.com/wp-content/uploads/mastercard-logo-1.png" alt="Mastercard" className="h-8 w-auto" />
                  <img src="https://www.paytr.com/wp-content/uploads/paypal.webp" alt="Paypal" className="h-8 w-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 