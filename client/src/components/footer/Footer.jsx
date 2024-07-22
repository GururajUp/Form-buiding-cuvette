import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <div className={styles.footer}>
    <div className={`${styles.footerItem} open-sans`}>
      <div>FormBot</div>
      <div>Made with ❤️ by @cuvette</div>
    </div>

    <div className={`${styles.footerItem} open-sans`}>
      <h4>Product</h4>
      <ul>
        <li>Status</li>
        <li>Documentation</li>
        <li>Roadmap</li>
        <li>Pricing</li>
      </ul>
    </div>
    
    <div className={`${styles.footerItem} open-sans`}>
      <h4>Community</h4>
      <ul>
        <li>Discord</li>
        <li>GitHub repository</li>
        <li>Twitter</li>
        <li>LinkedIn</li>
        <li>OSS Friends</li>
      </ul>
    </div>
    
    <div className={`${styles.footerItem} open-sans`}>
      <h4>Company</h4>
      <ul>
        <li>About</li>
        <li>Contact</li>
        <li>Terms of Service</li>
        <li>Privacy Policy</li>
      </ul>
    </div>
  </div>
  );
}

export default Footer;