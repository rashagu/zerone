/**
 * 去除json文件中的注释
 * https://github.com/getify/JSON.minify
 */
export function jsonMinify(s: string) {
    const l = s.length,
        x = [];
    let i = 0,
        j,
        v;
    do {
        v = s[i];
        if (v === '/') {
            if (i + 1 === l) {
                x.push('/');
                ++i;
                continue;
            }
            // single line comments
            else if (s[i + 1] === '/') {
                i += 2;
                while (i < l && s[i] !== '\n') i++;
            }
            // multiline comments
            else if (s[i + 1] === '*') {
                i += 2;
                while (i < l - 1 && !(s[i] === '*' && s[i + 1] === '/')) i++;
                i++; // skip last slash
            }
            // not a comment
            else {
                x.push('/');
            }
        }
        // ignore slashes in strings
        else if (v === "'") {
            x.push("'");
            if (++i >= l) continue;
            while (i < l && s[i] !== "'") {
                x.push(s[i]);
                i++;
                if (s[i] === '\\') {
                    x.push('\\');
                    ++i;
                }
            }
            if (i < l) x.push("'");
        } else if (v === '"') {
            x.push('"');
            if (++i >= l) continue;
            while (i < l && s[i] !== '"') {
                if (s[i] === '\\') {
                    x.push('\\');
                    x.push(s[i + 1]);
                    i += 2;
                } else {
                    x.push(s[i]);
                    i++;
                }
            }
            if (i < l) x.push('"');
        } else {
            // don't include trailing commas in lists and objects
            if (v === ',') {
                j = i + 1;
                while (j < l && (s[j] === '\n' || s[j] === '\r' || s[j] === ' ' || s[j] === '\t')) j++;
                if (j < l && s[j] !== ']' && s[j] !== '}') {
                    x.push(v);
                    i = j - 1; // skips whitespace
                }
            } else if (v !== '\n' && v !== '\r' && v !== ' ' && v !== '\t') x.push(v);
        }
        ++i;
    } while (i < l);
    return x.join('');
}
