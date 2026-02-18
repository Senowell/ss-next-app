import Image from "next/image";
import Link from "next/link";
import Product from "@/components/Product";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
        {/* Content */}
        <main className="w-12/12 mx-auto py-12 md:py-4">
            {/* Hero Section */}
            <div className="rounded-md mx-6 md:mx-auto md:w-12/12 py-12 px-0 text-center" style={{ backgroundColor: '#535253' }}>
                <div className="w-full">
                    <h1 className="text-white text-2xl md:text-2xl font-bold mb-2">
                    About Us
                    </h1>
                </div>
            </div>

            {/* What Senowell Does Section */}
            <section className="max-w-4xl mx-auto py-12 px-6">
                <h2 className="text-2xl font-bold text-center mb-6">What Senowell Does?</h2>
                <p className="text-gray-700 text-center leading-relaxed">
                Ensuring safety from fires in transportation infrastructure is essential, as
                effective fire detection in areas like road/rail/metro tunnels or parking
                garages prevents disasters and protects lives. Fires in these confined
                spaces can escalate quickly, with severe consequences and high
                reconstruction costs. In such critical environments, time is crucial,
                making fast and accurate fire detection vital. Senowell&apos;s fiber
                optic Linear Heat Detection (LHD) technology offers a reliable monitoring
                solution, even under harshest conditions, assets
                </p>
            </section>

            {/* Leadership Section */}
            <section className="max-w-4xl mx-auto py-12 px-6">
                <h2 className="text-2xl font-bold text-center mb-8">Leadership</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                {/* Leader 1 */}
                <div className="text-center">
                    <div className="w-40 h-40 mx-auto mb-4 rounded-lg overflow-hidden bg-gray-200">
                    <Image
                        src="https://via.placeholder.com/160x160/535253/FFFFFF?text=Rufus+R+Manuel"
                        alt="Rufus R Manuel"
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                    />
                    </div>
                    <h3 className="text-lg font-bold">Rufus R Manuel</h3>
                    <p className="text-gray-600 mb-3">Director Founder, COO</p>
                    <div className="flex justify-center gap-3">
                    <Link href="#" className="text-gray-700 hover:text-blue-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                    </Link>
                    <Link href="#" className="text-gray-700 hover:text-gray-900">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                    </Link>
                    </div>
                </div>

                {/* Leader 2 */}
                <div className="text-center">
                    <div className="w-40 h-40 mx-auto mb-4 rounded-lg overflow-hidden bg-gray-200">
                    <Image
                        src="https://via.placeholder.com/160x160/535253/FFFFFF?text=Alan+Seymour"
                        alt="Alan Seymour"
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                    />
                    </div>
                    <h3 className="text-lg font-bold">Alan Seymour</h3>
                    <p className="text-gray-600 mb-3">President, CEO</p>
                    <div className="flex justify-center gap-3">
                    <Link href="#" className="text-gray-700 hover:text-blue-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                    </Link>
                    <Link href="#" className="text-gray-700 hover:text-gray-900">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                    </Link>
                    </div>
                </div>
                </div>
            </section>

            {/* Advanced Solutions Section */}
            <div className="mx-6 md:mx-auto md:w-12/12 my-6 rounded-lg overflow-hidden shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Service Solution */}
                <div className="p-12" style={{ backgroundColor: '#535253' }}>
                    <h3 className="text-white text-2xl font-bold mb-6">Advanced Service Solution</h3>
                    <div className="text-white space-y-4">
                    <div>
                        <p className="font-semibold mb-2">Comprehensive Support:</p>
                        <ul className="space-y-1 text-gray-200 text-sm">
                        <li>· Senowell offers comprehensive service support through all</li>
                        <li>· project phases: Consult, Understand, Define & Apply</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold mb-2">Planning & Design:</p>
                        <ul className="space-y-1 text-gray-200 text-sm">
                        <li>· Recommend the most secure and economical solution</li>
                        <li>· Develop designs meeting your requirements</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold mb-2">Integration & Deployment:</p>
                        <ul className="space-y-1 text-gray-200 text-sm">
                        <li>· Ensure smooth integration with existing systems</li>
                        <li>· Deploy project with skilled engineers</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold mb-2">Support & Maintenance:</p>
                        <ul className="space-y-1 text-gray-200 text-sm">
                        <li>· Ongoing technical support for seamless operation</li>
                        <li>· Maintenance support with software updates & security patches</li>
                        </ul>
                    </div>
                    </div>
                </div>

                {/* Product Solution */}
                <div className="p-12" style={{ backgroundColor: '#AABCEC' }}>
                    <h3 className="text-gray-900 text-2xl font-bold mb-6">Advanced Product Solution</h3>
                    <div className="text-gray-900 space-y-4">
                    <div>
                        <p className="font-semibold mb-2">Comprehensive Support:</p>
                        <ul className="space-y-1 text-gray-700 text-sm">
                        <li>· Senowell offers comprehensive service support through all</li>
                        <li>· project phases: Consult, Understand, Define & Apply</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold mb-2">Planning & Design:</p>
                        <ul className="space-y-1 text-gray-700 text-sm">
                        <li>· Recommend the most secure and economical solution</li>
                        <li>· Develop designs meeting your requirements</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold mb-2">Integration & Deployment:</p>
                        <ul className="space-y-1 text-gray-700 text-sm">
                        <li>· Ensure smooth integration with existing systems</li>
                        <li>· Deploy project with skilled engineers</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold mb-2">Support & Maintenance:</p>
                        <ul className="space-y-1 text-gray-700 text-sm">
                        <li>· Ongoing technical support for seamless operation</li>
                        <li>· Maintenance support with software updates & security patches</li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            {/* Company News Section */}
            <section className="max-w-6xl mx-auto py-12 px-6">
                <h2 className="text-2xl font-bold text-center mb-8">Company News</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    {
                        id: 1,
                        title: "Linear / distributed acoustic sensor (DAS)",
                        description: "Detection and identification of acoustic signals UTS-AS1000",
                        image: "https://via.placeholder.com/600x400/E0E7FF/475569?text=News+Image+1"
                    },
                    {
                        id: 2,
                        title: "Linear / distributed acoustic sensor (DAS)",
                        description: "Detection and identification of acoustic signals UTS-AS1000",
                        image: "https://via.placeholder.com/600x400/E0E7FF/475569?text=News+Image+2"
                    }
                ].map((item) => (
                    <Product
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                        imageHeight="h-64"
                    />
                ))}
                </div>
            </section>
        </main>
    </div>
  );
}
