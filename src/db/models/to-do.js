const knex = require('./knex');
const tableName = 'to_dos'

class ToDo {
  static async create(text) {
    try {
      const result = await knex.raw(`
        INSERT INTO ${tableName} (title, is_done)
        VALUES (?, false)
        RETURNING *;
      `, [text]);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async list() {
    try {
      const result = await knex.raw(`
        SELECT *
        FROM ${tableName};
      `);
      return result.rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async find(id) {
    try {
      const result = await knex.raw(`
        SELECT *
        FROM ${tableName}
        WHERE id=?;
      `, id);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async updateCompletion(id, isDone) {
    try {
      const result = await knex.raw(`
        UPDATE ${tableName}
        SET is_done=?
        WHERE id=?
        RETURNING *;
      `, [isDone, id]);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async delete(id) {
    try {
      const result = await knex.raw(`
        DELETE FROM ${tableName}
        WHERE id=?;
      `, id);
      return result.rowCount ? true : false;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async deleteAll() {
    try {
      await knex.raw('TRUNCATE to_dos');
      return true;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = ToDo;
