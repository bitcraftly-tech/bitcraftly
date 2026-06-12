import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

import {
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_PROJECT_ID,
  isFirebaseConfigured,
} from "@/lib/analytics-dashboard/config";
import { demoLeads } from "@/lib/analytics-dashboard/demo-data";
import type {
  AnalyticsEvent,
  AnalyticsLead,
  LeadStatus,
  LeadType,
} from "@/lib/analytics-dashboard/types";

const LEADS_COLLECTION = "leads";
const EVENTS_COLLECTION = "analytics_events";

let firestore: Firestore | null = null;

function getFirebaseApp(): App | null {
  if (!isFirebaseConfigured()) return null;
  if (getApps().length > 0) return getApps()[0]!;

  return initializeApp({
    credential: cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY,
    }),
    projectId: FIREBASE_PROJECT_ID,
  });
}

export function getFirestoreDb(): Firestore | null {
  if (firestore) return firestore;
  const app = getFirebaseApp();
  if (!app) return null;
  firestore = getFirestore(app);
  return firestore;
}

function docToLead(id: string, data: Record<string, unknown>): AnalyticsLead {
  return {
    id,
    type: (data.type as LeadType) ?? "other",
    status: (data.status as LeadStatus) ?? "new",
    name: data.name as string | undefined,
    email: data.email as string | undefined,
    phone: data.phone as string | undefined,
    businessName: data.businessName as string | undefined,
    businessType: data.businessType as string | undefined,
    message: data.message as string | undefined,
    source: data.source as string | undefined,
    pagePath: data.pagePath as string | undefined,
    service: data.service as string | undefined,
    intent: data.intent as string | undefined,
    createdAt: (data.createdAt as string) ?? new Date().toISOString(),
    updatedAt: (data.updatedAt as string) ?? new Date().toISOString(),
  };
}

export async function listLeads(limit = 100): Promise<AnalyticsLead[]> {
  const db = getFirestoreDb();
  if (!db) return demoLeads();

  const snap = await db.collection(LEADS_COLLECTION).orderBy("createdAt", "desc").limit(limit).get();
  return snap.docs.map((doc) => docToLead(doc.id, doc.data()));
}

export async function getLead(id: string): Promise<AnalyticsLead | null> {
  const db = getFirestoreDb();
  if (!db) return demoLeads().find((lead) => lead.id === id) ?? null;

  const doc = await db.collection(LEADS_COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return docToLead(doc.id, doc.data());
}

export async function createLead(
  input: Omit<AnalyticsLead, "id" | "createdAt" | "updatedAt"> & { id?: string },
): Promise<AnalyticsLead> {
  const db = getFirestoreDb();
  const now = new Date().toISOString();

  if (!db) {
    return {
      id: input.id ?? `local-${Date.now()}`,
      ...input,
      createdAt: now,
      updatedAt: now,
    };
  }

  const ref = input.id ? db.collection(LEADS_COLLECTION).doc(input.id) : db.collection(LEADS_COLLECTION).doc();
  const lead: AnalyticsLead = {
    id: ref.id,
    type: input.type,
    status: input.status ?? "new",
    name: input.name,
    email: input.email,
    phone: input.phone,
    businessName: input.businessName,
    businessType: input.businessType,
    message: input.message,
    source: input.source,
    pagePath: input.pagePath,
    service: input.service,
    intent: input.intent,
    createdAt: now,
    updatedAt: now,
  };

  await ref.set(lead);
  return lead;
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<AnalyticsLead | null> {
  const db = getFirestoreDb();
  if (!db) return null;

  const ref = db.collection(LEADS_COLLECTION).doc(id);
  const now = new Date().toISOString();
  await ref.set({ status, updatedAt: now }, { merge: true });
  return getLead(id);
}

export async function logAnalyticsEvent(event: Omit<AnalyticsEvent, "id" | "createdAt">): Promise<void> {
  const db = getFirestoreDb();
  if (!db) return;

  const ref = db.collection(EVENTS_COLLECTION).doc();
  await ref.set({
    ...event,
    id: ref.id,
    createdAt: new Date().toISOString(),
  });
}
