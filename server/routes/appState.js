const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('app_state')
    .select('state_json')
    .eq('id', 'main')
    .single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data.state_json);
});

router.post('/', async (req, res) => {
  const { data, error } = await supabase
    .from('app_state')
    .upsert({ id: 'main', state_json: req.body, updated_at: new Date().toISOString() })
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ ok: true, updated_at: data.updated_at });
});

module.exports = router;
