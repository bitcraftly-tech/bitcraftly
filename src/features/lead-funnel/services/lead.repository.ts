import { Prisma } from '@/generated/prisma/client';
import type { Lead as PrismaLead, LeadStatus as PrismaLeadStatus } from '@/generated/prisma/client';
import { prisma } from '@/lib/db/prisma';
import type { LeadIntent } from '../types';
import type { LeadRecord } from './lead.types';

export type LeadRepositoryErrorCode =
  'UNIQUE_VIOLATION' | 'NOT_FOUND' | 'DATABASE_UNAVAILABLE' | 'PRISMA_ERROR' | 'UNKNOWN';

export interface LeadRepositorySuccess<T> {
  readonly ok: true;
  readonly data: T;
}

export interface LeadRepositoryFailure {
  readonly ok: false;
  readonly code: LeadRepositoryErrorCode;
  readonly message: string;
}

export type LeadRepositoryResult<T> = LeadRepositorySuccess<T> | LeadRepositoryFailure;

export type PersistedLeadStatus = PrismaLeadStatus;

export interface PersistedLeadRecord extends Omit<LeadRecord, 'status'> {
  readonly status: PersistedLeadStatus;
  readonly notificationSentAt?: string;
  readonly notificationError?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export type SaveLeadResult = LeadRepositoryResult<{ readonly leadId: string }>;
export type FindLeadByIdResult = LeadRepositoryResult<PersistedLeadRecord>;
export type FindLeadByEmailResult = LeadRepositoryResult<{
  readonly leads: readonly PersistedLeadRecord[];
}>;
export type UpdateLeadStatusResult = LeadRepositoryResult<PersistedLeadRecord>;
export type MarkNotificationSentResult = LeadRepositoryResult<PersistedLeadRecord>;
export type MarkNotificationFailedResult = LeadRepositoryResult<PersistedLeadRecord>;

export interface ListLeadsFilters {
  readonly search?: string;
  readonly status?: PersistedLeadStatus;
}

export interface LeadStatusCounts {
  readonly total: number;
  readonly new: number;
  readonly contacted: number;
  readonly qualified: number;
  readonly closed: number;
  readonly spam: number;
}

export type ListLeadsResult = LeadRepositoryResult<{
  readonly leads: readonly PersistedLeadRecord[];
}>;
export type GetLeadStatusCountsResult = LeadRepositoryResult<LeadStatusCounts>;

export const PERSISTED_LEAD_STATUSES = [
  'new',
  'contacted',
  'qualified',
  'closed',
  'spam',
] as const satisfies readonly PersistedLeadStatus[];

const DATABASE_UNAVAILABLE_CODES = new Set(['P1000', 'P1001', 'P1002', 'P1008', 'P1017']);

type LeadModelDelegate = Pick<
  typeof prisma.lead,
  'create' | 'findUnique' | 'findMany' | 'update' | 'count' | 'groupBy'
>;

export type { LeadModelDelegate };

export interface LeadRepository {
  saveLead(record: LeadRecord): Promise<SaveLeadResult>;
  findLeadById(id: string): Promise<FindLeadByIdResult>;
  findLeadByEmail(email: string): Promise<FindLeadByEmailResult>;
  updateLeadStatus(id: string, status: PersistedLeadStatus): Promise<UpdateLeadStatusResult>;
  markNotificationSent(id: string, notificationSentAt: Date): Promise<MarkNotificationSentResult>;
  markNotificationFailed(
    id: string,
    notificationError: string,
  ): Promise<MarkNotificationFailedResult>;
  listLeads(filters?: ListLeadsFilters): Promise<ListLeadsResult>;
  getLeadStatusCounts(): Promise<GetLeadStatusCountsResult>;
}

function optionalString(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function toIsoString(value: Date): string {
  return value.toISOString();
}

function mapLeadRowToRecord(row: PrismaLead): PersistedLeadRecord {
  return {
    id: row.id,
    leadType: row.leadType,
    status: row.status,
    name: row.name,
    email: row.email,
    phone: optionalString(row.phone),
    company: optionalString(row.company),
    intent: row.intent as LeadIntent,
    message: row.message,
    website: optionalString(row.website),
    source: row.source,
    pagePath: row.pagePath,
    submittedAt: toIsoString(row.submittedAt),
    referer: optionalString(row.referer),
    userAgent: optionalString(row.userAgent),
    notificationSentAt: row.notificationSentAt ? toIsoString(row.notificationSentAt) : undefined,
    notificationError: optionalString(row.notificationError),
    createdAt: toIsoString(row.createdAt),
    updatedAt: toIsoString(row.updatedAt),
  };
}

function mapLeadRecordToCreateInput(record: LeadRecord): Prisma.LeadCreateInput {
  return {
    id: record.id,
    leadType: record.leadType,
    status: record.status,
    name: record.name,
    email: record.email,
    phone: record.phone ?? null,
    company: record.company ?? null,
    intent: record.intent,
    message: record.message,
    website: record.website ?? null,
    source: record.source,
    pagePath: record.pagePath,
    submittedAt: new Date(record.submittedAt),
    referer: record.referer ?? null,
    userAgent: record.userAgent ?? null,
  };
}

function buildListLeadsWhere(filters?: ListLeadsFilters): Prisma.LeadWhereInput {
  const search = filters?.search?.trim();
  const status = filters?.status;
  const conditions: Prisma.LeadWhereInput[] = [];

  if (status) {
    conditions.push({ status });
  }

  if (search) {
    conditions.push({
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { intent: { contains: search, mode: 'insensitive' } },
      ],
    });
  }

  return conditions.length > 0 ? { AND: conditions } : {};
}

function createEmptyLeadStatusCounts(total = 0): LeadStatusCounts {
  return {
    total,
    new: 0,
    contacted: 0,
    qualified: 0,
    closed: 0,
    spam: 0,
  };
}

function applyGroupedLeadStatusCounts(
  counts: LeadStatusCounts,
  grouped: ReadonlyArray<{
    readonly status: PersistedLeadStatus;
    readonly _count: { readonly status: number };
  }>,
): LeadStatusCounts {
  return grouped.reduce<LeadStatusCounts>(
    (next, row) => ({
      ...next,
      [row.status]: row._count.status,
    }),
    counts,
  );
}

export function mapLeadRepositoryError(error: unknown): LeadRepositoryFailure {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return {
        ok: false,
        code: 'UNIQUE_VIOLATION',
        message: 'A lead with this identifier already exists.',
      };
    }

