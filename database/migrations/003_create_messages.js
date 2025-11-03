exports.up = async (db) => {
  await db.createCollection('messages');
  await db.collection('messages').createIndex({ conversationId: 1, createdAt: -1 });
};
