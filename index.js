const path = require("path");
const fsAsync = require("fs").promises;
const fs = require("fs");

exports.resolvePackage = resolve;
exports.resolvePackageSync = resolveSync;

async function resolve(name, from) {
    if (path.dirname(from) === from) {
        throw new Error(`Cannot resolve ${name} from ${from}.`);
    }

    const candidate = path.join(from, "node_modules", name);
    try {
        await fsAsync.stat(candidate);
        const result = await fsAsync.realpath(candidate);
        return result;
    } catch {
        try {
            return await resolve(name, path.dirname(from));
        } catch {
            throw new Error(`Cannot resolve ${name} from ${from}.`);
        }
    }
}

function resolveSync(name, from) {
    if (path.dirname(from) === from) {
        throw new Error(`Cannot resolve ${name} from ${from}.`);
    }

    const candidate = path.join(from, "node_modules", name);
    try {
        fs.statSync(candidate);
        const result = fs.realpathSync(candidate);
        return result;
    } catch (ex) {
        try {
            return resolveSync(name, path.dirname(from));
        } catch {
            throw new Error(`Cannot resolve ${name} from ${from}.`);
        }
    }
}
