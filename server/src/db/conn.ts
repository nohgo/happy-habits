const MongoClient = require("mongodb").MongoClient;
const connectionString = process.env.ATLAS_URI || "";
// const client = new MongoClient(connectionString);
let conn;
let db;
MongoClient.connect(connectionString, (client: any) => {
  const db = client.db("sample_restaurants");
  client.close();
});
// async () => {
//   try {
//     conn = await client.connect()
//     db = conn.db("sample_restaurants");
//   } catch(e) {
//     console.error(e);
//   }
// }

export default db;