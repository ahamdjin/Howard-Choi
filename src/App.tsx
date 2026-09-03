import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";
import SmoothScroll from "./components/SmoothScroll";

const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Blogs = lazy(() => import("./pages/Blogs"));
const Contact = lazy(() => import("./pages/Contact"));
const KoIndex = lazy(() => import("./pages/KoIndex"));
const KoBlogs = lazy(() => import("./pages/KoBlogs"));
const KoBlogDetail = lazy(() => import("./pages/KoBlogDetail"));
const KoContact = lazy(() => import("./pages/KoContact"));
const LocationDetail = lazy(() => import("./pages/LocationDetail"));
const Locations = lazy(() => import("./pages/Locations"));
const About = lazy(() => import("./pages/About"));
const Admin = lazy(() => import("./pages/Admin"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const LanguageDocument = () => {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = location.pathname.startsWith("/ko") ? "ko" : "en";
  }, [location.pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageDocument />
        <SmoothScroll />
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-background" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/ko" element={<KoIndex />} />
            <Route path="/ko/blogs" element={<KoBlogs />} />
            <Route path="/ko/blogs/:slug" element={<KoBlogDetail />} />
            <Route path="/ko/contact" element={<KoContact />} />

            <Route path="/locations" element={<Locations />} />
            <Route path="/location/:id" element={<LocationDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
