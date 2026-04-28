exports.handler = async (event, context) => {
    // Apenas POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const body = JSON.parse(event.body);
        
        // Chaves da SigiloPay fornecidas
        const SIGILO_SECRET_KEY = '0akz7eyk20cmo98ijbv7jpil51kwvyb5g4hru1clsoey7qte7f9xklhjq915qvj9';
        const SIGILO_PUBLIC_KEY = 'samuelcab444_fd963j9ub7kpwenl';
        const SIGILO_API = 'https://app.sigilopay.com.br/api/v1/gateway/pix/receive';

        // Chama a API da SigiloPay
        const response = await fetch(SIGILO_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-secret-key': SIGILO_SECRET_KEY,
                'x-public-key': SIGILO_PUBLIC_KEY
            },
            body: JSON.stringify({
                identifier: body.identifier || 'camisa10_' + Date.now(),
                amount: body.amount,
                client: body.client
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                statusCode: response.status,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: data.message || 'Erro ao gerar PIX' })
            };
        }

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: error.message })
        };
    }
};