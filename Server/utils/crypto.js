// utils/crypto.js
// AES-256-GCM helpers for secrets that must be recoverable server-side
// (currently the TOTP secret). Values are stored as:
//   enc:v1:<iv-hex>:<auth-tag-hex>:<ciphertext-hex>
const crypto = require('crypto');

const PREFIX = 'enc:v1:';

const deriveKey = () => {
  const raw = process.env.TWO_FACTOR_ENCRYPTION_KEY || process.env.JWT_SECRET || '';
  if (!raw) throw new Error('Missing encryption key material.');

  if (/^[0-9a-fA-F]{64}$/.test(raw)) return Buffer.from(raw, 'hex');

  try {
    const b64 = Buffer.from(raw, 'base64');
    if (b64.length === 32) return b64;
  } catch {
    // not base64 — fall through to KDF
  }

  // Deterministic 32-byte key from arbitrary passphrase material.
  return crypto.createHash('sha256').update(`scholaris:2fa:${raw}`).digest();
};

const isEncrypted = (value) => typeof value === 'string' && value.startsWith(PREFIX);

const encryptSecret = (plaintext) => {
  if (!plaintext) return '';
  if (isEncrypted(plaintext)) return plaintext;

  const key = deriveKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([cipher.update(String(plaintext), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return `${PREFIX}${iv.toString('hex')}:${tag.toString('hex')}:${ciphertext.toString('hex')}`;
};

const decryptSecret = (stored) => {
  if (!stored) return '';
  if (!isEncrypted(stored)) return stored; // legacy plaintext rows still work

  const parts = stored.slice(PREFIX.length).split(':');
  if (parts.length !== 3) throw new Error('Malformed encrypted secret.');

  const [ivHex, tagHex, dataHex] = parts;
  const key = deriveKey();
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(ivHex, 'hex'));
  decipher.setAuthTag(Buffer.from(tagHex, 'hex'));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(dataHex, 'hex')),
    decipher.final(),
  ]);
  return plaintext.toString('utf8');
};

const sha256 = (value) => crypto.createHash('sha256').update(String(value)).digest('hex');

module.exports = { encryptSecret, decryptSecret, isEncrypted, sha256 };
