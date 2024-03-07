import request from 'supertest';
import { app } from '../server';
import dotenv from 'dotenv';

dotenv.config();

describe("Filtered Responses Endpoint", () => {
    it("should return filtered responses", async () => {
        const { FORM_ID } = process.env;
        const res = await request(app)
            .get(`/${FORM_ID}/filteredResponses?` +
                `filters[0][id]=bE2Bo4cGUv49cjnqZ4UnkW` +
                `&filters[0][condition]=equals` +
                `&filters[0][value]=Jane` +
                `&filters[1][id]=bE2Bo4cGUv49cjnqZ4UnkW` +
                `&filters[1][condition]=equals` +
                `&filters[1][value]=Bobby` +
                `&filters[2][id]=bE2Bo4cGUv49cjnqZ4UnkW` +
                `&filters[2][condition]=equals` +
                `&filters[2][value]=Johnny`);

        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
    });
});
