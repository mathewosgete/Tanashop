import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from './axios';
import { useStateValue } from './StateProvider';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [, dispatch] = useStateValue();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (isRegister) {
      if (password.length < 6) {
        setError('Passwords must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setLoading(true);
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const response = await axios.post(endpoint, { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      dispatch({ type: 'SET_USER', user });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className='login'>
      <Link to="/" className="login_logoContainer">
        <span className="login_logoText">
          Tana<span className="login_logoTextShop">shop</span>
        </span>
      </Link>

      <div className='login_container'>
        <h1>{isRegister ? 'Create account' : 'Sign in'}</h1>

        <form onSubmit={handleSubmit}>
          <div className="login_field">
            <label htmlFor="email">Email or mobile phone number</label>
            <input
              id="email"
              type='email'
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="login_field">
            <label htmlFor="password">Password</label>
            <div className="login_passwordInputWrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
              />
              <div 
                className="login_passwordToggle" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </div>
            </div>
          </div>

          {isRegister && (
            <div className="login_field">
              <label htmlFor="confirmPassword">Re-enter password</label>
              <div className="login_passwordInputWrapper">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  required
                  onChange={e => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <div 
                  className="login_passwordToggle" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </div>
              </div>
            </div>
          )}

          {error && <div className="login_error">{error}</div>}

          <button type='submit' className='login_signInButton' disabled={loading}>
            {loading ? 'Please wait...' : (isRegister ? 'Create your Tanashop account' : 'Continue')}
          </button>
        </form>

        {!isRegister && (
          <p className="login_terms">
            By continuing, you agree to Tanashop's{' '}
            <a href="#conditions">Conditions of Use</a> and{' '}
            <a href="#privacy">Privacy Notice</a>.
          </p>
        )}

        <div className="login_divider">
          <span>New to Tanashop?</span>
        </div>

        <button
          className='login_registerButton'
          onClick={() => { setIsRegister(!isRegister); setError(''); }}
        >
          {isRegister ? '← Back to Sign In' : 'Create your Tanashop account'}
        </button>
      </div>
    </div>
  );
}

export default Login;
