import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="text-2xl font-bold font-heading text-gradient">Hostinarrie</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/services" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Services
          </Link>
          <Link to="/vendors" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Vendors
          </Link>
          <Link to="/about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Link>
          </Button>
          <Button variant="gradient" size="sm" asChild>
            <Link to="/admin">
              <User className="w-4 h-4 mr-2" />
              Admin
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background animate-fade-in">
          <nav className="container py-4 space-y-3">
            <Link
              to="/"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/vendors"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Vendors
            </Link>
            <Link
              to="/about"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col gap-2 pt-3 border-t">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
              </Button>
              <Button variant="gradient" size="sm" asChild>
                <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                  <User className="w-4 h-4 mr-2" />
                  Admin
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
