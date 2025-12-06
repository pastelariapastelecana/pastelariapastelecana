const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Usar Service Key para operações seguras

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('ERRO CRÍTICO: VITE_SUPABASE_URL ou SUPABASE_SERVICE_KEY não estão configurados no backend.');
    throw new Error('Configuração do Supabase incompleta no backend.');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Busca os detalhes de um pedido armazenado no Supabase usando o external_order_id.
 * @param {string} externalOrderId O ID do pedido (external_reference do MP).
 * @returns {object | null} Os detalhes do pedido ou null se não encontrado.
 */
async function getOrderDetailsByExternalId(externalOrderId) {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('external_order_id', externalOrderId)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = No rows found
            console.error('Erro Supabase ao buscar pedido:', error);
            return null;
        }

        return data;
    } catch (e) {
        console.error('Erro inesperado ao buscar pedido no Supabase:', e);
        return null;
    }
}

/**
 * Atualiza o status de um pedido no Supabase.
 * @param {string} externalOrderId O ID do pedido.
 * @param {string} status O novo status (ex: 'approved', 'rejected').
 * @param {string} paymentId O ID do pagamento do Mercado Pago.
 */
async function updateOrderStatus(externalOrderId, status, paymentId) {
    try {
        const { error } = await supabase
            .from('orders')
            .update({ status: status, payment_id: paymentId })
            .eq('external_order_id', externalOrderId);

        if (error) {
            console.error('Erro Supabase ao atualizar status do pedido:', error);
            throw new Error('Falha ao atualizar status do pedido.');
        }
        console.log(`Status do pedido ${externalOrderId} atualizado para ${status} no Supabase.`);
    } catch (e) {
        console.error('Erro inesperado ao atualizar status do pedido:', e);
        throw e;
    }
}

module.exports = { getOrderDetailsByExternalId, updateOrderStatus };
