import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";


const Modal = ({ show, handleToggleModal, children }) => {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    // gör det tillgängligt att stänga ner modalen genom att klicka var som utanför modalen.
    const handleCloseClick = (e) => {
        e.preventDefault();
        handleToggleModal();
    };

    const modalContent = show ? (
        <div>
            <div onClick={handleCloseClick} className="absolute top-0 left-0 bg-overlay z-20 h-full w-full" />
            <div className="w-2/5 h-2/5 bg-white top-2/4 left-2/4 absolute flex rounded-md border-2 z-30 transform
                        -translate-y-2/4 -translate-x-2/4 overflow-auto">
                {children}
            </div>
        </div>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root")
        );
    } else {
        return null;
    }
};

export default Modal;

