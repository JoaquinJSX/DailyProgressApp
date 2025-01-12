import styles from './Styles/welcomePanel.module.css';
import { useNavigate } from "react-router-dom";
import achievingGoals from './Pictures/achieving_goals.jpg';

export default function WelcomePanel() {

    const navigate = useNavigate();

    return (
        <div>
            <header className={styles.header}>
                <h1>Welcome to the daily progress app!</h1>
                <h2>
                    <button onClick={() => navigate('/log-in')}>SignIn</button>
                    Or
                    <button onClick={() => navigate('/sign-up')}>SignUp</button>
                </h2>
            </header>
            <h2>A place where you can place your goals or targets to achieve!</h2>
            <figure  className={styles.picture}>
                <img className={styles.img} src={achievingGoals} alt="" />
            </figure>
            <footer className={styles.footer}>
                &copy; {new Date().getFullYear()} Limitless
            </footer>
        </div>
    );
}