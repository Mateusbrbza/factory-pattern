interface Pokemon {
    id: string;
    attack: number;
    defense: number;
}

interface BaseRecord {
    id: string;
}

interface Database<T extends BaseRecord> {
    set(newValue: T): void;
    get(id: string): T | undefined;

    selectBest(scoreStrategy: (item: T) => number): T | undefined;
}

function createDabatase<T extends BaseRecord>() {
    class InMemoryDB implements Database<T> {
        private db: Record<string, T> = {};
        static instance:InMemoryDB = new InMemoryDB();
        private constructor() {}

        public set(newValue: T): void {
            this.db[newValue.id] = newValue;
        }
        public get(id: string): T | undefined {
            return this.db[id]
        }

        selectBest(scoreStrategy: (item: T) => number): T | undefined {
            const found: {
                max: number;
                item: T | undefined;
            } = {
                max: 0,
                item: undefined
            }

            Object.values(this.db).reduce((f, item) => {
                const score = scoreStrategy(item);
                if (score > f.max) {
                    f.max = score;
                    f.item = item;
                }
                return f;
            }, found)
            return found.item;
        }
    }
    return InMemoryDB;
}

const PokemonDB = createDabatase<Pokemon>();
PokemonDB.instance.set({
    id: 'Bulbasaur',
    attack: 50,
    defense: 12,
});
PokemonDB.instance.set({
    id: 'Shitsaur',
    attack: 89,
    defense: 99,
});

const bestDefensive = PokemonDB.instance.selectBest(({ defense }) => defense);
const bestAttack = PokemonDB.instance.selectBest(({ attack }) => attack);

console.log(`Best attack = ${bestAttack?.id}`);
console.log(`Best defense = ${bestDefensive?.id}`);