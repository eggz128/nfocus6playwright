import {test, expect, request} from '@playwright/test'

const baseUrl = 'http://localhost:2002/'

test('A simple GET request', async({request})=>{
    const resp = await request.get(baseUrl + 'api/products/1')
    try {
        expect.soft(resp.status()).toEqual(200)
        expect.soft(await resp.json()).toHaveProperty('price')
        expect.soft(await resp.json()).toMatchObject({
            "id": 1,
            "name": "iPadX",
            "price": 500
          })

    } catch(error){
        console.log("Simple GET request failed with status :" + resp.statusText())
        throw error
    }
})

test('Basic auth', async({playwright})=>{
    const context = await playwright.request.newContext({
        baseURL: baseUrl,
        httpCredentials: {
            username: 'edge',
            password: 'edgewords'
        }
    })
    const resp = await context.get('api/users')
    await expect(resp.status()).toEqual(200)
})