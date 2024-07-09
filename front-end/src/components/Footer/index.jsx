import styles from './styles.module.css';

function Footer() {
    return (
        <div className={styles.footer}>
            <p className={styles['copy-right']}>
                Copyright @2022 BA Warrior. All right reserved
            </p>
        </div>
    );
}

export default Footer;
