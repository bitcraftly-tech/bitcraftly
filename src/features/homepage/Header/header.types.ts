export interface HeaderNavLink {
  label: string;
  href: string;
  description?: string;
  hasDropdown?: boolean;
}

export interface HeaderActionLink {
  label: string;
  href: string;
}

export interface NavigationLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  onClick?: () => void;
  className?: string;
}
