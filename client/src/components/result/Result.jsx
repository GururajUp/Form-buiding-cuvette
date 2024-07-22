import React, { useEffect, useState } from 'react';
import user1 from "./images/Figure.png";
import styles from "./Result.module.css";


function Result() {

    const [visibleLines, setVisibleLines] = useState(0);
    const [showUserMessage, setShowUserMessage] = useState(false);
  
    useEffect(() => {
      const intervals = [];
      for (let i = 1; i <= 3; i++) {
        intervals.push(setTimeout(() => setVisibleLines(i), i * 1000));
      }
      intervals.push(setTimeout(() => setShowUserMessage(true), 4000));
      return () => intervals.forEach(clearTimeout);
    }, []);

  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} outfit`}>Collect results in real-time</h1>
      <p className={`${styles.subtitle} open-sans`}>
        One of the main advantages of a chat application is that you collect the user's responses on each question.
        <br />
        <span className={styles.emphasis}>You won't lose any valuable data.</span>
      </p>
      <div className={styles.chatBox}>
        <div className={styles.messageContainer}>
          <img src={user1} alt="User" className={styles.avatar} />
          <div className={styles.messages}>
            {visibleLines >= 1 && <div className={`${styles.line1} open-sans`}>As you answer this chat, you'll see your result in the real Airtable spreadsheet</div>}
            {visibleLines >= 2 && <div className={`${styles.line2} open-sans`}>You can think of it as a guestbook 😄</div>}
            {visibleLines >= 3 && <div className={`${styles.line3} open-sans`}>Ready?</div>}
          </div>
        </div>
        {showUserMessage && (
          <div className={`${styles.userMessage} open-sans`}>
            <p>Yeah!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Result