import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let userCredential;
            if (isSignup) {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            }

            const token = await userCredential.user.getIdToken();
            localStorage.setItem('token', token);
            navigate('/home');
        } catch (err) {
            setError(isSignup ? "Signup failed." : "Login failed. Check credentials.");
        }
    };

    return (
        <div className='loginContainer'>
            <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className='error'>{error}</p>}
                <button type='submit'>{isSignup ? 'Sign Up' : 'Login'}</button>
            </form>
            <p style={{ marginTop: '10px' }}>
                {isSignup ? 'Already have an account?' : "Don't have an account?"}
                <button
                    onClick={() => {
                        setIsSignup(!isSignup);
                        setError('');
                    }}
                    style={{
                        marginLeft: '8px',
                        border: 'none',
                        background: 'none',
                        color: '#E85A4F',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    {isSignup ? 'Log In' : 'Sign Up'}
                </button>
            </p>
        </div>
    );
}

export default LoginPage;
