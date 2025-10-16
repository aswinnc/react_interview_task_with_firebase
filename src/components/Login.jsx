import React, { useState } from 'react';
import { signInWithGooglePopup, firebaseSignOut } from '../firebase';

export default function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const demoLogin = () => {
    const user = {
      id: 1,
      name: 'Demo User',
      email: 'demo@example.com',
      addresses: [{ id: 1, label: 'Home', line: '123, Pondicherry' }]
    };
    onLogin(user);
    alert('Logged in as Demo User (replace with real Google OAuth in production)');
  };

  const googleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithGooglePopup();
      onLogin({
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        addresses: []
      });
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };


  const signOut = async () => {
    try {
      await firebaseSignOut();
      alert('Signed out');
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <p>Use Google to sign in — or click demo to continue without Firebase.</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={googleLogin} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>
        <button onClick={demoLogin}>Login as Demo User</button>
        <button onClick={signOut}>Sign out (if signed in)</button>
      </div>
    </div>
  );
}
