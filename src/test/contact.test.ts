import { expect, describe, it, beforeEach, afterEach } from "bun:test";
import { ContactTest, UserTest } from "./test-utils";
import app from "..";

describe('POST /api/contacts', () => {

    beforeEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should rejected if token is invalid', async () => {
        const response = await app.request('/api/contacts', {
           method: 'post',
           headers: {
                'Authorization': 'salah'
           },
           body: JSON.stringify({
            first_name: ""
           })
        })

        expect(response.status).toBe(401)

        const body = await response.json()
        expect(body.errors).toBeDefined()
    });

    it('should rejected if contact is invalid', async () => {
        const response = await app.request('/api/contacts', {
           method: 'post',
           headers: {
                'Authorization': 'test'
           },
           body: JSON.stringify({
            first_name: ""
           })
        })

        expect(response.status).toBe(400)

        const body = await response.json()
        expect(body.errors).toBeDefined()
    });

    it('should success if contact is valid (only first_name)', async () => {
        const response = await app.request('/api/contacts', {
            method: 'post',
            headers: {
                 'Authorization': 'test'
            },
            body: JSON.stringify({
             first_name: "farid"
            })
         })
 
         expect(response.status).toBe(200)
 
         const body = await response.json()
         expect(body.data).toBeDefined()
         expect(body.data.first_name).toBe("farid")
         expect(body.data.last_name).toBeNull()
         expect(body.data.email).toBeNull()
         expect(body.data.phone).toBeNull()
    });

    it('should success if contact is valid (full data)', async () => {
        const response = await app.request('/api/contacts', {
            method: 'post',
            headers: {
                 'Authorization': 'test'
            },
            body: JSON.stringify({
             first_name: "farid",
             last_name: "bpn",
             email: "farid@gmail.com",
             phone: "1213231434"
            })
         })
 
         expect(response.status).toBe(200)
 
         const body = await response.json()
         expect(body.data).toBeDefined()
         expect(body.data.first_name).toBe("farid")
         expect(body.data.last_name).toBe("bpn")
         expect(body.data.email).toBe("farid@gmail.com")
         expect(body.data.phone).toBe("1213231434")
    });

})

describe('GET /api/contacts/{id}', () => {

    beforeEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should get 404 if contact is not found', async () => {
        const contact = await ContactTest.get()

        const response = await app.request('/api/contacts/' + (contact.id + 1), {
            method: 'get',
            headers: {
                 'Authorization': 'test'
            }
         })
 
         expect(response.status).toBe(404)
 
         const body = await response.json()
         expect(body.errors).toBeDefined()
    });

    it('should success if contact is exist', async () => {
        const contact = await ContactTest.get()

        const response = await app.request('/api/contacts/' + contact.id, {
            method: 'get',
            headers: {
                 'Authorization': 'test'
            },
         })
 
         expect(response.status).toBe(200)
 
         const body = await response.json()
         expect(body.data).toBeDefined()
         expect(body.data.first_name).toBe(contact.first_name)
         expect(body.data.last_name).toBe(contact.last_name)
         expect(body.data.email).toBe(contact.email)
         expect(body.data.phone).toBe(contact.phone)
         expect(body.data.id).toBe(contact.id)
    });
})

describe('PUT /api/contacts/{id}', () => {
    beforeEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should rejected update contact if request is invalid', async () => {
        const contact = await ContactTest.get()

        const response = await app.request('/api/contacts/' + contact.id, {
            method: 'put',
            headers: {
                'Authorization' : 'test'
            },
            body: JSON.stringify({
                first_name: ""
            }) 
        }) 

        expect(response.status).toBe(400)

        const body = await response.json()
        expect(body.errors).toBeDefined()
    });

    it('should rejected update contact if id is not found', async () => {
        const contact = await ContactTest.get()

        const response = await app.request('/api/contacts/' + (contact.id + 1), {
            method: 'put',
            headers: {
                 'Authorization': 'test',
                 'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: "farid"
            })
         })
 
         expect(response.status).toBe(404)
 
         const body = await response.json()
         expect(body.errors).toBeDefined()
    });
    

    it('should success update if request valid', async () => {
        const contact = await ContactTest.get()

        const response = await app.request('/api/contacts/' + contact.id, {
            method: 'put',
            headers: {
                 'Authorization': 'test',
                 'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: "farid",
                last_name: "bpn",
                email: "farid@gmail.com",
                phone: "123132442"
            })
         })
 
         expect(response.status).toBe(200)
 
         const body = await response.json()
         expect(body.data).toBeDefined() 
         expect(body.data.first_name).toBe("farid")
         expect(body.data.last_name).toBe("bpn")
         expect(body.data.email).toBe("farid@gmail.com")
         expect(body.data.phone).toBe("123132442")
    });
});

describe('DELETE /api/contacts/{id}', () => {
    beforeEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    }) 

    it('should rejected if contact id not found', async () => {
        const contact = await ContactTest.get()

        const response = await app.request('/api/contacts/' + (contact.id + 1), {
            method: 'delete',
            headers: {
                'Authorization': 'test'
            }
        })

        expect(response.status).toBe(404)

        const body = await response.json()
        expect(body.errors).toBeDefined()
    });

    it('should success if contact is exist', async () => {
        const contact = await ContactTest.get()

        const response = await app.request('/api/contacts/' + contact.id, {
            method: 'delete',
            headers: {
                'Authorization': 'test'
            }
        })

        expect(response.status).toBe(200)
        
        const body = await response.json()
        expect(body.data).toBe(true)
    });
})