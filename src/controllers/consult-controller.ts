import { Request, Response } from "express";
import consultService from "../services/consult-service.js";
import httpStatus from "http-status";

async function getConsults(req: Request, res: Response) {
  const { date } = req.params;

  const consultsData = await consultService.findConsultsByDate(date);

  res.status(httpStatus.OK).send({ date, consultsData });
}

const consultController = {
  getConsults,
};

export default consultController;
