
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import PasswordInput from "./PasswordInput";
import TwoFactorForm from "./TwoFactorForm";
import { useLoginForm } from "@/hooks/auth/useLoginForm";
import { Separator } from "@/components/ui/separator";

interface LoginFormProps {
  securityInfo: { locked: boolean; remainingMinutes: number } | null;
  onSetShowContactAdminDialog: (show: boolean) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLoginError: (error: Error) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  securityInfo,
  onSetShowContactAdminDialog,
  onEmailChange,
  onLoginError,
}) => {
  const { login } = useAuth();
  const {
    formData,
    twoFactorCode,
    showTwoFactorInput,
    handleEmailChange,
    handlePasswordChange,
    handleTwoFactorCodeChange,
    handleBackToLogin,
    handleSubmit,
  } = useLoginForm();
  const [rememberMe, setRememberMe] = useState(false);

  const combinedEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleEmailChange(e);
    onEmailChange(e);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    try {
      await handleSubmit(e);
    } catch (error) {
      if (error instanceof Error) {
        onLoginError(error);
      }
    }
  };

  if (showTwoFactorInput) {
    return (
      <TwoFactorForm
        value={twoFactorCode}
        onChange={handleTwoFactorCodeChange}
        onSubmit={handleLoginSubmit}
        onBack={handleBackToLogin}
        isPending={login.isPending}
      />
    );
  }

  return (
    <form onSubmit={handleLoginSubmit} className="mt-8 space-y-6">
      <div className="rounded-md space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">
            Adresse email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Adresse email"
            value={formData.email}
            onChange={combinedEmailChange}
            disabled={securityInfo?.locked}
          />
        </div>
        <div>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handlePasswordChange}
            disabled={securityInfo?.locked}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            disabled={securityInfo?.locked}
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            Se souvenir de moi
          </label>
        </div>

        <div className="text-sm">
          <Link
            to="/forgot-password"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Mot de passe oublié?
          </Link>
        </div>
      </div>

      {securityInfo?.locked ? (
        <Button
          type="button"
          className="w-full"
          onClick={() => onSetShowContactAdminDialog(true)}
        >
          Contacter l'administrateur
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full"
          disabled={login.isPending}
        >
          {login.isPending ? "Connexion en cours..." : "Se connecter"}
        </Button>
      )}

      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600">Pas encore de compte? </span>
        <Link
          to="/register"
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          Inscrivez-vous
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
