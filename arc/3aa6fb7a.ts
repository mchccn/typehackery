// https://arcprize.org/play?task=3aa6fb7a

function Puzzle_3aa6fb7a(input: number[][]) {
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            const TL = [input[y - 1]?.[x - 1], input[y - 1]?.[x], input[y]?.[x - 1]];
            const TR = [input[y - 1]?.[x], input[y - 1]?.[x + 1], input[y]?.[x + 1]];
            const BL = [input[y + 1]?.[x - 1], input[y + 1]?.[x], input[y]?.[x - 1]];
            const BR = [input[y + 1]?.[x], input[y + 1]?.[x + 1], input[y]?.[x + 1]];

            const corner = [TL, TR, BL, BR].find((n) => n.every(Boolean) && new Set(n).size === 1);

            if (corner) input[y][x] = corner[0] + 1;
        }
    }

    return input;
}

type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never;
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

type Increment<X extends number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17][X];
type Decrement<X extends number> = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15][X];

namespace SetAtCoords {
    export type SetAtX<
        Row extends readonly unknown[],
        TX extends number,
        X extends number,
        Value extends number,
        LHalf extends readonly unknown[][],
        RHalf extends readonly unknown[][],
        Output extends readonly unknown[] = []
    > = Row extends [infer First, ...infer Rest]
        ? SetAtX<Rest, TX, Increment<X>, Value, LHalf, RHalf, X extends TX ? [...Output, Value] : [...Output, First]>
        : [...LHalf, Output, ...RHalf];
}

type SetAtCoords<
    Input extends readonly unknown[][],
    TY extends number,
    TX extends number,
    Value extends number,
    Y extends number = 0,
    X extends number = 0,
    Output extends readonly unknown[][] = []
> = Input extends [infer First extends unknown[], ...infer Rest extends readonly unknown[][]]
    ? Y extends TY
        ? SetAtCoords.SetAtX<First, TX, X, Value, Output, Rest>
        : SetAtCoords<Rest, TY, TX, Value, Increment<Y>, 0, readonly [...Output, First]>
    : Output;

type Or<A extends boolean, B extends boolean> = true extends A | B ? true : false;

type Puzzle_3aa6fb7a<Input extends readonly number[][], Y extends number = 0, X extends number = 0> = Y extends keyof Input
    ? X extends keyof Input[Y]
        ? Input[Y][X] extends 0
            ? Or<
                  IsUnion<Input[Decrement<Y>][Decrement<X>] | Input[Decrement<Y>][X] | Input[Y][Decrement<X>]> extends true ? true : false,
                  [0] extends [Input[Decrement<Y>][Decrement<X>] | Input[Decrement<Y>][X] | Input[Y][Decrement<X>]] ? true : false
              > extends true
                ? Or<
                      IsUnion<Input[Decrement<Y>][X] | Input[Decrement<Y>][Increment<X>] | Input[Y][Increment<X>]> extends true ? true : false,
                      [0] extends [Input[Decrement<Y>][X] | Input[Decrement<Y>][Increment<X>] | Input[Y][Increment<X>]] ? true : false
                  > extends true
                    ? Or<
                          IsUnion<Input[Increment<Y>][Decrement<X>] | Input[Increment<Y>][X] | Input[Y][Decrement<X>]> extends true ? true : false,
                          [0] extends [Input[Increment<Y>][Decrement<X>] | Input[Increment<Y>][X] | Input[Y][Decrement<X>]] ? true : false
                      > extends true
                        ? Or<
                              IsUnion<Input[Increment<Y>][X] | Input[Increment<Y>][Increment<X>] | Input[Y][Increment<X>]> extends true ? true : false,
                              [0] extends [Input[Increment<Y>][X] | Input[Increment<Y>][Increment<X>] | Input[Y][Increment<X>]] ? true : false
                          > extends true
                            ? Puzzle_3aa6fb7a<Input, Y, Increment<X>>
                            : Puzzle_3aa6fb7a<SetAtCoords<Input, Y, X, 2>, Y, Increment<X>>
                        : Puzzle_3aa6fb7a<SetAtCoords<Input, Y, X, 2>, Y, Increment<X>>
                    : Puzzle_3aa6fb7a<SetAtCoords<Input, Y, X, 2>, Y, Increment<X>>
                : Puzzle_3aa6fb7a<SetAtCoords<Input, Y, X, 2>, Y, Increment<X>>
            : Puzzle_3aa6fb7a<Input, Y, Increment<X>>
        : Puzzle_3aa6fb7a<Input, Increment<Y>, 0>
    : Input;

export { Puzzle_3aa6fb7a };