    if (error.code === 'P2025') {
      return {
        ok: false,
        code: 'NOT_FOUND',
        message: 'Lead not found.',
      };
    }

    if (DATABASE_UNAVAILABLE_CODES.has(error.code)) {
      return {
        ok: false,
        code: 'DATABASE_UNAVAILABLE',
        message: 'Database is unavailable.',
      };
    }

    return {
      ok: false,
      code: 'PRISMA_ERROR',
      message: error.message,
    };
  }

  if (
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientRustPanicError
  ) {
    return {
      ok: false,
      code: 'DATABASE_UNAVAILABLE',
      message: 'Database is unavailable.',
    };
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return {
      ok: false,
      code: 'PRISMA_ERROR',
      message: error.message,
    };
  }

  return {
    ok: false,
    code: 'UNKNOWN',
    message: 'An unexpected database error occurred.',
  };
}

export function createLeadRepository(deps: { lead: LeadModelDelegate }): LeadRepository {
  const { lead } = deps;

  return {
    async saveLead(record) {
      try {
        const created = await lead.create({
          data: mapLeadRecordToCreateInput(record),
        });

        return {
          ok: true,
          data: { leadId: created.id },
        };
      } catch (error) {
        return mapLeadRepositoryError(error);
      }
    },

    async findLeadById(id) {
      try {
        const row = await lead.findUnique({
          where: { id },
        });

        if (!row) {
          return {
            ok: false,
            code: 'NOT_FOUND',
            message: 'Lead not found.',
          };
        }

        return {
          ok: true,
          data: mapLeadRowToRecord(row),
        };
      } catch (error) {
        return mapLeadRepositoryError(error);
      }
    },

    async findLeadByEmail(email) {
      try {
        const rows = await lead.findMany({
          where: { email: email.trim() },
          orderBy: { submittedAt: 'desc' },
        });

        return {
          ok: true,
          data: {
            leads: rows.map(mapLeadRowToRecord),
          },
        };
      } catch (error) {
        return mapLeadRepositoryError(error);
      }
    },

    async updateLeadStatus(id, status) {
      try {
        const updated = await lead.update({
          where: { id },
          data: { status },
        });

        return {
          ok: true,
          data: mapLeadRowToRecord(updated),
        };
      } catch (error) {
        return mapLeadRepositoryError(error);
      }
    },

    async markNotificationSent(id, notificationSentAt) {
      try {
        const updated = await lead.update({
          where: { id },
          data: { notificationSentAt },
        });

        return {
          ok: true,
          data: mapLeadRowToRecord(updated),
        };
      } catch (error) {
        return mapLeadRepositoryError(error);
      }
    },

    async markNotificationFailed(id, notificationError) {
      try {
        const updated = await lead.update({
          where: { id },
          data: { notificationError },
        });

        return {
          ok: true,
          data: mapLeadRowToRecord(updated),
        };
      } catch (error) {
        return mapLeadRepositoryError(error);
      }
    },

    async listLeads(filters) {
      try {
        const rows = await lead.findMany({
          where: buildListLeadsWhere(filters),
          orderBy: { submittedAt: 'desc' },
        });

        return {
          ok: true,
          data: {
            leads: rows.map(mapLeadRowToRecord),
          },
        };
      } catch (error) {
        return mapLeadRepositoryError(error);
      }
    },

    async getLeadStatusCounts() {
      try {
        const [total, grouped] = await Promise.all([
          lead.count(),
          lead.groupBy({
            by: ['status'],
            _count: { status: true },
          }),
        ]);

        const counts = applyGroupedLeadStatusCounts(createEmptyLeadStatusCounts(total), grouped);

        return {
          ok: true,
          data: counts,
        };
      } catch (error) {
        return mapLeadRepositoryError(error);
      }
    },
  };
}

const defaultLeadRepository = createLeadRepository({ lead: prisma.lead });

export const saveLead = defaultLeadRepository.saveLead.bind(defaultLeadRepository);
export const findLeadById = defaultLeadRepository.findLeadById.bind(defaultLeadRepository);
export const findLeadByEmail = defaultLeadRepository.findLeadByEmail.bind(defaultLeadRepository);
export const updateLeadStatus = defaultLeadRepository.updateLeadStatus.bind(defaultLeadRepository);
export const markNotificationSent =
  defaultLeadRepository.markNotificationSent.bind(defaultLeadRepository);
export const markNotificationFailed =
  defaultLeadRepository.markNotificationFailed.bind(defaultLeadRepository);
export const listLeads = defaultLeadRepository.listLeads.bind(defaultLeadRepository);
export const getLeadStatusCounts =
  defaultLeadRepository.getLeadStatusCounts.bind(defaultLeadRepository);
