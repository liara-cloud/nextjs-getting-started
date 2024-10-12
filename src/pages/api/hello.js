// pages/api/hello.js
import logger from '../../utils/logger';

export default function handler(req, res) {
  logger.info('API /hello endpoint was hit');
  res.status(200).json({ message: 'Hello, world!' });
}
