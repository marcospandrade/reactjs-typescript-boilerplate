import { ToastContainer } from 'react-toastify';

export function ToastContainerConfig() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            style={{ width: 'auto', maxWidth: 768 }}
        />
    )
}