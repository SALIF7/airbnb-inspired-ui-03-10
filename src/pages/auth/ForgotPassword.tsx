
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { checkAccountLocked } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Veuillez saisir votre adresse e-mail");
      return;
    }

    // Vérifier si le compte est verrouillé
    if (checkAccountLocked) {
      const lockStatus = checkAccountLocked(email);
      if (lockStatus.locked) {
        setError(`Compte verrouillé. Réessayez dans ${lockStatus.remainingMinutes} minutes ou contactez l'administrateur.`);
        return;
      }
    }

    // Enregistrer la demande de réinitialisation dans le localStorage
    const resetRequests = JSON.parse(localStorage.getItem('admin_contact_requests') || '[]');
    resetRequests.push({
      id: Date.now().toString(),
      email: email,
      message: "Demande de réinitialisation de mot de passe",
      timestamp: new Date().toISOString(),
      type: 'password_reset',
      status: 'pending'
    });
    localStorage.setItem('admin_contact_requests', JSON.stringify(resetRequests));
    
    // Log this request in security logs
    const securityLogs = JSON.parse(localStorage.getItem('security_logs') || '[]');
    securityLogs.push({
      type: 'password_reset_request',
      email: email,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('security_logs', JSON.stringify(securityLogs));
    
    toast.success("Votre demande de réinitialisation a été envoyée. Consultez votre boîte e-mail pour les instructions.");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Mot de passe oublié
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {!submitted 
              ? "Saisissez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe."
              : "Veuillez consulter votre boîte e-mail pour les instructions de réinitialisation."}
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Adresse e-mail
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse e-mail"
              />
            </div>

            <div>
              <Button type="submit" className="w-full">
                Envoyer les instructions
              </Button>
            </div>
          </form>
        ) : (
          <div className="mt-8 text-center">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
              <p className="text-green-800 dark:text-green-300">
                Instructions envoyées ! Vérifiez votre boîte e-mail.
              </p>
            </div>
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              Essayer une autre adresse
            </Button>
          </div>
        )}

        <div className="mt-4 text-center">
          <Link to="/login" className="flex items-center justify-center text-sm text-primary hover:underline">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
