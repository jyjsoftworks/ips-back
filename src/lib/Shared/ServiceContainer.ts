import { CreateRole } from "../Role/application/CreateRole/CreateRole";
import { GetAllRoles } from "../Role/application/GetAllRoles/GetAllRoles";
import { RoleORMRepository } from "../Role/infrastructure/ORM/RoleORMRepository";
import { Login } from "../User/application/Login/Login";
import { UserCreate } from "../User/application/UserCreate/UserCreate";
import { UserORMRepository } from "../User/infrastructure/ORM/UserORMRepository";
import { UpdateUser } from "../User/application/UpdateUser/UpdateUser";
import { GetAllUsers } from "../User/application/GetAllUsers/GetAllUsers";
import { UserDelete } from "../User/application/UserDelete/UserDelete";
import { UserMe } from "../User/application/UserMe/UserMe";
import { GetUsersByRole } from "../User/application/GetAllUsers-by-Role/GetUsersByRole";
import { sequelize } from "../Shared/Infrastructure/config/sequelize";
import { CreateCategory } from "../Category/application/CreateCategory";
import { CategoryORMRepository } from "../Category/infrastructure/ORM/CategoryOrmRepository";
import { GetCategory } from "../Category/application/GetCategory";
import { UpdateCategory } from "../Category/application/UpdateCategory";
import { GetByIdCategory } from "../Category/application/GetByIdCategory";
import { MaterialORMRepository } from "../Material/infrastructure/ORM/MaterialOrmRepository";
import { CreateMaterial } from "../Material/application/CreateMaterial";
import { GetMaterial } from "../Material/application/GetMaterial";
import { UpdateMaterial } from "../Material/application/UpdateMaterial";
import { GetByIdMaterial } from "../Material/application/GetByIdMaterial";
import { LensFrameORMRepository } from "../LensFrame/infrastructure/ORM/LensFrameOrmRepository";
import { CreateLensFrame } from "../LensFrame/application/CreateLensFrame";
import { GetLensFrame } from "../LensFrame/application/GetLensFrame";
import { UpdateLensFrame } from "../LensFrame/application/UpdateLensFrame";
import { GetByIdLensFrame } from "../LensFrame/application/GetByIdLensFrame";
import { TreatmentOrmRepository } from "../Treatment/infrastructure/ORM/TreatmentOrmRepository";
import { CreateTreatment } from "../Treatment/application/CreateTreatment";
import { GetTreatment } from "../Treatment/application/GetTreatment";
import { UpdateTreatment } from "../Treatment/application/UpdateTreatment";
import { GetByIdTreatment } from "../Treatment/application/GetByIdTreatment";
import { CreateGlass } from "../Glass/application/CreateGlass";
import { GetGlass } from "../Glass/application/GetGlass";
import { UpdateGlass } from "../Glass/application/UpdateGlass";
import { GetGlassById } from "../Glass/application/GetGlassById";
import { GlassOrmRepository } from "../Glass/infrastructure/ORM/GlassOrmRepository";
import { CreateBranchOffice } from "../BranchOffice/application/CreateBranchOffice";
import { GetBranchOffice } from "../BranchOffice/application/GetAllBranchOffice";
import { UpdateBranchOffice } from "../BranchOffice/application/UpdateBranchOffice";
import { GetBranchOfficeById } from "../BranchOffice/application/GetBranchOfficeById";
import { BranchOfficeOrmRepository } from "../BranchOffice/infrastructure/ORM/BranchOfficeOrmRepository";
import { CreateSeller } from "../Seller/application/CreateSeller";
import { GetSeller } from "../Seller/application/GetSeller";
import { UpdateSeller } from "../Seller/application/UpdateSeller";
import { GetSellerById } from "../Seller/application/GetSellerById";
import { SellerOrmRepository } from "../Seller/infrastructure/ORM/SellerOrmRepository";
import { DoctorOrmRepository } from "../Doctor/infrastructure/ORM/DoctorOrmRepository";
import { CreateDoctor } from "../Doctor/application/CreateDoctor";
import { GetDoctor } from "../Doctor/application/GetDoctor";
import { UpdateDoctor } from "../Doctor/application/UpdateDoctor";
import { GetDoctorById } from "../Doctor/application/GetDoctorById";
import { CreatePatient } from "../Patient/application/CreatePatient";
import { PatientOrmRepository } from "../Patient/infrastructure/ORM/PatientOrmRepository";
import { GetPatient } from "../Patient/application/GetPatient";
import { UpdatePatient } from "../Patient/application/UpdatePatient";
import { GetPatientById } from "../Patient/application/GetPatientById";
import { LetterOrmRepository } from "../Letter/infrastructure/ORM/LetterOrmRepository";
import { CreateLetter } from "../Letter/application/CreateLetter";
import { GetLetter } from "../Letter/application/GetLetter";
import { UpdateLetter } from "../Letter/application/UpdateLetter";
import { GetLetterById } from "../Letter/application/GetLetterById";

