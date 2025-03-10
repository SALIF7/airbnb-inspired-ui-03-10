
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginForm } from "@/hooks/useLoginForm";
import PasswordInput from "./PasswordInput";
import TwoFactorForm from "./TwoFactorForm";

interface LoginFormProps {
  securityInfo: { locked: boolean; remainingMinutes: number } | null;
  onSetShowContactAdminDialog: (show: boolean) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLoginError: (error: Error) => void;
}

const LoginForm = ({ 
  securityInfo, 
  onSetShowContactAdminDialog,
  onEmailChange,
  onLoginError
}: LoginFormProps) => {
  const {
    formData,
    twoFactorCode,
    showTwoFactorInput,
    handleEmailChange: handleFormEmailChange,
    handlePasswordChange,
    handleTwoFactorCodeChange,
    handleBackToLogin,
    handleSubmit: submitForm
  } = useLoginForm();

  // Wrap the email change handler to notify parent component
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFormEmailChange(e);
    onEmailChange(e);
  };

  // Extend the submit handler to catch errors
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitForm(e);
    } catch (error) {
      if (error instanceof Error) {
        onLoginError(error);
      }
    }
  };

  // Si l'utilisateur doit entrer un code 2FA
  if (showTwoFactorInput) {
    return (
      <TwoFactorForm
        twoFactorCode={twoFactorCode}
        onTwoFactorCodeChange={handleTwoFactorCodeChange}
        onSubmit={handleSubmit}
        onBack={handleBackToLogin}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email">Adresse e-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="exemple@email.com"
          value={formData.email}
          onChange={handleEmailChange}
          className="mt-1"
          autoComplete="email"
          disabled={securityInfo?.locked}
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Mot de passe</Label>
          <Link to="/mot-de-passe-oublie" className="text-sm text-primary hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>
        <PasswordInput
          id="password"
          value={formData.password}
          onChange={handlePasswordChange}
          disabled={securityInfo?.locked}
        />
      </div>

      <div>
        <Button 
          type="submit" 
          className="w-full"
          disabled={securityInfo?.locked}
        >
          Se connecter
        </Button>
      </div>
      
      {securityInfo?.locked && (
        <div className="text-center mt-2">
          <Button 
            variant="link" 
            onClick={() => onSetShowContactAdminDialog(true)}
            className="text-sm"
          >
            Contacter l'administrateur
          </Button>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
