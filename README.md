# Project set-up

## 1. Clone the repository
```bash
git clone https://github.com/kmk00/adsfox-recruitment.git
```

## 2. Backend

### Set up backend
```bash
cd backend
```
```bash
composer install
```
```bash
cp .env.example .env
```
```bash
php artisan key:generate
```
```bash
php artisan migrate
```
Create new sqlite database - yes
```bash
php artisan db:seed
```
```bash
php artisan serve
```


### Run tests
```bash
php artisan test
```

## 3. Frontend

### Set up frontend
```bash
cd frontend
```
```bash
npm install
```
```bash
echo 'VITE_API_URL="http://127.0.0.1:8000/api"' > .env
```

```bash
npm run dev
```

### Run tests
```bash
npm run test
```

