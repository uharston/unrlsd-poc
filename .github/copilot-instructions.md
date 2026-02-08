# UNRLSD POC - AI Agent Instructions

## Project Overview
UNRLSD is a professional music industry platform connecting beatmakers, artists, artistic directors, labels, and publishers. **UNRLSD also acts as a music publisher**, structuring and preparing works for professional exploitation.

**Not a social network or file hosting** - this is a closed professional ecosystem reflecting real-world industry practices.

### Core Workflow: Beat Locking
- **Temporary Lock**: 7-day exclusive reservation (artist only)
- **Definitive Lock**: Official commitment triggering UNRLSD's publisher role
- **Stems Delivery**: Must occur within 5 days of definitive lock
- **Only Artists can lock beats** (beatmakers and directors cannot)

### Key Business Rules
- **Artist.openToSubmissions**: Controls whether beatmakers can send beats (🟢/🔴 status)
- Artistic Directors can always send beats to their roster artists (bypass openToSubmissions)
- Beatmakers produce 150-500 instrumentals/year; platform acts as professional catalog
- UNRLSD acts as central music publisher and trusted third party

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL via Prisma ORM with pg adapter
- **Styling**: Tailwind CSS v4
- **TypeScript**: Strict mode

## Critical Architecture Patterns

### Prisma Client Generation - IMPORTANT
**Prisma generates to a custom location**: `src/generated/prisma/`

Always import from the generated path:
```typescript
import { PrismaClient } from '../src/generated/prisma/client';
// NOT from '@prisma/client'
```

This is configured in [prisma/schema.prisma](prisma/schema.prisma):
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}
```

### Database Singleton Pattern
Use the shared client from [lib/prisma.ts](lib/prisma.ts) which includes:
- PrismaPg adapter for PostgreSQL connection pooling
- Development-only singleton to prevent hot-reload connection issues
- Query logging enabled in development

```typescript
import { prisma } from '@/lib/prisma';
// or from '../lib/prisma' depending on location
```

### Data Model - Multi-Profile Architecture
One `User` can have multiple professional profiles (beatmaker, artist, artistic director, label, publisher). Each profile type is a separate model with a 1:1 relation to User.

**Important distinction:**
- `User.role` (UserRole enum: USER | ADMIN) = **platform permissions** (who can access admin features)
- Profiles (BeatmakerProfile, ArtistProfile, etc.) = **business roles** (what you do in the music industry)
- A single user can have multiple profiles simultaneously (e.g., both beatmaker AND artist)
- User.role is a SupaStarter field for authorization; profiles are UNRLSD domain logic

**Key relationships:**
- `Beat` → `BeatmakerProfile` (one beatmaker creates many beats)
- `BeatLock` → connects `Beat` + `ArtistProfile` (the core workflow)
- `Stem` → `Beat` (stems are delivered after a lock is secured)
- `ArtistRoster` → connects `ArtisticDirectorProfile` + `ArtistProfile`
- `LabelArtist` → connects `LabelProfile` + `ArtistProfile`
- `PublisherArtist` → connects `PublisherProfile` + `ArtistProfile`

**Lock workflow states:**
- `BeatStatus`: AVAILABLE → TEMP_LOCKED → DEFINITIVELY_LOCKED
- `LockType`: TEMPORARY (7 days) or DEFINITIVE (triggers stems delivery)
- `BeatLock.stemsDelivered`: tracks stem delivery completion
- `BeatLock.stemsDeadline`: 5 days from definitive lock creation
- `BeatLock.expiresAt`: for temporary locks (7-day duration)

### Organizations & Team Structure (Future Integration)
The platform will integrate SupaStarter's Organizations feature for Labels and Publishers operating as teams:

**Current POC Architecture** (profile-based):
- Labels/Publishers are reference entities (name, country, artist list)
- Artistic Directors linked to labels via `associatedOrg` string field
- Artists linked to labels via `recordLabel` string field

**Planned Organization Architecture** (when integrating SupaStarter):
- **Organizations**: Record Labels and Music Publishers as multi-user entities
- **Org Members**: A&R teams, label staff, artistic directors (employees)
- **Signed Artists**: Artists with `organizationId` (signed) vs `null` (independent)
- **Data Isolation**: Universal can only see their roster, Sony sees theirs
- **Team Collaboration**: Multiple A&R directors managing different roster segments

**Profile + Organization Hybrid Model:**
```
Individual Actors (Profile Only):
- Beatmakers: Always independent, no org membership
- Independent Artists: No label, operate autonomously

