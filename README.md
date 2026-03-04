# TicketFlow 🎟️

A full-stack event ticketing platform built with **Next.js**, **Prisma**, and **Supabase**. Users can browse, search, and purchase tickets for events — while admins get a powerful dashboard to manage events, track revenue analytics, and monitor orders.

---

## 🖥️ User Interface
<img width="1883" height="818" alt="image" src="https://github.com/user-attachments/assets/2d96f8da-c571-407d-b15c-eef602a6eb8c" />
<img width="1883" height="818" alt="image" src="https://github.com/user-attachments/assets/f7d1a174-ea0a-49af-8040-c33c59bc15f3" />
<img width="1883" height="818" alt="image" src="https://github.com/user-attachments/assets/db3ac0e6-47a8-4596-9871-24ffa0e906f2" />
<img width="1883" height="818" alt="image" src="https://github.com/user-attachments/assets/7acb2fd4-6351-4d95-aa0d-a62aac3ffc2f" />

## ⚙️ Admin Dashboard
<img width="1910" height="2992" alt="screencapture-sale-ticket-vercel-app-admin-dashboard-2026-03-04-18_04_40" src="https://github.com/user-attachments/assets/115183f5-e9e0-4c0a-bee5-e55f7f10d112" />

## ✨ Features

### 👤 User Side
- Browse events with category filtering and pagination
- Full-text search across event titles
- Hero slideshow of upcoming events on the homepage
- Detailed event pages with image, date, location, price, and description
- Two-step ticket checkout (buyer info → quantity → confirm)
- "Sold Out" overlay for past events
- **My Tickets** page — session-based purchase history (no login required)
- Fully responsive layout with mobile hamburger menu

### 🛠️ Admin Dashboard (`/admin`)
- **Revenue Analytics** — total revenue, tickets sold, avg. order value, active events
- **Sales Trend Chart** — 7-day area chart of daily ticket sales (Recharts)
- **Revenue by Category** — percentage breakdown with progress bars
- **City Sales Distribution** — ranked table + visual breakdown with pagination and search
- **Event Sales Table** — top-performing events ranked by revenue
- **Manage Events** — paginated table with search, category filter, create, edit, delete
- **Manage Cities / Categories** — card grid with add, edit, and delete modals
- **Orders Log** — full ticket transaction history with buyer info, date range filter, and search
- Skeleton loading states throughout for smooth UX

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | [Prisma](https://www.prisma.io/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Charts | [Recharts](https://recharts.org/) via shadcn/ui chart |
| Icons | [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/) |
| Font | Plus Jakarta Sans (Google Fonts) |
| File Upload | Custom `saveFile` utility (`lib/upload.ts`) |

---

## 🗂️ Project Structure

```
├── app/
│   ├── admin/
│   │   ├── dashboard/          # Revenue analytics & charts
│   │   ├── events/             # Event list, create, edit pages
│   │   ├── orders/             # Sold tickets log
│   │   ├── cities/             # City management
│   │   └── categories/         # Category management
│   ├── api/
│   │   ├── admin/              # Admin API routes (events, cities, categories, analytics)
│   │   └── usrUI/              # Public API routes (events, search, tickets, buyers)
│   ├── components/
│   │   ├── admin/              # Sidebar, Cards, Chart, CityRanking, modals...
│   │   └── ui/                 # Navbar, Footer, EventsGrid, HeroSection, modals...
│   ├── events/[title]/         # Event detail + booking page
│   ├── mytickets/              # User ticket history
│   ├── search/                 # Search results page
│   ├── home/                   # Homepage layout
│   └── types/types.ts          # Shared TypeScript interfaces
├── components/ui/              # shadcn/ui primitives (card, chart)
├── lib/
│   ├── prisma.ts               # Prisma client singleton
│   └── upload.ts               # Image file upload utility
└── prisma/
    └── schema.prisma           # Database schema
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com/) project (free tier works)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ticketflow.git
cd ticketflow

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL="your-supabase-postgresql-connection-string"
DIRECT_URL="your-supabase-direct-connection-string"
```

> Find these in your Supabase project under **Settings → Database → Connection String**.

### Database Setup

```bash
# Push the schema to your Supabase database
npx prisma db push

# (Optional) Open Prisma Studio to browse your data
npx prisma studio
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Database Models

| Model | Key Fields |
|---|---|
| `Event` | title, description, image, location, price, eventDate, categoryId, cityId |
| `Category` | name |
| `City` | name |
| `Buyer` | name, email, phone |
| `Ticket` | buyerId, eventId, cityId, sessionId, quantity, totalPrice, createdAt |

---

## 🔑 Key Pages & Routes

| Route | Description |
|---|---|
| `/` | Homepage with hero slideshow and event grid |
| `/events` | All events with category filter and pagination |
| `/events/[title]` | Event detail page and ticket booking |
| `/search?query=` | Search results |
| `/mytickets` | Session-based ticket history |
| `/admin/dashboard` | Revenue analytics dashboard |
| `/admin/events` | Manage events (CRUD) |
| `/admin/orders` | All ticket orders log |
| `/admin/cities` | Manage cities |
| `/admin/categories` | Manage categories |

---

## 📁 Image Uploads

Event images are saved via a custom `saveFile` utility in `lib/upload.ts`. By default, images are stored on the local filesystem — suitable for development only.

For production, replace this with a cloud storage provider:
- [Supabase Storage](https://supabase.com/storage)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Built With Abdelhamid

[Next.js](https://nextjs.org/) · [Supabase](https://supabase.com/) · [Prisma](https://www.prisma.io/) · [Tailwind CSS](https://tailwindcss.com/) · [Recharts](https://recharts.org/) · [shadcn/ui](https://ui.shadcn.com/)
