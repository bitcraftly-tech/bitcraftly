/**
 * Bitcraftly Marketing Layout System
 * ==================================
 * Source of truth for content width + section rhythm across every
 * marketing page. Matches the frozen Homepage header/content edges.
 *
 * Prefer:
 *   <PageShell>
 *     <Section spacing="lg">...</Section>
 *   </PageShell>
 *
 * Or for stubs:
 *   <MarketingPageShell title="..." description="..." headingId="..." />
 *
 * Do NOT invent per-page max-width / horizontal padding.
 */

/** Horizontal inset — same edges as Header Container (includes safe-area). */
export const CONTAINER_INSET_CLASS =
  'pl-[max(var(--container-padding),env(safe-area-inset-left,0px))] pr-[max(var(--container-padding),env(safe-area-inset-right,0px))]';

/** Content column — same edges as Header / Footer / Homepage. */
export const PAGE_SHELL_CLASS = `mx-auto w-full max-w-[var(--container-xl)] ${CONTAINER_INSET_CLASS}`;

/**
 * Homepage section rhythm (padding-block):
 * mobile 36 · tablet 48 · desktop 60
 * Applied via `.page-shell` in page-shell.css
 */
export const PAGE_SECTION_CLASS = 'page-shell';

/** Shared marketing grid for cards / lists. */
export const PAGE_GRID_CLASS = 'grid w-full grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3';

export const PAGE_GRID_2_CLASS = 'grid w-full grid-cols-1 gap-[24px] sm:grid-cols-2';

export const PAGE_GRID_4_CLASS = 'grid w-full grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-4';
