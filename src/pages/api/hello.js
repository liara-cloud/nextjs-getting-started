// pages/api/hello.js
import logger from '../../utils/logger';

export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || 'Unknown user-agent';
  const authHeader = req.headers['authorization'] || 'No authorization';

  // Log user-agent and authorization details
  logger.info(`User accessed /hello API | User-Agent: ${userAgent} | Authorization: ${authHeader}`);

  res.status(200).json({ message: 'Hello, world!' });
}
