
Distributed diff compression with ZDAG.

```
// block
[ ... CIDs for table
  VARINT
  BYTE
  VARINT
  VARINT
  BYTE
]
```

The diff program loads downloads the CIDs and appends their CIDs to its own
table and inserts those for each of the VARINTs alongside the inline BYTE
values.

This effectively allows you to share any of these files, or any ZDAG block
for the matter, as a compression table, and you can then use them
cumulatively.

You could also build a table of known tokens, like for a programming language
and distribute it ahead of time, allowing you to compress any code file against
what is likely the ideal base table. You'd need to keep in mind that common
small entries in the table wouldn't be as useful, since they take up
just as much space in a local table.

Even more efficient

```
[
  [ ... CIDS for table ],
  [ BYTE, BYTE ],
  [ DELTA FOR INSERT,VARINT, DELTA FOR INSERT, VARINT ]
]
```

If we combine this with ZBL we can build a compelling browser transport.

We return a ZBL for any request without a cache state. We then introduce
a header like an ETAG, maybe ZTAG, that is the CID of the prior response
(ZBL). The header is only sent if the client has the complete graph.

You can then return this structure as a diff knowing the graph
you can de-duplicate from.
