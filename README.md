# SMS Onay Panel Yazılımı

Bu proje, SMS onay hizmetleri sağlayan bir panel uygulamasıdır. Uygulama, SMS-Activate ve benzeri API entegrasyonları ile SMS kodu alma, doğrulama ve iptal etme işlemlerini yapabilir.

## Özellikler

- **SMS Onay Hizmetleri**: Çeşitli uygulamalar ve servisler için SMS onay kodları alabilme
- **Çoklu API Entegrasyonu**: SMS-Activate, SMSPVA ve SMSREG API'leri ile entegrasyon
- **Kullanıcı Yönetimi**: Kullanıcı kaydı, girişi ve profil yönetimi
- **Bakiye Sistemi**: Kullanıcıların bakiye yüklemesi ve kullanması
- **Sipariş Geçmişi**: Geçmiş SMS onay işlemlerinin takibi
- **Lisans Sistemi**: Farklı müşterilere özel lisanslı kullanım
- **Güncelleme Sistemi**: Uzaktan güncelleme ve yeni özelliklerin dağıtımı
- **Responsive Tasarım**: Mobil cihazlarla uyumlu arayüz
- **Tema Destekği**: Açık ve koyu tema seçenekleri

## Başlangıç

### Gereksinimler

- Node.js 18 veya üzeri
- npm veya yarn
- SMS servisi API anahtarları (SMS-Activate, SMSPVA, vs.)

### Kurulum

1. Repoyu klonlayın
   ```bash
   git clone https://github.com/kullanici/smsonaypanelyazilimi.git
   cd smsonaypanelyazilimi
   ```

2. Gerekli paketleri yükleyin
   ```bash
   npm install
   ```

3. `.env.example` dosyasını `.env` olarak kopyalayın ve gerekli değişkenleri ayarlayın
   ```bash
   cp .env.example .env
   ```

4. Uygulamayı geliştirme modunda başlatın
   ```bash
   npm run dev
   ```

### Dağıtım

1. Uygulamayı derleyin
   ```bash
   npm run build
   ```

2. Derlenen uygulamayı başlatın
   ```bash
   npm start
   ```

## Lisanslama

Bu yazılım, özel lisanslama koşulları altında dağıtılmaktadır. Her bir müşteri için özel bir lisans anahtarı gereklidir. Lisans, belirli bir etki alanı için geçerlidir ve merkezi sunucu tarafından doğrulanır.

## Güncelleme Sistemi

Yazılım, merkezi bir sunucudan güncellemeleri kontrol edip indirerek kendini güncelleyebilir. Güncellemeler, lisans durumu geçerli olan müşterilerin admin paneline otomatik olarak dağıtılır.

## API Entegrasyonu

Panel, aşağıdaki API endpointlerini sunar:

- `GET /api/sms?endpoint=countries` - Desteklenen ülkelerin listesi
- `GET /api/sms?endpoint=services` - Desteklenen servislerin listesi
- `GET /api/sms?endpoint=balance` - Hesap bakiyesi
- `POST /api/sms?action=request-number` - Numara talep etme
- `POST /api/sms?action=check-status` - SMS kodu kontrolü
- `POST /api/sms?action=cancel-number` - Numara iptal etme

## Katkıda Bulunma

1. Bu repoyu forklayın
2. Özellik dalınızı oluşturun (`git checkout -b ozellik/muhteşem-özellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Muhteşem özellik eklendi'`)
4. Dalınızı push edin (`git push origin ozellik/muhteşem-özellik`)
5. Bir Pull Request açın "# smsonaypaneli" 
"# azulsmspanel" 
