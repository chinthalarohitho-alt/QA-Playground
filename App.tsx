
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FormsTestPage from './pages/FormsTestPage';
import ElementsTestPage from './pages/ElementsTestPage';
import TablesTestPage from './pages/TablesTestPage';
import DynamicContentTestPage from './pages/DynamicContentTestPage';

import DataVisualizationPage from './pages/DataVisualizationPage';
import LandingPage from './pages/LandingPage';
import ManualTestingPage from './pages/ManualTestingPage';
import ApiTestingPage from './pages/ApiTestingPage';

import LoginPage from './pages/LoginPage';

import SignupPage from './pages/SignupPage';

export type Page = 'forms' | 'elements' | 'tables' | 'dynamic' | 'charts';
type Module = 'landing' | 'manual' | 'automation' | 'api';

/**
 * Injects the application's favicon into the document head.
 */
const useFavicon = () => {
  useEffect(() => {
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    // A simple magnifying glass SVG as a Data URI for the favicon
    faviconLink.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔍</text></svg>";
    document.head.appendChild(faviconLink);

    return () => {
      document.head.removeChild(faviconLink);
    };
  }, []);
};

/**
 * Layout for authentication pages (Login/Signup).
 * It centers the content on the screen.
 */
const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    {children}
  </div>
);

/**
 * Main layout for the authenticated application.
 * Includes the footer and renders the main content.
 */
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    {children}
    <Footer />
  </div>
);

/**
 * Component that encapsulates the Automation Testing module, including its
 * header with navigation and the content of the currently selected page.
 */
const AutomationModule: React.FC<{
  currentPage: Page;
  navigateTo: (page: Page) => void;
  onLogout: () => void;
}> = ({ currentPage, navigateTo, onLogout }) => {
  const renderPage = useCallback(() => {
    switch (currentPage) {
      case 'forms':
        return <FormsTestPage />;
      case 'elements':
        return <ElementsTestPage />;
      case 'tables':
        return <TablesTestPage />;
      case 'dynamic':
        return <DynamicContentTestPage />;
      case 'charts':
        return <DataVisualizationPage />;
      default:
        return <FormsTestPage />;
    }
  }, [currentPage]);

  return (
    <>
      <Header
        navigateTo={navigateTo}
        currentPage={currentPage}
        onLogout={onLogout}
      />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {renderPage()}
      </main>
    </>
  );
};


function App() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [currentModule, setCurrentModule] = useState<Module>('landing');
  const [currentPage, setCurrentPage] = useState<Page>('forms');

  useFavicon();

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const handleLogout = useCallback(() => {
    setUserEmail(null);
    setCurrentModule('landing');
    setAuthView('login');
  }, []);

  // Render authentication flow if the user is not logged in
  if (!userEmail) {
    return (
      <AuthLayout>
        {authView === 'login' ? (
          <LoginPage
            onLogin={(email) => {
              setUserEmail(email);
              // Route to the correct module based on the demo email used
              if (email === 'ManualTesting@carrer.com') {
                setCurrentModule('manual');
              } else if (email === 'ApiTesting@carrer.com') {
                setCurrentModule('api');
              } else {
                setCurrentModule('automation');
              }
            }}
            onNavigateToSignup={() => setAuthView('signup')}
          />
        ) : (
          <SignupPage
            onSignup={(email) => {
              setUserEmail(email);
              setCurrentModule('automation'); // Default to automation module on new signup
            }}
            onNavigateToLogin={() => setAuthView('login')}
          />
        )}
      </AuthLayout>
    );
  }

  // Render the main application content if the user is logged in
  return (
    <AppLayout>
      {(() => {
        switch (currentModule) {
          case 'landing':
            return <LandingPage onSelectModule={setCurrentModule} userEmail={userEmail} />;
          case 'manual':
            return <ManualTestingPage onLogout={handleLogout} />;
          case 'api':
            return <ApiTestingPage onLogout={handleLogout} />;
          case 'automation':
            return <AutomationModule currentPage={currentPage} navigateTo={navigateTo} onLogout={handleLogout} />;
          default:
            // Fallback to the landing page if module is unknown
            return <LandingPage onSelectModule={setCurrentModule} userEmail={userEmail} />;
        }
      })()}
    </AppLayout>
  );
}

export default App;
