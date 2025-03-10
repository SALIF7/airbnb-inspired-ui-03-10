
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Shield } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isAdmin } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loginAttempts, setLoginAttempts] = useState(0);

  useEffect(() => {
    // Si l'utilisateur est déjà connecté, le rediriger vers la page appropriée
    if (isAuthenticated) {
      if (isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
    
    // Reset des tentatives de connexion après 30 minutes
    const attemptsStr = localStorage.getItem("login_attempts");
    if (attemptsStr) {
      const { count, timestamp } = JSON.parse(attemptsStr);
      const thirtyMinutesAgo = new Date().getTime() - (30 * 60 * 1000);
      
      if (timestamp < thirtyMinutesAgo) {
        localStorage.removeItem("login_attempts");
        setLoginAttempts(0);
      } else {
        setLoginAttempts(count);
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifier les tentatives de connexion
    if (loginAttempts >= 5) {
      toast.error("Trop de tentatives de connexion. Veuillez réessayer plus tard.");
      return;
    }
    
    try {
      await login.mutateAsync(formData);
      
      // Réinitialiser les tentatives de connexion après une connexion réussie
      localStorage.removeItem("login_attempts");
    } catch (error) {
      console.error("Erreur de connexion:", error);
      
      // Incrémenter le compteur de tentatives
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      localStorage.setItem("login_attempts", JSON.stringify({
        count: newAttempts,
        timestamp: new Date().getTime()
      }));
      
      if (newAttempts >= 5) {
        toast.error("Trop de tentatives de connexion. Veuillez réessayer plus tard.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion sécurisée
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              créez un nouveau compte
            </Link>
          </p>
        </div>
        
        {loginAttempts >= 3 && loginAttempts < 5 && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-amber-800 text-sm">
              Attention: {5 - loginAttempts} tentative(s) restante(s) avant le blocage temporaire de votre compte.
            </p>
          </div>
        )}
        
        {loginAttempts >= 5 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">
              Trop de tentatives de connexion. Veuillez réessayer dans 30 minutes.
            </p>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Adresse email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Se souvenir de moi
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Mot de passe oublié?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={login.isPending || loginAttempts >= 5}
            >
              {login.isPending ? "Connexion..." : "Se connecter"}
            </Button>
          </div>
        </form>
        
        <div className="pt-4 text-center">
          <p className="text-xs text-gray-500">
            En vous connectant, vous acceptez nos Conditions d'Utilisation et notre Politique de Confidentialité.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
