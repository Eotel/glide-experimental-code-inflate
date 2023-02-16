const uint8ArrayToBase64 = (uint8Array) => {
  return btoa(String.fromCharCode(...uint8Array));
};

const base64ToUint8Array = (base64Str) => {
  const raw = atob(base64Str);
  return Uint8Array.from(
    Array.prototype.map.call(raw, (x) => {
      return x.charCodeAt(0);
    })
  );
};

const compress = (data) => {
  const compressed = pako.deflate(data);
  return uint8ArrayToBase64(compressed);
};

const decompress = (data) => {
  const decompressed = pako.inflate(base64ToUint8Array(data), { to: 'string' });
  return decompressed;
};

window.function = function (str) {
  const data = str.value ?? '';
  return decompress(data);
};
