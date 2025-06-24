# Run in development


```bash
# Install the dependencies
npm install

# Run dev server
npm run dev
```

## Notes
This version doesn't use ssr for the /stats page. Because ssr only works for the production version running on our server:

```bash
https://budgify-web.duckdns.org/
```

The ssr code is commented out and we use a csr version.