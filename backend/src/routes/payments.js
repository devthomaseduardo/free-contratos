import express from 'express';
import crypto from 'node:crypto';
import { config } from '../config.js';

export const paymentsRouter = express.Router();

paymentsRouter.post('/pix', async (req, res) => {
    try {
        const { amount, description, email } = req.body;
        
        const token = config.mercadoPagoAccessToken;
        console.log(`Iniciando transação Pix. Token presente: ${token ? 'Sim' : 'Não'} (Início: ${token?.substring(0, 8)}...)`);

        const response = await fetch('https://api.mercadopago.com/v1/payments', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${config.mercadoPagoAccessToken}`,
                'Content-Type': 'application/json',
                'X-Idempotency-Key': crypto.randomUUID()
            },
            body: JSON.stringify({
                transaction_amount: amount || 15.00,
                description: description || 'Apoio Paper Contracts - Café',
                payment_method_id: 'pix',
                payer: {
                    email: email || 'test_user_504671374@testuser.com' // Usando o email do usuário de teste fornecido
                }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Erro Mercado Pago:', data);
            return res.status(response.status).json({ 
                error: 'Erro ao gerar pagamento Pix',
                details: data.message 
            });
        }

        res.json({
            id: data.id,
            status: data.status,
            qr_code: data.point_of_interaction.transaction_data.qr_code,
            qr_code_base64: data.point_of_interaction.transaction_data.qr_code_base64,
            ticket_url: data.point_of_interaction.transaction_data.ticket_url
        });

    } catch (error) {
        console.error('Erro Interno Pagamento:', error);
        res.status(500).json({ error: 'Erro interno ao processar pagamento' });
    }
});
