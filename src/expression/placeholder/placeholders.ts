export class Placeholders<T> {
    private readonly map: Map<T, string>;

    private nextId: number;

    protected constructor(
        private readonly prefix: '#' | ':',
        iterable: Iterable<[T, string]>,
    ) {
        this.map = new Map(iterable);

        this.nextId = this.map.size;
    }

    public add(value: T): string {
        if (this.map.has(value)) {
            return this.map.get(value)!;
        }

        const placeholder: string = `${this.prefix}${this.nextId++}`;

        this.map.set(value, placeholder);

        return placeholder;
    }

    public serialize(): Readonly<Record<string, T>> {
        return Object.fromEntries(
            Array
                .from(this.map)
                .map(([value, key]: [T, string]): [string, T] => [key, value]),
        );
    }
}
