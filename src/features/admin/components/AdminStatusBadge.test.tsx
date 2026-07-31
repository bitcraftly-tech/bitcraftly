import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AdminStatusBadge } from '@/features/admin/components/AdminStatusBadge';

describe('AdminStatusBadge', () => {
  it('renders published status label', () => {
    render(<AdminStatusBadge status="published" />);
    expect(screen.getByText('Published')).toBeInTheDocument();
  });

  it('renders draft status label', () => {
    render(<AdminStatusBadge status="draft" />);
    expect(screen.getByText('Draft')).toBeInTheDocument();
  });
});
