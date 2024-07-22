import React from 'react'
import styles from "./Theme.module.css"
import { useNavigate } from 'react-router-dom'

function Theme() {
  const navigate=useNavigate()
  return (
    <nav className={styles.navbar}>
    <div className={styles.centerButtons}>
      <button onClick={()=>navigate("/form")} className={styles.tabButton}>Flow</button>
      <button className={styles.tabButton}>Theme</button>
      <button onClick={()=>navigate("/response")} className={styles.tabButton}>Response</button>
    </div>
    <div className={styles.rightButtons}>
      <button className={styles.actionButton}>Share</button>
      <button className={styles.saveButton}>Save</button>
      <button className={styles.closeButton}>X</button>
    </div>
  </nav>
  )
}

export default Theme