import { ticketModel } from "../models/ticketModel.js";

export const ticketController = (io, socket) => {

    const createTicket = async ({ action, payload }, callback) => {

        try {

            const { status, data } = await ticketModel('ticket:create', payload)

            io.emit('ticket:create', {
                from: socket.id,
                action,
                payload,
                data
            });

            callback({ status, data });

        } catch (error) {

            callback({
                status: 300,
                message: error
            });
        }
    };

    const attendTicket = async ({ action, payload }, callback) => {

        try {

            const { status, data } = await ticketModel('ticket:attend', payload)

            io.emit('ticket:attend', {
                from: socket.id,
                action,
                payload,
                data
            });

            callback({ status, data });

        } catch (error) {

            callback({
                status: 300,
                message: error
            });
        }

    }

    const cancelTicket = async ({ action, payload }, callback) => {

        try {

            const { status, data } = await ticketModel('ticket:cancel', payload)

            io.emit('ticket:cancel', {
                from: socket.id,
                action,
                payload,
                data
            });

            callback({ status, data });

        } catch (error) {

            callback({
                status: 300,
                message: error
            });
        }

    }

    const timerTicket = ({ action, payload }) => {

        io.emit('ticket:timer', {
            from: socket.id,
            action,
            payload,
            data: [{
                time: payload.time,
                group: payload.group
            }]
        });

    }

    socket.on("ticket:create", createTicket);
    socket.on("ticket:attend", attendTicket);
    socket.on("ticket:cancel", cancelTicket);
    socket.on("ticket:timer", timerTicket);

}