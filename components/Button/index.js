import button from "./button.module.css"

const index = ({ children, onClick, disabled, button2 }) => {
  return (
    <button
      className={button2 ? button.button2 : button.button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default index
