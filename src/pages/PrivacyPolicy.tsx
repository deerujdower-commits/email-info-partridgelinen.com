import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EnquiryModal from '@/components/EnquiryModal';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy | Partridge Linen</title>
        <meta name="description" content="Partridge Linen privacy policy. Learn how we collect, use, and protect your personal information." />
        <link rel="canonical" href="https://partridgelinen.com/privacy-policy" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://partridgelinen.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Privacy Policy",
                "item": "https://partridgelinen.com/privacy-policy"
              }
            ]
          })}
        </script>
      </Helmet>
      <Navigation />
      
      <main className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {/* Back link */}
          <Link 
            to="/" 
            className="inline-flex items-center text-foreground/60 hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Page header */}
          <div className="mb-12">
            <h1 className="font-display text-5xl md:text-7xl font-light text-foreground tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Effective date: January 1, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            <div>
              <p className="text-foreground/80 leading-relaxed">
                Partridge Laundry & Linen Hire Ltd (trading as "Partridge Linen") operates this website (the "Service").
              </p>
              <p className="text-foreground/80 leading-relaxed mt-4">
                This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light text-foreground mb-4">What data do we collect?</h2>
              <p className="text-foreground/80 leading-relaxed">
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl font-light text-foreground mb-3">Types of Data Collected</h3>
              
              <h4 className="font-medium text-foreground mb-2 mt-6">Personal Data</h4>
              <p className="text-foreground/80 leading-relaxed mb-4">
                While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Cookies and Usage Data</li>
              </ul>

              <h4 className="font-medium text-foreground mb-2 mt-6">Usage Data</h4>
              <p className="text-foreground/80 leading-relaxed">
                We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
              </p>

              <h4 className="font-medium text-foreground mb-2 mt-6">Tracking Cookies Data</h4>
              <p className="text-foreground/80 leading-relaxed">
                We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light text-foreground mb-4">What we do with the data we process</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Partridge Laundry & Linen Hire Ltd uses the collected data for various purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To provide customer support and respond to enquiries</li>
                <li>To gather analysis or valuable information so that we can improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
                <li>To provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about, unless you have opted not to receive such information.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light text-foreground mb-4">Your rights in relation to your personal data</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                You may request details of personal information which we hold about you. Any such request must be submitted in writing and we will respond in the time mandated by the regulations in force at the time.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                You may choose to restrict the collection or use of your personal information, but this may inhibit or limit the way in which we are able to interact with you. You may, at any time, change your mind about what information we hold about you, or whether we may continue to hold it at all, subject to any legal obligation on Partridge Laundry & Linen Hire Ltd to retain data.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                You are responsible for the accuracy of data you have provided. If you believe that any information we are holding on you is incorrect or incomplete, please write to us as soon as possible. We will promptly correct any information found to be incorrect.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We will not sell or share your personal information with other businesses or marketing companies without your explicit consent. You can obtain further information about Data Protection and privacy laws by visiting the Information Commissioner's website at: <a href="https://ico.org.uk/for-the-public" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://ico.org.uk/for-the-public</a>.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light text-foreground mb-4">Security</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the data we process.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                <strong>SSL Technology:</strong> All sensitive financial or personal information supplied to us is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our database. This is accessible only to those authorised with special access rights to such systems, who are required to keep the information confidential.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                The transmission of information over the internet is inherently insecure, and we cannot guarantee the absolute security of data sent over the internet.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light text-foreground mb-4">Web browsing and Cookies</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyse web traffic. Cookies allow web applications to respond to you as an individual.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We use traffic log cookies to identify which pages are being used. This helps us analyse data about web page traffic and improve our website in order to tailor it to visitors' needs. We only use this information for statistical analysis purposes and then the data is removed from the system.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light text-foreground mb-4">Links to other websites</h2>
              <p className="text-foreground/80 leading-relaxed">
                Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy policy.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer onEmailClick={() => setIsEnquiryOpen(true)} />
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </div>
  );
};

export default PrivacyPolicy;
