import Product from "@/components/Product";
import Downloads from "@/components/Downloads";
import FaqAccordion from "@/components/FaqAccordion";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import {
  getServiceBySlug,
  getServiceDownloads,
  getServiceAssociatedProducts,
  splitBulletItems,
} from "@/utils/service";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slug = typeof id === "string" ? id : "";
  if (!slug) notFound();

  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const downloads = getServiceDownloads(service);
  const associated = getServiceAssociatedProducts(service);

  return (
    <div className="min-h-screen bg-white">
      <main className="w-12/12 mx-auto py-12 md:py-4">

        {/* Section Banner */}
        <div className="rounded-md mx-6 md:mx-auto md:w-12/12 my-6 py-12 px-6 md:pl-36 text-center md:text-left" style={{ backgroundColor: '#535253' }}>
          <div className="w-full md:w-3/5">
            <h1 className="text-white text-2xl md:text-2xl font-bold mb-2">
              {service.HeroTitle}
            </h1>
            {service.HeroSubtitle ? (
              <p className="text-white text-lg md:text-lg font-semibold">
                {service.HeroSubtitle}
              </p>
            ) : null}
          </div>
        </div>

        {/* Service Overview */}
        {service.Description ? (
          <div className="mx-6 md:mx-auto md:w-12/12 my-6 py-2 px-6 md:pl-36 text-center md:text-left">
            <MarkdownRenderer content={service.Description} />
          </div>
        ) : null}

        {/* Challenge Section */}
        {service.ChallengeTitle || service.ChallengeDescription ? (
          <div className="mx-6 md:mx-auto md:w-12/12 my-6 px-6 md:pl-36 text-center md:text-left">
            {service.ChallengeTitle ? (
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
                {service.ChallengeTitle}
              </h2>
            ) : null}
            {service.ChallengeDescription ? (
              <MarkdownRenderer content={service.ChallengeDescription} />
            ) : null}
          </div>
        ) : null}

        {/* Applications and Assets Section */}
        {((service.ServiceApplication?.length ?? 0) > 0 || (service.ServiceAssert?.length ?? 0) > 0) ? (
          <div className="mx-6 md:mx-auto md:w-12/12 my-6 rounded-lg overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

              {/* Applications */}
              {(service.ServiceApplication?.length ?? 0) > 0 ? (
                <div className="p-12" style={{ backgroundColor: '#535253' }}>
                  <h3 className="text-white text-2xl font-bold mb-6">Applications:</h3>
                  <div className="text-white space-y-4">
                    {(service.ServiceApplication ?? []).map((app) => {
                      const bullets = splitBulletItems(app.items);
                      return (
                        <div key={app.id}>
                          <p className="font-semibold mb-2">{app.title}{bullets.length > 0 ? ":" : ""}</p>
                          {bullets.length > 0 ? (
                            <ul className="space-y-1 text-gray-200 text-sm">
                              {bullets.map((item, i) => (
                                <li key={i}>· {item}</li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {/* Assets */}
              {(service.ServiceAssert?.length ?? 0) > 0 ? (
                <div className="p-12" style={{ backgroundColor: '#AABCEC' }}>
                  <h3 className="text-gray-900 text-2xl font-bold mb-6">Assets:</h3>
                  <ul className="text-gray-900 space-y-3 text-base">
                    {(service.ServiceAssert ?? []).map((asset) => (
                      <li key={asset.id}>{asset.name}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

            </div>
          </div>
        ) : null}

        {/* Downloads Section */}
        {downloads.length > 0 ? <Downloads downloads={downloads} /> : null}

        {/* Associated Equipment Section */}
        {associated.length > 0 ? (
          <div className="mx-6 md:mx-auto md:w-12/12 my-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Associated Equipment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {associated.map((product) => (
                <Product
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  image={product.image}
                />
              ))}
            </div>
          </div>
        ) : null}

        {/* FAQ Section */}
        <FaqAccordion faqs={service.faqs ?? []} />

      </main>
    </div>
  );
}

