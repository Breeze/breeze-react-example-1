import { Toast } from "react-bootstrap"

export const ToastMessage = (props: { message: string | null, onClose: () => void})  => {
  
  return (
    <Toast 
      onClose={props.onClose} 
      show={props.message!=null} 
      delay={3000} 
      autohide
      style={{
        position: 'fixed',
        bottom: 0,
        background: 'chartreuse'
        // position: 'absolute',
        // top: 0,
        // right: 0,
      }}
    >
      <Toast.Header>{props.message}</Toast.Header>
    </Toast>                     
  )
}