import LocalServicesBooking from './LocalServicesBooking';
import LocalServicesHero from './LocalServicesHero';
import LocalServicesPricing from './LocalServicesPricing';
import LocalServicesProcess from './LocalServicesProcess';
import LocalServicesProof from './LocalServicesProof';
import LocalServicesServices from './LocalServicesServices';
import LocalServicesTicker from './LocalServicesTicker';
import LocalServicesVoices from './LocalServicesVoices';
import LocalServicesZones from './LocalServicesZones';

/**
 * Steel City Home Pros — motion-led hyperlocal home-services lead funnel.
 * Section anchors (#services, #pricing, #zones, #booking) stay stable for chrome links.
 */
export default function LocalServicesExperiencePage() {
  return (
    <div className="lsx-page">
      <LocalServicesHero />
      <LocalServicesTicker />
      <LocalServicesServices />
      <LocalServicesProcess />
      <LocalServicesProof />
      <LocalServicesPricing />
      <LocalServicesVoices />
      <LocalServicesZones />
      <LocalServicesBooking />
    </div>
  );
}
