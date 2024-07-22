import React from 'react'
import styles from "./Response.module.css"
import { useNavigate } from 'react-router-dom'

function Response() {
  const navigate=useNavigate()
  return (
    <nav className={styles.navbar}>
    <div className={styles.centerButtons}>
      <button onClick={()=>navigate("/form")} className={styles.tabButton}>Flow</button>
      <button onClick={()=>navigate("/theme")} className={styles.tabButton}>Theme</button>
      <button className={styles.tabButton}>Response</button>
    </div>
    <div className={styles.rightButtons}>
      <button className={styles.actionButton}>Share</button>
      <button className={styles.saveButton}>Save</button>
      <button className={styles.closeButton}>X</button>
    </div>
  </nav>
  )
}

export default Response