Organizational Actors (Profile + Org):
- Labels/Publishers: Organization with team members
- Artistic Directors: Profile + org member (work FOR a label)
- Signed Artists: Profile + org member (signed TO a label)
```

**Key Design Principle**: Profiles = professional identity; Organizations = team/company structure. Both coexist for different purposes.

### Role-Based Permissions
**Beatmakers** can:
- Upload and manage instrumentals (catalog of 150-500/year typical)
- Send beats to Artists (only if `openToSubmissions: true`)
- Send beats to Artistic Directors (always allowed)
- Deliver stems when requested via definitive lock
- ❌ Cannot lock beats

**Artists** can:
- Lock beats (temporary or definitive)
- Request stems via definitive lock
- Control submission status (`openToSubmissions` boolean)
- Manage their discography and profile
- Receive beats from directors even when `openToSubmissions: false`

**Artistic Directors** can:
- Browse beatmaker catalogs
- Send beats to their roster artists (bypass `openToSubmissions` check)
- Curate and filter musical proposals
- ❌ Cannot lock beats
- ❌ Cannot request stems

**Labels/Publishers** are:
- Reference entities for professional context and visibility
- ❌ No messaging, submissions, or locking capabilities

## Development Workflows

### Local Database Setup
1. **Start PostgreSQL**: `docker compose up -d`
2. **Run migrations**: `npx prisma migrate dev` (creates/updates schema)
3. **Regenerate client**: Happens automatically after migrate dev
4. **View data**: `npx prisma studio` (opens GUI at localhost:5555)

Connection: `postgresql://unrlsd:unrlsd_dev@localhost:5432/unrlsd_poc`

### Testing Database Connection
Run [scripts/test-db.ts](scripts/test-db.ts) to verify Prisma setup:
```bash
npx tsx scripts/test-db.ts
```

**Note**: Standalone scripts need `import 'dotenv/config'` at the top to load `.env` variables (tsx doesn't auto-load .env files).

### Prisma Migrations
- **Create migration**: `npx prisma migrate dev --name descriptive_name`
- **Check status**: `npx prisma migrate status`
- **Reset DB** (dev only): `npx prisma migrate reset` (drops DB, reruns all migrations)

After ANY schema changes:
1. Update [prisma/schema.prisma](prisma/schema.prisma)
2. Run `npx prisma migrate dev`
3. Prisma Client regenerates automatically to `src/generated/prisma/`

### Next.js Development
- **Dev server**: `npm run dev` (port 3000)
- **Build**: `npm run build`
- **Production**: `npm start`
- **Lint**: `npm run lint` (ESLint 9)

## Project Conventions

### File Organization
- [prisma/schema.prisma](prisma/schema.prisma) - Single schema file, organized by domain (User, Beatmaker, Artist, etc.)
- [lib/](lib/) - Shared utilities (database client, helpers)
- [scripts/](scripts/) - Standalone scripts (database testing, migrations)
- [src/app/](src/app/) - Next.js App Router pages and API routes
- [src/generated/prisma/](src/generated/prisma/) - Auto-generated Prisma Client (NEVER edit directly, gitignored)

### Enums and Status Tracking
Prefer Prisma enums over string literals:
- `UserRole`: USER | ADMIN
- `BeatStatus`: AVAILABLE | TEMP_LOCKED | DEFINITIVELY_LOCKED
- `LockType`: TEMPORARY | DEFINITIVE

### Cascade Deletes
Most relations use `onDelete: Cascade` - deleting a User cascades to all profiles, beats, locks, etc. Be cautious with delete operations.

## Common Gotchas

1. **Custom Prisma output path** - Always import from `src/generated/prisma/client`, not `@prisma/client`
2. **Generated files are gitignored** - Run `prisma migrate dev` after pulling schema changes
3. **Multi-profile users** - Check which profile type is relevant for the current operation (profiles ≠ User.role)
4. **Lock expiration** - Temporary locks expire after 7 days; implement cleanup logic
5. **Stems deadline** - Definitive locks require stems delivery within 5 days (`stemsDeadline` field)
6. **Connection pooling** - Use the singleton client from [lib/prisma.ts](lib/prisma.ts), don't create new PrismaClient instances
7. **Standalone scripts** - Must include `import 'dotenv/config'` at the top to load environment variables
8. **Permission checks** - Beatmakers can only send to artists with `openToSubmissions: true`; artistic directors bypass this
9. **Locking restrictions** - Only Artists can create locks; beatmakers and directors cannot lock beats
10. **Organizations timing** - Current schema uses string fields for labels/publishers; Organizations will be added when migrating to SupaStarter template

## External Integrations
- **SupaStarter compatibility** - User model includes fields (emailVerified, onboardingComplete) for future auth integration
- **SupaStarter Organizations** - Will be used for Labels/Publishers as team entities; disable initially for MVP, enable when first enterprise client onboards
- **File storage** - Beat audio (`audioFileKey`) and stems (`fileKey`) reference external storage (S3/similar, not yet implemented)

## When Making Changes

### Modifying the Data Model
1. Edit [prisma/schema.prisma](prisma/schema.prisma)
2. Run `npx prisma migrate dev --name your_change`
3. Update TypeScript code to handle new fields/relations
4. Update test scripts if data structure changed

### Adding New Features
- Check [prisma/schema.prisma](prisma/schema.prisma) first to understand data relationships
- Use `prisma.$queryRaw` for complex queries that GROQ can't express efficiently
- Leverage Prisma's type generation - TypeScript will catch schema mismatches

### Database Queries
Reference the generated types in `src/generated/prisma/` for autocomplete:
```typescript
import { Beat, BeatStatus } from '../src/generated/prisma';
```
