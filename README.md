# Nexus

Nexus is a gamified productivity platform.

Our mission is to unlock your fullest potential so you can achieve your goals while having fun.

To run the frontend:

```
cd frontend
npm install
npm run dev
```

To run the backend:
You'll need php 8.2, composer and a PostgreSQL database in your local machine. Create a `.env` file from the `.env.example` in the backend directory and update this variables:

```
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

Run the migrations and the server:

```
cd backend
composer install
php artisan migrate
php artisan serve
```
