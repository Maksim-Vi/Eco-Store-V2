import mysql from 'serverless-mysql'

export const db = mysql({
  config: {
    host: 'localhost',
    database: 'ecostorev2.0',
    user: 'root',
    password: 'root',
  },
})

export async function sql_query(query_string, values = []) {
  try {
    const results = await db.query(query_string, values)
    await db.end()
    return results
  } catch (e) {
    // throw Error(e.message)
    return null
  }
}