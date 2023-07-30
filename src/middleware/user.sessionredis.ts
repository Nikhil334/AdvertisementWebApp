import { createClient } from "redis";


const client = createClient();
client.connect();
const maintain_session_redis = async (user: any) => {

    client.on('error', err => console.log('Redis client error', err));
    try {
        await client.SET(user.username, JSON.stringify({
            'user_id': user.email,
            'status': true
        }));
        const session = await client.get(user.username);
        console.log(session);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
const distroySession = async (user:any) => {
    try {
        console.log(user);
        await client.SET(user.username, JSON.stringify({
            'user_id': user.email,
            'status': false
        }));
    }
    catch (err) {
        console.log(err);
    }
}

export { maintain_session_redis,distroySession };