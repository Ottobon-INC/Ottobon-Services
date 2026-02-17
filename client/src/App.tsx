import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Portal from "@/pages/Portal";
import Services from "@/pages/Services";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import KnowledgeHub from "@/pages/KnowledgeHub"; // Assuming KnowledgeHub component exists
import Internship from "./pages/Internship";
import HealthCompanion from "./pages/HealthCompanion";
import TalentOps from "./pages/TalentOps";
import IdeaToPrototype from "./pages/IdeaToPrototype";
import ContractToHire from "./pages/ContractToHire";
import CoursePlatform from "./pages/CoursePlatform";
import ScrollToTop from "./components/ScrollToTop";
import EnrollmentSection from "@/components/EnrollmentSection";
import OnboardingExperience from "@/components/OnboardingExperience";
//import DynamicBackground from "@/components/DynamicBackground";

function Router() {
  return (
    <Switch>
      {/* Services Mode: Root shows Services */}
      <Route path="/" component={Services} />
      <Route path="/academy" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/health-companion" component={HealthCompanion} />
      <Route path="/talentops" component={TalentOps} />
      <Route path="/idea-to-prototype" component={IdeaToPrototype} />
      <Route path="/contract-to-hire" component={ContractToHire} />
      <Route path="/course-platform" component={CoursePlatform} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Disabled automatic onboarding popup since we have the journey integrated in the hero section
  useEffect(() => {
    // For future functionality if needed
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");

    if (!hasSeenOnboarding) {
      // Mark as seen for future visits in case we re-enable this
      localStorage.setItem("hasSeenOnboarding", "true");
    }
  }, []);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {/* <DynamicBackground
        colorShift={true}
        parallax={true}
        bubbles={true}
        noise={true}
      /> */}
      <ScrollToTop />
      <Router />
      <Toaster />
      {showOnboarding && (
        <OnboardingExperience onClose={handleOnboardingClose} />
      )}
    </QueryClientProvider>
  );
}

export default App;
