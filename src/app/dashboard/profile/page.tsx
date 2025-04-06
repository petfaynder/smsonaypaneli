'use client'

import { useState } from 'react'

// Kullanıcı profil örnek verisi
const userProfile = {
  id: '12345',
  name: 'Ahmet Yılmaz',
  email: 'ahmet@example.com',
  phone: '+905551234567',
  joinDate: new Date('2023-01-15'),
  country: 'TR',
  timezone: 'Europe/Istanbul',
  avatar: null, // Avatar URL'si
  twoFactorEnabled: false,
}

export default function Profile() {
  const [profile, setProfile] = useState(userProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    sms: false,
    browser: true,
  })
  
  // Form verileri
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    country: profile.country,
    timezone: profile.timezone,
  })
  
  // Form input değişikliği
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Profil güncelleme
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    
    // API çağrısını simüle et
    setTimeout(() => {
      setProfile(prev => ({ ...prev, ...formData }))
      setIsEditing(false)
    }, 1000)
  }
  
  // Şifre değiştirme
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    
    // Şifre doğrulama
    if (newPassword.length < 6) {
      setPasswordError('Şifreniz en az 6 karakter olmalıdır.')
      return
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Şifreler eşleşmiyor.')
      return
    }
    
    // API çağrısını simüle et
    setTimeout(() => {
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setIsChangingPassword(false)
      alert('Şifreniz başarıyla değiştirildi.')
    }, 1000)
  }
  
  // Bildirim tercihlerini güncelleme
  const handleNotificationToggle = (type: string) => {
    setNotificationPreferences(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev],
    }))
  }
  
  // 2FA durumunu değiştirme
  const handleToggle2FA = () => {
    // 2FA etkinleştirme/devre dışı bırakma simülasyonu
    setProfile(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Profilim</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Profil Bilgileri */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Profil Bilgileri</h2>
              {!isEditing && (
                <button
                  className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  onClick={() => setIsEditing(true)}
                >
                  Düzenle
                </button>
              )}
            </div>
            
            <div className="p-4">
              {!isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">İsim</p>
                      <p className="text-base font-medium text-gray-900 dark:text-white">{profile.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">E-posta</p>
                      <p className="text-base font-medium text-gray-900 dark:text-white">{profile.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Telefon</p>
                      <p className="text-base font-medium text-gray-900 dark:text-white">{profile.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Ülke</p>
                      <p className="text-base font-medium text-gray-900 dark:text-white">
                        {profile.country === 'TR' ? 'Türkiye' : 
                         profile.country === 'US' ? 'Amerika Birleşik Devletleri' : 
                         profile.country === 'UK' ? 'Birleşik Krallık' : 
                         profile.country === 'DE' ? 'Almanya' : 
                         profile.country === 'RU' ? 'Rusya' : profile.country}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Saat Dilimi</p>
                      <p className="text-base font-medium text-gray-900 dark:text-white">{profile.timezone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Kayıt Tarihi</p>
                      <p className="text-base font-medium text-gray-900 dark:text-white">
                        {profile.joinDate.toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleProfileUpdate}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          İsim
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          E-posta
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Ülke
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        >
                          <option value="TR">Türkiye</option>
                          <option value="US">Amerika Birleşik Devletleri</option>
                          <option value="UK">Birleşik Krallık</option>
                          <option value="DE">Almanya</option>
                          <option value="RU">Rusya</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Saat Dilimi
                        </label>
                        <select
                          id="timezone"
                          name="timezone"
                          value={formData.timezone}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        >
                          <option value="Europe/Istanbul">Europe/Istanbul</option>
                          <option value="Europe/London">Europe/London</option>
                          <option value="America/New_York">America/New_York</option>
                          <option value="Europe/Berlin">Europe/Berlin</option>
                          <option value="Europe/Moscow">Europe/Moscow</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => setIsEditing(false)}
                      >
                        İptal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Kaydet
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Şifre Değiştirme */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mt-4">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Şifre Değiştir</h2>
              {!isChangingPassword && (
                <button
                  className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  onClick={() => setIsChangingPassword(true)}
                >
                  Şifremi Değiştir
                </button>
              )}
            </div>
            
            <div className="p-4">
              {!isChangingPassword ? (
                <p className="text-gray-500 dark:text-gray-400">
                  Şifrenizi değiştirmek için "Şifremi Değiştir" butonuna tıklayın.
                </p>
              ) : (
                <form onSubmit={handlePasswordChange}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mevcut Şifre
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Yeni Şifre
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Yeni Şifre (Tekrar)
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    
                    {passwordError && (
                      <div className="text-red-600 text-sm">{passwordError}</div>
                    )}
                    
                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => setIsChangingPassword(false)}
                      >
                        İptal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Şifreyi Değiştir
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        
        {/* Yan Panel */}
        <div className="space-y-4">
          {/* 2FA */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">İki Faktörlü Doğrulama</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                    2FA {profile.twoFactorEnabled ? 'Etkin' : 'Devre Dışı'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Hesabınıza ekstra güvenlik katmak için iki faktörlü doğrulamayı etkinleştirin.
                  </p>
                </div>
                <button
                  type="button"
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    profile.twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  role="switch"
                  aria-checked={profile.twoFactorEnabled}
                  onClick={handleToggle2FA}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      profile.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          
          {/* Bildirim Tercihleri */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Bildirim Tercihleri</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">E-posta Bildirimleri</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Önemli güncellemeler ve sipariş bildirimleri</p>
                  </div>
                  <button
                    type="button"
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      notificationPreferences.email ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                    role="switch"
                    aria-checked={notificationPreferences.email}
                    onClick={() => handleNotificationToggle('email')}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        notificationPreferences.email ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">SMS Bildirimleri</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Önemli güvenlik uyarıları</p>
                  </div>
                  <button
                    type="button"
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      notificationPreferences.sms ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                    role="switch"
                    aria-checked={notificationPreferences.sms}
                    onClick={() => handleNotificationToggle('sms')}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        notificationPreferences.sms ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Tarayıcı Bildirimleri</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Anlık sipariş güncellemeleri</p>
                  </div>
                  <button
                    type="button"
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      notificationPreferences.browser ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                    role="switch"
                    aria-checked={notificationPreferences.browser}
                    onClick={() => handleNotificationToggle('browser')}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        notificationPreferences.browser ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hesap Silme */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Hesap Silme</h2>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Hesabınızı sildiğinizde, tüm verileriniz kalıcı olarak silinecektir. Bu işlem geri alınamaz.
              </p>
              <button
                type="button"
                className="px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 dark:text-red-400 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => {
                  if (window.confirm('Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) {
                    // Hesap silme işlemi
                    alert('Hesap silme talebi alındı. Lütfen e-posta adresinizi kontrol edin.')
                  }
                }}
              >
                Hesabımı Sil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 