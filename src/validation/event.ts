import { body } from "express-validator";

export const createUpdateEventRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("date")
    .isISO8601()
    .toDate()
    .withMessage("Valid ISO8601 date required")
    .custom((v: Date) => {
      if (v < new Date()) throw new Error("Date must be in the future");
      return true;
    }),
];
