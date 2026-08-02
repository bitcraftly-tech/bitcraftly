export interface WebsiteAuditBadge {
  id: string;
  label: string;
}

export interface WebsiteAuditCheckItem {
  id: string;
  label: string;
}

export interface WebsiteAuditAction {
  id: string;
  label: string;
  href: string;
  variant: 'primary' | 'outline';
}
