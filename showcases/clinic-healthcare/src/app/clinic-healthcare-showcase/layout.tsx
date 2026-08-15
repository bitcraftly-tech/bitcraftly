import type { ReactNode } from 'react';

import ClinicShowcaseLayout from './ClinicShowcaseLayout';

export default function ClinicHealthcareShowcaseRootLayout({ children }: { children: ReactNode }) {
  return <ClinicShowcaseLayout>{children}</ClinicShowcaseLayout>;
}
