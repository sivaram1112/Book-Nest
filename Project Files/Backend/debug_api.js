const axios = require('axios');

async function testApi() {
    try {
        const response = await axios.get('http://localhost:5174/api/books');
        console.log('Status:', response.status);
        console.log('Data:', response.data);
    } catch (error) {
        if (error.response) {
            console.log('Error Status:', error.response.status);
            console.log('Error Data:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
    }
}

testApi();
