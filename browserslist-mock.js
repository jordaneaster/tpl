// Mock implementation of browserslist that avoids the dynamic require issue
const mockStats = {
  chrome: { '90': 1, '91': 1, '92': 1 },
  firefox: { '88': 1, '89': 1, '90': 1 },
  safari: { '14': 1, '15': 1 },
  edge: { '90': 1, '91': 1 }
};

// Create a mock browserslist that returns hardcoded values
function browserslist(queries, opts) {
  return [
    'chrome 90', 'chrome 91',
    'firefox 88', 'firefox 89',
    'safari 14', 'safari 15',
    'edge 90', 'edge 91'
  ];
}

// Mock all required methods
browserslist.loadConfig = () => (['last 2 chrome versions']);
browserslist.coverage = () => ({ chrome: { '90': 0.5, '91': 0.3 } });
browserslist.data = { chrome: { '90': {}, '91': {} } };
browserslist.usage = { global: { chrome: { '90': 0.5, '91': 0.3 } } };
browserslist.readConfig = () => null;
browserslist.parseConfig = () => (['last 2 chrome versions']);
browserslist.clearCaches = () => {};
browserslist.loadCountry = () => ({ chrome: { '90': 0.5, '91': 0.3 } });
browserslist.loadStat = () => mockStats;
browserslist.getStat = () => mockStats;

// The problematic method - replace with a mock that never uses require.resolve
browserslist.loadStats = function() {
  return mockStats;
};

module.exports = browserslist;
