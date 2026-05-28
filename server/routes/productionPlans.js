const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('production_plans')
    .select('*')
    .order('plan_month');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/upsert', async (req, res) => {
  const { data, error } = await supabase
    .from('production_plans')
    .upsert(req.body, { onConflict: 'model,plan_month' })
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;
