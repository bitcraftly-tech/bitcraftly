import { getBuildInfo } from '@/lib/observability/build-info';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
  const build = getBuildInfo();

  return Response.json(
    {
      status: 'ok',
      service: 'bitcraftly-platform',
      checks: {
        process: 'ok',
      },
      build,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    },
  );
}
