async function translate(text, from, to, options) {
    const { utils } = options;
    const { Database } = utils;

    const id = "plugin.com.pot-app.gcide";

    const db = await Database.load(`sqlite:plugins/translate/${id}/gcide.db`);
    let res = await db.select('SELECT * FROM word WHERE w = $1', [text]);
    await db.close();
    if (res.length > 0) {
        let explaination = res[0].m;
        explaination = explaination.replace(/<br\s*[\/]?>/gi, "\n");
	    explaination = explaination.replace(/<[^>]+>/ig, '');
        return explaination;
    } else {
        throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}
