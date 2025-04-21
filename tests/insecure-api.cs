// Risk: Deprecated crypto
SHA1CryptoServiceProvider sha = new SHA1CryptoServiceProvider();
byte[] hash = sha.ComputeHash(Encoding.UTF8.GetBytes(password));

// Risk: Unsecured HTTP client
HttpClient client = new HttpClient();
var result = await client.GetAsync("http://example.com/data");
