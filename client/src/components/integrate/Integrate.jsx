import React from 'react'
import styles from './Integrate.module.css';
import GmailIcon from './images/gmail.svg';
import MailchimpIcon from './images/mailchimp.svg';
import NotionIcon from './images/notion.svg';
import WebflowIcon from './images/webflow.svg';
import WordPressIcon from './images/wordpress.svg';
import GoogleCalendarIcon from './images/googlecalendar.svg';
import SlackIcon from './images/slack.svg';
import ShopifyIcon from './images/shopify.svg';
import AirtableIcon from './images/airtable.svg';
import GoogleSheetsIcon from './images/googlesheets.svg';
import ZapierIcon from './images/zapier.svg';
import CloseIcon from './images/gmail.svg';
import SalesforceIcon from './images/salesforce.svg';

function Integrate() {
  return (
    <div className={styles.integrationContainer}>
      <div className={styles.iconsGrid}>
        <div className={styles.iconBox}>
          <img src={GmailIcon} alt="Gmail" />
        </div>
        <div className={styles.iconBox}>
          <img src={MailchimpIcon} alt="Mailchimp" />
        </div>
        <div className={styles.iconBox}>
          <img src={NotionIcon} alt="Notion" />
        </div>
        <div className={styles.iconBox}>
          <img src={WebflowIcon} alt="Webflow" />
        </div>
        <div className={styles.iconBox}>
          <img src={WordPressIcon} alt="WordPress" />
        </div>
        <div className={styles.iconBox}>
          <img src={GoogleCalendarIcon} alt="Google Calendar" />
        </div>
        <div className={styles.iconBox}>
          <img src={SlackIcon} alt="Slack" />
        </div>
        <div className={styles.iconBox}>
          <img src={ShopifyIcon} alt="Shopify" />
        </div>
        <div className={styles.iconBox}>
          <img src={AirtableIcon} alt="Airtable" />
        </div>
        <div className={styles.iconBox}>
          <img src={GoogleSheetsIcon} alt="Google Sheets" />
        </div>
        <div className={styles.iconBox}>
          <img src={ZapierIcon} alt="Zapier" />
        </div>
        <div className={styles.iconBox}>
          <img src={CloseIcon} alt="Close" />
        </div>
        <div className={styles.iconBox}>
          <img src={SalesforceIcon} alt="Salesforce" />
        </div>
      </div>
      <div className={styles.description}>
        <h2>Integrate with any platform</h2>
        <p>
        Typebot offers several native integrations blocks as well as instructions on
        how to embed typebot on particular platforms
        </p>
      </div>
    </div>
  )
}

export default Integrate