import { Switch, Route } from "wouter";
import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import { LoginModal } from "@/components/LoginModal";
import { CreateMatchModal } from "@/components/CreateMatchModal";
import { Home } from "@/pages/Home";
import { Dashboard } from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [createMatchModalOpen, setCreateMatchModalOpen] = useState(false);

  return (
    <>
      <Navigation 
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenCreateMatch={() => setCreateMatchModalOpen(true)}
      />
      
      <Switch>
        <Route path="/" component={() => 
          <Home onOpenLogin={() => setLoginModalOpen(true)} />
        } />
        <Route path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>

      <LoginModal 
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
      
      <CreateMatchModal 
        isOpen={createMatchModalOpen}
        onClose={() => setCreateMatchModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-sport-blue rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">🏆</span>
                </div>
                <span className="ml-3 text-2xl font-bold text-gray-900">SportMatch</span>
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                La plataforma líder para conectar deportistas y organizar eventos deportivos en tu ciudad.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-sport-blue transition-colors">
                  <span className="text-xl">📘</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-sport-blue transition-colors">
                  <span className="text-xl">🐦</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-sport-blue transition-colors">
                  <span className="text-xl">📷</span>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Deportes</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-sport-blue transition-colors">Fútbol</a></li>
                <li><a href="#" className="hover:text-sport-blue transition-colors">Básquet</a></li>
                <li><a href="#" className="hover:text-sport-blue transition-colors">Tenis</a></li>
                <li><a href="#" className="hover:text-sport-blue transition-colors">Pádel</a></li>
                <li><a href="#" className="hover:text-sport-blue transition-colors">Vóley</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Soporte</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-sport-blue transition-colors">Centro de Ayuda</a></li>
                <li><a href="#" className="hover:text-sport-blue transition-colors">Términos de Uso</a></li>
                <li><a href="#" className="hover:text-sport-blue transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-sport-blue transition-colors">Contacto</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 SportMatch. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
