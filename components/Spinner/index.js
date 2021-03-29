import styles from "./Spinner.module.css"

const Spinner = ({ spinner2 }) => (
  <div className={!spinner2 ? styles.spinner : styles.spinner2}></div>
)

export default Spinner
