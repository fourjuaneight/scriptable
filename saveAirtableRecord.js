// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: archive;
const params = args.shortcutParameter;

const saveRecord = async data => {
  const endpoint = `${data.table}/${data.tableName}`;
  const payload = {
    records: [
      {
        fields: {
          title: data.record.title,
          creator: data.record.creator,
          url: data.record.url,
          tags: data.record.tags,
        },
      },
    ],
  };
  const req = new Request(endpoint);
  
  req.method = 'POST';
  req.headers = { 
    Authorization: `Bearer ${data.key}`,
    'Content-Type': 'application/json',
  };
  req.body = JSON.stringify(payload);
  
  try {
    const resp = await req.loadJSON();
    
    Script.setShortcutOutput({ status: "ok", data: resp.records[0].fields });
  } catch(err) {
    console.error(err);
  
    Script.setShortcutOutput({ status: "error", data: err });
  }
};

await saveRecord(params);

Script.complete();
