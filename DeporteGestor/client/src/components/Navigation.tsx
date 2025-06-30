import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Trophy, User, Menu, X, Plus } from "lucide-react";

interface NavigationProps {
  onOpenLogin: () => void;
  onOpenCreateMatch: () => void;
}

export function Navigation({
  onOpenLogin,
  onOpenCreateMatch,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const [location] = useLocation();

  const getInitials = (firstName: string) => {
    return `${firstName[0]}`.toUpperCase();
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
    } else {
      onOpenLogin();
    }
    setMobileMenuOpen(false);
  };

  const handleCreateMatch = () => {
    if (!isAuthenticated) {
      onOpenLogin();
      return;
    }
    onOpenCreateMatch();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 bg-sport-blue rounded-lg flex items-center justify-center">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-900">
              SportMatch
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/">
                <a
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    location === "/"
                      ? "text-sport-blue border-b-2 border-sport-blue"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Partidos
                </a>
              </Link>
              {isAuthenticated && (
                <Link href="/dashboard">
                  <a
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      location === "/dashboard"
                        ? "text-sport-blue border-b-2 border-sport-blue"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Mi Dashboard
                  </a>
                </Link>
              )}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={handleCreateMatch}
              className="bg-sport-green hover:bg-green-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Partido
            </Button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-sport-blue rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {getInitials(localStorage.getItem("username") || " ")}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {localStorage.getItem("username")}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-400 hover:text-gray-600"
                >
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                onClick={onOpenLogin}
                className="flex items-center text-gray-700 hover:text-gray-900"
              >
                <User className="h-4 w-4 mr-2" />
                Iniciar Sesión
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 space-y-3">
              <Link href="/">
                <a
                  className="block px-3 py-2 text-gray-700 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Partidos
                </a>
              </Link>
              {isAuthenticated && (
                <Link href="/dashboard">
                  <a
                    className="block px-3 py-2 text-gray-700 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mi Dashboard
                  </a>
                </Link>
              )}
              <button
                onClick={handleCreateMatch}
                className="block w-full text-left px-3 py-2 text-sport-green font-medium"
              >
                <Plus className="inline h-4 w-4 mr-2" />
                Crear Partido
              </button>
              <button
                onClick={handleAuthAction}
                className="block w-full text-left px-3 py-2 text-gray-700 font-medium"
              >
                {isAuthenticated ? "Cerrar Sesión" : "Iniciar Sesión"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button (Mobile) */}
      <Button
        onClick={handleCreateMatch}
        className="fixed bottom-6 right-6 md:hidden w-14 h-14 bg-sport-green hover:bg-green-700 text-white rounded-full shadow-lg z-40"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </nav>
  );
}
