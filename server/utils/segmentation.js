const crypto = require('crypto');

exports.simpleSegmentation = (id, numBuckets) => {
  const hasher = crypto.createHash('sha256');
  const hash = hasher.update(String(id)).digest('hex');
  const bucket = parseInt(hash.substring(0, 8), 16) % numBuckets;
  return bucket;
};
