import button from "./button.module.css"

const index = ({ children, onClick }) => {
  return (
    <button className={button.button} onClick={onClick}>
      {children}
    </button>
  )
}

export default index
