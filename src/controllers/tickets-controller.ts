import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function postTickets(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    const { ticketTypeId } = req.body;

    if(!ticketTypeId){
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    try{
        const ticketTypes = await ticketService.createTicket(userId, ticketTypeId);

        return res.status(httpStatus.CREATED).send(ticketTypes);
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}