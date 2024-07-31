import React from 'react'
import styles from "./Conversion.module.css"

function Conversion() {
  return (
    <div>
    <div className={styles.container}>
      <div className={styles.shapes}>
        <div className={styles.triangle}></div>
        <div className={styles.arc}></div>
      </div>
      <h1 className={styles.title}>
      Improve conversion and user engagement with FormBots 
      </h1>
      <button className={styles.button}>Create a FormBot </button>
      <p className={styles.footerText}>No trial. Generous <span className={styles.free}>free</span> plan.</p>
    </div>
  
    </div>
  )
}

export default Conversion