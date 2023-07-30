import { maintain_session_redis } from "../middleware/user.sessionredis";
import { Session } from "../models/user.sessionschema";

const maintain_session_service = async (user: any) => {
    try {
        console.log(user);
        let isSession = await Session.findOne({where:{ user_id: user.id }});
        if (!isSession) {
            const session_details = {
                user_id: user.id,
                username:user.username
            }
            const session = await Session.create(session_details);
            console.log("Session stored successfully");
           // console.log(session);
        }
        else if (isSession) {
            if (!isSession.status) {
                isSession= await Session.update({status: !isSession.status},{where:{ username: user.username }});
                console.log(isSession);
                console.log("Session Activate");
            }
        }
        await maintain_session_redis(user);
        return true;
    }
    catch (err) {
        console.log("Server Error")
        return false;
    }
}

export { maintain_session_service }    