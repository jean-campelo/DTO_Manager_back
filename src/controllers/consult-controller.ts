import { Request, Response } from "express";
import consultService from "../services/consult-service.js";
import httpStatus from "http-status";

async function getConsults(req: Request, res: Response) {
  const { date } = req.params;

  try {
    const consultsData = await consultService.findConsultsByDate(date);
    res.status(httpStatus.OK).send({ date, consultsData });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function getConsultsWeek(req: Request, res: Response) {
  const { date } = req.params;

  try {
    const consultsWeek = await consultService.findConsultsWeek(date);
    res.status(httpStatus.OK).send(consultsWeek);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function getConsultsMonth(req: Request, res: Response) {
  const { date } = req.params;

  try {
    const consultsMonth = await consultService.findConsultMonth(date);
    res.status(httpStatus.OK).send(consultsMonth);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

const consultController = {
  getConsults,
  getConsultsWeek,
  getConsultsMonth,
};

export default consultController;
