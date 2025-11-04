    import {Router}from"express"
    import { ExpressUserController } from "./ExpressUserController"

    const controller=new ExpressUserController();
    export const expressUserRouter= Router();


/**
 * @swagger
* components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string   
 *           description: The name of the user
 *         active:
 *           type: boolean
 *           description: The status of the user
 *       example:
 *         email: luiskislo@gmail.com
 *         active: true
 *         confirmed: true
 *         lastlogin: 2024-11-14 13:52:00-03
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the role to create
 *       example:
 *         name: ADMIN
 *     CreateUserResponse:
 *       type: string
 *       example: "usuario creado correctamente"
 *     UpdateUserRequest:
 *       type: object
 *       required:
 *         - body
 *       properties:
 *         body:
 *           type: string
 *           description: The updated data for the user
 *       example:
 *         email: "Updated user email"
 *     UpdateUserResponse:
 *       type: string
 *       example: "Usuario actualizado correctamente"
 *     DeleteRequestUser:
 *       type: integer
 *       description: ID of the user to deactivate.
 *       example: 1
 *     DeleteResponseUser:
 *       type: string
 *       example: "Usuario eliminado correctamente"
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
 *         message: Error de servidor. Intente nuevamente más tarde.
 *         statusCode: 500
 */

/**
 * @swagger
 * tags:
 *   name: users
 *   description: Manager entity (api pas)
 */

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [users]
 *     responses:
 *       200:
 *         description: The list of the actives users 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
  *       204:
 *         description: No active users found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontraron usuarios activos"
 *       500:
 *         description: Users not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
expressUserRouter.get('/user/all',controller.getAllUsers);
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Updates an existing user
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           text/plain:
 *             schema:
 *               $ref: '#/components/schemas/UpdateUserResponse'
 *       400:
 *         description: Validation error in request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Details about the validation error
 *                 statusCode:
 *                   type: integer
 *                   description: HTTP status code
 *               example:
 *                 message: Error de validación
 *                 statusCode: 400
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Details about the missing user
 *                 statusCode:
 *                   type: integer
 *                   description: HTTP status code
 *               example:
 *                 message: El usuario con el Id especificado no existe
 *                 statusCode: 404
 */
expressUserRouter.put('/user/:id',controller.updateUser);
/**
 * @swagger
 * /user/delete/{id}:
 *   put:
 *     summary: Deactivate a user (LOGICAL DELETION)
 *     description:Updates the user's status to inactive (active: false) in the database. This endpoint does not physically delete the user but performs a logical deletion.
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/DeleteRequestUser'
 *         description: ID of the user to desactivate
 *     responses:
 *       200:
 *         description: Usuario eliminado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResponseUser'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                 statusCode:
 *                   type: integer
 *                   description: HTTP status code.
 *               example:
 *                 message: Error interno del servidor
 *                 statusCode: 500
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Details about the missing user
 *                 statusCode:
 *                   type: integer
 *                   description: HTTP status code
 *               example:
 *                 message: El usuario con el Id especificado no existe
 *                 statusCode: 404
 */
expressUserRouter.put('/user/delete/:id',controller.userDelete);

expressUserRouter.post('/user/create',controller.create);

expressUserRouter.get('/user/by-role/:roleName',controller.getUserByRole);

;
