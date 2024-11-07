import db from '../config/databaseConnection.js';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import View from '../models/View.js';
import Share from '../models/Share.js';

export default class Metrics {
  /**
   * Updates or creates a unique metric for a specific article based on IP address or UUID.
   * This method ensures that metrics are tracked uniquely per user and per article within a 24-hour period.
   *
   * It uses a transaction to guarantee that the database operations are atomic: either both the
   * check and creation succeed, or neither do, ensuring data consistency.
   *
   * @param {object} model - The Sequelize model for the metric (e.g., View or Share).
   * @param {object} data - The data for the metric, including uuid, ipAddress, and articleId.
   * @returns {string} The unique UUID of the metric, either newly created or existing.
   * @throws {Error} If the ipAddress or articleId is not provided.
   */
  static async updateMetric(model, data) {
    const { uuid, ipAddress, articleId } = data;

    // Validate input parameters
    if (!ipAddress) {
      throw new Error('IpAddress is required');
    }
    if (!articleId) {
      throw new Error('Property articleId is required');
    }

    // Calculate the timestamp for 24 hours ago
    const twentyFourHoursAgo = new Date(new Date() - 24 * 60 * 60 * 1000);

    // Perform database operations within a transaction for data integrity
    return await db.sequelize.transaction(async (t) => {
      // Check if the metric for this article and user (IP or UUID) already exists in the last 24 hours
      const existingMetric = await model.findOne({
        where: {
          articleId,
          [Op.or]: [{ ipAddress }, { uuid: uuid || '' }],
          createdAt: { [Op.gte]: twentyFourHoursAgo }, // Only consider metrics from the last 24 hours
        },
        lock: t.LOCK.UPDATE, // Lock the row for the duration of the transaction to prevent duplicates
      });

      if (!existingMetric) {
        // If no existing metric, create a new one
        const uniqueId = uuidv4();
        await model.create({
          articleId,
          ipAddress,
          uuid: uniqueId,
        });

        return uniqueId; // Return the newly created UUID
      }

      // If metric exists, return the existing UUID
      return existingMetric.uuid;
    });
  }

  /**
   * Deletes metrics for a specific article from both Views and Shares models.
   * This method is used to clean up metrics associated with an article, typically when an article is deleted.
   *
   * @param {string} articleId - The ID of the article whose metrics are to be deleted.
   * @param {object} transaction - Sequelize transaction object to ensure atomicity.
   * @throws {Error} If the articleId is not provided.
   */
  static async deleteMetrics(articleId, transaction) {
    if (!articleId) {
      throw new Error('Property articleId is required');
    }

    // Delete metrics associated with the article in both Views and Shares
    await View.destroy({
      where: { articleId },
      transaction,
    });
    await Share.destroy({
      where: { articleId },
      transaction,
    });
  }
}
