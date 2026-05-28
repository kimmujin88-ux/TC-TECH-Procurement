const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('incoming_plans')
    .select('*, parts(part_no, name)')
    .order('incoming_month');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/upsert', async (req, res) => {
  const { data, error } = await supabase
    .from('incoming_plans')
    .upsert(req.body, { onConflict: 'part_id,incoming_month' })
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;