const userRepository= new UserORMRepository();
const roleRepository= new RoleORMRepository();
const categoryRepository= new CategoryORMRepository();
const materialRepository= new MaterialORMRepository();
const lensFrameRepository= new LensFrameORMRepository();
const treatmentRepository= new TreatmentOrmRepository();
const glassRepository= new GlassOrmRepository();
const branchOfficeRepository= new BranchOfficeOrmRepository();
const sellerRepository= new SellerOrmRepository();
const doctorRepository = new DoctorOrmRepository();
const patientRepository = new PatientOrmRepository();
const letterRepository = new LetterOrmRepository();

export const serviceContainer= {

    user:{
        getAll: new GetAllUsers(userRepository),
        create: new UserCreate(userRepository,roleRepository, sequelize),
        login: new Login(userRepository),
        updateUser: new UpdateUser(userRepository),
        userDelete: new UserDelete(userRepository),
        userMe: new UserMe(userRepository),
        getUserByRole: new GetUsersByRole(userRepository,roleRepository),
    },
    role:{
        getAll: new GetAllRoles(roleRepository),
        createRole: new CreateRole(roleRepository)
    },
    category: {
        create: new CreateCategory(categoryRepository),
        getAll: new GetCategory(categoryRepository),
        update: new UpdateCategory(categoryRepository),
        getById: new GetByIdCategory(categoryRepository)
    },
    material: {
        create: new CreateMaterial(materialRepository),
        getAll: new GetMaterial(materialRepository),
        update: new UpdateMaterial(materialRepository),
        getById: new GetByIdMaterial(materialRepository)
    },
    lensFrame: {
        create: new CreateLensFrame(lensFrameRepository),
        getAll: new GetLensFrame(lensFrameRepository),
        update: new UpdateLensFrame(lensFrameRepository),
        getById: new GetByIdLensFrame(lensFrameRepository)
    },
    treatment: {
        create: new CreateTreatment(treatmentRepository),
        getAll: new GetTreatment(treatmentRepository),
        update: new UpdateTreatment(treatmentRepository),
        getById: new GetByIdTreatment(treatmentRepository)
    },
    glass: {
        create: new CreateGlass(glassRepository, categoryRepository, materialRepository, treatmentRepository),
        getAll: new GetGlass(glassRepository, categoryRepository, materialRepository, treatmentRepository),
        update: new UpdateGlass(glassRepository, categoryRepository, materialRepository, treatmentRepository),
        getById: new GetGlassById(glassRepository, categoryRepository, materialRepository, treatmentRepository),
    },
    branchOffice: {
        create: new CreateBranchOffice(branchOfficeRepository),
        getAll: new GetBranchOffice(branchOfficeRepository),
        update: new UpdateBranchOffice(branchOfficeRepository),
        getById: new GetBranchOfficeById(branchOfficeRepository),
    },
    seller: {
        create: new CreateSeller(sellerRepository, userRepository,branchOfficeRepository),
        getAll: new GetSeller(sellerRepository, userRepository,branchOfficeRepository),
        update: new UpdateSeller(sellerRepository, userRepository,branchOfficeRepository),
        getById: new GetSellerById(sellerRepository, userRepository,branchOfficeRepository),
    },
    doctor: {
        create: new CreateDoctor(doctorRepository),
        getAll: new GetDoctor(doctorRepository),
        update: new UpdateDoctor(doctorRepository),
        getById: new GetDoctorById(doctorRepository),
    },
     patient: {
        create: new CreatePatient(patientRepository),
        getAll: new GetPatient(patientRepository),
        update: new UpdatePatient(patientRepository),
        getById: new GetPatientById(patientRepository),
    },
       letter: {
        create: new CreateLetter(letterRepository,patientRepository,doctorRepository,sellerRepository),
        getAll: new GetLetter(letterRepository,patientRepository,doctorRepository,sellerRepository, userRepository, branchOfficeRepository),
        update: new UpdateLetter(letterRepository,patientRepository,doctorRepository,sellerRepository),
        getById: new GetLetterById(letterRepository,patientRepository,doctorRepository,sellerRepository,userRepository, branchOfficeRepository),
    }

    
}