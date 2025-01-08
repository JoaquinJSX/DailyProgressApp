import styles from './logIn.module.css';
import { useReducer } from 'react';
import { Link } from 'react-router-dom';

interface LogInProps {
    users: any;
    setUserLoggedIn: any;
}

function reducer(state: any, action: any) {
    switch (action.type) {
        case 'updateField':
            return {
                ...state,
                [action.field]: action.value, // Actualiza dinámicamente el campo por nombre
            };
        case 'reset':
            return action.initialState; // Resetea el estado al inicial
    }
};

export default function LogIn({ users, setUserLoggedIn }: LogInProps) {

    const [state, dispatch] = useReducer(reducer, { username: '', password: '' });

    function handleChange(e: any) {
        dispatch({
            type: 'updateField',
            field: e.target.name, // Nombre del campo (name o email)
            value: e.target.value, // Valor ingresado
        });
    };

    function logIn(e: any) {

        e.preventDefault();

        let userId = 0;

        if (users.length === 0) {
            alert('There are no users yet');
        } else {
            for (let i in users) {
                if (users[i].username != state.username) {
                    userId++;
                    if (userId == users.length) {
                        alert('username not found');
                    }
                } else {
                    if (users[userId].password != state.password) {
                        alert('Incorrect password');
                    } else {
                        setUserLoggedIn(userId);
                    }
                }
            }
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Log In</h1>
            <form className={styles.form}>
                <label className={styles.label}>Enter your username:</label> <br />
                <input
                    className={styles.input}
                    type="text"
                    name='username'
                    value={state.username}
                    onChange={handleChange}
                    autoComplete='off'
                /> <br />
                <label className={styles.label}>Enter your password:</label> <br />
                <input
                    className={styles.input}
                    type="password"
                    name='password'
                    value={state.password}
                    onChange={handleChange}
                /> <br />
                <button onClick={logIn} className={styles.getIntoBtn}>
                    Get into
                </button>
            </form>
            <Link className={styles.link} to='/sign-up'>Don´t have an account?</Link>
            <footer className={styles.footer}>
                &copy; {new Date().getFullYear()} Limitless
            </footer>
        </div>
    );
}