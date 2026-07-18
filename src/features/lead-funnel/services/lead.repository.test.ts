import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  prisma: {
    lead: {
      create: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      count: vi.fn(),
      groupBy: vi.fn(),
    },
  },
}));

import { Prisma } from "@/generated/prisma/client";
import type { Lead as PrismaLead } from "@/generated/prisma/client";
import type { LeadRecord } from "@/features/lead-funnel/services/lead.types";
import {
  createLeadRepository,
  mapLeadRepositoryError,
  type LeadModelDelegate,
} from "@/features/lead-funnel/services/lead.repository";

const LEAD_ID = "550e8400-e29b-41d4-a716-446655440000";

const SAMPLE_RECORD: LeadRecord = {
  id: LEAD_ID,
  leadType: "contact",
  status: "new",
  name: "Ada Lovelace",
  email: "ada@example.com",
  phone: "+1 555 0100",
  company: "Analytical Engines",
  intent: "consultation",
  message: "Need help shipping a SaaS MVP.",
  website: "https://example.com",
  source: "contact-form",
  pagePath: "/contact",
  submittedAt: "2026-07-18T00:00:00.000Z",
  referer: "https://bitcraftly.com/contact",
  userAgent: "Mozilla/5.0 Test",
};

const SAMPLE_ROW: PrismaLead = {
  id: LEAD_ID,
  leadType: "contact",
  status: "new",
  name: SAMPLE_RECORD.name,
  email: SAMPLE_RECORD.email,
  phone: SAMPLE_RECORD.phone ?? null,
  company: SAMPLE_RECORD.company ?? null,
  intent: SAMPLE_RECORD.intent,
  message: SAMPLE_RECORD.message,
  website: SAMPLE_RECORD.website ?? null,
  source: SAMPLE_RECORD.source,
  pagePath: SAMPLE_RECORD.pagePath,
  submittedAt: new Date(SAMPLE_RECORD.submittedAt),
  referer: SAMPLE_RECORD.referer ?? null,
  userAgent: SAMPLE_RECORD.userAgent ?? null,
  notificationSentAt: null,
  notificationError: null,
  createdAt: new Date("2026-07-18T00:00:00.000Z"),
  updatedAt: new Date("2026-07-18T00:00:00.000Z"),
};

function createKnownRequestError(
  code: string,
  message = "Database request failed",
): Prisma.PrismaClientKnownRequestError {
  return new Prisma.PrismaClientKnownRequestError(message, {
    code,
    clientVersion: "7.8.0",
  });
}

function createRepository(overrides?: {
  create?: ReturnType<typeof vi.fn>;
  findUnique?: ReturnType<typeof vi.fn>;
  findMany?: ReturnType<typeof vi.fn>;
  update?: ReturnType<typeof vi.fn>;
  count?: ReturnType<typeof vi.fn>;
  groupBy?: ReturnType<typeof vi.fn>;
}) {
  return createLeadRepository({
    lead: {
      create: overrides?.create ?? vi.fn(),
      findUnique: overrides?.findUnique ?? vi.fn(),
      findMany: overrides?.findMany ?? vi.fn(),
      update: overrides?.update ?? vi.fn(),
      count: overrides?.count ?? vi.fn(),
      groupBy: overrides?.groupBy ?? vi.fn(),
    } as LeadModelDelegate,
  });
}

describe("mapLeadRepositoryError", () => {
  it("maps unique constraint failures", () => {
    expect(mapLeadRepositoryError(createKnownRequestError("P2002"))).toEqual({
      ok: false,
      code: "UNIQUE_VIOLATION",
      message: "A lead with this identifier already exists.",
    });
  });

  it("maps record-not-found failures", () => {
    expect(mapLeadRepositoryError(createKnownRequestError("P2025"))).toEqual({
      ok: false,
      code: "NOT_FOUND",
      message: "Lead not found.",
    });
  });

  it("maps database unavailable failures", () => {
    expect(mapLeadRepositoryError(createKnownRequestError("P1001"))).toEqual({
      ok: false,
      code: "DATABASE_UNAVAILABLE",
      message: "Database is unavailable.",
    });
  });

  it("maps other prisma request failures", () => {
    const result = mapLeadRepositoryError(
      createKnownRequestError("P2003", "Foreign key constraint failed"),
    );

    expect(result).toEqual({
      ok: false,
      code: "PRISMA_ERROR",
      message: "Foreign key constraint failed",
    });
  });

  it("maps initialization failures", () => {
    const error = new Prisma.PrismaClientInitializationError(
      "Can't reach database server",
      "7.8.0",
    );

    expect(mapLeadRepositoryError(error)).toEqual({
      ok: false,
      code: "DATABASE_UNAVAILABLE",
      message: "Database is unavailable.",
    });
  });

  it("maps unknown failures", () => {
    expect(mapLeadRepositoryError(new Error("unexpected"))).toEqual({
      ok: false,
      code: "UNKNOWN",
      message: "An unexpected database error occurred.",
    });
  });
});

