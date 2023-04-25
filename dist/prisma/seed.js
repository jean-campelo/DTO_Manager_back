var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { ConsultStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { generateCPF } from "@brazilian-utils/brazilian-utils";
import prisma from "../src/config/database.js";
function createDoctorFernando() {
    return __awaiter(this, void 0, void 0, function () {
        var doctorNameFernando, passwordHash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.doctor.findFirst({
                        where: {
                            email: "fernando_souza@gmail.com",
                        },
                    })];
                case 1:
                    doctorNameFernando = _a.sent();
                    if (!!doctorNameFernando) return [3 /*break*/, 4];
                    return [4 /*yield*/, bcrypt.hash("123456", 12)];
                case 2:
                    passwordHash = _a.sent();
                    return [4 /*yield*/, prisma.doctor.create({
                            data: {
                                name: "Fernando de Souza",
                                email: "fernando_souza@gmail.com",
                                password: passwordHash,
                                CRM: 202020,
                            },
                        })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function createDoctor() {
    return __awaiter(this, void 0, void 0, function () {
        var doctor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.doctor.create({
                        data: {
                            name: faker.name.fullName(),
                            email: faker.internet.email(),
                            password: faker.internet.password(),
                            CRM: parseInt(faker.phone.number("######")),
                        },
                    })];
                case 1:
                    doctor = _a.sent();
                    return [2 /*return*/, doctor];
            }
        });
    });
}
function createPatient() {
    return __awaiter(this, void 0, void 0, function () {
        var patient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.patient.create({
                        data: {
                            name: faker.name.fullName(),
                            CPF: generateCPF(),
                            gender: faker.name.gender(),
                            birthday: faker.date.birthdate(),
                            phone: faker.phone.number("(##) 9####-####"),
                        },
                    })];
                case 1:
                    patient = _a.sent();
                    return [2 /*return*/, patient];
            }
        });
    });
}
function createConsult(doctorId, patientId, status, days) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.consult.create({
                        data: {
                            doctorId: doctorId.id,
                            patientId: patientId.id,
                            date: dayjs().add(days, "days").toDate(),
                            status: status,
                        },
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var doctor_01, patient_01, daysAfterToday, doctor_02, patient_02, doctor_03, patient_03, doctor_04, patient_04;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createDoctorFernando()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, createDoctor()];
                case 2:
                    doctor_01 = _a.sent();
                    return [4 /*yield*/, createPatient()];
                case 3:
                    patient_01 = _a.sent();
                    daysAfterToday = 2;
                    return [4 /*yield*/, createConsult(doctor_01, patient_01, ConsultStatus.ENCAIXE, daysAfterToday)];
                case 4:
                    _a.sent();
                    daysAfterToday = 1;
                    return [4 /*yield*/, createDoctor()];
                case 5:
                    doctor_02 = _a.sent();
                    return [4 /*yield*/, createPatient()];
                case 6:
                    patient_02 = _a.sent();
                    return [4 /*yield*/, createConsult(doctor_02, patient_02, ConsultStatus.CANCELADO, daysAfterToday)];
                case 7:
                    _a.sent();
                    daysAfterToday = 3;
                    return [4 /*yield*/, createDoctor()];
                case 8:
                    doctor_03 = _a.sent();
                    return [4 /*yield*/, createPatient()];
                case 9:
                    patient_03 = _a.sent();
                    return [4 /*yield*/, createConsult(doctor_03, patient_03, ConsultStatus.REAGENDADO, daysAfterToday)];
                case 10:
                    _a.sent();
                    daysAfterToday = 0;
                    return [4 /*yield*/, createDoctor()];
                case 11:
                    doctor_04 = _a.sent();
                    return [4 /*yield*/, createPatient()];
                case 12:
                    patient_04 = _a.sent();
                    return [4 /*yield*/, createConsult(doctor_04, patient_04, ConsultStatus.REALIZADO, daysAfterToday)];
                case 13:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
