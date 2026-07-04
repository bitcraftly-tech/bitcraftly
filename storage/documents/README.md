# Bitcraftly document storage

## Layout

- `internal/` — all 38 official BDS PDFs (not publicly served by Next.js)
- `../public/documents/public/` — approved public PDFs only (currently 2)

## Sync from local source

After cloning the repo, copy official PDFs from your local machine:

```bash
node scripts/sync-bitcraftly-documents.mjs
```

Default source path (Windows):

`C:\Users\uidev\Downloads\Bitcraftly_Official_38_Documents_Complete\Bitcraftly_Official_38_Documents`

Or pass a custom path:

```bash
node scripts/sync-bitcraftly-documents.mjs "D:\path\to\Bitcraftly_Official_38_Documents"
```

## Git strategy (Option A)

Internal PDFs are **gitignored** because they are sensitive and large. The typed registry in `lib/documents/registry.ts` is committed; PDF binaries must be synced locally or deployed via private object storage in production.

Public approved PDFs in `public/documents/public/` **are** committed (currently 1 file: BDS-FND-001).

## Access

- Dashboard library: `/dashboard/documents` (authenticated staff)
- Secure API: `/api/documents/[id]/view`
- Trust Center summaries: `/trust`
