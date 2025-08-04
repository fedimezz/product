import { check, validationResult } from "express-validator";

const Usercheck = [
  check("name").notEmpty().withMessage("Fullname is required"),

  check("email").isEmail().withMessage("Please provide a valid email"),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),

  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const produitValidation = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),

  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),

  check("prix")
    .notEmpty()
    .withMessage("Prix is required")
    .isFloat({ gt: 0 })
    .withMessage("Prix must be a number greater than 0"),

  check("location").notEmpty().withMessage("Location is required"),
];

const validateOrderItem = [
  check("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
];
export  {
  Usercheck,
  produitValidation,
  validateOrderItem
};
