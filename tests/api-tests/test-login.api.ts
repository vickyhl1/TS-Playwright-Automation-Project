import { test, expect } from '@playwright/test';

const SOAP_LOGIN_BODY = `<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><AccountLoginRequest xmlns="com.advantage.online.store.accountservice"><loginUser>${process.env.TEST_USERNAME}</loginUser><loginPassword>${process.env.TEST_PASSWORD}</loginPassword><email></email></AccountLoginRequest></soap:Body></soap:Envelope>`;

test('Login API returns a token', async ({ request }) => {

    const response = await request.post('https://advantageonlineshopping.com/accountservice/ws/AccountLoginRequest', {
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': ''
        },
        data: SOAP_LOGIN_BODY
    });

    expect(response.status()).toBe(200);

    const xmlText = await response.text();

    const tokenMatch = xmlText.match(/<ns2:token>(.*?)<\/ns2:token>/);
    expect(tokenMatch).toBeTruthy();
    
    // Check that token or it's content is not empty
    if (!tokenMatch || !tokenMatch[1]) {
        throw new Error('Token not found in response');
    }
    
    const token = tokenMatch[1];
    
    // Validate token exists and is not empty
    expect(token).toBeTruthy();
    expect(token.length).toBeGreaterThan(0);
    
    // Validate JWT format (header.payload.signature)
    const jwtParts = token.split('.');
    expect(jwtParts.length).toBe(3);
    
    // Check that payload part exists before using it
    const payloadPart = jwtParts[1];
    if (!payloadPart) {
        throw new Error('JWT payload part is missing');
    }
    
    // Decode and validate JWT payload
    const payloadJson = Buffer.from(payloadPart, 'base64').toString('utf-8');
    const payload = JSON.parse(payloadJson);
    
    expect(payload).toHaveProperty('userId');
    expect(payload).toHaveProperty('sub');
    expect(payload).toHaveProperty('role');
});