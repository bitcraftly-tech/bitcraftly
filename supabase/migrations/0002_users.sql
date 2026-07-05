-- Bitcraftly Phase 3 — users foundation (no credentials, no auth tokens)
-- Maps future rows from Render PostgreSQL via legacy_id; table starts empty.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id bigint UNIQUE,
  email text NOT NULL UNIQUE,
  name text,
  role text NOT NULL DEFAULT 'user',
  is_active boolean NOT NULL DEFAULT true,
  auth_provider text,
  legacy_created_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT users_role_check CHECK (role IN ('admin', 'manager', 'staff', 'user'))
);

CREATE INDEX IF NOT EXISTS users_role_idx ON public.users (role);
CREATE INDEX IF NOT EXISTS users_is_active_idx ON public.users (is_active);

DROP TRIGGER IF EXISTS users_set_updated_at ON public.users;
CREATE TRIGGER users_set_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- PostgREST (service_role secret key) requires table-level grants.
GRANT SELECT, INSERT ON public.users TO service_role;

COMMENT ON TABLE public.users IS
  'Application users for Supabase migration mapping. No password hashes or tokens. Server-only access via service credentials until Supabase Auth is explicitly adopted.';

COMMENT ON COLUMN public.users.legacy_id IS 'Render/FastAPI users.id for idempotent migration mapping.';
