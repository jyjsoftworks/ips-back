import { Router } from "express";
import { ExpressRoleController } from "./ExpressRoleController";

const controller = new ExpressRoleController();
export const expressRoleRouter =  Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string   
 *           description: The name of the role
 *         active:
 *           type: boolean
 *           description: The status of the role
 *       example:
 *         name: admin
 *         active: true
 *     CreateRoleRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the role to create
 *       example:
 *         name: ADMIN
 *     CreateRoleResponse:
 *       type: string
 *       example: "rol creado correctamente"
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         statusCode:
 *           type: integer
 *           description: HTTP status code
 *       example:
 *         message: No roles found
 *         statusCode: 404
 */

/**
 * @swagger
 * tags:
 *   name: roles
 *   description: Manager entity
 */

/**
 * @swagger
 * /role/all:
 *   get:
 *     summary: Returns the list of all the roles
 *     tags: [roles]
 *     responses:
 *       200:
 *         description: The list of the roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       404:
 *         description: Roles not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
expressRoleRouter.get("/role/all", controller.getAllRoles);


/**
 * @swagger
 * /role/create:
 *   post:
 *     summary: Create a new role
 *     tags: [roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoleRequest'
 *     responses:
 *       200:
 *         description: Role created successfully
 *         content:
 *           text/plain:
 *             schema:
 *               $ref: '#/components/schemas/CreateRoleResponse'
 *       500:
 *         description: Internal server error
 */
expressRoleRouter.post("/role/create", controller.createRole);
