const crypto = require('crypto');
const Base58 = require('base-58');

// Hash function
function createHash(url) {
  return crypto.createHash('sha256').update(url).digest();
}

// Binary-to-text encoding algorithm
function base58Encoded(bytes) {
  return Base58.encode(bytes);
}

// Function to generate the short URL link
function generateShortURL(initialLink, userId) {
  // Step 1: Create a hash of the concatenated initialLink and userId
  const urlHashBytes = createHash(initialLink + userId);
  
  // Step 2: Encode the hash bytes using Base58
  const base58EncodedString = base58Encoded(urlHashBytes);

  // Step 3: Return the first 8 characters of the encoded string as the short URL
  return base58EncodedString.substring(0, 8);
}

// Example usage:
const longUrl = 'https://example.com';
const userId = 'user123';
const shortUrl = generateShortURL(longUrl, userId);
console.log('Short URL:', shortUrl);


