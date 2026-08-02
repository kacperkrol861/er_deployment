# 🚗 EventRide + 🛡️ Smart Event

Demo aplikacji webowej stworzonej w celu rozwijania i prezentacji umiejętności w technologiach **Vue.js + Express.js**.

Projekt nie jest obecnie wdrożony produkcyjnie — pełni funkcję środowiska do testowania nowych rozwiązań, architektury aplikacji oraz zdobywania doświadczenia w tworzeniu aplikacji fullstack.

---

## 📌 Opis projektu

**EventRide** to system typu ride-sharing umożliwiający użytkownikom organizowanie i wyszukiwanie wspólnych przejazdów na wydarzenia takie jak koncerty, festiwale czy wydarzenia sportowe.

**Smart Event** to moduł bezpieczeństwa wydarzeń, który pozwala na monitorowanie sytuacji podczas eventu poprzez:

* wizualizację zagęszczenia uczestników na mapie,
* symulację ruchu tłumu,
* zgłaszanie incydentów,
* lokalizowanie problemów na mapie,
* planowanie ewakuacji oraz punktów bezpieczeństwa.

---

# ✨ Funkcje

## 🚗 EventRide

* rejestracja i logowanie użytkownika,
* autoryzacja JWT,
* tworzenie wydarzeń,
* dodawanie przejazdów,
* wyszukiwanie dostępnych przejazdów,
* dołączanie użytkowników do przejazdów,
* zarządzanie miejscami w samochodzie.

---

## 🛡️ Smart Event

* dashboard bezpieczeństwa wydarzenia,
* analiza poziomu ryzyka,
* symulacja ruchu tłumu,
* heatmapa zagęszczenia uczestników,
* zgłaszanie sytuacji alarmowych,
* lokalizacja zgłoszeń na mapie,
* punkty medyczne i bezpieczeństwa,
* wizualizacja tras ewakuacyjnych.

---

# 🛠️ Technologie

## Frontend

* Vue 3
* TypeScript
* Vite
* Vuestic UI
* Leaflet
* Iconify
* CSS

## Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* JWT Authentication

---

# 📂 Struktura projektu

```
EventRide/
│
├── backend/
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── views/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Instalacja

## 1. Klonowanie repozytorium

```bash
git clone https://github.com/TWOJ_LINK/EventRide.git

cd EventRide
```

---

# 🔹 Backend

Przejdź do folderu backend:

```bash
cd backend
```

Instalacja zależności:

```bash
npm install
```

Utwórz plik `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/eventride"
JWT_SECRET="your_secret"
PORT=3000
```

Migracja bazy danych:

```bash
npx prisma migrate dev
```

Generowanie Prisma Client:

```bash
npx prisma generate
```

Uruchomienie serwera:

```bash
npm run dev
```

Backend będzie dostępny:

```
http://localhost:3000
```

---

# 🔹 Frontend

Przejdź do folderu frontend:

```bash
cd frontend
```

Instalacja:

```bash
npm install
```

Uruchomienie:

```bash
npm run dev
```

Aplikacja będzie dostępna:

```
http://localhost:5173
```

---

# 🔑 Przykładowe moduły API

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

## Events

```
GET /api/events

POST /api/events
```

## Rides

```
GET /api/rides

POST /api/rides
```

---

# 🗺️ Mapy

Projekt wykorzystuje:

* Leaflet,
* OpenStreetMap,
* symulowane dane lokalizacji.

Dane tłumu oraz zgłoszeń w module Smart Event są obecnie generowane demonstracyjnie i służą do prezentacji działania systemu.

---

# 🚧 Status projektu

Projekt jest aktualnie w fazie rozwoju.

✅ działające:

* frontend Vue,
* backend Express,
* baza PostgreSQL,
* autoryzacja,
* podstawowe moduły EventRide,
* dashboard Smart Event.

🔄 planowane:

* wdrożenie produkcyjne,
* prawdziwa lokalizacja GPS,
* powiadomienia realtime WebSocket,
* aplikacja mobilna.

---


Projekt edukacyjny stworzony w celu rozwijania umiejętności fullstack oraz testowania nowych technologii.
