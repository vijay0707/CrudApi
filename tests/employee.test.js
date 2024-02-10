const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Employee = require('../models/employee')

require("dotenv").config({ path: "../.env" });

const url = process.env.MONGO_URI
/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(url, { useNewUrlParser: true });
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

// Test cases

// Get all 
describe("GET /employees", () => {
    it("should return all employee records", async () => {
        const res = await request(app).get("/employees/");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

// Create Employee - POST
describe("POST /employees", () => {
    it("should create a employee record", async () => {
        const res = await request(app).post("/employees/")
            .send(
                {
                    "name": "Test User",
                    "age": 25,
                    "designation": "Tester",
                    "bloodgroup": "A+",
                    "fathername": "Test Dad",
                    "experience": 2
                }
            );
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Test User");
    });
});

// Get by ID
describe("GET /employees/:id", () => {
    it("should return an employee record", async () => {
        const latest_created = await Employee.findOne().sort({ $natural: -1 });
        const emp_id = latest_created._id.toString()
        const res = await request(app).get(
            `/employees/${emp_id}`
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Test User");
    });
});

describe("PUT /employees/:id", () => {
    it("should update an employee", async () => {
        const latest_created = await Employee.findOne().sort({ $natural: -1 });
        const emp_id = latest_created._id.toString()
        const res = await request(app)
            .patch(`/employees/${emp_id}`)
            .send({
                "age": 30,
                "bloodgroup": "B+",
                "experience": 5
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.age).toBe(30);
    });
});

describe("DELETE /employees/:id", () => {
    it("should delete an employee record", async () => {
        const latest_created = await Employee.findOne().sort({ $natural: -1 });
        const emp_id = latest_created._id.toString()
        const res = await request(app).delete(
            `/employees/${emp_id}`
        );
        expect(res.statusCode).toBe(200);
    });
});