import { Toast } from "react-bootstrap"

export type ToastMessageType = 'Warning' | 'Error' | 'Info';
export type ToastMessage = { text: string, type?: ToastMessageType }

export const ToastMessageDialog = (props: { message?: ToastMessage | null, onClose: () => void})  => {

  // if (props.message== null) {
  //   return null;
  // }

  const background = {
    'Warning': 'yellow',
    'Error': 'red',
    'Info': 'green'
  } [props.message?.type || 'Info'] ;

  return (
    <Toast 
      onClose={props.onClose} 
      show={props.message!=null} 
      delay={3000} 
      autohide
      style={{
        position: 'fixed',
        bottom: '20px',
        width: '500px',
        background: background
      }}
    >
      <Toast.Header>{props.message?.text || ''}</Toast.Header>
    </Toast>                     
  )
}