import db from '../config/databaseConnection.js';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';

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

    return await db.sequelize.transaction(async (t) => {
      const existingMetric = await model.findOne({
        where: {
          articleId,
          // Check if it's the same user by the ipAddress or by uuid (Only record unique metrics)
          [Op.or]: [{ ipAddress }, { uuid: uuid || '' }],
          createdAt: {
            [Op.gte]: twentyFourHoursAgo, // Within the last 24 hours (As cookie is set to expire after 24h)
          },
        },
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

      return existingMetric.uuid || uuid;
    });
  }
}
