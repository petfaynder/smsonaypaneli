'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Şifre kontrolü
    if (formData.password !== formData.passwordConfirm) {
      alert('Şifreler eşleşmiyor!')
      setLoading(false)
      return
    }
    
    // Simüle edilmiş kayıt işlemi
    setTimeout(() => {
      console.log('Kayıt işlemi:', formData)
      setLoading(false)
      // Burada gerçek bir API çağrısı yapılacak
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Yeni bir hesap oluşturun
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Veya{' '}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
              mevcut hesabınızla giriş yapın
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Ad Soyad
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="input rounded-md"
                placeholder="Ad Soyad"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email adresiniz
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input rounded-md"
                placeholder="Email adresiniz"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Şifreniz
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="input rounded-md"
                placeholder="Şifreniz"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="passwordConfirm" className="sr-only">
                Şifre Tekrar
              </label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                autoComplete="new-password"
                required
                className="input rounded-md"
                placeholder="Şifre Tekrar"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 