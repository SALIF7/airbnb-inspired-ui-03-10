
import React, { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface TwoFactorFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e?: FormEvent) => void;
  onBack: () => void;
  isPending?: boolean;
}

const TwoFactorForm: React.FC<TwoFactorFormProps> = ({
  value,
  onChange,
  onSubmit,
  onBack,
  isPending = false
}) => {
  const handleSubmitClick = () => {
    onSubmit();
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="two-factor-code" className="flex items-center">
          <Shield className="h-4 w-4 mr-2 text-indigo-500" />
          Code d'authentification
        </Label>
        <Input
          id="two-factor-code"
          name="two-factor-code"
          type="text"
          autoComplete="one-time-code"
          required
          inputMode="numeric"
          pattern="[0-9]{6}"
          maxLength={6}
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-lg tracking-widest text-center font-mono"
          placeholder="000000"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ''))}
          disabled={isPending}
        />
        <div className="text-sm text-center mt-2 text-gray-500">
          Saisissez le code depuis votre application d'authentification
        </div>
      </div>

      <Button
        type="button"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        disabled={isPending}
        onClick={handleSubmitClick}
      >
        {isPending ? "Vérification..." : "Vérifier"}
      </Button>

      <div className="mt-4 text-center">
        <button
          type="button"
          className="text-sm text-indigo-600 hover:text-indigo-500"
          onClick={onBack}
          disabled={isPending}
        >
          Retour à la connexion
        </button>
      </div>
    </div>
  );
};

export default TwoFactorForm;
