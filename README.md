# GM Campaign Preference Tool

A web application that helps tabletop RPG Game Masters (GMs) align player expectations before session zero. Players complete a structured survey about their campaign preferences, which are then scored against four archetypes (Combat-Focused, Story-Driven, Sandbox, Tactical) to provide actionable recommendations for campaign theme and tone.

## Problem

Tabletop RPG campaigns fail not because the GM is unprepared, but because the table is misaligned. Players show up expecting wildly different things: one wants brutal combat, another wants deep character drama, a third wants an open sandbox. Without a structured way to surface these preferences before session zero, GMs are flying blind.

## Solution

The GM Campaign Preference Tool solves this by giving GMs a short, structured player survey that collects preferences, scores them against four campaign archetypes, and produces an actionable recommendation for campaign theme and tone — before a single die is rolled.

## Tech Stack

- **Framework**: Nuxt.js 3 (Vue.js)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Deployment**: Supabase (planned)

## Setup

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with:
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run generate` - Generate static site

### Project Structure

```
├── app/                 # Nuxt app directory
│   ├── components/      # Reusable Vue components
│   ├── pages/          # Page components (file-based routing)
│   └── layouts/        # Layout components
├── composables/        # Vue composables
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── public/             # Static assets
```

## Contributing

This project uses OpenSpec for change management. See `openspec/` directory for specifications and change tracking.

## License

MIT

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
