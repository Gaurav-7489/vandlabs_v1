# VandLabs Motors — V1 Frontend

Production-oriented Next.js + TypeScript + Tailwind + Framer Motion frontend based on the VandLabs Used Car Showroom Product Requirements Document.

## Routes
- `/` premium showroom homepage
- `/cars` searchable/filterable inventory
- `/cars/[slug]` vehicle dossier + enquiry flow
- `/about`, `/services`, `/contact`
- `/admin` CMS dashboard shell
- `/admin/cars` inventory management
- `/admin/cars/new` staged create workflow
- `/admin/cars/[id]` staged edit/publish workflow

## Architecture notes
Public pages use static V1 data in `lib/data.ts` as a backend-safe seam. Replace that module with API/database access without changing the UI contracts.

Admin interactions are intentionally presentation-ready placeholders until real authentication, authorization, persistence, media storage and lead APIs are connected.

The PRD calls for server-side authorization, validation, secure uploads, HTTPS, environment-only secrets, backups, SEO, analytics, and production deployment; these are backend/deployment workstreams and are not faked in the frontend.
