import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EnquiryProvider } from "@/contexts/EnquiryContext";
import PageLoader from "@/components/PageLoader";

// Eager load Index for fast initial page load
import Index from "./pages/Index";

// Lazy load all other routes
const Contact = lazy(() => import("./pages/Contact"));
const Enquiry = lazy(() => import("./pages/Enquiry"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Events = lazy(() => import("./pages/Events"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const HotelLinens = lazy(() => import("./pages/products/HotelLinens"));
const Kitchen = lazy(() => import("./pages/products/Kitchen"));
const Restaurant = lazy(() => import("./pages/products/Restaurant"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <EnquiryProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/events" element={<Events />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/hotel-linens" element={<HotelLinens />} />
              <Route path="/kitchen" element={<Kitchen />} />
              <Route path="/restaurant" element={<Restaurant />} />
              <Route path="/enquiry" element={<Enquiry />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </EnquiryProvider>
  </QueryClientProvider>
);

export default App;
