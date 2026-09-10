function pickExistingPluginRules(plugin, rules, prefix) {
  const out = {};
  const available = (plugin && plugin.rules) || {};
  for (const [key, value] of Object.entries(rules || {})) {
    if (!key.startsWith(`${prefix}/`)) {
      out[key] = value;
      continue;
    }
    const name = key.slice(prefix.length + 1);
    if (available[name]) out[key] = value;
  }
  return out;
}

module.exports = { pickExistingPluginRules };
