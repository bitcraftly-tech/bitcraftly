import { ADMIN_SETTINGS_GROUPS } from '../admin.mock-data';
import { AdminPageHeader } from '../components/AdminPageHeader';

export function AdminSettingsPage() {
  return (
    <div className="admin-page">
      <AdminPageHeader
        title="Settings"
        description="Workspace preferences and planned integrations. All fields are read-only until backend auth exists."
        actionLabel="Save changes"
        actionDisabledReason="Settings persistence requires backend"
      />

      <div className="admin-settings">
        {ADMIN_SETTINGS_GROUPS.map((group) => (
          <section
            key={group.id}
            className="admin-settings__group"
            aria-labelledby={`settings-${group.id}-title`}
          >
            <h2 id={`settings-${group.id}-title`} className="admin-settings__title">
              {group.title}
            </h2>
            <p className="admin-settings__desc">{group.description}</p>
            <dl className="admin-settings__fields">
              {group.fields.map((field) => (
                <div key={field.id} className="admin-settings__field">
                  <dt>
                    <label htmlFor={`settings-field-${field.id}`}>{field.label}</label>
                  </dt>
                  <dd>
                    <input
                      id={`settings-field-${field.id}`}
                      className="admin-settings__input"
                      value={field.value}
                      readOnly={field.readOnly ?? true}
                      disabled={field.readOnly ?? true}
                      aria-describedby={
                        field.helper ? `settings-field-${field.id}-help` : undefined
                      }
                    />
                    {field.helper ? (
                      <p id={`settings-field-${field.id}-help`} className="admin-settings__helper">
                        {field.helper}
                      </p>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
