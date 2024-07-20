export default function levenshteinDistance(s: any[], t: any[]): number {
    const d: number[][] = [];

    const n = s.length;
    const m = t.length;

    if (n === 0) {
        return m;
    }
    if (m === 0) {
        return n;
    }

    for (let i = n; i >= 0; i--) {
        d[i] = [];
    }

    for (let i = n; i >= 0; i--) {
        d[i][0] = i;
    }
    for (let j = m; j >= 0; j--) {
        d[0][j] = j;
    }

    for (let i = 1; i <= n; i++) {
        const s_i = s[i - 1];

        for (let j = 1; j <= m; j++) {
            if (i === j && d[i][j] > 4) return n;

            const t_j = t[j - 1];
            const cost = s_i === t_j ? 0 : 1;

            let mi = d[i - 1][j] + 1;
            const b = d[i][j - 1] + 1;
            const c = d[i - 1][j - 1] + cost;

            if (b < mi) mi = b;
            if (c < mi) mi = c;

            d[i][j] = mi;

            if (i > 1 && j > 1 && s_i === t[j - 2] && s[i - 2] === t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }

    return d[n][m];
}

