import axios from 'axios';
const url = 'https://inolab.com/inolab-api-app/validateToken';

export const auth = (socket, next) => {
    const { token } = socket.handshake.auth;

    axios.post(url, { token }).then((response) => {

        const { status, data } = response.data;

        if(status == 300) return next(new Error("User Not Authorized"));

        const { payload: user } = data;

        socket.user = user;

        next();

    }).catch((error) => next(new Error("User Authorized")));
}
