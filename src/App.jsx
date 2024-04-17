import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/flag-icons/css/flag-icons.min.css";

import AuthProvider from "./provider/authProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardRoute from "./routes/DashboardRoute";

import LandingPage from "./pages/landing";
import Datenschutzerklaerung from "./pages/landing/datenschutzerklaerung";
import Impressum from "./pages/landing/impressum";
import Agb from "./pages/landing/agb";
import Signin from "./pages/authentication/signin";
import Signup from "./pages/authentication/signup";
import VerifyEmail from "./pages/authentication/verifyEmail";
import ForgotPassword from "./pages/authentication/forgotPassword";
import ResetPassword from "./pages/authentication/resetPassword";
import DashboardPage from "./pages/dashboard";
import LeadProfilePage from "./pages/lead_profile";
import AnalyticsPage from "./pages/analytics";
import CompanyProfilesPage from "./pages/company_profiles";
// import TriggerPage from "./pages/trigger";
import ConnectedWebsitesPage from "./pages/connected_websites";
import SettingsPage from "./pages/settings";
import HelpCenterPage from "./pages/help_center";
import FAQ from "./pages/help_center/faq";
import PrivacyPolicyPage from "./pages/help_center/privacy_policy";
import ContactSupportPage from "./pages/help_center/contact_support";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<LandingPage />} path="/" />
            <Route element={<Impressum />} path="/impressum" />
            <Route
              element={<Datenschutzerklaerung />}
              path="/datenschutzerklaerung"
            />
            <Route element={<Agb />} path="/agb" />
            <Route element={<Signin />} path="/signin" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<VerifyEmail />} path="/verifyemail" />
            <Route element={<ForgotPassword />} path="/forgot-password" />
            <Route element={<ResetPassword />} path="/reset-password" />
            <Route element={<DashboardRoute />}>
              <Route element={<DashboardPage />} path="/dashboard" />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route element={<LeadProfilePage />} path="/lead-profile" />
              <Route element={<AnalyticsPage />} path="/analytics" />
              <Route
                element={<CompanyProfilesPage />}
                path="/company-profiles"
              />
              <Route
                element={<ConnectedWebsitesPage />}
                path="/connected-websites"
              />
              <Route element={<SettingsPage />} path="/settings" />
              <Route element={<HelpCenterPage />} path="/help-center" />
              <Route element={<FAQ />} path="/help-center/faq" />
              <Route
                element={<PrivacyPolicyPage />}
                path="/help-center/privacy_policy"
              />
              <Route
                element={<ContactSupportPage />}
                path="/help-center/contact_support"
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
      <ToastContainer
        autoClose={5000}
        hideProgressBar
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
    </>
  );
}

export default App;
