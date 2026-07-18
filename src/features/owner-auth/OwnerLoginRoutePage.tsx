import { OwnerLoginForm } from "./components/OwnerLoginForm";
import { resolveOwnerNextPath } from "./owner-auth.utils";

interface OwnerLoginPageProps {
  readonly nextPath?: string;
}

export function OwnerLoginPage({ nextPath }: OwnerLoginPageProps) {
  return (
    <div className="owner-auth-page">
      <div className="owner-auth-card">
        <header className="owner-auth-card__header">
          <h1 className="owner-auth-card__title">Owner sign in</h1>
          <p className="owner-auth-card__description">
            Sign in to access the Bitcraftly lead intelligence dashboard.
          </p>
        </header>
        <OwnerLoginForm nextPath={resolveOwnerNextPath(nextPath)} />
      </div>
    </div>
  );
}
