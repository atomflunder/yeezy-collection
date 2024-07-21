/**
 * Finds the Levenshtein distance between 2 sequences.
 * Can be strings, or any array.
 * https://en.wikipedia.org/wiki/Levenshtein_distance
 * @param seq1 The first sequence.
 * @param seq2 The second sequence.
 * @returns The Levenshtein distance between the 2 sequences.
 */
export default function levenshteinDistance(
    seq1: any[] | string,
    seq2: any[] | string
): number {
    const d: number[][] = [];

    const n = seq1.length;
    const m = seq2.length;

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
        const s_i = seq1[i - 1];

        for (let j = 1; j <= m; j++) {
            if (i === j && d[i][j] > 4) return n;

            const t_j = seq2[j - 1];
            const cost = s_i === t_j ? 0 : 1;

            let mi = d[i - 1][j] + 1;
            const b = d[i][j - 1] + 1;
            const c = d[i - 1][j - 1] + cost;

            if (b < mi) mi = b;
            if (c < mi) mi = c;

            d[i][j] = mi;

            if (i > 1 && j > 1 && s_i === seq2[j - 2] && seq1[i - 2] === t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }

    return d[n][m];
}

