import db from '../config/databaseConnection.js';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import View from '../models/View.js';
import Share from '../models/Share.js';

export default class Metrics {
  static async updateMetric(model, data) {
    const { uuid, ipAddress, articleId } = data;
    if (!ipAddress) {
      throw new Error('IpAddress is required');
    }
    if (!articleId) {
      throw new Error('Property articleId is required');
    }

    // 24h in ms (currentDate -24h * 60m * 60s * 1000 = (n)ms)
    const twentyFourHoursAgo = new Date(new Date() - 24 * 60 * 60 * 1000);
    // By wrapping the operations in a transaction, you ensure that either all
    // operations succeed or none do, maintaining the integrity of the database
    return await db.sequelize.transaction(async (t) => {
      const existingMetric = await model.findOne({
        where: {
          articleId,
          // Check if it's the same user by the ipAddress and uuid (Only record unique metrics)
          [Op.or]: [{ ipAddress }, { uuid: uuid || '' }],
          createdAt: {
            [Op.gte]: twentyFourHoursAgo, // Within the last 24 hours (As cookie is set to expire after 24h)
          },
        },
        // lock: t.LOCK.UPDATE to Prevents Duplicate Records When a query is
        // executed with a pessimistic lock, it tells the database to lock the
        // selected rows for the duration of the transaction. This means that
        // while one transaction is reading or writing to the locked row, other
        // transactions that try to access the same row will have to wait until
        // the first transaction is completed.

        // In this case, when the first request checks for an existing metric
        // using the findOne query, the row is locked. If another request comes
        // in while the first one is still processing, it will have to wait
        // until the lock is released.
        lock: t.LOCK.UPDATE, // Acquire a lock on the row
      });

      if (!existingMetric) {
        const uniqueId = uuidv4();
        // If no existing metric within the last 24 hours, create a new record
        await model.create({
          articleId,
          ipAddress,
          uuid: uniqueId,
        });

        return uniqueId;
      }

      return existingMetric.uuid;
    });
  }

  static async deleteMetrics(articleId, transaction) {
    if (!articleId) {
      throw new Error('Property articleId is required');
    }
    // Remove article Views metric
    await View.destroy({
      where: { articleId },
      transaction,
    });
    // Remove article Shares metric
    await Share.destroy({
      where: { articleId },
      transaction,
    });
  }
}
