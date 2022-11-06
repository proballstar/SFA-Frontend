import styles from "../../styles/LocationPin.module.css";

export default function LocationPin({ lat, lng }) {
  return (
    <div className={styles.pin}>
      <div className={styles.pin}></div>
      <div className={styles.pulse}></div>
    </div>
  );
}
