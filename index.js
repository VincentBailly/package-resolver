const path = require("path");
const fs = require("fs").promises;

exports.resolvePackage = resolve;

async function resolve(name, from) {
    if (path.dirname(from) === from) {
        throw new Error(`Cannot resolve ${name} from ${from}.`);
    }

    const candidate = path.join(from, "node_modules", name);
    try {    
        await fs.stat(candidate);
        const result = await fs.realpath(candidate);
        return result;
    } catch {
        try {
            return await resolve(name, path.dirname(from)); 
        } catch {
            throw new Error(`Cannot resolve ${name} from ${from}.`);
        }
    }
}
