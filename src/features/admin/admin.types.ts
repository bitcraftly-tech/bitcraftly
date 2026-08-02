export type AdminContentStatus = 'draft' | 'review' | 'published' | 'archived';

export interface AdminContentRow {
  readonly id: string;
  readonly title: string;
  readonly status: AdminContentStatus;
  readonly updatedAt: string;
  readonly owner: string;
  readonly href?: string;
}

export interface AdminStat {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly hint: string;
}

export interface AdminSettingsGroup {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly fields: readonly AdminSettingsField[];
}

export interface AdminSettingsField {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly helper?: string;
  readonly readOnly?: boolean;
}

/**
 * Future auth contract — UI only for now.
 * Wire JWT / session checks in a server layout before enabling mutations.
 */
export interface AdminAuthContext {
  readonly authenticated: boolean;
  readonly mode: 'ui-preview';
  readonly role: 'admin' | 'editor' | 'viewer';
}
