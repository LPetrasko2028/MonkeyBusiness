//import React from "react";
//logout from userservices.js
import { logout } from "../../../server/services/userServices";

function logOut () {
    return(
        logout()
    )

}
export default logOut