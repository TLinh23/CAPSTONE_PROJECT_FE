import { useNotification } from "src/hooks/useNotification";
import axios from "axios";

export const useRegisterAsParent = () =>{
    const {openNotification} = useNotification();
    const apiRegisterParent = async (userData) => {
       
       try {
            const registerParent = await axios({
                 method: "post",
                 url: "https://classntutor.coderdao.click/api/Account/register-parent",
                 data: userData, 
            });
            if (
                 registerParent.status === 200 ||
                 registerParent.status === 201
            ) {
                 openNotification(
                      "topRight",
                      "success",
                      "Congratulations, you have successfully registered"
                 );
            }
       } catch (error) {
            openNotification("topRight", "error", `Error ${error.message}`);
       }
    };
    return {apiRegisterParent}
}
