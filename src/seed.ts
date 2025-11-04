import { RoleModel } from "./lib/Role/infrastructure/ORM/RoleModel";
import { UserModel } from "./lib/User/infrastructure/ORM/UserModel";
import { sequelize } from "./lib/Shared/Infrastructure/config/sequelize";
import { UserORMRepository } from "./lib/User/infrastructure/ORM/UserORMRepository";
import bcrypt from "bcrypt";


export const userRepository = new UserORMRepository();

const runSeeders = async (): Promise<void> => {
  try {
    await sequelize.sync({ alter: true });
    const roles = [
      {
        name: "ADMIN",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const users = [
      {
        firstName: "Jeremias ",
        lastName: "Palacios",
        email: "JEREMIAS@seeders.com",
        password: "admin123",
        role: "ADMIN",
        active: true,
        confirmed: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Javier",
        lastName: "Torres",
        email: "JAVIER@seeders.com",
        password: "scanner123",
        role: "ADMIN",
        active: true,
        confirmed: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Sembrar semillas
    console.log("Sembrando datos automaticos...");

    console.log("<<<<<<<<<<<<<<<<<<ROLES>>>>>>>>>>>>>>>");

    for (const role of roles) {
      try {
        const [result, created] = await RoleModel.findOrCreate({
          where: { name: role.name },
          defaults: role,
        });
        if (created) {
          console.log(`Rol ${role.name} creado.`);
        } else {
          console.log(`${role.name} ya existe`);
        }
      } catch (error) {
        console.error(`Error al crear el rol ${role.name}.`, error.message);
      }
    }


    console.log("<<<<<<<<<<<<<<<<<<USUARIOS>>>>>>>>>>>>>>>");

    for (const user of users) {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userData = {
      ...user,
      password: hashedPassword,
    };

    const [createdUser, wasCreated] = await UserModel.findOrCreate({
      where: { email: user.email },
      defaults: userData,
    });

    if (wasCreated) {
      console.log(`🟢 Usuario ${user.email} creado.`);
    } else {
      console.log(`🟡 Usuario ${user.email} ya existe.`);
    }

    // Obtener el roleId desde su nombre
    const role = await RoleModel.findOne({ where: { name: user.role } });
    if (!role) {
      console.warn(`❌ No se encontró el rol "${user.role}" para el usuario ${user.email}`);
      continue;
    }

    // Abrimos una transacción exclusivamente para asignar el rol
    const transaction = await sequelize.transaction();

    try {
      await userRepository.assignRole(createdUser.id, role.id, transaction);
      await transaction.commit();
      console.log(`🔗 Rol '${user.role}' asignado a ${user.email}`);
    } catch (assignError) {
      await transaction.rollback();
      console.error(`❌ Error al asignar rol a ${user.email}:`, assignError.message);
    }

  } catch (error) {
    console.error(`❌ Error al crear el usuario ${user.email}:`, error.message);
  }
}
    

   


  } catch (error) {
    console.error("Error al ejecutar las semillas:", error.message);
  }
};

export default runSeeders;
