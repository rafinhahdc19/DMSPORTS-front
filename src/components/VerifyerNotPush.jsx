import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthVerifyNotPush = ({ children }) => {
    const [isVerified, setIsVerified] = useState(false);
    const token = Cookies.get('token');

    useEffect(() => {
        const req = async (token) => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND+'/auth/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    setIsVerified(true);
                } else {
                    setIsVerified(false);
                }
            } catch (error) {
                setIsVerified(false);
            }
        }

        if (token) {
            req(token);
        } else {
            setIsVerified(false);
        }
    }, [token]);
    
    return isVerified ? children : null;
};

export default AuthVerifyNotPush;
