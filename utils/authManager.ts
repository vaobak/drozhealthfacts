// Secure Authentication Manager for Affiliate Dashboard
export class AuthManager {
  private static readonly SESSION_KEY = 'affiliate_session';
  private static readonly BLOCK_KEY = 'affiliate_login_block';
  private static readonly SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours
  private static readonly BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes
  private static readonly MAX_ATTEMPTS = 5;

  // Security: Simple but effective password hashing
  private static hashPassword(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
  }

  // Check if user is currently authenticated
  static isAuthenticated(): boolean {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return false;

      const session = JSON.parse(sessionData);
      const now = Date.now();

      // Check if session has expired
      if (now > session.expires) {
        this.logout();
        return false;
      }

      // Extend session if user is active (optional)
      if (session.authenticated && (session.expires - now) < (30 * 60 * 1000)) {
        // Extend session by 30 minutes if less than 30 minutes remaining
        session.expires = now + (30 * 60 * 1000);
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
      }

      return session.authenticated === true;
    } catch (error) {
      console.error('Auth check error:', error);
      this.logout();
      return false;
    }
  }

  // Authenticate user with password
  static authenticate(password: string): { success: boolean; error?: string } {
    // Check if user is blocked
    const blockStatus = this.getBlockStatus();
    if (blockStatus.isBlocked) {
      return {
        success: false,
        error: `Access blocked. Try again in ${Math.ceil(blockStatus.timeLeft / 60)} minutes.`
      };
    }

    // Verify password
    const correctPasswordHash = this.hashPassword('@DRsuperZ6');
    const enteredPasswordHash = this.hashPassword(password);

    if (enteredPasswordHash === correctPasswordHash) {
      // Success: Create session and clear any blocks
      const sessionData = {
        authenticated: true,
        timestamp: Date.now(),
        expires: Date.now() + this.SESSION_DURATION
      };
      
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
      localStorage.removeItem(this.BLOCK_KEY);
      
      return { success: true };
    } else {
      // Failed: Track attempt and potentially block
      this.trackFailedAttempt();
      const attempts = this.getFailedAttempts();
      
      if (attempts >= this.MAX_ATTEMPTS) {
        return {
          success: false,
          error: 'Too many failed attempts. Access blocked for 15 minutes.'
        };
      } else {
        return {
          success: false,
          error: `Invalid password. ${this.MAX_ATTEMPTS - attempts} attempts remaining.`
        };
      }
    }
  }

  // Logout user
  static logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  // Get current block status
  static getBlockStatus(): { isBlocked: boolean; timeLeft: number; attempts: number } {
    try {
      const blockData = localStorage.getItem(this.BLOCK_KEY);
      if (!blockData) return { isBlocked: false, timeLeft: 0, attempts: 0 };

      const block = JSON.parse(blockData);
      const now = Date.now();

      if (now < block.blockedUntil) {
        return {
          isBlocked: true,
          timeLeft: Math.ceil((block.blockedUntil - now) / 1000),
          attempts: block.attemptCount
        };
      } else {
        // Block expired
        localStorage.removeItem(this.BLOCK_KEY);
        return { isBlocked: false, timeLeft: 0, attempts: 0 };
      }
    } catch (error) {
      console.error('Block status error:', error);
      return { isBlocked: false, timeLeft: 0, attempts: 0 };
    }
  }

  // Track failed login attempt
  private static trackFailedAttempt(): void {
    try {
      const blockData = localStorage.getItem(this.BLOCK_KEY);
      let attempts = 1;

      if (blockData) {
        const block = JSON.parse(blockData);
        attempts = (block.attemptCount || 0) + 1;
      }

      if (attempts >= this.MAX_ATTEMPTS) {
        // Block user
        const blockInfo = {
          blockedUntil: Date.now() + this.BLOCK_DURATION,
          attemptCount: attempts,
          timestamp: Date.now()
        };
        localStorage.setItem(this.BLOCK_KEY, JSON.stringify(blockInfo));
      } else {
        // Just track attempts
        const blockInfo = {
          attemptCount: attempts,
          timestamp: Date.now()
        };
        localStorage.setItem(this.BLOCK_KEY, JSON.stringify(blockInfo));
      }
    } catch (error) {
      console.error('Failed attempt tracking error:', error);
    }
  }

  // Get current failed attempts count
  static getFailedAttempts(): number {
    try {
      const blockData = localStorage.getItem(this.BLOCK_KEY);
      if (!blockData) return 0;

      const block = JSON.parse(blockData);
      return block.attemptCount || 0;
    } catch (error) {
      console.error('Failed attempts count error:', error);
      return 0;
    }
  }

  // Security: Clear all auth data (for emergency use)
  static clearAllAuthData(): void {
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.BLOCK_KEY);
  }

  // Get session info for debugging (remove in production)
  static getSessionInfo(): any {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return null;

      const session = JSON.parse(sessionData);
      return {
        authenticated: session.authenticated,
        timeRemaining: Math.max(0, session.expires - Date.now()),
        expiresAt: new Date(session.expires).toLocaleString()
      };
    } catch (error) {
      return null;
    }
  }
}