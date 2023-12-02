import toast from 'react-hot-toast';
import { FcOk, FcCancel } from "react-icons/fc"

const customToast = (toastMessage, status = "ok")=>{
  toast(toastMessage , {
    icon: status === "ok" ? <FcOk /> : <FcCancel />,
    className:"px-5"
  })
}

export default customToast