import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {"Input url and this detect face in img.TRY IT."}
            </p>
            <div className='center'>
                <div className='pa4 br3 shadow-5 center form'>
                    <input onChange={onInputChange} className='f4 pa2 w-70' type="text" />
                    <button
                        onClick={onButtonSubmit}
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                    >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;