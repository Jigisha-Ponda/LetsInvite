import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Wedding from "./pages/Wedding";
import SaveTheDate from "./pages/SaveTheDate";
import Engagement from "./pages/Engagement";
import Birthday from "./pages/Birthday";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import WelcomeParty from "./pages/WelcomeParty";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/wedding" element={<Wedding />} />
          <Route path="/save-the-date" element={<SaveTheDate />} />
          <Route path="/engagement" element={<Engagement />} />
          <Route path="/birthday" element={<Birthday />} />
          <Route path="/design/:id" element={<ProductDetails />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/welcome-party" element={<WelcomeParty />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
