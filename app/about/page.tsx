import Link from "next/link";
import RichTextRenderer from "@/components/RichTextRenderer";
import SafeImage from "@/components/SafeImage";
import { getStrapiMedia } from "@/utils/strapi";
import {
  getAboutPage,
  type AboutLeader,
  type AboutSolution,
  type AboutCompanyNews,
} from "@/utils/aboutPage";

// ── Sub-components ──────────────────────────────────────────────

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
    </svg>
  );
}

function LeaderCard({ leader }: { leader: AboutLeader }) {
  const photoUrl = getStrapiMedia(leader.photo?.url);
  const altText = leader.photo?.alternativeText ?? leader.name;

  return (
    <div className="text-center">
      <div className="w-full aspect-square mx-auto mb-4 rounded-lg overflow-hidden bg-gray-200 relative">
        <SafeImage
          src={photoUrl}
          alt={altText}
          fill
          className="object-cover"
          unoptimized
          sizes="(max-width: 768px) 100vw, 50vw"
          fallback={<div className="absolute inset-0 bg-gray-200" aria-hidden="true" />}
        />
      </div>
      <h3 className="text-lg font-bold">{leader.name}</h3>
      <p className="text-gray-600 mb-3">{leader.position}</p>
      <div className="flex justify-center gap-3">
        {leader.linkedinUrl && (
          <Link
            href={leader.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-blue-600"
          >
            <LinkedInIcon />
          </Link>
        )}
        {leader.twitterUrl && (
          <Link
            href={leader.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900"
          >
            <TwitterIcon />
          </Link>
        )}
      </div>
    </div>
  );
}

function SolutionBlock({ solution }: { solution: AboutSolution }) {
  const isDark = solution.theme === "dark";
  return (
    <div
      className="p-12"
      style={{ backgroundColor: isDark ? "#535253" : "#AABCEC" }}
    >
      <h3
        className={`text-2xl font-bold mb-6 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {solution.title}
      </h3>
      <div className={isDark ? "[&_*]:!text-white" : "text-gray-800"}>
        <RichTextRenderer content={solution.content} />
      </div>
    </div>
  );
}

function NewsCard({ item }: { item: AboutCompanyNews }) {
  const imageUrl = getStrapiMedia(item.CoverImage?.url);
  const altText = item.CoverImage?.alternativeText ?? item.Title;

  return (
    <Link
      href={`/news/${item.Slug}`}
      className="block group border border-gray-300 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow flex flex-col"
    >
      <div className="relative w-full h-56">
        <SafeImage
          src={imageUrl}
          alt={altText}
          fill
          className="object-cover"
          unoptimized
          sizes="(max-width: 768px) 100vw, 50vw"
          fallback={<div className="absolute inset-0 bg-gray-200" aria-hidden="true" />}
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-base font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {item.Title}
        </h3>
        {item.Summary && (
          <p className="text-sm text-gray-600 line-clamp-3">{item.Summary}</p>
        )}
      </div>
    </Link>
  );
}

// ── Page ────────────────────────────────────────────────────────

export default async function AboutPage() {
  let about = null;
  let error = false;

  try {
    about = await getAboutPage();
  } catch {
    error = true;
  }

  const heroTitle = about?.heroTitle ?? "About Us";
  const introSection = about?.introSection ?? null;
  const leadership = about?.leadership ?? [];
  const solutions = about?.Solutions ?? [];
  const companyNews = (about?.companyNews ?? []).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {error && (
        <p className="text-center text-red-500 py-4 text-sm">
          Some content could not be loaded.
        </p>
      )}

      <main className="w-12/12 mx-auto py-12 md:py-4">

        {/* Hero Section */}
        <div
          className="rounded-md mx-6 md:mx-auto md:w-12/12 py-12 px-0 text-center"
          style={{ backgroundColor: "#535253" }}
        >
          <h1 className="text-white text-2xl md:text-2xl font-bold mb-2">
            {heroTitle}
          </h1>
        </div>

        {/* Intro Section */}
        {introSection && (
          <section className="max-w-4xl mx-auto py-12 px-6">
            <h2 className="text-2xl font-bold text-center mb-6">
              {introSection.title}
            </h2>
            <div className="text-gray-700 text-center leading-relaxed">
              <RichTextRenderer content={introSection.content} />
            </div>
          </section>
        )}

        {/* Leadership Section */}
        {leadership.length > 0 && (
          <section className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {leadership.map((leader) => (
                <LeaderCard key={leader.id} leader={leader} />
              ))}
            </div>
          </section>
        )}

        {/* Solutions Section */}
        {solutions.length > 0 && (
          <div className="mx-6 md:mx-auto md:w-12/12 my-6 rounded-lg overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {solutions.map((solution) => (
                <SolutionBlock key={solution.id} solution={solution} />
              ))}
            </div>
          </div>
        )}

        {/* Company News Section */}
        {companyNews.length > 0 && (
          <section className="max-w-6xl mx-auto py-12 px-6">
            <h2 className="text-2xl font-bold text-center mb-8">
              Company News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {companyNews.map((item) => (
                <NewsCard key={item.Slug} item={item} />
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
