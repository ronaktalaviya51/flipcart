// Database is disabled. Using local JSON storage instead.
module.exports = {
  query: async () => [[]],
  getConnection: async () => ({
    query: async () => [[]],
    release: () => {},
    beginTransaction: async () => {},
    commit: async () => {},
    rollback: async () => {},
  }),
};