describe("lead.repository", () => {
  it("saveLead persists a lead record", async () => {
    const create = vi.fn().mockResolvedValue(SAMPLE_ROW);
    const repository = createRepository({ create });

    const result = await repository.saveLead(SAMPLE_RECORD);

    expect(result).toEqual({
      ok: true,
      data: { leadId: LEAD_ID },
    });
    expect(create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        id: LEAD_ID,
        email: "ada@example.com",
        submittedAt: new Date("2026-07-18T00:00:00.000Z"),
      }),
    });
  });

  it("saveLead maps unique violations", async () => {
    const repository = createRepository({
      create: vi.fn().mockRejectedValue(createKnownRequestError("P2002")),
    });

    const result = await repository.saveLead(SAMPLE_RECORD);

    expect(result).toEqual({
      ok: false,
      code: "UNIQUE_VIOLATION",
      message: "A lead with this identifier already exists.",
    });
  });

  it("saveLead maps database unavailable failures", async () => {
    const repository = createRepository({
      create: vi.fn().mockRejectedValue(createKnownRequestError("P1001")),
    });

    const result = await repository.saveLead(SAMPLE_RECORD);

    expect(result).toEqual({
      ok: false,
      code: "DATABASE_UNAVAILABLE",
      message: "Database is unavailable.",
    });
  });

  it("findLeadById returns a persisted lead", async () => {
    const repository = createRepository({
      findUnique: vi.fn().mockResolvedValue(SAMPLE_ROW),
    });

    const result = await repository.findLeadById(LEAD_ID);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toEqual({
        ...SAMPLE_RECORD,
        notificationSentAt: undefined,
        notificationError: undefined,
        createdAt: "2026-07-18T00:00:00.000Z",
        updatedAt: "2026-07-18T00:00:00.000Z",
      });
    }
  });

  it("findLeadById returns not found when no row exists", async () => {
    const repository = createRepository({
      findUnique: vi.fn().mockResolvedValue(null),
    });

    const result = await repository.findLeadById(LEAD_ID);

    expect(result).toEqual({
      ok: false,
      code: "NOT_FOUND",
      message: "Lead not found.",
    });
  });

  it("findLeadByEmail returns matching leads newest first", async () => {
    const findMany = vi.fn().mockResolvedValue([SAMPLE_ROW]);
    const repository = createRepository({ findMany });

    const result = await repository.findLeadByEmail(" ada@example.com ");

    expect(result).toEqual({
      ok: true,
      data: {
        leads: [
          {
            ...SAMPLE_RECORD,
            notificationSentAt: undefined,
            notificationError: undefined,
            createdAt: "2026-07-18T00:00:00.000Z",
            updatedAt: "2026-07-18T00:00:00.000Z",
          },
        ],
      },
    });
    expect(findMany).toHaveBeenCalledWith({
      where: { email: "ada@example.com" },
      orderBy: { submittedAt: "desc" },
    });
  });

  it("findLeadByEmail returns an empty list when no leads exist", async () => {
    const repository = createRepository({
      findMany: vi.fn().mockResolvedValue([]),
    });

    const result = await repository.findLeadByEmail("missing@example.com");

    expect(result).toEqual({
      ok: true,
      data: { leads: [] },
    });
  });

  it("updateLeadStatus updates and returns the lead", async () => {
    const updatedRow: PrismaLead = {
      ...SAMPLE_ROW,
      status: "contacted",
      updatedAt: new Date("2026-07-18T01:00:00.000Z"),
    };
    const update = vi.fn().mockResolvedValue(updatedRow);
    const repository = createRepository({ update });

    const result = await repository.updateLeadStatus(LEAD_ID, "contacted");

    expect(update).toHaveBeenCalledWith({
      where: { id: LEAD_ID },
      data: { status: "contacted" },
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.status).toBe("contacted");
      expect(result.data.updatedAt).toBe("2026-07-18T01:00:00.000Z");
    }
  });

  it("updateLeadStatus maps not found failures", async () => {
    const repository = createRepository({
      update: vi.fn().mockRejectedValue(createKnownRequestError("P2025")),
    });

    const result = await repository.updateLeadStatus(LEAD_ID, "qualified");

    expect(result).toEqual({
      ok: false,
      code: "NOT_FOUND",
      message: "Lead not found.",
    });
  });

  it("updateLeadStatus maps unknown failures", async () => {
    const repository = createRepository({
      update: vi.fn().mockRejectedValue(new Error("unexpected")),
    });

    const result = await repository.updateLeadStatus(LEAD_ID, "closed");

    expect(result).toEqual({
      ok: false,
      code: "UNKNOWN",
      message: "An unexpected database error occurred.",
    });
  });

  it("markNotificationSent updates notificationSentAt", async () => {
    const sentAt = new Date("2026-07-18T02:00:00.000Z");
    const updatedRow: PrismaLead = {
      ...SAMPLE_ROW,
      notificationSentAt: sentAt,
      updatedAt: sentAt,
    };
    const update = vi.fn().mockResolvedValue(updatedRow);
    const repository = createRepository({ update });

    const result = await repository.markNotificationSent(LEAD_ID, sentAt);

    expect(update).toHaveBeenCalledWith({
      where: { id: LEAD_ID },
      data: { notificationSentAt: sentAt },
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.notificationSentAt).toBe("2026-07-18T02:00:00.000Z");
    }
  });

  it("markNotificationFailed updates notificationError", async () => {
    const updatedRow: PrismaLead = {
      ...SAMPLE_ROW,
      notificationError: "Invalid from address",
      updatedAt: new Date("2026-07-18T02:00:00.000Z"),
    };
    const update = vi.fn().mockResolvedValue(updatedRow);
    const repository = createRepository({ update });

    const result = await repository.markNotificationFailed(
      LEAD_ID,
      "Invalid from address",
    );

    expect(update).toHaveBeenCalledWith({
      where: { id: LEAD_ID },
      data: { notificationError: "Invalid from address" },
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.notificationError).toBe("Invalid from address");
    }
  });

  it("markNotificationSent maps not found failures", async () => {
    const repository = createRepository({
      update: vi.fn().mockRejectedValue(createKnownRequestError("P2025")),
    });

    const result = await repository.markNotificationSent(
      LEAD_ID,
      new Date("2026-07-18T02:00:00.000Z"),
    );

    expect(result).toEqual({
      ok: false,
      code: "NOT_FOUND",
      message: "Lead not found.",
    });
  });

  it("listLeads applies search and status filters", async () => {
    const findMany = vi.fn().mockResolvedValue([SAMPLE_ROW]);
    const repository = createRepository({ findMany });

    const result = await repository.listLeads({
      search: "ada",
      status: "new",
    });

    expect(findMany).toHaveBeenCalledWith({
      where: {
        AND: [
          { status: "new" },
          {
            OR: [
              { name: { contains: "ada", mode: "insensitive" } },
              { company: { contains: "ada", mode: "insensitive" } },
              { email: { contains: "ada", mode: "insensitive" } },
              { intent: { contains: "ada", mode: "insensitive" } },
            ],
          },
        ],
      },
      orderBy: { submittedAt: "desc" },
    });
    expect(result.ok).toBe(true);
  });

  it("getLeadStatusCounts aggregates totals by status", async () => {
    const repository = createRepository({
      count: vi.fn().mockResolvedValue(4),
      groupBy: vi.fn().mockResolvedValue([
        { status: "new", _count: { status: 2 } },
        { status: "contacted", _count: { status: 1 } },
        { status: "spam", _count: { status: 1 } },
      ]),
    });

    const result = await repository.getLeadStatusCounts();

    expect(result).toEqual({
      ok: true,
      data: {
        total: 4,
        new: 2,
        contacted: 1,
        qualified: 0,
        closed: 0,
        spam: 1,
      },
    });
  });
});
