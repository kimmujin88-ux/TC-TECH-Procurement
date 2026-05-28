const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('purchase_orders')
    .select('*, suppliers(name), po_items(*, parts(part_no, name))')
    .order('order_date', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { items, ...orderData } = req.body;

  const { data: order, error: orderError } = await supabase
    .from('purchase_orders')
    .insert(orderData)
    .select()
    .single();
  if (orderError) return res.status(500).json({ error: orderError.message });

  if (items && items.length > 0) {
    const poItems = items.map(item => ({ ...item, po_id: order.id }));
    const { error: itemError } = await supabase.from('po_items').insert(poItems);
    if (itemError) return res.status(500).json({ error: itemError.message });
  }

  res.json(order);
});

router.put('/:id/status', async (req, res) => {
  const { data, error } = await supabase
    .from('purchase_orders')
    .update({ status: req.body.status })
    .eq('id', req.params.id)
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;
