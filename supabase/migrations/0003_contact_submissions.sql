-- Bitcraftly Phase 4C — contact submissions foundation (contact module only)

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id bigint UNIQUE,
  name text NOT NULL,
  business_name text NOT NULL,
  business_type text NOT NULL,
  phone text NOT NULL,
  email text,
  message text,
  source text,
  is_contacted boolean NOT NULL DEFAULT false,
  stage text NOT NULL DEFAULT 'new',
  assigned_to text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT contact_submissions_stage_check CHECK (stage IN ('new', 'in_progress', 'closed'))
);

CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
  ON public.contact_submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS contact_submissions_phone_idx
  ON public.contact_submissions (phone);

CREATE INDEX IF NOT EXISTS contact_submissions_stage_idx
  ON public.contact_submissions (stage);

CREATE INDEX IF NOT EXISTS contact_submissions_is_contacted_idx
  ON public.contact_submissions (is_contacted);

DROP TRIGGER IF EXISTS contact_submissions_set_updated_at ON public.contact_submissions;
CREATE TRIGGER contact_submissions_set_updated_at
  BEFORE UPDATE ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_submissions TO service_role;

COMMENT ON TABLE public.contact_submissions IS
  'Public contact form and consultation/quote submissions. Server-only access via service credentials.';
