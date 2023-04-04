import { connection } from "../db/connection.js";

export const ticketModel = (action, payload) => {

    const createTicket = async (payload) => {

        try {

            const { clientId, folio, asunto } = payload;
            const [ [ [ createResult ] ] ] = await connection.execute('CALL strCreateTicket(?, ?, ?, ?, ?)', [folio, '2023-04-03','10:03:17', asunto, 'B']);
            const { id: ticketId } = createResult;
            const [ [ [ assignResult ] ] ] = await connection.execute('CALL strAssignTicket(?, ?)', [ticketId, clientId]);

            return {
                status: 200,
                message: 'Query ejecutada correctamente',
                data: [
                    {
                        clientId,
                        ticketId,
                        folio,
                        asunto,
                        ...assignResult
                    }
                ]
            }

        } catch (error) {

            return {
                status: 300,
                message: error,
                data: []
            }

        }
    }

    const cancelTicket = async (payload) => {

        try {

            const { ticketId } = payload;
            const [ [ [ result ] ] ] = await connection.execute('CALL strCancelTicket(?)', [ticketId]);

            return {
                status: 200,
                message: 'Query ejecutada correctamente',
                data: [{...result}]
            }

        } catch (error) {

            return {
                status: 300,
                message: error,
                data: []
            }

        }
    }

    const attendTicket = async (payload) => {

        try {

            const { ticketId, clientId, agentId } = payload;
            const [ [ [ result ]] ] = await connection.execute('CALL strAttendTicket(?, ?, ?)', [ticketId, clientId, agentId]);

            return {
                status: 200,
                message: 'Query ejecutada correctamente',
                data: [{
                    ticketId, 
                    clientId, 
                    agentId,
                    ...result
                }]
            }

        } catch (error) {

            return {
                status: 300,
                message: error,
                data: []
            }

        }
    }




    const actions = {
        'ticket:create': () => createTicket(payload),
        'ticket:cancel': () => cancelTicket(payload),
        'ticket:attend': () => attendTicket(payload),
        'default': () => false
    }

    return (actions[action] || actions['default'])?.()

}