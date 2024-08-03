import styles from './styles.module.css';
function Footer() {
    return (
        <div className={styles.footer}>
            <p className={styles['footer__content']}>
                Copyright &copy; 2024 FAMS. All rights reserved
            </p>
        </div>
    );
}

export default Footer;
