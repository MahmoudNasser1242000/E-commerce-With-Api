import { ToastId, useToast } from '@chakra-ui/react';
import { ReactNode, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { ChangeMode } from '../components/app/Internet/InternetModeSlice';

interface IProps {
    children: ReactNode
}

const InternetConnectionServiceProvider = ({ children }: IProps) => {
    const toast = useToast();
    const toastRef = useRef<ToastId>(0);

    const dispatch = useDispatch();

    const onlineMode = () => {
        toast.close(toastRef.current);
        toast({
            title: "You Are Currently Online.",
            description: "Welcome To Enjoy All Of Our Cool Features",
            status: "info",
            duration: 3000,
            isClosable: false,
            position: "top",
        });

        dispatch(ChangeMode(false));
    }
    const offlineMode = () => {
        toastRef.current = toast({
            title: "You Are Currently Offline.",
            description: "Please, check Your Connection And Try Another Time.",
            status: "warning",
            duration: null,
            isClosable: false,
            position: "top",
        });

        dispatch(ChangeMode(true))
    }
    useEffect(() => {
        window.addEventListener("online", onlineMode);
        window.addEventListener("offline", offlineMode);

        return () => {
            window.removeEventListener("online", onlineMode);
            window.removeEventListener("offline", offlineMode);
        }
    }, []);
    
    
    return children
}

export default InternetConnectionServiceProvider