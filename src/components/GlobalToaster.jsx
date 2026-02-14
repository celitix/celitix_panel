import toast, { Toaster } from 'react-hot-toast';

// ICONS
import { IoInformationCircleOutline } from "react-icons/io5";

const GlobalToaster = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
                success: {
                    style: {
                        // padding: '10px 10px',
                        color: '#000',
                        background: "#ffffff"
                    },
                },
                // error: {
                //   style: {
                //     background: 'red',
                //     color: 'white',
                //   },
                // },
            }}
        />
    );
};

export const showInfoToast = (message) => {
    toast(message, {
        duration: 2000,
        type: "default",
        style: {
            background: "#e3f2fd", // light blue
            color: "#0d47a1",      // dark blue text
            borderLeft: "5px solid #2196f3",
            fontWeight: 500,
        },
        icon: <IoInformationCircleOutline />,
    });
};

export default GlobalToaster;
