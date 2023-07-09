import { useState } from "react";
import './ReviewModal.css'

function ReserveModal() {
const [modal, setModal] = useState(false);

const toggleReserveButton = () => {
    setModal(!modal)
}

if(modal) document.body.classList.add('active-modl')
if(!modal) document.body.classList.remove('active-modl')

return (
        <div>

            <button className='reserve-button'
            onClick={()=>{toggleReserveButton()}}
            >Reserve</button>

        {modal && (
            <div className='review-modal'>
                <div className='overlay'></div>
                <div className='review-content'>
                    <h1>Feature Coming Soon</h1>
                    <button onClick={()=>{toggleReserveButton()}} className='close-review-modal'>Cancel</button>
                </div>
            </div>

         )}

        </div>


  )
};

export default ReserveModal
