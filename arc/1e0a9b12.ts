// https://arcprize.org/play?task=1e0a9b12

function Puzzle_1e0a9b12(input: number[][]) {
    input = input[0].map((_, i) => input.map((row) => row[i]));

    for (let y = 0; y < input.length; y++) {
        const l = input[y].length;

        input[y] = input[y].filter((x) => x !== 0);

        while (input[y].length < l) input[y].unshift(0);
    }

    input = input[0].map((_, i) => input.map((row) => row[i]));

    return input;
}

type Increment<X extends number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17][X];
type Decrement<X extends number> = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15][X];

namespace Transpose {
    export type SelectCol<Matrix extends readonly unknown[][], X extends number, Row extends readonly unknown[] = []> = Matrix extends [
        infer First extends readonly unknown[],
        ...infer Rest extends readonly unknown[][]
    ]
        ? SelectCol<Rest, X, [First[X], ...Row]>
        : Row;
}

type Transpose<Matrix extends readonly unknown[][], X extends number = 0, Output extends readonly unknown[][] = []> = X extends Matrix[0]["length"]
    ? Output
    : Transpose<Matrix, Increment<X>, [...Output, Transpose.SelectCol<Matrix, X>]>;

namespace Puzzle_1e0a9b12 {
    export type Internal<Input extends readonly unknown[][], Output extends readonly unknown[][] = []> = Input extends [
        infer Row extends readonly unknown[],
        ...infer Rest extends readonly unknown[][]
    ]
        ? Internal<Rest, [ProcessRow<Row>, ...Output]>
        : Output;

    type ProcessRow<Row extends readonly unknown[], NotZeroes extends readonly unknown[] = [], Zeroes extends readonly unknown[] = []> = Row extends [
        infer First,
        ...infer Rest
    ]
        ? First extends 0
            ? ProcessRow<Rest, NotZeroes, [...Zeroes, First]>
            : ProcessRow<Rest, [...NotZeroes, First], Zeroes>
        : [...Zeroes, ...NotZeroes];
}

type Puzzle_1e0a9b12<Input extends readonly number[][]> = Transpose<Puzzle_1e0a9b12.Internal<Transpose<Input>>>;
