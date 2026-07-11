export interface HeaderNavLink {
  label: string;
  href: string;
}

export interface HeaderActionLink {
  label: string;
  href: string;
}

export interface NavigationLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}
