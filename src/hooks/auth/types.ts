
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
  twoFactorCode?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  confirmPassword?: string;
  termsAccepted?: boolean;
  acceptTerms?: boolean;
  avatar?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isAdmin: boolean;
  avatar?: string;
  created?: string;
  lastLogin?: string;
  loginCount?: number;
  securityLevel?: 'standard' | 'high' | 'restricted';
  passwordLastChanged?: string;
  requiresPasswordChange?: boolean;
  twoFactorEnabled?: boolean;
  trustedDevices?: string[];
}

export interface AuthContextType {
  user: User | null;
  login: {
    mutateAsync: (userData: LoginCredentials) => Promise<User | void>;
    isPending: boolean;
  };
  register: {
    mutateAsync: (userData: RegisterData) => Promise<User | void>;
    isPending: boolean;
  };
  logout: () => void;
  isLoading: boolean;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  updateUserProfile: (updatedData: Partial<User>) => User | undefined;
  updateUserAvatar: (avatarUrl: string) => User | undefined;
  registerLoading: boolean;
  refreshSession: () => void;
  checkAccountLocked: (email: string) => { locked: boolean; remainingMinutes: number };
  updateLoginAttempts: (email: string, increment?: boolean) => { count: number; timestamp: number };
  resetLoginAttempts: (email: string) => void;
  unlockUserAccount: (email: string) => boolean;
  checkDeviceTrusted: (userId: string) => boolean;
  handleSecurityAlert: (type: string, details: any) => void;
  getAccountResetRequests: () => any[];
  updateResetRequestStatus: (requestId: string, status: 'approved' | 'rejected', unlockAccount?: boolean) => boolean;
}

export interface LoginAttempt {
  count: number;
  timestamp: number;
  lockUntil?: number;
}

export interface SecurityLog {
  id: string;
  type: string;
  userId: string | null;
  timestamp: string;
  userAgent: string;
  ipAddress?: string;
  details?: any;
}

export interface SecurityWarning {
  id: string;
  type: string;
  level: 'info' | 'warning' | 'critical';
  timestamp: string;
  message: string;
  details?: any;
  resolved?: boolean;
}

export interface AccountResetRequest {
  id: string;
  email: string;
  message: string;
  timestamp: string;
  type: 'account_reset';
  status: 'pending' | 'approved' | 'rejected';
  resolvedAt?: string;
  resolvedBy?: string;
}
