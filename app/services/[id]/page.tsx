import Product from "@/components/Product";
import Downloads from "@/components/Downloads";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;

    const products = [
        {
        id: 1,
        title: "Linear / distributed acoustic sensor (DAS)",
        description: "Detection and identification of acoustic signals UTS-AS1000",
        },
        {
        id: 2,
        title: "Linear / distributed acoustic sensor (DAS)",
        description: "Detection and identification of acoustic signals UTS-AS1000",
        },
        {
        id: 3,
        title: "Linear / distributed acoustic sensor (DAS)",
        description: "Detection and identification of acoustic signals UTS-AS1000",
        }
    ];

    const downloads = [
        {
            id: 1,
            title: "Brochure: Railway Monitoring",
            fileType: "PDF",
            fileSize: "5.3 MB",
        },
        {
            id: 2,
            title: "Brochure: Railway Monitoring (PT)",
            fileType: "PDF",
            fileSize: "1.3 MB",
        },
        {
            id: 3,
            title: "Flyer: Rail Monitoring",
            fileType: "PDF",
            fileSize: "1.2 MB",
        },
        {
            id: 4,
            title: "Flyer: Track Condition Monitoring - Below Ballast Scan (BBS)",
            fileType: "PDF",
            fileSize: "1.0 MB",
        },
    ];

  return (
    <div className="min-h-screen bg-white">

      {/* Content */}
      <main className="w-12/12 mx-auto py-12 md:py-4">
            {/* Section Banner */}
            <div className="rounded-md mx-6 md:mx-auto md:w-12/12 my-6 py-12 px-6 md:pl-36 text-center md:text-left" style={{ backgroundColor: '#535253' }}>
                <div className="w-full md:w-3/5">
                    <h1 className="text-white text-2xl md:text-2xl font-bold mb-2">
                    Power Cable Monitoring
                    </h1>
                    <p className="text-white text-lg md:text-lg font-semibold">
                    Detection and identification of acoustic signals UTS-AS1000
                    </p>
                </div>
            </div>

            {/* Service Overview */}
            <div className="mx-6 md:mx-auto md:w-12/12 my-6 py-12 px-6 md:pl-36 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
                Intelligent traffic management and monitoring of road and vehicle conditions
              </h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Ensuring safety from fires in transportation infrastructure is essential, as effective fire detection
                  in areas like road/rail/metro tunnels or parking garages prevents disasters and protects lives.
                  Fires in these confined spaces can escalate quickly, with severe consequences and high
                  reconstruction costs. In such critical environments, time is crucial, making fast and reliable
                  monitoring indispensable. AP Sensing's fiber optic Linear Heat Detection (LHD) technology
                  offers a reliable monitoring solution, even under harshest conditions.
                </p>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Challenges in Monitoring Transportation Infrastructure</h3>
                  <p>
                    Fire detection in the transport sector is essential for safeguarding lives and ensuring the
                    continuous flow of goods and passengers. Complex environments like airports, rail networks, and
                    tunnels require fire detection systems that can withstand harsh conditions and minimize nuisance
                    alarms. Fire incidents in transport infrastructure pose significant safety threats and can lead to
                    extensive damage and disruption across transportation systems. Other detection technologies
                    such as smoke, heat or flame detectors often struggle with dust, humidity, and corrosive
                    atmospheres, leading to unreliable performance and costly false alarms.
                  </p>
                </div>
                
                <p>
                  A robust solution is needed to ensure early detection and timely alerts, allowing for rapid response to
                  protect both passengers and critical assets
                </p>
              </div>
            </div>

            {/* Applications and Assets Section */}
            <div className="mx-6 md:mx-auto md:w-12/12 my-6 rounded-lg overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Applications */}
                <div className="p-12" style={{ backgroundColor: '#535253' }}>
                  <h3 className="text-white text-2xl font-bold mb-6">Applications:</h3>
                  <div className="text-white space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Intelligent traffic management:</p>
                      <ul className="space-y-1 text-gray-200 text-sm">
                        <li>· Train location</li>
                        <li>· Direction of the train in motion</li>
                        <li>· Speed</li>
                        <li>· Features (length, number of cars)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Railroad and train condition:</p>
                      <ul className="space-y-1 text-gray-200 text-sm">
                        <li>· Crack detection and joint opening</li>
                        <li>· Flat wheel, brake noise in trains</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Geological risk events:</p>
                      <ul className="space-y-1 text-gray-200 text-sm">
                        <li>· Landslides, landslides...</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Third-party intrusion</p>
                      <ul className="space-y-1 text-gray-200 text-sm">
                        <li>· Detection of people, workers and animals</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold">Fire detection</p>
                    </div>
                  </div>
                </div>

                {/* Assets */}
                <div className="p-12" style={{ backgroundColor: '#AABCEC' }}>
                  <h3 className="text-gray-900 text-2xl font-bold mb-6">Assets:</h3>
                  <ul className="text-gray-900 space-y-3 text-base">
                    <li>Railways</li>
                    <li>Railway vehicle</li>
                    <li>Tunnels</li>
                    <li>Subway and train stations</li>
                    <li>Cable installations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Downloads Section */}
            <Downloads downloads={downloads} />

            {/* Associated Equipment Section */}
            <div className="mx-6 md:mx-auto md:w-12/12 my-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Associated Equipment</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Product
                    key={product.id}
                    title={product.title}
                    description={product.description}
                    />
                ))}
              </div>
            </div>
      </main>
    </div>
  );
}
