import { getSecurityStatement } from "@/utils/securityStatement";
import { getStrapiMedia } from "@/utils/strapi";
import RichTextRenderer from "@/components/RichTextRenderer";

export const metadata = {
  title: "Security Statement",
  description:
    "Senowell Labs privacy and data protection statement.",
};

export default async function SecurityStatementPage() {
  let data = null;
  let error = false;

  try {
    data = await getSecurityStatement();
  } catch {
    error = true;
  }

  const pageTitle           = data?.pageTitle           ?? "Security Statement";
  const objectivesIntro     = data?.objectivesIntro     ?? null;
  const legalFoundation     = data?.legalFoundation     ?? null;
  const commitments         = data?.commitments         ?? [];
  const transparencyParagraph = data?.transparencyParagraph ?? null;
  const staffNote           = data?.staffNote           ?? null;
  const privacyStatementTitle = data?.privacyStatementTitle ?? null;
  const companyDetails      = data?.companyDetails      ?? null;
  const introduction        = data?.introduction        ?? null;
  const coverageAreas       = data?.coverageAreas       ?? [];
  const contactEmail        = data?.contactEmail        ?? null;
  const signatoryName       = data?.signatoryName       ?? null;
  const signatoryTitle      = data?.signatoryTitle      ?? null;
  const statementDate       = data?.statementDate       ?? null;
  const lastRevised         = data?.lastRevised         ?? null;
  const downloads           = data?.downloads           ?? [];

  const hasObjectivesSection =
    objectivesIntro || legalFoundation || commitments.length > 0 ||
    transparencyParagraph || staffNote;

  const hasPrivacySection =
    privacyStatementTitle || companyDetails || introduction ||
    coverageAreas.length > 0 || contactEmail;

  const hasSignatory = signatoryName || signatoryTitle || statementDate || lastRevised;

  return (
    <div className="min-h-screen bg-white">
      {error && (
        <p className="text-center text-red-500 py-4 text-sm">
          Some content could not be loaded.
        </p>
      )}

      {/* Hero banner */}
      <div
        className="rounded-md mx-6 md:mx-auto md:w-full py-12 px-6 text-center"
        style={{ backgroundColor: "#535253" }}
      >
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">
          {pageTitle}
        </h1>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">

        {/* ── Section A: Data Protection Objectives ── */}
        {hasObjectivesSection && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Data Protection Objectives
            </h2>

            {objectivesIntro && (
              <p className="text-gray-700 leading-relaxed mb-4">{objectivesIntro}</p>
            )}

            {legalFoundation && (
              <p className="text-gray-700 leading-relaxed mb-4">{legalFoundation}</p>
            )}

            {commitments.length > 0 && (
              <ul className="list-disc list-inside space-y-2 mb-4 pl-2">
                {commitments.map((item) => (
                  <li key={item.id} className="text-gray-700 leading-relaxed">
                    {item.statement}
                  </li>
                ))}
              </ul>
            )}

            {transparencyParagraph && (
              <p className="text-gray-700 leading-relaxed mb-4">{transparencyParagraph}</p>
            )}

            {staffNote && (
              <p className="text-gray-700 leading-relaxed">{staffNote}</p>
            )}
          </section>
        )}

        {/* ── Section B: Privacy Statement ── */}
        {hasPrivacySection && (
          <section>
            {privacyStatementTitle && (
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {privacyStatementTitle}
              </h2>
            )}

            {companyDetails && (
              <p className="text-gray-700 leading-relaxed mb-4">{companyDetails}</p>
            )}

            {introduction && (
              <p className="text-gray-700 leading-relaxed mb-4">{introduction}</p>
            )}

            {coverageAreas.length > 0 && (
              <div className="space-y-6 mt-6">
                {coverageAreas.map((area) => (
                  <div key={area.id}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {area.title}
                    </h3>
                    {area.body && (
                      <div className="text-gray-700">
                        <RichTextRenderer content={area.body} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {contactEmail && (
              <p className="mt-6 text-gray-700">
                Comments or questions about our privacy practices can be sent to:{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-blue-600 hover:underline"
                >
                  {contactEmail}
                </a>
              </p>
            )}
          </section>
        )}

        {/* ── Section C: Signatory Block ── */}
        {hasSignatory && (
          <section className="border-t border-gray-200 pt-8">
            <div className="space-y-1">
              {signatoryName && (
                <p className="font-semibold text-gray-900">{signatoryName}</p>
              )}
              {signatoryTitle && (
                <p className="text-gray-600">{signatoryTitle}</p>
              )}
              {statementDate && (
                <p className="text-gray-600 text-sm">{statementDate}</p>
              )}
              {lastRevised && (
                <p className="text-gray-500 text-sm">
                  This policy was last revised on {lastRevised}.
                </p>
              )}
            </div>
          </section>
        )}

        {/* ── Section D: Downloads ── */}
        {downloads.length > 0 && (
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Downloads</h2>
            <div className="space-y-4">
              {downloads.map((item) => {
                const fileUrl = getStrapiMedia(item.file?.url);
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-gray-100 px-6 py-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <span className="text-gray-900 font-medium">{item.label}</span>
                    {fileUrl && (
                      <a
                        href={fileUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-500 hover:text-red-600 transition-colors"
                        aria-label={`Download ${item.label}`}
                      >
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M16 2V22M16 22L8 14M16 22L24 14M2 28H30"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
