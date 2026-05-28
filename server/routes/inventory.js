const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

router.get('/', async (req, res) => {
  const { month } = req.query;
  let query = supabase.from('inventory_snapshots').select('*, parts(part_no, name)');
  if (month) query = query.eq('snapshot_month', month);
  const { data, error } = await query.order('snapshot_month', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/upsert', async (req, res) => {
  const { data, error } = await supabase
    .from('inventory_snapshots')
    .upsert(req.body, { onConflict: 'part_id,snapshot_month' })
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;
